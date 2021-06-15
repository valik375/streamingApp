<template>
  <Loader v-if="loading"/>
  <div class="wrapper" v-else>
    <div class="products-container">
      <div class="product-item" v-for="(item, idx) in productsInfo" :key="item.id" >
        <div class="product-item__image" v-if="productsImage && productsImage[idx]" >
          <img :src="productsImage[idx].url" :alt="productsImage[idx].name" />
        </div>

        <div class="product-item__info">
          <a class="product-item__title" :href="item.titleLink">{{ item.title }}</a>
          <a :href="item.buttonLink" class="btn white">More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'
export default {
  data: () => ({
    loading: true
  }),
  async mounted() {
    await this.$store.dispatch("getStreamParams", {
      id: this.$route.params.id,
      uId: this.$route.params.user,
    });
    this.loading = false
  },
  computed: {
    productsInfo() {
      return this.$store.getters.info.advertisement;
    },
    productsImage() {
      return this.$store.getters.info.advImages;
    },
  },
  components: {
    Loader
  }
};
</script>

<style>
</style>