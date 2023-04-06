<template>
  <div class="leftMenu">
    <div
      class="roundHome"
      :style="{
        background: $route.path == '/home' ? '#505050' : 'rgb(30, 30, 30)',
      }"
      onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textHome').style.display='block'"
      onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textHome').style.display='none'"
    >
      <a href="/home">
        <img
          alt=""
          src="./../..\assets\icones\home.png"
          :style="{
            filter: $route.path == '/home' ? 'brightness(10)' : 'brightness(0.7)',
          }"
        />
      </a>
      <p id="textHome" style="display: none; position: absolute; left: 95px;">
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
        <img alt="" src="./../..\assets\icones\camera.png" />
      </a>
      <p id="textCamera" style="display: none; position: absolute; left: 95px;">
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
        <img alt="" src="./../..\assets\icones\telefone.png" />
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
        <img alt="" src="./../..\assets\icones\play.png" />
      </a>
      <p id="textVideo" style="display: none; position: absolute; left: 95px;">
        Vídeos
      </p>
    </div>
    <div
      class="roundConfig"
      :style="{
        background: $route.path == '/config' ? '#505050' : 'rgb(30, 30, 30)',
      }"
      onmouseover="this.style.width='90px'; this.style.height='90px'; document.getElementById('textConfig').style.display='block'"
      onmouseout="this.style.width='70px'; this.style.height='70px'; document.getElementById('textConfig').style.display='none'"
    >
      <a href="/config">
        <img
          alt=""
          src="./../..\assets\icones\config.png"
          :style="{
            filter:
              $route.path == '/config' ? 'brightness(10)' : 'brightness(0.7)',
          }"
        />
      </a>
      <p id="textConfig" style="display: none; position: absolute; left: 95px;">
        Configurações
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LeftMenu',
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
      alertaMin: '',
      alertaMax: '',
      novoDevice: '',
      newNameDevice: '',
      ultimoDevice: '',
      devices: [],
    }
  },
}
</script>
<style lang="css" src="./leftMenu.css"></style>
