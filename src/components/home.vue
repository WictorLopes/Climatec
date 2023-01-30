<template>
  <div>
    <link
      rel="stylesheet"
      href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
    />
    <header class="header">
      <div class="logoNome">
        <img src="./../assets/logo.png" style="margin-right: 30px;" />
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
          style="margin-right: 25px;"
          src="./..\assets\icones\sol.png"
        />
        <img
          v-else-if="
            this.tempLocalCode >= 200 &&
            this.tempLocalCode <= 751 &&
            this.hourNow >= 0 &&
            this.hourNow <= 23
          "
          style="margin-right: 25px; width: 25%;"
          src="./..\assets\icones\chuva.png"
        />
        <img
          v-else-if="
            this.tempLocalCode >= 800 ||
            (this.tempLocalCode <= 803 &&
              this.hourNow >= 18 &&
              this.hourNow <= 5)
          "
          style="margin-right: 25px;"
          src="./..\assets\icones\noite.png"
        />
        <img
          v-else
          style="margin-right: 25px; width: 25%;"
          src="./..\assets\icones\nublado.png"
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
            v-on:click="showMenu = !showMenu"
            src="./..\assets\icones\perfil.png"
          />
          <div class="showMenu" v-if="showMenu">
            <li>
              <ul>
                <a style="color: white; text-decoration: none;" href="#">
                  Home
                </a>
              </ul>
              <ul>
                <a style="color: white; text-decoration: none;" href="#">
                  Configuração
                </a>
              </ul>
              <ul>
                <a style="color: white; text-decoration: none;" href="#">
                  Sair
                </a>
              </ul>
            </li>
          </div>
        </div>
      </div>
    </header>
    <body>
      <div class="leftMenu">
        <div
          class="roundHome"
          onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textHome').style.display='block'"
          onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textHome').style.display='none'"
        >
          <img src="./..\assets\icones\home.png" />
          <p
            id="textHome"
            style="display: none; position: absolute; left: 95px;"
          >
            Home
          </p>
        </div>
        <div
          class="roundCamera"
          onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textCamera').style.display='block'"
          onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textCamera').style.display='none'"
        >
          <img src="./..\assets\icones\camera.png" />
          <p
            id="textCamera"
            style="display: none; position: absolute; left: 95px;"
          >
            Câmera
          </p>
        </div>
        <div
          class="roundTelefone"
          onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textTelefone').style.display='block'"
          onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textTelefone').style.display='none'"
        >
          <img src="./..\assets\icones\telefone.png" />
          <p
            id="textTelefone"
            style="display: none; position: absolute; left: 95px;"
          >
            Telefone
          </p>
        </div>
        <div
          class="roundPlay"
          onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textVideo').style.display='block'"
          onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textVideo').style.display='none'"
        >
          <img src="./..\assets\icones\play.png" />
          <p
            id="textVideo"
            style="display: none; position: absolute; left: 95px;"
          >
            Vídeos
          </p>
        </div>
        <div
          class="roundConfig"
          onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textConfig').style.display='block'"
          onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textConfig').style.display='none'"
        >
          <img src="./..\assets\icones\config.png" />
          <p
            id="textConfig"
            style="display: none; position: absolute; left: 95px;"
          >
            Configurações
          </p>
        </div>
      </div>

      <div>
        <select class="selectDevice" v-model="selectedDevice">
          <option value="" disabled>Selecione o dispositivo</option>
          <option v-for="device in devices" :key="device.id" :value="device.id">
            {{ device.deviceName }}
          </option>
        </select>
        <button
          data-toggle="modal"
          data-target="#myModal"
          class="addDeviceButton"
          @click="showModal = true"
        >
          +
        </button>
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <input
              class="AddDevice"
              v-model="novoDevice"
              placeholder="Novo dispositivo"
            />
            <div
              style="display: flex; justify-content: space-around; margin: 15px; 0 15px 0"
            >
              <button
                style="
                  background: #d9d9d9;
                  border-radius: 10px;
                  border: none;
                  width: 92px;
                  height: 30px;
                "
                @click="addToListDevices"
              >
                Salvar
              </button>
              <button
                style="
                  background: #d9d9d9;
                  border-radius: 10px;
                  border: none;
                  width: 92px;
                  height: 30px;
                "
                @click="showModal = false"
              >
                Fechar
              </button>
            </div>
            <span style="color: red;" v-if="errorMessage">
              Nome do dispositivo não pode ser em branco.
            </span>
          </div>
        </div>
        <div class="blockEmergencia">
          <div class="emergenciaSquare">
            <img src="./..\assets\icones\emergencia.png" />
            <div class="centered">!</div>
          </div>
          <div>
            <h4 style="position: absolute; top: 4px; left: 90px;">
              Emergência
            </h4>
            <h6
              style="position: absolute; top: 22px; left: 90px; color: #87888c;"
            >
              Ligar apenas em caso de emergência
            </h6>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="toggle" @click="changeToggle" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="blocks">
        <div class="blockStatus" v-if="this.status === 'Ativo'">
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./..\assets\icones\ativo.png"
          />

          <div class="textStatus">
            <span style="font-size: 18px;">{{ this.status }}</span>
            <span style="font-size: 10px;">Status do sensor</span>
          </div>
        </div>
        <div class="blockStatus" v-else>
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./..\assets\icones\inativo.png"
          />

          <div class="textStatus">
            <span style="font-size: 18px;">{{ this.status }}</span>
            <span style="font-size: 10px;">Status do sensor</span>
          </div>
        </div>
        <div class="blockTemp" v-if="this.response == 0">
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./..\assets\icones\temp.png"
          />

          <div class="textTemp">
            <span style="font-size: 10px;">Sem dados</span>
          </div>
        </div>
        <div class="blockTemp" v-else>
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./..\assets\icones\temp.png"
          />

          <div class="textTemp">
            <span style="font-size: 18px;">{{ this.tempAtual }}</span>
            <span style="font-size: 10px;">Temperatura</span>
          </div>
        </div>
        <div class="blockSaude" v-if="this.status_health === 'OK'">
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./..\assets\icones\saudeOK.png"
          />

          <div class="textSaude">
            <span style="font-size: 18px;">{{ status_health }}</span>
            <span style="font-size: 10px;">Saúde do sensor</span>
          </div>
        </div>
        <div class="blockSaude" v-else>
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./..\assets\icones\inoperante.png"
          />

          <div class="textSaude" style="left: 80px;">
            <span style="font-size: 18px;">{{ status_health }}</span>
            <span style="font-size: 10px;">Saúde do sensor</span>
          </div>
        </div>
        <div class="blockUltimoRegistro" v-if="this.response == 0">
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./..\assets\icones\historico.png"
          />

          <div class="textTemp">
            <span style="font-size: 10px;">Sem dados</span>
          </div>
        </div>
        <div class="blockUltimoRegistro" v-else>
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./..\assets\icones\historico.png"
          />

          <div class="textUltimoRegistro">
            <span style="font-size: 18px;">{{ ultimoRegistro }}</span>
            <span style="font-size: 10px;">Último Registro</span>
          </div>
        </div>
        <div class="blockHistorico" v-if="this.historico.length > 1">
          <span style="font-size: 18px;">Histórico de Temperaturas</span>
          <div style="display: flex; justify-content: space-evenly;">
            <li
              style="
                font-size: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
              "
              v-for="item in this.historico"
              :key="item.id"
            >
              {{ item.tempDegrees }}
              <img src="./..\assets\icones\historicoTemp.png" />
            </li>
          </div>
        </div>
        <div class="blockHistorico" v-else>
          <span style="font-size: 18px;">Histórico de Temperaturas</span>
          <div style="display: flex; justify-content: center;">
            <span>Sem histórico no momento</span>
          </div>
        </div>
        <div class="blockHistorico" v-if="this.response == 0">
          <span style="font-size: 18px;">Histórico de Temperaturas</span>
          <div style="display: flex; justify-content: center;">
            <span>Sem histórico no momento</span>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'HomePage',
  props: {
    msg: String,
  },
  data: function () {
    return {
      status: '',
      input: '',
      tempAtual: '',
      tempAnterior: '',
      ultimoRegistro: '',
      historico: {},
      status_health: '',
      tempLocal: '',
      tempLocalDescription: '',
      tempLocalCode: '',
      nameDevice: '',
      hourNow: '',
      idDevice: '',
      idSensor: '',
      deviceOptions: '',
      showModal: false,
      showMenu: false,
      response: '',
      toggle: false,
      country_code: '',
      selectedDevice: '',
      errorMessage: false,
      latitude: '',
      longitude: '',
      sensorData: null,
      city: '',
      sensorFull: null,
      novoDevice: '',
      devices: [],
    }
  },

  watch: {
    selectedDevice: function (newId) {
      this.getDeviceDatas(newId)
    },
  },

  mounted() {
    setTimeout(() => {
      this.getCity()
    }, 2000)

    if (navigator.geolocation) {
      this.local = navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords)
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
      })
    }
    axios
      .get('https://climatec.sp.skdrive.net/climatec/api/v1/devices')
      .then((res) => {
        this.devices = res.data
      })
      .catch((error) => {
        console.log(error)
      })
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
      this.city = response.data.results[0].components.city.toLowerCase()
      this.country_code =  response.data.results[0].components.country_code
      console.log(response)
      console.log('this.city', this.city)
      this.getTemp()
    },
    getTemp() {
      axios
        .get(
          `https://api.weatherbit.io/v2.0/current?city=${this.city}&country=${
            this.country_code
          }&lang=pt&key=3bd70eb0e2024093af278062f08a5eca`,
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

    getDeviceDatas(newID) {
      axios
        .get(`https://climatec.sp.skdrive.net/climatec/api/v1/devices/${newID}`)
        .then((res) => {
          console.log(res)
          this.status = res.data.data.statusSensor
          this.status_health = res.data.data.statusHealth
        })
        .catch((error) => {
          console.log(error)
        })
      axios
        .get(`https://climatec.sp.skdrive.net/climatec/api/v1/sensor/${newID}`)
        .then((res) => {
          this.response = res.data.data
          this.tempAtual = res.data.data[0].tempDegrees
          this.tempAnterior = res.data.data[1].tempDegrees
          this.response = res.data.data[0].created_at
          this.ultimoRegistro = moment(this.response).format('DD/MM/YYYY')
          this.historico = res.data.data.slice(1, 7)
          this.idSensor = res.data.idDevice
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addToListDevices() {
      this.errorMessage = false
      if (this.novoDevice.length > 0) {
        axios.post('https://climatec.sp.skdrive.net/climatec/api/v1/device', {
          deviceName: this.novoDevice,
        })
        this.novoDevice = ''
        this.showModal = false
      } else {
        this.errorMessage = true
      }
      location.reload()
    },
    changeToggle() {
      this.toggle = !this.toggle
    },
  },
}
</script>
<style lang="css" src="./home.css"></style>
