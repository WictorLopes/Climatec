<template>
  <div>
    <link
      rel="stylesheet"
      href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
    />
    <HeaderPage />
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
          <div
            style="display: flex; flex-direction: column;"
            class="modal-content"
          >
            <input
              class="AddDevice"
              v-model="newNameDevice"
              placeholder="Editar dispositivo"
            />
            <input
              style="margin-top: 10px;"
              class="AddDevice"
              v-model="novoCity"
              :placeholder="city.charAt(0).toUpperCase() + city.slice(1)"
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
            alt=""
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./../..\assets\icones\remover.png"
          />

          <div class="textRemover">
            <span style="font-size: 15px;">Remover</span>
          </div>
        </div>
        <div class="blockEditar" @click="showModalEdit = true">
          <img
            alt=""
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
              v-if="alertaMin"
              class="AddAlerta"
              type="text"
              v-model="alertaMinimo"
              :placeholder="alertaMin + 'ºC'"
            />
            <input
              v-else
              class="AddAlerta"
              v-model="alertaMinimo"
              placeholder="Temp Min"
            />
            <input
              v-if="alertaMax"
              class="AddAlerta"
              v-model="alertaMaximo"
              :placeholder="alertaMax + 'ºC'"
            />
            <input
              v-else
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
            alt=""
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
import HeaderPage from '../header/header.vue'
import LeftMenu from '../leftMenu/leftMenu.vue'

export default {
  name: 'configPage',
  components: {
    HeaderPage,
    LeftMenu,
  },
  props: {
    msg: String,
  },
  data: function () {
    return {
      input: '',
      nameDevice: '',
      showModal: false,
      showModalRemove: false,
      showModalEdit: false,
      showModalAlerta: false,
      showModalConfirm: false,
      cityNotFound: false,
      response: '',
      toggle: false,
      selectedDevice: '',
      errorMessage: false,
      alertaMinimo: '',
      alertaMaximo: '',
      alertaMin: '',
      alertaMax: '',
      novoDevice: '',
      tempNovoDevice: '',
      newNameDevice: '',
      novoCity: '',
      city: '',
      devices: [],
    }
  },

  watch: {
    selectedDevice: function (newId) {
      this.getDeviceDatas(newId)
    },
  },
  mounted() {
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
    getDeviceDatas(newID) {
      axios
        .get(`https://climatec.sp.skdrive.net/climatec/api/v1/devices/${newID}`)
        .then((res) => {
          this.alertaMin = res.data.data.alertMin
          this.alertaMax = res.data.data.alertMax
          this.city = res.data.data.city
        })
        .catch((error) => {
          console.log(error)
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
              city: this.novoCity,
            },
          )
          .then((response) => {
            return response
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
    verifyCity() {
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
    addToListDevices() {
      this.tempNovoDevice = this.novoDevice
      this.errorMessage = false
      if (this.novoDevice.length > 0 && this.novoCity.length > 0) {
        axios.post('https://climatec.sp.skdrive.net/climatec/api/v1/device', {
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
    changeToggle() {
      this.toggle = !this.toggle
    },
    minMaxAlert() {
      axios.post(
        'https://climatec.sp.skdrive.net/climatec/api/v1/device/newAlert',
        {
          id: this.selectedDevice,
          alertMin: this.alertaMinimo,
          alertMax: this.alertaMaximo,
        },
      )
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
@import './config.css';
</style>
