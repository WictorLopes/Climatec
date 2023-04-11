<template>
  <div>
    <link
      rel="stylesheet"
      href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
    />
    <HeaderPage :city="city" />
    <body>
      <LeftMenu />
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
            <div style="display: flex; flex-direction: column;">
              <input
                class="AddDevice"
                v-model="novoDevice"
                placeholder="Novo dispositivo"
              />
              <input
                style="margin-top: 10px;"
                class="AddDevice"
                v-model="novoCity"
                placeholder="Cidade do dispositivo"
              />
            </div>
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
                @click="verifyCity"
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
              Por favor, preencha todos os campos.
            </span>
            <p style="color: red;" v-if="cityNotFound">
              Cidade não encontrada.
              <br />
              Por favor, verifique a ortografia.
            </p>
          </div>
        </div>
        <div v-if="showModalConfirm" class="modal">
          <div class="modal-content">
            <p>O dispositivo {{ tempNovoDevice }} foi adicionado.</p>

            <button @click="showModalConfirm = false">
              Fechar
            </button>
          </div>
        </div>
        <div class="blockEmergencia">
          <div class="emergenciaSquare">
            <img alt="" src="./../..\assets\icones\emergencia.png" />
            <div class="centered">!</div>
          </div>
          <div>
            <h4 style="position: absolute; top: 4px; left: 90px;">
              Emergência
            </h4>
            <h5
              style="position: absolute; top: 22px; left: 90px; color: #87888c;"
            >
              Ligar apenas em caso de emergência
            </h5>
          </div>
          <label class="switch">
            <input
              v-if="this.selectedDevice"
              id="checkEmergency"
              type="checkbox"
              v-model="toggle"
              @click="sendEmergencyEmail()"
            />

            <span class="slider round"></span>
          </label>
        </div>
        <div v-if="showModalEmergency" class="modal">
          <div class="modal-content">
            <p>Um alerta foi enviado para o email registrado.</p>

            <button @click="showModalEmergency = false">
              Fechar
            </button>
          </div>
        </div>
      </div>
      <div class="blocks">
        <div class="blockStatus" v-if="this.status === 'Ativo'">
          <img
            alt=""
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\ativo.png"
          />

          <div class="textStatus">
            <span style="font-size: 18px;">{{ this.status }}</span>
            <span style="font-size: 10px;">Status do sensor</span>
          </div>
        </div>
        <div class="blockStatus" v-else>
          <img
            alt=""
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\inativo.png"
          />

          <div class="textStatus">
            <span style="font-size: 18px;">{{ this.status }}</span>
            <span style="font-size: 10px;">Status do sensor</span>
          </div>
        </div>
        <div class="blockTemp" v-if="this.response == 0">
          <img
            alt=""
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\temp.png"
          />

          <div class="textTemp">
            <span style="font-size: 10px;">Sem dados</span>
          </div>
        </div>
        <div class="blockTemp" v-else>
          <img
            alt=""
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\temp.png"
          />
          <div class="textTemp">
            <div v-if="this.alertaMax || this.alertaMin">
              <img
                v-if="
                  this.tempAtualNumero > this.alertaMax ||
                  this.tempAtualNumero < this.alertaMin
                "
                @mouseenter="showModalAlertTemp = true"
                @mouseleave="showModalAlertTemp = false"
                alt=""
                src="./../..\assets\icones\alertaTemp.png"
              />
            </div>
            <span style="font-size: 18px;">{{ this.tempAtual }}</span>
            <span style="font-size: 10px;">Temperatura</span>
          </div>
          <div
            style="
              position: absolute;
              width: 251px;
              height: 72px;
              left: 338px;
              background: #1e1e1e;
              border-radius: 12px;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1;
            "
            v-if="showModalAlertTemp"
            @close="showModalAlertTemp = false"
          >
            <img alt="" src="./../..\assets\icones\alertaTempGrande.png" />
            <span
              v-if="this.tempAtualNumero > this.alertaMax"
              style="margin-left: 8px; font-size: 10px;"
            >
              Alerta de temperatura. O dispositivo está acima da temperatura
              máxima que é de {{ this.alertaMax }}ºC.
            </span>
            <span v-else style="margin-left: 8px; font-size: 10px;">
              Alerta de temperatura. O dispositivo está abaixo da temperatura
              mínima que é de {{ this.alertaMin }}ºC.
            </span>
          </div>
        </div>
        <div class="blockSaude" v-if="this.status_health === 'OK'">
          <img
            alt=""
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\saudeOK.png"
          />

          <div class="textSaude">
            <span style="font-size: 18px;">{{ status_health }}</span>
            <span style="font-size: 10px;">Saúde do sensor</span>
          </div>
        </div>
        <div class="blockSaude" v-else>
          <img
            alt=""
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\inoperante.png"
          />

          <div class="textSaude" style="left: 80px;">
            <span style="font-size: 18px;">{{ status_health }}</span>
            <span style="font-size: 10px;">Saúde do sensor</span>
          </div>
        </div>
        <div class="blockUltimoRegistro" v-if="this.response == 0">
          <img
            alt=""
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\historico.png"
          />

          <div class="textTemp">
            <span style="font-size: 10px;">Sem dados</span>
          </div>
        </div>
        <div class="blockUltimoRegistro" v-else>
          <img
            alt=""
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\historico.png"
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
              <img alt="" src="./..\../assets\icones\historicoTemp.png" />
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
import HeaderPage from '../header/header.vue'
import LeftMenu from '../leftMenu/leftMenu.vue'

