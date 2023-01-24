<template>
  <div>
    <link
      rel="stylesheet"
      href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
    />
    <header class="header">
      <div style="display: flex; align-items: center;">
        <img src="./../assets/logo.png" style="margin-right: 30px;" />
        <h1>Climatec</h1>
      </div>
      <div>
        <input
          class="searchbar"
          type="text"
          v-model="input"
          placeholder="Pesquisar"
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
          <span style="font-size: 30px;">
            {{ Math.floor(this.tempLocal) }}°C
          </span>
          <span style="font-size: 16px;">{{ this.tempLocalDescription }}</span>
        </div>
      </div>
    </header>
    <body>
      <div>
        <select
          v-model="deviceSelected"
          v-bind:value="deviceSelected"
          class="selectDevice"
        >
          <option
            v-for="option in devices"
            :key="option.value"
            :value="option.value"
          >
            {{ option.device }}
          </option>
        </select>
        <button
          data-toggle="modal"
          data-target="#myModal"
          style="
            font-size: 37px;
            position: absolute;
            width: 64.2px;
            height: 61.58px;
            left: 639.8px;
            top: 157.71px;

            background: #1e1e1e;
            border-radius: 10px;
            color: #ffffff;
            border: none;
          "
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
            <button @click="addToListDevices">Salvar</button>
            <button @click="showModal = false">Fechar</button>
          </div>
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
        <div class="blockTemp">
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./..\assets\icones\temp.png"
          />

          <div class="textTemp">
            <span style="font-size: 18px;">{{ this.tempAtual }}</span>
            <span style="font-size: 10px;">Temperatura</span>
          </div>
        </div>
        <div class="blockSaude" v-if="this.status_health === 'Ok'">
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
        <div class="blockUltimoRegistro">
          <img
            style="margin-bottom: 110px; margin-left: 10px;"
            src="./..\assets\icones\historico.png"
          />

          <div class="textUltimoRegistro">
            <span style="font-size: 18px;">{{ ultimoRegistro }}</span>
            <span style="font-size: 10px;">Último Registro</span>
          </div>
        </div>
        <div class="blockHistorico">
          <span style="font-size: 18px;">Histórico de Temperaturas</span>
          <div style="display: flex;">
            <li
              style="font-size: 12px;"
              v-for="item in this.historico"
              :key="item.id"
            >
              {{ item.temp_degrees }}
              <img src="./..\assets\icones\historicoTemp.png" />
            </li>
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
      hourNow: '',
      deviceOptions: '',
      showModal: false,
      novoDevice: '',
      devices: [
        { id: 1, device: 'Frigobar' },
        { id: 2, device: 'Freezer' },
        { id: 3, device: 'Congelador' },
      ],
    }
  },

  mounted() {
    axios
      .get('https://projetosdnode.000webhostapp.com/webapi/api/read.php')
      .then((res) => {
        this.status = res.data.status_sensor
        this.tempAtual = res.data.data_log[0].temp_degrees
        this.tempAnterior = res.data.data_log[1].temp_degrees
        this.response = res.data.data_log[0].created_at
        this.ultimoRegistro = moment(this.response).format('DD/MM/YYYY')
        this.historico = res.data.data_log.slice(1, 7)
        this.status_health = res.data.status_health
      })
      .catch((error) => {
        console.log(error)
      })
    axios
      .get(
        'https://api.weatherbit.io/v2.0/current?city=recife&country=br&lang=pt&key=3bd70eb0e2024093af278062f08a5eca',
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
            'https://api.openweathermap.org/data/2.5/weather?lat=-8.0403&lon=-34.5500&lang=pt&units=metric&appid=cc2847e85b696ef29e3580bf28aed600',
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
  methods: {
    addToListDevices() {
      this.devices.push({
        id: this.devices.length + 1,
        device: this.novoDevice,
      })
      this.novoDevice = ''
    },
  },
}
</script>

<style>
li {
  list-style-type: none;
}
.header {
  display: flex;
  margin: 0px 80px 0px 80px;
  align-items: center;
  justify-content: space-between;
}
.searchbar {
  width: 300px;
  height: 33px;
  background: #1e1e1e;
  border-radius: 40px;
  background-image: url('../assets/lupa.png');
  background-repeat: no-repeat;
  background-position: left 2px center;
  background-size: 25px;
}
input::-webkit-input-placeholder {
  position: relative;
  left: 40px;
}
.AddDevice {
  width: 300px;
  height: 33px;
  background: #1e1e1e;
  border-radius: 40px;
  background-repeat: no-repeat;
  background-position: left 2px center;
  background-size: 25px;
  color: #ffffff;
  border: none;
  padding-left: 15px;
}
.blocks {
  margin-top: 135px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
}
.blockStatus {
  display: flex;
  align-items: center;
  margin-left: 200px;
  width: 175px;
  height: 168px;
  border-radius: 20px;
  background-color: #2e3a59;
}
.textStatus {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 110px;
  margin-left: 40px;
}
.blockTemp {
  display: flex;
  align-items: center;
  margin-left: 200px;
  margin-top: 25px;
  width: 175px;
  height: 168px;
  border-radius: 20px;
  background-color: #2e3a59;
}
.textTemp {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 110px;
  margin-left: 60px;
}
.blockSaude {
  display: flex;
  align-items: center;
  position: absolute;
  top: 275px;
  margin-left: 410px;
  width: 175px;
  height: 168px;
  border-radius: 20px;
  background-color: #2e3a59;
}
.textSaude {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 110px;
  margin-left: 40px;
}
.blockUltimoRegistro {
  display: flex;
  align-items: center;
  position: absolute;
  top: 468px;
  margin-left: 410px;
  width: 175px;
  height: 168px;
  border-radius: 20px;
  background-color: #2e3a59;
}
.textUltimoRegistro {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 110px;
  margin-left: 35px;
}
.blockHistorico {
  position: absolute;
  top: 275px;
  margin-left: 627px;
  width: 374px;
  height: 109px;
  border-radius: 20px;
  background-color: #2e3a59;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
}
.selectDevice {
  color: #ffffff;
  position: absolute;
  width: 415.32px;
  height: 61.58px;
  left: 214px;
  top: 157.71px;
  background: #1e1e1e;
  border-radius: 10px;
  border: none;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.modal-content {
  background-color: #2e3a59;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
}
</style>
