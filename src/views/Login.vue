<template>
  <Loader v-if="loading" />
  <Errors 
    v-if="loginErrors.message" 
    :class="loginErrors && loginErrors.message.length >= 0 ? 'show' : ''"
    :errorName="'Неверное мия пользователя или пароль'"
    :errorMessage="'Пожалуйста убедитесь в корректности ваших данных'"
    />
  <div class="auth-container">
    <div class="auth-container__form">
      <div class="login-form">
        <form @submit.prevent="onSubmithForm">

          <div class="input-group">
            <label for="login">Email</label>
            <input type="email" id="login" v-model="email">
            <small v-if="errors.eEmail.length != 0">{{errors.eEmail}}</small>
          </div>

          <div class="input-group">
            <label for="password">Пароль</label>
            <input type="password" id="password" v-model="password">
            <small v-if="errors.ePassword.length != 0">{{errors.ePassword}}</small>
          </div>

          <button class="btn auth" type="submit">Войти</button>

        </form>

        <router-link class="auth-btn" to="/registration">Регистрация</router-link>
      </div>
    </div>
    <div class="auth-container__image">
      <img src="../assets/login-image.svg" alt="Login image">
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'
import Errors from '../components/Errors.vue'
export default {
  data: () => ({
    loading: false,
    email: '',
    password: '',
    errors: {
      eEmail: '',
      ePassword: ''
    },
  }),
  methods: {
    async onSubmithForm() {
      this.loading = true
      this.email.length <= 0 ? this.errors.eEmail = 'Enter Email' : this.errors.eEmail = ''
      this.password.length <= 0 ? this.errors.ePassword = 'Enter Password' : this.errors.ePassword = ''
      try{ 
        if(this.email && this.password) {
          const userData = {
            email: this.email,
            password: this.password
          }
          this.$store.dispatch('login', userData)
          this.loading = false
          this.$router.push('/')       
        }
      }catch(e) {

      }
    }
  },
  computed: {
    loginErrors() {
      return this.$store.getters.error
    }
  },
  components: {
    Loader, Errors
  }
};
</script>

<style>
</style>