export default {
  name: 'HomePage',
  components: {
    HeaderPage,
    LeftMenu,
  },
  props: {
    msg: String,
  },

  data: function () {
    return {
      status: '',
      input: '',
      tempAtual: '',
      tempAtualNumero: '',
      tempAnterior: '',
      ultimoRegistro: '',
      historico: {},
      status_health: '',
      idDevice: '',
      idSensor: '',
      showModal: false,
      showModalAlertTemp: false,
      showModalEmergency: false,
      displayMessage: false,
      showModalConfirm: false,
      cityNotFound: false,
      response: '',
      toggle: false,
      alertaMin: '',
      alertaMax: '',
      selectedDevice: '',
      errorMessage: false,
      nomeDevice: '',
      tempNovoDevice: '',
      novoDevice: '',
      novoCity: '',
      devices: [],
    }
  },

  watch: {
    selectedDevice: function (newId) {
      this.getDeviceDatas(newId)
      this.$root.$emit('new-device-selected', newId)
    },
  },

  mounted() {
    axios
      .get('http://localhost:8080/devices')
      .then((res) => {
        this.devices = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    verifyCity() {
      this.cityNotFound = false
      const url = 'https://api.opencagedata.com/geocode/v1/json'
      const params = {
        q: this.novoCity,
        key: '962910487fa142e19394eb0facc173ba',
      }
      axios
        .get(url, { params })
        .then((response) => {
          if (response.data.results.length > 0) {
            // A cidade foi encontrada
            this.cityNameValid = response.data.results[0].components.city
            this.cityNotFound = false
            this.addToListDevices()
          } else {
            // A cidade não foi encontrada
            this.cityNameValid = null
            this.cityNotFound = true
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    sendEmergencyEmail() {
      this.toggle = !this.toggle
      if (this.toggle) {
        axios.post(
          `http://localhost:8080/sendEmail/${this.nomeDevice}`,
        )
        this.showModalEmergency = true
      }
    },
    getDeviceDatas(newID) {
      if (this.toggle) {
        this.toggle = !this.toggle
      }
      axios
        .get(`http://localhost:8080/devices/${newID}`)
        .then((res) => {
          this.status = res.data.data.statusSensor
          this.status_health = res.data.data.statusHealth
          this.alertaMin = res.data.data.alertMin
          this.alertaMax = res.data.data.alertMax
          this.nomeDevice = res.data.data.deviceName
          this.city = res.data.data.city
        })
        .catch((error) => {
          console.log(error)
        })
      axios
        .get(`http://localhost:8080/sensor/${newID}`)
        .then((res) => {
          this.response = res.data.data
          this.tempAtual = res.data.data[0].tempDegrees
          this.tempAtualNumero = res.data.data[0].temperature
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
      this.tempNovoDevice = this.novoDevice
      this.errorMessage = false
      if (this.novoDevice.length > 0 && this.novoCity.length > 0) {
        axios.post('http://localhost:8080/device', {
          deviceName: this.novoDevice,
          city: this.novoCity,
        })
        this.novoCity = ''
        this.novoDevice = ''
        this.showModal = false
        this.showModalConfirm = true
      } else {
        this.errorMessage = true
      }
      this.attpage()
    },
    attpage() {
      setTimeout(() => {
        location.reload()
      }, 4000)
    },
  },
}
</script>
<style lang="css">
@import './home.css';
</style>
