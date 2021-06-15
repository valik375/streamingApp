<template>

<Loader v-if="loading" />

<div class="wrapper mob">
  <div v-if="params && params.showMessage" class="message-container">
  <div class="message-info">
    <h1>{{params.messageTitle}}</h1>
    <p>{{params.messageDescription}}</p>
  </div>
</div>

<div class="stream-wrapper" :class="params.showMessage ? 'hidden' : ''" v-if="params">
  <div class="stream-header">
    <h1>{{params.sName}}</h1>
    <div class="main-sponcores__image">
      <img 
        v-for="main in sMainSponcores" 
        :key="main.url"
        :src="main.url" 
        :alt="main.name"
      >
    </div>
  </div>
  
  <div 
    class="stream-container"
    :class="params.spickers && params.spickers.length || params.sKeySpicker ? '' : 'hidden'"
  >
    <div class="camera-container" 
      v-if="params.spickers && params.spickers.length || params.sKeySpicker" 
      :class="params.sKeySpicker ? '' : ' hidden'"
    >
      <div class="camera" v-if="params.sKeySpicker" :class="params.sKeySpicker ? '' : ' hidden'">
        <iframe
          type="text/html"
          class="webcam"
          :src="`https://www.youtube.com/embed/${language}?autoplay=1&amp;rel=0;fs=1`"
          allow="autoplay"
          allowfullscreen=""
          frameborder="0"
        ></iframe>
      </div>    

      <div 
        v-if="params.spickers"
        class="stream-spickers" 
        :class="params.spickers && params.spickers.length < 0 ? '' : 'scroll'"
      >
        <Spicker 
          v-for="(spicker, idx) in params.spickers" 
          :key="spicker.id" 
          :name="spicker.name"  
          :position="spicker.position"  
          :title="spicker.title"  
          :link="spicker.link"  
          :time="spicker.time"
          :image="spickersImages[idx]"
        />

      </div>

    </div>

    <div class="screen-container">

      <div class="mobile-camera" v-if="params.sKeySpicker">
        <iframe
          type="text/html"
          class="webcam"
          :src="`https://www.youtube.com/embed/${language}?autoplay=1&amp;rel=0;fs=1`"
          allow="autoplay"
          allowfullscreen=""
          frameborder="0"
        ></iframe>
      </div>

      <div class="screen">
        <div :class="!params.sKeySpicker && !params.sKeyLanguage && !params.spickers ? 'show-chat' : ''">
          <iframe type="text/html" class="strean" allow="autoplay" :src="`https://www.youtube.com/embed/${params.sKey}?autoplay=1&amp;rel=0;`" allowfullscreen="" frameborder="0"></iframe>
          <div v-if="params && !params.sKeySpicker && !params.sKeyLanguage && !params.spickers && params.sChat">
            <iframe :src="`https://m.youtube.com/live_chat?v=${params.sKey}&amp;is_popout=1&amp;embed_domain=localhost:8080&amp;app=desktop`" frameborder="0"></iframe>
          </div>
        </div>
      </div>

      <div class="change-language" v-if="params.sKeyLanguage">
        <button class="btn ligth-blue" @click="changeLanguage(params.sKeySpicker)">Ru</button>
        <button class="btn ligth-blue" @click="changeLanguage(params.sKeyLanguage)">En</button>
      </div>
      
      <div class="stream-btn__container" v-if="params.advImages || params.usersLink">
        
        <router-link  
          v-if="params.advImages" 
          class="btn ligth-blue" 
          :to="'/stream/'+$route.params.user+'/'+$route.params.id+'/products'"
        >Виртуальная выставка</router-link>

        <router-link 
          v-if="params.usersLink || params.spickers" 
          :to="'/stream/'+$route.params.user+'/'+$route.params.id+'/users'" 
          class="btn ligth-blue"
        >Список учасников</router-link>

      </div>
      <div class="chat" :class="!params.sKeySpicker && !params.sKeyLanguage && !params.spickers ? 'hidden' : ''" v-if="params.sChat">
        <iframe :src="`https://m.youtube.com/live_chat?v=${params.sKey}&amp;is_popout=1&amp;embed_domain=localhost:8080&amp;app=desktop`" frameborder="0"></iframe>
      </div>
    </div>

  </div>

  <div class="footer" v-if="sAllSponcores.length">

    <div class="footer-images">
      <img :src="image.url" :alt="image.name" v-for="image in sAllSponcores" :key="image.url">
    </div>

  </div>
</div>
</div>

</template>


<script>
import Spicker from '../components/Spicker'
import Loader from '../components/Loader'

export default {
  data: () => ({
    loading: true,
    language: '',
    sMainSponcores: [],
    sAllSponcores: [],
    spickersImages: [],
  }),
  async mounted() {
    await this.$store.dispatch('getStreamParams', {id: +this.$route.params.id, uId: this.$route.params.user})
    this.params.mainSponcores === undefined ? this.params.mainSponcores = [] : this.sMainSponcores = this.params.mainSponcores
    this.params.allSponcores === undefined ? this.params.allSponcores = [] : this.sAllSponcores = this.params.allSponcores
    this.params.spickers === undefined ? this.params.allSpickersImages = [] : this.spickersImages = this.params.allSpickersImages
    this.params.advItems === undefined ? this.params.allSpickersImages = [] : this.params.advItems
    this.language = this.params.sKeySpicker
    this.loading = false
    console.log(this.params);
  },
  methods: {
    changeLanguage(lang){
      this.language = lang
    }
  },
  computed: {
    params() {
      return this.$store.getters.info
    }
  },
  components: {
    Spicker, Loader
  }
};
</script>

<style>
</style>