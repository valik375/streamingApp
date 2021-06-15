<template>
  <div class="preloader">
      <div class="loader">
          <div class="lds-dual-ring"></div>
          <p v-if="loaderText">{{loaderText}}...</p>
      </div>
  </div>
</template>

<script>
export default {
    props: ['loaderText']
}
</script>

<style>
.preloader {
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, .8);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
}
.loader {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.loader p {
    margin-top: 20px;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #61A2BA;
  border-color: #61A2BA transparent #61A2BA transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>