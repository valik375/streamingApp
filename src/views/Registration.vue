<template>
  <div class="auth-container">
    <div class="auth-container__form">
      <div class="login-form">
        <form @submit.prevent="onSubmithForm">

          <div class="input-group">
            <label for="name">Name</label>
            <input type="name" id="name" v-model="name" />
            <small v-if="errors.eName.length != 0">{{ errors.eName }}</small>
          </div>

          <div class="input-group">
            <label for="login">Email</label>
            <input type="email" id="login" v-model="email" />
            <small v-if="errors.eEmail.length != 0">{{ errors.eEmail }}</small>
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" />
            <small v-if="errors.ePassword.length != 0">{{ errors.ePassword }}</small>
          </div>

          <div class="input-group">
            <label for="repeatPassword">Repeat password </label>
            <input type="password" id="repeatPassword" v-model="repeatPassword" />
            <small v-if="errors.eRepeatPassword.length != 0">{{ errors.eRepeatPassword }}</small>
          </div>

          <button class="btn auth" type="submit">Registration</button>
        </form>

        <router-link class="auth-btn" to="/login"
          >Login</router-link
        >
      </div>
    </div>
    <div class="auth-container__image">
      <img src="../assets/login-image.svg" alt="Login image" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    name: '',
    repeatPassword: '',
    errors: {
      eEmail:'',
      ePassword: '',
      eName: '',
      eRepeatPassword: ''
    },
  }),
  methods: {
    async onSubmithForm() {

      this.name.length <= 0 ? this.errors.eName = 'Enter Name' : this.errors.eName = ''
      this.email.length <= 0 ? this.errors.eEmail = 'Enter Email' : this.errors.eEmail = ''
      this.password.length <= 0 ? this.errors.ePassword = 'Enter Password' : this.errors.ePassword = ''
      this.repeatPassword.length <= 0 ? this.errors.eRepeatPassword = 'Enter Correct Password' : this.errors.eRepeatPassword = ''
      this.password !== this.repeatPassword ? this.errors.eRepeatPassword = 'Enter Correct Password' : this.errors.eRepeatPassword = ''

      try{ 
        if(this.email && this.password === this.repeatPassword && this.name) {
          const userData = {
            email: this.email,
            password: this.password,
            name: this.name
          }
          this.$store.dispatch('register', userData)
          this.$router.push('/')
        }
      }catch(e) {}

    }
  },
};
</script>

<style>
</style>