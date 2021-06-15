<template> 
  <div class="users-nav">
    <button @click="$router.go(-1)">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <path d="M14.9999 23.5501C14.4623 23.5501 13.9247 23.3448 13.5147 22.9351L0.615424 10.0356C-0.205141 9.21503 -0.205141 7.88463 0.615424 7.06439C1.43566 6.24416 2.7658 6.24416 3.58643 7.06439L14.9999 18.4785L26.4135 7.06479C27.234 6.24456 28.564 6.24456 29.3842 7.06479C30.2052 7.88503 30.2052 9.21543 29.3842 10.036L16.4851 22.9355C16.075 23.3452 15.5374 23.5501 14.9999 23.5501Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="30" height="30" fill="white"/>
        </clipPath>
        </defs>
      </svg>
    </button>
  </div>
  <Loader v-if="loading"/>
  <div class="wrapper" v-else>
    <div class="spicker-body">
      <div class="users-title">
        <h3>Спикеры конференции</h3>
      </div>
      <div class="spickers__continer">
        <div class="spicker__item" v-for="(spicker, idx) in spickers" :key="spicker.id">
          <div class="spicker__item-image">
            <img v-if="spickersImage" :src="spickersImage[idx].url" :alt="spickersImage[idx].name">
          </div>
          <div class="spicker-item__body">
            <h3>{{spicker.name}}</h3>
            <p class="item-position">{{spicker.position}}</p>
            <p class="item-title"><span>"</span>{{spicker.title}}<span>"</span></p>
            <a :href="spicker.link">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M54 0H6C2.7 0 0 2.7 0 6V54C0 57.3 2.7 60 6 60H54C57.3 60 60 57.3 60 54V6C60 2.7 57.3 0 54 0ZM18 51H9V24H18V51ZM13.5 18.9C10.5 18.9 8.1 16.5 8.1 13.5C8.1 10.5 10.5 8.1 13.5 8.1C16.5 8.1 18.9 10.5 18.9 13.5C18.9 16.5 16.5 18.9 13.5 18.9ZM51 51H42V35.1C42 32.7001 39.9 30.6 37.5 30.6C35.1 30.6 33 32.7001 33 35.1V51H24V24H33V27.6C34.5 25.2 37.8 23.4 40.5 23.4C46.2 23.4 51 28.2 51 33.9V51Z" fill="#61A2BA"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="users-body">
      <div class="users-title">
        <h3>Учасники конференции</h3>
      </div>

      <div class="search-user__container">
        <input type="text" placeholder="Найти учасника" v-model="search">
      </div>
      
      <div class="users__containe" v-if="users">
        <div class="user__item"  v-for="user in userFilter" :key="user">
          <h3>{{user.fio}}</h3>
          <p>{{user.company}}</p>
          <a v-if="user.link" :href="user.link">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M54 0H6C2.7 0 0 2.7 0 6V54C0 57.3 2.7 60 6 60H54C57.3 60 60 57.3 60 54V6C60 2.7 57.3 0 54 0ZM18 51H9V24H18V51ZM13.5 18.9C10.5 18.9 8.1 16.5 8.1 13.5C8.1 10.5 10.5 8.1 13.5 8.1C16.5 8.1 18.9 10.5 18.9 13.5C18.9 16.5 16.5 18.9 13.5 18.9ZM51 51H42V35.1C42 32.7001 39.9 30.6 37.5 30.6C35.1 30.6 33 32.7001 33 35.1V51H24V24H33V27.6C34.5 25.2 37.8 23.4 40.5 23.4C46.2 23.4 51 28.2 51 33.9V51Z" fill="#fff"/>
            </svg>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'
export default {
  data: () => ({
    users: [],
    loading: true,
    search: '',
  }),
  async mounted() {
    await this.$store.dispatch("getStreamParams", {
      id: this.$route.params.id,
      uId: this.$route.params.user,
    });
    const usersArray = await this.$store.dispatch('getUsers', await {url: this.usersLink})
    this.users = usersArray.allusers
    this.loading = false
  },
  computed: {
    userFilter() {
      return this.search.length ? this.users.filter(user => {
        return user.fio.toLowerCase().includes(this.search.toLowerCase())
      }) : this.users
    },
    usersLink() {
      return this.$store.getters.info.usersLink;
    },
    spickers() {
      return this.$store.getters.info.spickers;
    },
    spickersImage() {
      return this.$store.getters.info.allSpickersImages;
    },
  },
  components: {
    Loader
  }
};
</script>

<style>
</style>