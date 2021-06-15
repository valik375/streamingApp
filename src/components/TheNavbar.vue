<template>
  <nav>
    <router-link to="/" class="logo">Stream platform</router-link>
    <button class="burger" @click="menuToggle" :class="menu ? 'toggle' : ''">
      <div class="line1"></div>
      <div class="line2"></div>
    </button>
    <ul class="navbar" :class="menu ? 'active' : ''">
      <li class="nav-items">
        <router-link @click="menuToggle" to="/" class="logo">Создать комнату</router-link>
      </li>

      <li class="nav-items">
        <router-link @click="menuToggle" to="/my-rooms" class="logo">Мои комнаты</router-link>
      </li>

      <li class="nav-items">
        <router-link @click="menuToggle" to="/docs" class="logo">Документация</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data: () => ({
    menu: false
  }),
  methods: {
    menuToggle() {
      this.menu = !this.menu
    }
  }
};
</script>

<style>
</style>