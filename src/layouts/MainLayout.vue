<template>
  <TheNavbar />
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'

export default {
//   methosd: {
//     async logout() {
//       // await this.$store.dispatch('logout')
//       this.$router.push('/login')
//     },
//   },
  components: {
    TheNavbar
  }
}
</script>