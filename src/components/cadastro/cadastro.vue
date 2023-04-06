<template>
  <link
    rel="stylesheet"
    href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
  />
  <div class="login-container">
    <h1>Climatec Cadastro</h1>
    <form @submit.prevent="cadastro" class="login-form">
      <label for="username">Email:</label>
      <input
        type="text"
        id="email"
        placeholder="exemplo@exemplo.com"
        v-model="email"
        @input="checkEmailValidity"
      />
      <span class="error-message" v-if="!validEmail">
        Endereço de e-mail inválido
      </span>

      <label for="password">Senha:</label>
      <div class="password-input-container">
        <input
          id="password"
          v-model="password"
          :type="mostrarSenha ? 'text' : 'password'"
        />
        <i
          class="fa fa-eye password-toggle-icon"
          @click="alternarMostrarSenha"
        ></i>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
    <button
      type="submit"
      style="margin-top: 15px;"
      @click="$router.push('/login')"
    >
      Voltar
    </button>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios'
// import CryptoJS from 'crypto-js'

export default {
  name: 'CadastroForm',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      mostrarSenha: false,
      validEmail: true,
    }
  },
  methods: {
    checkEmailValidity() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.validEmail = regex.test(this.email)
      this.errorMessage = ''
    },
    cadastro() {
      if (!this.email || !this.password) {
        this.errorMessage = 'Por favor, preencha todos os campos.'
        return
      }
      // const chaveCriptografia = 'minhaChaveDeCriptografia'
      // const senhaCriptografada = CryptoJS.AES.encrypt(this.password, chaveCriptografia).toString()
      // console.log('no cadastrop', senhaCriptografada)
      const encoder = new TextEncoder();
      const dadosCodificados = encoder.encode(this.password);
      const base64Codificado = btoa(String.fromCharCode(...dadosCodificados));
      console.log('no cadastrop', base64Codificado)

      axios
        .post(
          'https://node9870-climatec.sp.skdrive.net/climatec/api/v1/register',
          {
            email: this.email,
            password: base64Codificado,
          },
        )
        .then(() => {
          console.log('entrou')
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
          this.errorMessage = 'Email já cadastrado no nosso sistema.'
          this.email = ''
          this.password = ''
        })
    },
    alternarMostrarSenha() {
      this.mostrarSenha = !this.mostrarSenha
    },
  },
}
</script>

<style lang="css">
@import './cadastro.css';
</style>
