<template>
  <link
    rel="stylesheet"
    href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
  />
  <header class="header">
    <div style="display: flex; align-items: center;">
      <img src="../assets/logo.png" style="margin-right: 30px;" />
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
        src="..\assets\icones\sol.png"
      />
      <img
        v-else-if="
          this.tempLocalCode >= 200 &&
          this.tempLocalCode <= 751 &&
          this.hourNow >= 0 &&
          this.hourNow <= 23
        "
        style="margin-right: 25px; width: 25%;"
        src="..\assets\icones\chuva.png"
      />
      <img
        v-else-if="
          this.tempLocalCode >= 800 ||
          (this.tempLocalCode <= 803 && this.hourNow >= 18 && this.hourNow <= 5)
        "
        style="margin-right: 25px;"
        src="..\assets\icones\noite.png"
      />
      <img
        v-else
        style="margin-right: 25px; width: 25%;"
        src="..\assets\icones\nublado.png"
      />

      <div style="display: flex; flex-direction: column;">
        <span style="font-size: 30px;">{{ Math.floor(this.tempLocal) }}°C</span>
        <span style="font-size: 16px;">{{ this.tempLocalDescription }}</span>
      </div>
    </div>
  </header>
  <body>
    <div class="blocks">
      <div class="blockStatus" v-if="this.status === 'Ativo'">
        <img
          style="top: 155px; position: absolute; left: 230px;"
          src="..\assets\icones\ativo.png"
        />

        <div class="textStatus">
          <span style="font-size: 18px;">{{ this.status }}</span>
          <span style="font-size: 10px;">Status do sensor</span>
        </div>
      </div>
      <div class="blockStatus" v-else>
        <img
          style="top: 155px; position: absolute; left: 230px;"
          src="..\assets\icones\inativo.png"
        />

        <div class="textStatus">
          <span style="font-size: 18px;">{{ this.status }}</span>
          <span style="font-size: 10px;">Status do sensor</span>
        </div>
      </div>
      <div class="blockTemp">
        <img
          style="top: 350px; position: absolute; left: 230px;"
          src="..\assets\icones\temp.png"
        />

        <div class="textTemp">
          <span style="font-size: 18px;">{{ this.tempAtual }}</span>
          <span style="font-size: 10px;">Temperatura</span>
        </div>
      </div>
      <div class="blockSaude" v-if="this.status_health === 'Ok'">
        <img
          style="position: absolute; top: 8px; left: 14px;"
          src="..\assets\icones\saudeOK.png"
        />

        <div class="textSaude">
          <span style="font-size: 18px;">{{ status_health }}</span>
          <span style="font-size: 10px;">Saúde do sensor</span>
        </div>
      </div>
      <div class="blockSaude" v-else>
        <img
          style="position: absolute; top: 8px; left: 14px;"
          src="..\assets\icones\inoperante.png"
        />

        <div class="textSaude" style="left: 80px;">
          <span style="font-size: 18px;">{{ status_health }}</span>
          <span style="font-size: 10px;">Saúde do sensor</span>
        </div>
      </div>
      <div class="blockUltimoRegistro">
        <img
          style="position: absolute; top: 8px; left: 14px;"
          src="..\assets\icones\historico.png"
        />

        <div class="textUltimoRegistro">
          <span style="font-size: 18px;">{{ ultimoRegistro }}</span>
          <span style="font-size: 10px;">Último Registro</span>
        </div>
      </div>
      <div class="blockHistorico">
        <span style="font-size: 18px;">Histórico de Temperaturas</span>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
          "
        >
          <li
            style="font-size: 12px;"
            v-for="item in this.historico"
            :key="item.id"
          >
            {{ item.temp_degrees }}
            <img
              style="margin-top: 10px;"
              src="..\assets\icones\historicoTemp.png"
            />
          </li>
        </div>
      </div>
    </div>
  </body>
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
      tempAtual: '',
      tempAnterior: '',
      ultimoRegistro: '',
      historico: {},
      status_health: '',
      tempLocal: '',
      tempLocalDescription: '',
      tempLocalCode: '',
      hourNow: '',
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
.blocks {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
}
.blockStatus {
  margin-left: 200px;
  width: 175px;
  height: 168px;
  border-radius: 20px;
  background-color: #2e3a59;
}
.textStatus {
  left: 300px;
  position: absolute;
  top: 275px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.blockTemp {
  margin-left: 200px;
  margin-top: 25px;
  width: 175px;
  height: 168px;
  border-radius: 20px;
  background-color: #2e3a59;
}
.textTemp {
  left: 310px;
  position: absolute;
  top: 470px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.blockSaude {
  position: absolute;
  top: 147px;
  margin-left: 440px;
  width: 175px;
  height: 168px;
  border-radius: 20px;
  background-color: #2e3a59;
}
.textSaude {
  left: 92px;
  position: absolute;
  top: 125px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.blockUltimoRegistro {
  position: absolute;
  top: 340px;
  margin-left: 440px;
  width: 175px;
  height: 168px;
  border-radius: 20px;
  background-color: #2e3a59;
}
.textUltimoRegistro {
  left: 80px;
  position: absolute;
  top: 130px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.blockHistorico {
  position: absolute;
  top: 147px;
  margin-left: 670px;
  width: 374px;
  height: 109px;
  border-radius: 20px;
  background-color: #2e3a59;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
}
</style>
