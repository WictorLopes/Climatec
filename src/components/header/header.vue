<template>
  <header class="header">
    <div class="logoNome">
      <img src="../../assets/logo.png" style="margin-right: 30px;" />
      <h1>Climatec</h1>
    </div>
    <div>
      <input
        class="searchbar"
        placeholder="Pesquisar"
        style="padding-left: 35px; color: white;"
      />
    </div>
    <div style="display: flex; align-items: center;">
      <img
        v-if="
          this.tempLocalCode >= 800 &&
          this.tempLocalCode <= 803 &&
          this.hourNow >= 6 &&
          this.hourNow <= 17
        "
        alt=""
        style="margin-right: 25px;"
        src="../..\assets\icones\sol.png"
      />
      <img
        v-else-if="
          this.tempLocalCode >= 200 &&
          this.tempLocalCode <= 751 &&
          this.hourNow >= 0 &&
          this.hourNow <= 23
        "
        alt=""
        style="margin-right: 25px; width: 17%;"
        src="../..\assets\icones\chuva.png"
      />
      <img
        v-else-if="
          this.tempLocalCode >= 800 ||
          (this.tempLocalCode <= 803 && this.hourNow >= 18 && this.hourNow <= 5)
        "
        alt=""
        style="margin-right: 25px;"
        src="../..\assets\icones\noite.png"
      />
      <img
        v-else
        alt=""
        style="margin-right: 25px; width: 25%;"
        src="../..\assets\icones\nublado.png"
      />

      <div style="display: flex; flex-direction: column;">
        <span style="font-size: 30px; margin-right: 15px;">
          {{ Math.floor(this.tempLocal) }}°C
        </span>
        <span style="font-size: 16px;">{{ this.tempLocalDescription }}</span>
        {{ this.city }}
      </div>
      <div class="fotoPerfil">
        <img
          alt=""
          v-on:click="showMenu = !showMenu"
          src="../..\assets\icones\perfil.png"
        />
        <div class="showMenu" v-if="showMenu">
          <li>
            <ul>
              <a style="color: white; text-decoration: none;" href="/">Home</a>
            </ul>
            <ul>
              <a style="color: white; text-decoration: none;" href="/config">
                Configuração
              </a>
            </ul>
            <ul>
              <a style="color: white; text-decoration: none;" href="#">Sair</a>
            </ul>
          </li>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import axios from 'axios'
export default {
  name: 'HeaderPage',
  data: function () {
    return {
      input: '',
      tempLocal: '',
      tempLocalDescription: '',
      tempLocalCode: '',
      hourNow: '',
      showMenu: false,
      response: '',
      country_code: '',
      latitude: '',
      longitude: '',
      city: '',
    }
  },

  mounted() {
    setTimeout(() => {
      this.getCity()
    }, 2000)

    if (navigator.geolocation) {
      this.local = navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
      })
    }
  },
  methods: {
    async getCity() {
      const response = await axios.get(
        'https://api.opencagedata.com/geocode/v1/json',
        {
          params: {
            key: '962910487fa142e19394eb0facc173ba',
            q: `${this.latitude}+${this.longitude}`,
          },
        },
      )
      console.log(response)
      console.log(this.latitude)
      console.log(this.longitude)
      this.city = response.data.results[0].components.town.toLowerCase()
      this.country_code = response.data.results[0].components.country_code
      this.getTemp()
    },
    getTemp() {
      axios
        .get(
          `https://api.weatherbit.io/v2.0/current?city=${this.city}&country=${this.country_code}&lang=pt&key=3bd70eb0e2024093af278062f08a5eca`,
        )
        .then((res) => {
          this.tempLocal = res.data.data[0].temp
          this.tempLocalDescription = res.data.data[0].weather.description
          this.tempLocalCode = res.data.data[0].weather.code
          this.dateNow = new Date()
          this.hourNow = this.dateNow.getHours()
        })
        .catch((error) => {
          console.log(error)
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&lang=pt&units=metric&appid=cc2847e85b696ef29e3580bf28aed600`,
            )
            .then((res) => {
              this.tempLocal = res.data.main.temp
              this.tempLocalDescription = res.data.weather[0].description
              this.tempLocalCode = res.data.weather[0].id
              this.dateNow = new Date()
              this.hourNow = this.dateNow.getHours()
            })
            .catch((error) => {
              console.log(error)
            })
        })
    },
  },
}
</script>
<style lang="css" src="./header.css"></style>
