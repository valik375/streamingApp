<template>
  <Loader v-if="loader" :loaderText="loaderText"/>
  <div class="warpper">
    
    <form style="margin-top: 40px" class="creating-stream-form" @submit.prevent="createNewStream" :class="showSpickers ? 'show' : ''">
      <div class="stream-content">

        <div class="group-wrapper">
          <div class="input-group">
            <label for="sName">Stream Title</label>
            <input type="text" id="sName" v-model="sName" title="Stream title or theme" />
            <small v-if="streamErrors.eTitle.length" >{{streamErrors.eTitle}}</small>
          </div>
          <div class="input-group">
            <label for="sKey">Stream Key</label>
            <input type="text" id="sKey" v-model="sKey" title="Stream YouTube link" />
            <small v-if="streamErrors.eStreamKey.length" >{{streamErrors.eStreamKey}}</small>
          </div>
        </div>

        <div class="group-wrapper">
          <div class="input-group">
            <label for="sKeySpicker">Stream Spickers Key ( Optional )</label>
            <input type="text" id="sKeySpicker" v-model="sKeySpicker" title="Stream YouTube link for spicker window" />
          </div>

          <div class="input-group">
            <label for="sDate">Date to start</label>
            <input type="date" id="sDate" v-model="sDate" title="Date to start" />
            <small v-if="streamErrors.eDate.length" >{{streamErrors.eDate}}</small>
          </div>
        </div>

        <div class="input-group">
          <label for="sKeyLanguage">Other language (Optional)</label>
          <input type="text" id="sKeyLanguage" v-model="sKeyLanguage" title="Other language" />
        </div>

        <div class="create-advertising-page" :class="dropdown ? 'active' : ''">
          <div @click="dropdown = !dropdown" class="advertising-page__dropdown">
            <h3>Advertising page</h3>
            <span>&#8249;</span>
          </div>

          <div class="create-advertising__form">

            <div class="group-wrapper">
              <div class="input-group">
                <label for="advTitle">Advertising name or title</label>
                <input type="text" id="advTitle" v-model="advTitle" title="Advertising item name or title" />
              </div>

              <div class="input-group">
                <label for="advTitleLink">Advertising name or title link</label>
                <input type="text" id="advTitleLink" v-model="advTitleLink" title="Advertising name or title link" />
              </div>
            </div>

            <div class="group-wrapper">
              <div class="input-group">
                <label for="advBtnLink">Advertising button link</label>
                <input type="text" id="advBtnLink" v-model="advBtnLink" title="Advertising button link" />
              </div>

              <div class="input-group file">
                <label for="advImage">Advertising image</label>
                <input type="file" id="advImage" @change="advFileImage" title="Advertising image"/>
              </div>

              <div class="file-names__container" v-if="advImage.length">
                <h3>Image name:</h3>
                <p v-for="(file, index) in advImage" :key="file.name">
                  {{ index + 1 }}) {{ file.name }}
                </p>
              </div>
            </div> 

            <button @click.prevent="addAdvItem" class="btn">Add</button>

            <div class="advertising-pedview" v-if="advertisementArray && advertisementArray.length">
              <div class="advertising-pedview__item" v-for="(adv, idx) in advertisementArray" :key="adv.id">
                <div class="advertising-pedview__image">
                  <img v-if="adv.image || advAllImages" :src="advAllImages[idx].url || onFileChange(adv.image[0])" :alt="adv.title">
                </div>
                <div class="advertising-pedview__content">
                  <span @click="removeSpicker(idx, advertisementArray, advAllImages)" class="remove-spicker">X</span>
                  <h3>{{adv.title}}</h3>
                  <a class="btn" :href="adv.buttonLink">More</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="group-wrapper"> 
          <div class="input-group">
            <label for="usersLink">Ссылка на json файл зрителей</label>
            <input type="text" id="usersLink" v-model="usersLink" />
          </div>
        </div>

        <div class="checkbox-container">
          <h3>Опции</h3>

          <div class="input-group color" :style="`border-color:${sColor}`">
            <input type="color" id="sColor" v-model="sColor" />
            <div class="color-info">
              <label for="sColor">Задать цвет для трансляции</label>
              <span>Цвет: {{sColor}}</span>
            </div>
          </div>

          <div class="options-container">
            <div class="input-group checkbox">
              <input type="checkbox" id="sChat" v-model="sChat" />
              <label for="sChat" title="Show or hide YouTube chat">Show Chat</label>
            </div>
          </div>
        </div>
        
        <div class="checkbox-container">
          <div class="options-container">
            <div class="input-group checkbox">
              <input type="checkbox" id="showMessage" v-model="showMessage" />
              <label for="showMessage" title="Show message what users see after or before stream">Show date message</label>
            </div>
          </div>
          <div class="" v-if="showMessage">
              <div class="input-group">
                <label for="messageTitle">Date message title</label>
                <input type="text" id="messageTitle" v-model="messageTitle" />
              </div>

              <div class="input-group">
                <label for="messageDescription">Advertising name or title link</label>
                <textarea id="messageDescription" cols="30" rows="4" v-model="messageDescription"></textarea>
              </div>
            </div>
        </div>

        <div class="file-wrapper">
          <div class="input-group file">
            <label for="sSponcores" title="Pictures that will be displayed on top of the stream">Upload main Sponsores</label>
            <input
              type="file"
              @change="previewFiles($event, sMainSponcores)"
              id="sSponcores"
              multiple
            />
          </div>

          <div class="file-names__container" v-if="sMainSponcores.length">
            <h3>Files:</h3>
            <p v-for="(file, index) in sMainSponcores" :key="file.name">
              {{ index + 1 }}) {{ file.name }}
              <span class="remove-file" @click="removeFile(index, sMainSponcores)">X</span>
            </p>
          </div>
        </div>
        
        <div class="file-wrapper">
          <div class="input-group file">
            <label for="sSponcoresAll" title="Pictures that will be displayed on bottom of the stream">Upload all Sponsores</label>
            <input
              type="file"
              @change="previewFiles($event, sAllSponcores)"
              id="sSponcoresAll"
              multiple
            />
          </div>

          <div class="file-names__container" v-if="sAllSponcores.length">
            <h3>Files:</h3>
            <p v-for="(file, index) in sAllSponcores" :key="file.name">
              {{ index + 1 }}) {{ file.name }}
              <span class="remove-file" @click="removeFile(index, sAllSponcores)">X</span>
            </p>
          </div>
        </div>

        <div class="btn-container">
          <button type="submit" class="btn">Upload</button>
        </div>

      </div>

      <div class="spickers-content">

        <button 
          :title="showSpickers ? 'Hide spickers' : 'Show spickers'" 
          @click.prevent="showSpickers = !showSpickers" 
          class="show-create__spickers" 
          :class="showSpickers ? 'hidden' : ''">
          &#10094;
        </button>

        <div class="spicker-form">
          <div class="spicker-group">
            <label for="spickerName">Spicker name</label>
            <input type="text" id="spickerName" v-model="spickerName">
            <small v-if="spickerErrors.eName.length" >{{spickerErrors.eName}}</small>
          </div>
          <div class="spicker-group">
            <label for="spickerPosition">Spicker position</label>
            <input type="text" id="spickerPosition" v-model="spickerPosition">
          </div>
          <div class="spicker-group">
            <label for="spickerTitle">Spicker title</label>
            <input type="text" id="spickerTitle" v-model="spickerTitle">
            <small v-if="spickerErrors.eTitle.length" >{{spickerErrors.eTitle}}</small>
          </div>
          <div class="spicker-group">
            <label for="spickerTime">Spicker time</label>
            <input type="time" id="spickerTime" v-model="spickerTime">
          </div>
          <div class="spicker-group">
            <label for="spickerLink">Spicker LinkedIn</label>
            <input type="text" id="spickerLink" v-model="spickerLink">
          </div>
          <div class="spicker-group file">
            <label for="spickerImage">Spicker image</label>
            <input type="file" id="spickerImage" @change="spickerFileImage">
            <p v-if="spickerImage">{{spickerImage[0].name}}</p>
          </div>
          
          <button class="btn" @click.prevent="createSpicker">Add Spicker</button>
        </div>
        
        <div class="spicker-items__container" v-if="allSpickers.length">
          <div class="spicker-item" v-for="(spicker, idx) in allSpickers" :key="spicker.id">
            <span @click="removeSpicker(idx, allSpickers, spickersImages)" class="remove-spicker">X</span>
            <img 
              v-if="spicker.image || spickersImages"
              :alt="spicker.name"
              :src="spickersImages[idx] && spickersImages[idx].url !== undefined ? spickersImages[idx].url : spicker.image && spicker.image[0] !== undefined ? onFileChange(spicker.image[0]) : anonimImage" 
            >
            <h3>Name: {{spicker.name}}</h3>
            <p>Position: {{spicker.position}}</p>
            <p>Time: {{spicker.time}}</p>
            <p>Title: {{spicker.title}}</p>
            <a :href="spicker.link">Link: {{spicker.link}}</a>
            <div class="spicker-queue">
              <button @click.prevent="changeQueueTop(idx, spickersImages)" class="btn-queue top" :disabled="idx === 0">
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
              <button @click.prevent="changeQueueBottom(idx, spickersImages)" class="btn-queue bottom" :disabled="idx === allSpickers.length - 1">
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
          </div>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
