<template>
  <div>
    <link
      rel="stylesheet"
      href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
    />
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
          style="margin-right: 25px;"
          src="./../..\assets\icones\sol.png"
        />
        <img
          v-else-if="
            this.tempLocalCode >= 200 &&
            this.tempLocalCode <= 751 &&
            this.hourNow >= 0 &&
            this.hourNow <= 23
          "
          style="margin-right: 25px; width: 17%;"
          src="./../..\assets\icones\chuva.png"
        />
        <img
          v-else-if="
            this.tempLocalCode >= 800 ||
            (this.tempLocalCode <= 803 &&
              this.hourNow >= 18 &&
              this.hourNow <= 5)
          "
          style="margin-right: 25px;"
          src="./../..\assets\icones\noite.png"
        />
        <img
          v-else
          style="margin-right: 25px; width: 25%;"
          src="./../..\assets\icones\nublado.png"
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
            src="./../..\assets\icones\perfil.png"
          />
          <div class="showMenu" v-if="showMenu">
            <li>
              <ul>
                <a style="color: white; text-decoration: none;" href="/">
                  Home
                </a>
              </ul>
              <ul>
                <a style="color: white; text-decoration: none;" href="/config">
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
          style="background: #1e1e1e;"
          onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textHome').style.display='block'"
          onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textHome').style.display='none'"
        >
          <a href="/">
            <img
              src="./../..\assets\icones\home.png"
              style="filter: brightness(0.7);"
            />
          </a>
          <p
            id="textHome"
            style="display: none; position: absolute; left: 95px;"
          >
            Home
          </p>
        </div>
        <div
          class="roundCamera"
          style="background: #1e1e1e;"
          onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textCamera').style.display='block'"
          onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textCamera').style.display='none'"
        >
          <a href="#">
            <img src="./../..\assets\icones\camera.png" />
          </a>
          <p
            id="textCamera"
            style="display: none; position: absolute; left: 95px;"
          >
            Câmera
          </p>
        </div>
        <div
          class="roundTelefone"
          style="background: #1e1e1e;"
          onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textTelefone').style.display='block'"
          onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textTelefone').style.display='none'"
        >
          <a href="#">
            <img src="./../..\assets\icones\telefone.png" />
          </a>
          <p
            id="textTelefone"
            style="display: none; position: absolute; left: 95px;"
          >
            Telefone
          </p>
        </div>
        <div
          class="roundPlay"
          style="background: #1e1e1e;"
          onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textVideo').style.display='block'"
          onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textVideo').style.display='none'"
        >
          <a href="#">
            <img src="./../..\assets\icones\play.png" />
          </a>
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
          <a href="/config">
            <img
              src="./../..\assets\icones\config.png"
              style="filter: brightness(10);"
            />
          </a>
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
      </div>
      <div
        v-if="!this.selectedDevice"
        class="blocks"
        style="margin-left: 210px; color: red;"
      >
        Selecione um dispositivo acima para alterá-lo
      </div>
      <div v-else class="blocks">
        <div v-if="showModalEdit" class="modal">
          <div class="modal-content">
            <input
              class="AddDevice"
              v-model="newNameDevice"
              placeholder="Editar dispositivo"
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
                @click="editDevices"
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
                @click="showModalEdit = false"
              >
                Fechar
              </button>
            </div>
            <span style="color: red;" v-if="errorMessage">
              Nome do dispositivo não pode ser em branco.
            </span>
          </div>
        </div>
        <div v-if="showModalRemove" class="modal">
          <div class="modal-content">
            <span>Tem certeza que quer excluir o dispositivo?</span>
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
                @click="deleteDevices"
              >
                Sim
              </button>
              <button
                style="
                  background: #d9d9d9;
                  border-radius: 10px;
                  border: none;
                  width: 92px;
                  height: 30px;
                "
                @click="showModalRemove = false"
              >
                Não
              </button>
            </div>
          </div>
        </div>
        <div class="blockRemover" @click="showModalRemove = true">
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\remover.png"
          />

          <div class="textRemover">
            <span style="font-size: 15px;">Remover</span>
          </div>
        </div>
        <div class="blockEditar" @click="showModalEdit = true">
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\editar.png"
          />

          <div class="textEditar">
            <span style="font-size: 15px;">Editar</span>
          </div>
        </div>
        <div v-if="showModalAlerta" class="modal">
          <div class="modal-content" style="height: 92px;">
            <input
              class="AddAlerta"
              v-model="alertaMinimo"
              placeholder="Temp Min"
            />
            <input
              class="AddAlerta"
              v-model="alertaMaximo"
              placeholder="Temp Máx"
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
                  position: absolute;
                  left: 27px;
                "
                @click="minMaxAlert"
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
                  position: absolute;
                  right: 60px;
                "
                @click="showModalAlerta = false"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
        <div class="blockAlerta" @click="showModalAlerta = true">
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\alerta.png"
          />

          <div class="textAlerta">
            <span style="font-size: 15px;">Definir Alerta</span>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'configPage',
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
      showModalRemove: false,
      showModalEdit: false,
      showModalAlerta: false,
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
      alertaMinimo: '',
      alertaMaximo: '',
      novoDevice: '',
      newNameDevice: '',
      ultimoDevice: '',
      devices: [],
    }
  },

  // watch: {
  //   selectedDevice: function (newId) {
  //     this.getDeviceDatas(newId)
  //   },
  // },

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
    editDevices() {
      this.errorMessage = false
      if (this.newNameDevice.length > 0) {
        axios
          .put(
            `https://climatec.sp.skdrive.net/climatec/api/v1/device/${this.selectedDevice}`,
            {
              deviceName: this.newNameDevice,
            },
          )
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
        this.newNameDevice = ''
        this.showModalEdit = false
      } else {
        this.errorMessage = true
      }
      this.attpage()
    },
    deleteDevices() {
      axios
        .delete(
          `https://climatec.sp.skdrive.net/climatec/api/v1/device/${this.selectedDevice}`,
        )
        .then(() => true)
      this.showModalRemove = false
      this.attpage()
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
      this.attpage()
    },
    changeToggle() {
      this.toggle = !this.toggle
    },
    minMaxAlert(){
      axios.post('https://climatec.sp.skdrive.net/climatec/api/v1/device/newAlert', {
          id: this.selectedDevice,
          alertMin: this.alertaMinimo,
          alertMax: this.alertaMaximo,
        })
        this.attpage()
    },
    attpage() {
      setTimeout(() => {
        location.reload()
      }, 2000)
    },
  },
}
</script>
<style lang="css" src="./config.css"></style>
