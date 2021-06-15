<template>
  <Loader v-if="loading" />
  <div class="page-container">

    <div class="page-header">
      <h1>Это страница ваших комнат.</h1>
      <p>Здесь вы можете найти все ваши комнаты, удалять или редактировать их.</p>
    </div>
    
    <div class="my-broadcasts__container">
      <ul class="my-rooms" v-if="rooms">
        <li class="my-room" v-for="room in rooms" :key="room.sId">
          <div class="room-info">
            <h3 class="room-name">{{room.sName}}</h3>
            <p class="room-date">Start date: <span>{{room.sDate}}</span></p>
            <p class="room-status">Status:  <span :title="roomStatus(room.sDate)" class="status-indicator" :class="roomStatus(room.sDate) === 'active' ? 'green' : 'red'"></span></p>
          </div>
          <div class="btn-group">
            <router-link class="btn white" :to="`/my-rooms/edit/${room.sId}`">Edit</router-link>
            <router-link target="_blank" class="btn white" :to="`/stream/${uId}/${room.sId}`">Link</router-link>
            <button class="btn red" @click="removeRoom(room.sId)">Delete</button>
          </div>
        </li>
      </ul>
      <div class="my-rooms-is-empty" v-else>
        <div class="my-rooms-card">
          <p>Простите но на данный момент у вас нет комнат, вы можете создать их  
            <router-link target="_blank" class="text-lent" to="/">здесь</router-link>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Loader from '../components/Loader'
export default {
  data: () => ({
    uId: '',
    loading: true,
    currentDate: ''
  }),
  async mounted() {
    this.uId = await this.$store.dispatch("userId")
    await this.$store.dispatch('getStreamParams', {id: false, uId: false})
    this.loading = false
  },
  methods: {
    roomStatus(date) {
      const today = new Date()
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      this.currentDate = yyyy + '-' + mm + '-' + dd;

      return this.currentDate > date ? 'outdated' : 'active' 
    },
    async removeRoom(id) {
      const deleted = confirm("Do you really want to delete this room?");
      if(deleted === true) {
        await this.$store.dispatch('removeRoom', id)
        delete this.rooms[id]
      }
    }
  },
  computed: {
    rooms() {
      return this.$store.getters.info
    }
  },
  components: {
    Loader
  }
}
</script>

<style>

</style>