import Loader from '../components/Loader'
import anonymous from '../assets/anonymous.png'

export default {
  data: () => ({
    uId: '',
    anonimImage: anonymous,
    dropdown: false,
    loader: true,
    loaderText: '📄 Fetching stream data',
    showSpickers: true,
    // Stream params
    sName: '',
    sKey: '',
    sColor: '',
    sKeySpicker: '',
    usersLink: '',
    sChat: '',
    sId: '',
    sDate: '',
    sMainSponcores: [],
    sAllSponcores: [],
    // adv
    advImage: [],
    advAllImages: [],
    advTitle: '',
    advTitleLink: '',
    advBtnLink: '',
    advertisementArray: [],
    // Spicker params
    spickerTime: '',
    spickerLink: '',
    spickerName: '',
    spickerImage: '',
    spickersImages: [],
    spickerPosition: '',
    spickerTitle: '',
    sKeyLanguage: '',
    id: null,
    allSpickers: [],
    showMessage: false,
    messageTitle: '', 
    messageDescription: '',
    // Spicker errors
    spickerErrors: {
      eName: '',
      eTitle: ''
    },
    // Stream errors
    streamErrors: {
      eTitle: '',
      eStreamKey: '',
      eDate: ''
    },
  }),
  async mounted() {
    this.uId = await this.$store.dispatch("userId")
    await this.$store.dispatch('getStreamParams', {id: +this.$route.params.id, uId: this.uId})

    this.sColor = this.info.sColor
    this.sName = this.info.sName
    this.sKey = this.info.sKey
    this.sKeySpicker = this.info.sKeySpicker
    this.sChat = this.info.sChat
    this.sDate = this.info.sDate
    this.sId = this.info.sId
    this.usersLink = this.info.usersLink
    this.showMessage = this.info.showMessage,
    this.messageTitle = this.info.messageTitle, 
    this.messageDescription = this.info.messageDescription
    this.sKeyLanguage = this.info.sKeyLanguage

    this.info.mainSponcores !== undefined ? this.sMainSponcores = this.info.mainSponcores : this.info.mainSponcores = [] 
    this.info.allSponcores !== undefined ? this.sAllSponcores = this.info.allSponcores : this.info.allSponcores = [] 
    this.info.spickers !== undefined ? this.allSpickers = this.info.spickers : this.info.spickers = [] 
    this.info.allSpickersImages !== undefined ? this.spickersImages = this.info.allSpickersImages : this.info.allSpickersImages = [] 
    this.info.advertisement !== undefined ? this.advertisementArray = this.info.advertisement : this.info.advertisement = [] 
    this.info.advImages !== undefined ? this.advAllImages = this.info.advImages : this.info.advImages = [] 

    this.loader = false
  },
  computed: {
    info() {
      return this.$store.getters.info
    }
  },
  methods: {
    changeQueueTop(idx, images) {
      const index = idx - 1
      if(images) {
        images[idx] = images.splice(index, 1, images[idx])[0]
      }
      this.allSpickers[idx] = this.allSpickers.splice(index, 1, this.allSpickers[idx])[0]
    },
    changeQueueBottom(idx, images) {
      const index = idx + 1
      if(images) {
        images[idx] = images.splice(index, 1, images[idx])[0]
      }
      this.allSpickers[idx] = this.allSpickers.splice(index, 1, this.allSpickers[idx])[0]
    },
    removeFile(idx, fileArray) {
      fileArray.splice(idx, 1)
    },
    removeSpicker(spickerId, array, images) {
      array.splice(spickerId, 1);
      images.splice(spickerId, 1);
    },
    onFileChange(image) {
      const url = URL.createObjectURL(image);
      return url
    },
    async createNewStream() {

      this.sName.length > 0 ? this.streamErrors.eTitle = 'Please fill in the Stream Title field' : ''
      this.sKey.length > 0 ? this.streamErrors.eStreamKey = 'Please fill in the Stream Key field' : ''
      this.sDate.length > 0 ? this.streamErrors.eDate = 'Please fill in the Date field' : ''

      if(this.sName && this.sKey && this.sDate){
        const streamParams = {
          sName: this.sName,
          sColor: this.sColor,
          sKey: this.sKey,
          sDate: this.sDate,
          sId: this.sId,
          usersLink: this.usersLink,
          sKeySpicker: this.sKeySpicker,
          sChat: this.sChat,
          sKeyLanguage: this.sKeyLanguage,
          sMainSponcores: this.sMainSponcores,
          sAllSponcores: this.sAllSponcores,
          spickers: this.allSpickers,
          spickersImages: this.spickersImages,
          advertisement: this.advertisementArray,
          advertisementImages: this.advAllImages,
          showMessage: this.showMessage,
          messageTitle: this.messageTitle,
          messageDescription: this.messageDescription,
        }
        this.loaderText = '📄 Uploading new data. Please wait'
        this.loader = true
        await this.$store.dispatch('cteareStream', streamParams)
        this.loader = false
      }
    },
    addAdvItem() {
      if(this.advTitle && this.advBtnLink) {
        const advItem = {
          title: this.advTitle,
          buttonLink: this.advBtnLink,
          titleLink: this.advTitleLink,
          image: this.advImage,
          id: Date.now()
        }
        this.advertisementArray.push(advItem)

        this.advTitle = ''
        this.advBtnLink = ''
        this.advTitleLink = ''
        this.advImage = []
        this.spickerTime = ''
      }
    },
    createSpicker() {

      this.spickerName.length > 0 ? this.spickerErrors.eName = 'Please fill in the Name field' : ''
      this.spickerTitle.length > 0 ? this.spickerErrors.eTitle = 'Please fill in the Title field' : ''
      this.spickerTitle.length > 0 ? this.spickerErrors.eTitle = 'Please fill in the Title field' : ''

      if(this.spickerName && this.spickerTitle) {
        const spicker = {
          name: this.spickerName,
          position: this.spickerPosition,
          link: this.spickerLink,
          image: this.spickerImage,
          time: this.spickerTime,
          title: this.spickerTitle,
          id: Date.now()
        }
        this.allSpickers.push(spicker)

        this.spickerName = ''
        this.spickerPosition = ''
        this.spickerTitle = ''
        this.spickerLink = ''
        this.spickerImage = ''
        this.spickerTime = ''
      }
    },
    previewFiles(event, array) {
      const file = event.target.files;
      for(let i = 0; file.length > i; i++){
        array.push(file[i])
      }
    },
    spickerFileImage(event) {
      this.spickerImage = event.target.files;
      this.spickersImages.push(event.target.files[0])
    },
    advFileImage(event) {
      this.advImage = event.target.files;
      this.advAllImages.push(event.target.files[0])
    },
  },
  components: {
    Loader
  }
};
</script>
