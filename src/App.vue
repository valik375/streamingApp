<template>
  <div class="app-container"> 
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  },
  components: {
    MainLayout, AuthLayout
  }
};
</script>