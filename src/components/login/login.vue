<template>
  <link
    rel="stylesheet"
    href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
  />
  <div class="login-container">
    <h1>Climatec Login</h1>
    <form @submit.prevent="login" class="login-form">
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
      <button type="submit">Entrar</button>
    </form>
    <button
      type="submit"
      style="margin-top: 15px;"
      @click="this.$router.push('cadastro/')"
    >
      Cadastrar
    </button>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginForm',
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
    },

    login() {
      if (!this.email || !this.password) {
        this.errorMessage = 'Por favor, preencha todos os campos.'
        return
      }
      const encoder = new TextEncoder()
      const dadosCodificados = encoder.encode(this.password)
      const base64Codificado = btoa(String.fromCharCode(...dadosCodificados))
      axios
        .post(
          'https://node9870-climatec.sp.skdrive.net/climatec/api/v1/login',
          {
            email: this.email,
            password: base64Codificado,
          },
        )
        .then(() => {
          this.$router.push('/home')
        })
        .catch((error) => {
          console.log(error)
          this.errorMessage = 'Email ou senha inválidos.'
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
@import './login.css';
</style>
