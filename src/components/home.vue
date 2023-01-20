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
    <div>
      <h1>25º</h1>
    </div>
  </header>
  <body>
    <div class="blocks">
      <div class="blockStatus" v-if="this.status === 'Ativo'">
        <svg
          style="top: 155px; position: absolute; left: 230px;"
          width="30"
          height="36"
          viewBox="0 0 30 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.103 1.03081C16.103 1.03081 16.1039 1.0316 16.1066 1.0343L16.1049 1.03257L16.1249 1.05053C16.1528 1.07516 16.208 1.12234 16.2937 1.18897C16.4649 1.32217 16.7586 1.53368 17.2 1.79853C18.0826 2.32807 19.5595 3.07304 21.834 3.83123C24.1609 4.60684 25.6797 4.98372 26.5918 5.16614C27.0472 5.25722 27.348 5.29916 27.5199 5.31826C27.6057 5.32779 27.6588 5.33157 27.6823 5.33295L27.693 5.33353C28.5553 5.3476 29.25 6.051 29.25 6.91665V18C29.25 23.4568 25.6372 27.8171 22.376 30.6707C20.7121 32.1266 19.0556 33.2646 17.8183 34.038C17.198 34.4256 16.6788 34.7243 16.3111 34.9279C15.9979 35.1012 15.6994 35.2168 15.3757 35.3137C15.1306 35.3871 14.8688 35.3897 14.6235 35.3168C14.2995 35.2205 14.0018 35.1011 13.6889 34.9279C13.3212 34.7243 12.802 34.4256 12.1817 34.038C10.9444 33.2646 9.28793 32.1266 7.62403 30.6707C4.36277 27.8171 0.75 23.4568 0.75 18V6.91665C0.75 6.051 1.44468 5.3476 2.30697 5.33353L2.31767 5.33295C2.34123 5.33157 2.39429 5.32779 2.4801 5.31826C2.652 5.29916 2.95284 5.25722 3.40823 5.16614C4.32033 4.98372 5.83914 4.60684 8.16597 3.83123C10.4405 3.07304 11.9174 2.32807 12.8 1.79853C13.2414 1.53368 13.5351 1.32217 13.7063 1.18897C13.792 1.12234 13.8472 1.07516 13.8751 1.05053L13.8951 1.03257C14.5096 0.433559 15.4904 0.43356 16.1049 1.03257L16.103 1.03081Z"
            fill="#FFA666"
          />
        </svg>

        <div class="textStatus">
          <span style="font-size: 18px;">{{ this.status }}</span>
          <span style="font-size: 10px;">Status do sensor</span>
        </div>
      </div>
      <div class="blockStatus" v-else>
        <svg
          style="top: 155px; position: absolute; left: 230px;"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.9764 2.14309C37.5947 2.76142 37.5947 3.76393 36.9764 4.38226L4.3822 36.9764C3.76387 37.5947 2.76135 37.5947 2.14302 36.9764L1.02344 35.8568C0.405109 35.2385 0.405111 34.236 1.02344 33.6177L7.50339 27.1377C5.91827 24.8406 4.74996 22.0991 4.74996 19V7.91669C4.74996 7.05104 5.44464 6.34764 6.30693 6.33357L6.31763 6.33299C6.34119 6.33161 6.39425 6.32783 6.48006 6.3183C6.65196 6.2992 6.9528 6.25726 7.40819 6.16618C8.32029 5.98377 9.83909 5.60688 12.1659 4.83127C14.4405 4.07308 15.9174 3.32811 16.7999 2.79857C17.2414 2.53372 17.535 2.32222 17.7063 2.18901C17.7919 2.12238 17.8472 2.0752 17.8751 2.05057L17.895 2.03261C18.5095 1.4336 19.4904 1.4336 20.1049 2.03261L20.1248 2.05057C20.1528 2.0752 20.208 2.12238 20.2936 2.18901C20.4649 2.32222 20.7586 2.53372 21.2 2.79857C22.0826 3.32811 23.5594 4.07308 25.834 4.83127C27.067 5.24228 28.0731 5.54132 28.8823 5.75879L33.6176 1.0235C34.2359 0.405171 35.2384 0.405171 35.8568 1.0235L36.9764 2.14309Z"
            fill="#FFA666"
          />
          <path
            d="M32.2726 14.5627C32.8642 14.8078 33.25 15.3851 33.25 16.0255V19.0001C33.25 24.457 29.6372 28.8173 26.376 31.6709C24.7121 33.1268 23.0556 34.2648 21.8183 35.0381C21.198 35.4258 20.6788 35.7244 20.3111 35.928C20.1271 36.0299 19.9808 36.1081 19.8782 36.1619C19.4545 36.3843 19 36.4167 19 36.4167C19 36.4167 18.6227 36.4321 17.9568 36.0742C17.7526 35.9645 17.4617 35.8039 17.1033 35.595C16.3874 35.1775 15.3976 34.5641 14.2886 33.7728C13.9096 33.5024 13.6689 33.0789 13.6303 32.615C13.5918 32.151 13.7594 31.6936 14.0887 31.3644L30.5471 14.9059C30.9999 14.4531 31.6809 14.3176 32.2726 14.5627Z"
            fill="#FFA666"
          />
        </svg>

        <div class="textStatus">
          <span style="font-size: 18px;">{{ this.status }}</span>
          <span style="font-size: 10px;">Status do sensor</span>
        </div>
      </div>
      <div class="blockTemp">
        <svg
          style="top: 350px; position: absolute; left: 230px;"
          width="30"
          height="38"
          viewBox="0 0 30 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.25 23.0969C29.25 17.6344 20.7 6.23438 16.9 1.48438C15.7125 0.296875 14.525 0.296875 13.3375 1.48438C12.3875 2.43438 0.75 15.9719 0.75 23.0969C1.4625 41.6219 28.3 42.3344 29.25 23.0969ZM15 6.70937C19.9875 13.1219 22.8375 17.8719 24.025 20.9594C12.8625 20.2469 15.475 26.4219 5.5 23.0969C5.5 20.7219 8.35 14.7844 15 6.70937Z"
            fill="#0075FF"
          />
        </svg>

        <div class="textTemp">
          <span style="font-size: 18px;">{{ this.tempAtual }}</span>
          <span style="font-size: 10px;">Temperatura</span>
        </div>
      </div>
      <div class="blockSaude" v-if="this.status_health === 'Ok'">
        <svg
          style="position: absolute; top: 8px; left: 14px;"
          width="38"
          height="39"
          viewBox="0 0 38 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 27.2069L8.71429 16.7241M19 39V18.0345V39ZM19 19.3448V27.2069V19.3448ZM19 19.3448C19 16.5646 17.9163 13.8983 15.9874 11.9324C14.0584 9.9665 11.4422 8.86207 8.71429 8.86207H1V16.7241C1 19.5043 2.08367 22.1707 4.01262 24.1366C5.94156 26.1025 8.55777 27.2069 11.2857 27.2069H19V19.3448ZM19 19.3448H26.7143C29.4422 19.3448 32.0584 18.2404 33.9874 16.2745C35.9163 14.3086 37 11.6423 37 8.86207V1H29.2857C26.5578 1 23.9416 2.10443 22.0126 4.07033C20.0837 6.03623 19 8.70256 19 11.4828V19.3448ZM19 19.3448L29.2857 8.86207L19 19.3448Z"
            stroke="#76D200"
          />
        </svg>

        <div class="textSaude">
          <span style="font-size: 18px;">{{ status_health }}</span>
          <span style="font-size: 10px;">Saúde do sensor</span>
        </div>
      </div>
      <div class="blockSaude" v-else>
        <svg
          style="position: absolute; top: 8px; left: 14px;"
          width="38"
          height="39"
          viewBox="0 0 38 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 27.2069L8.71429 16.7241M19 39V18.0345V39ZM19 19.3448V27.2069V19.3448ZM19 19.3448C19 16.5646 17.9163 13.8983 15.9874 11.9324C14.0584 9.9665 11.4422 8.86207 8.71429 8.86207H1V16.7241C1 19.5043 2.08367 22.1707 4.01262 24.1366C5.94156 26.1025 8.55777 27.2069 11.2857 27.2069H19V19.3448ZM19 19.3448H26.7143C29.4422 19.3448 32.0584 18.2404 33.9874 16.2745C35.9163 14.3086 37 11.6423 37 8.86207V1H29.2857C26.5578 1 23.9416 2.10443 22.0126 4.07033C20.0837 6.03623 19 8.70256 19 11.4828V19.3448ZM19 19.3448L29.2857 8.86207L19 19.3448Z"
            stroke="#FF0000"
          />
        </svg>

        <div class="textSaude" style="left:80px">
          <span style="font-size: 18px;">{{ status_health }}</span>
          <span style="font-size: 10px;">Saúde do sensor</span>
        </div>
      </div>
      <div class="blockUltimoRegistro">
        <svg
          style="position: absolute; top: 8px; left: 14px;"
          width="32"
          height="36"
          viewBox="0 0 32 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.9167 2.16671C23.9167 1.29226 23.2078 0.583374 22.3333 0.583374C21.4589 0.583374 20.75 1.29226 20.75 2.16671V3.75004H11.25V2.16671C11.25 1.29226 10.5411 0.583374 9.66667 0.583374C8.79222 0.583374 8.08333 1.29226 8.08333 2.16671V3.75004H4.91667C2.29331 3.75004 0.166667 5.87669 0.166667 8.50004V30.6667C0.166667 33.2901 2.29331 35.4167 4.91667 35.4167H27.0833C29.7067 35.4167 31.8333 33.2901 31.8333 30.6667V8.50004C31.8333 5.87669 29.7067 3.75004 27.0833 3.75004H23.9167V2.16671ZM28.6667 13.25V8.50004C28.6667 7.62559 27.9578 6.91671 27.0833 6.91671H23.9167V8.50004C23.9167 9.37449 23.2078 10.0834 22.3333 10.0834C21.4589 10.0834 20.75 9.37449 20.75 8.50004V6.91671H11.25V8.50004C11.25 9.37449 10.5411 10.0834 9.66667 10.0834C8.79222 10.0834 8.08333 9.37449 8.08333 8.50004V6.91671H4.91667C4.04222 6.91671 3.33333 7.62559 3.33333 8.50004V13.25H28.6667ZM3.33333 16.4167H28.6667V30.6667C28.6667 31.5412 27.9578 32.25 27.0833 32.25H4.91667C4.04222 32.25 3.33333 31.5412 3.33333 30.6667V16.4167Z"
            fill="#FFD771"
          />
        </svg>

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
            <svg
              style="margin-top: 10px;"
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 23.8C6.50625 23.8 4.383 22.8698 2.63025 21.0093C0.87675 19.1481 0 16.8999 0 14.2645C0 12.9368 0.229875 11.7044 0.689625 10.5674C1.14862 9.43123 1.8 8.43061 2.64375 7.56559L9 0.866638L15.3562 7.56559C16.2 8.43061 16.8518 9.43123 17.3115 10.5674C17.7705 11.7044 18 12.9368 18 14.2645C18 16.8999 17.1236 19.1481 15.3709 21.0093C13.6174 22.8698 11.4937 23.8 9 23.8ZM2.27813 13.5403H15.7219C15.6469 12.7155 15.4455 11.9511 15.1178 11.247C14.7892 10.5429 14.3438 9.89915 13.7812 9.31576L9 4.24629L4.21875 9.31576C3.65625 9.89915 3.21075 10.5429 2.88225 11.247C2.5545 11.9511 2.35313 12.7155 2.27813 13.5403Z"
                fill="white"
              />
            </svg>
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
    }
  },

  mounted() {
    axios
      .get('https://projetosdnode.000webhostapp.com/webapi/api/read.php')
      .then((res) => {
        console.log(res.data)
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
