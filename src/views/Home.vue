<template>
  <Loader v-if="loader" :loaderText="'📄 Building Stream'"/>
  <div class="warpper">
    <div class="about-stream">
      <h1>Платформа для ваших трансляций</h1>
      <p>
        Сейчас вы находитесь на странице создания комнаты если вы столкнулись с трудностями вы можете воспользоваться документацией.
      </p>
      <router-link class="btn blue" to="/docs">Показать Документацию</router-link>
    </div>
    
    <form class="creating-stream-form" @submit.prevent="createNewStream" :class="showSpickers ? 'show' : ''">
      <div class="stream-content">

        <div class="group-wrapper">
          <div class="input-group">
            <label for="sName">Название комнаты</label>
            <input type="text" id="sName" v-model="sName" />
            <small v-if="streamErrors.eTitle.length" >{{streamErrors.eTitle}}</small>
          </div>
          <div class="input-group">
            <label for="sKey">Ссылка на трансляцию</label>
            <input type="text" id="sKey" v-model="sKey" />
            <small v-if="streamErrors.eStreamKey.length" >{{streamErrors.eStreamKey}}</small>
          </div>
        </div>

        <div class="group-wrapper">
          <div class="input-group">
            <label for="sKeySpicker">Ссылка на трансляцию со спикерами</label>
            <input type="text" id="sKeySpicker" v-model="sKeySpicker" />
          </div>

          <div class="input-group">
            <label for="sDate">Дата трансляции</label>
            <input type="date" id="sDate" v-model="sDate" />
            <small v-if="streamErrors.eDate.length" >{{streamErrors.eStreamKey}}</small>
          </div>
        </div>

        <div class="input-group">
          <label for="sKeyLanguage">Другой язык</label>
          <input type="text" id="sKeyLanguage" v-model="sKeyLanguage" />
        </div>

        <div class="create-advertising-page" :class="dropdown ? 'active' : ''">
          <div @click="dropdown = !dropdown" class="advertising-page__dropdown">
            <h3>Страница рекламмы</h3>
            <span>&#8249;</span>
          </div>

          <div class="create-advertising__form">

            <div class="group-wrapper">
              <div class="input-group">
                <label for="advTitle">Название позиции</label>
                <input type="text" id="advTitle" v-model="advTitle" />
              </div>

              <div class="input-group">
                <label for="advTitleLink">Название позиции ссылка</label>
                <input type="text" id="advTitleLink" v-model="advTitleLink" />
              </div>
            </div>

            <div class="group-wrapper">
              <div class="input-group">
                <label for="advBtnLink">Ссылки на кнопку</label>
                <input type="text" id="advBtnLink" v-model="advBtnLink" />
              </div>

              <div class="input-group file">
                <label for="advImage">Картинка товара</label>
                <input type="file" id="advImage" @change="advFileImage" />
              </div>

              <div class="file-names__container" v-if="advImage.length">
                <h3>Название изображения:</h3>
                <p v-for="(file, index) in advImage" :key="file.name">
                  {{ index + 1 }}) {{ file.name }}
                </p>
              </div>
            </div> 

            <button @click.prevent="addAdvItem" class="btn">Добавить</button>

            <div class="advertising-pedview" v-if="advertisementArray.length">
              <div class="advertising-pedview__item" v-for="(adv, idx) in advertisementArray" :key="adv.id">
                <div class="advertising-pedview__image">
                  <img :src="onFileChange(adv.image[0])" :alt="adv.title">
                </div>
                <div class="advertising-pedview__content">
                  <span @click="removeSpicker(idx, advertisementArray, advAllImages)" class="remove-spicker">X</span>
                  <h3>{{adv.title}}</h3>
                  <a class="btn" :href="adv.buttonLink">Подробнее</a>
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
              <label for="sChat">Показать чат</label>
            </div>
          </div>
        </div>

        <div class="checkbox-container">
          <div class="options-container">
            <div class="input-group checkbox">
              <input type="checkbox" id="showMessage" v-model="showMessage" />
              <label for="showMessage">Показать предупредительный текст</label>
            </div>
          </div>
          <div class="" v-if="showMessage">
              <div class="input-group">
                <label for="messageTitle">Предупредительный заголовок</label>
                <input type="text" id="messageTitle" v-model="messageTitle" />
              </div>

              <div class="input-group">
                <label for="messageDescription">Предупредительный текст</label>
                <textarea id="messageDescription" cols="30" rows="4" v-model="messageDescription"></textarea>
              </div>
            </div>
        </div>

        <div class="file-wrapper">
          <div class="input-group file">
            <label for="sSponcores" title="Pictures that will be displayed on top of the stream">Загрузить изображение (Сверху)</label>
            <input
              type="file"
              @change="previewFiles($event, sMainSponcores)"
              id="sSponcores"
              multiple
            />
          </div>

          <div class="file-names__container" v-if="sMainSponcores.length">
            <h3>Название изображения:</h3>
            <p v-for="(file, index) in sMainSponcores" :key="file.name">
              {{ index + 1 }}) {{ file.name }}
              <span class="remove-file" @click="removeFile(index, sMainSponcores)">X</span>
            </p>
          </div>
        </div>
        
        <div class="file-wrapper">
          <div class="input-group file">
            <label for="sSponcoresAll" title="Pictures that will be displayed on bottom of the stream">Загрузить изображение (Снизу)</label>
            <input
              type="file"
              @change="previewFiles($event, sAllSponcores)"
              id="sSponcoresAll"
              multiple
            />
          </div>

          <div class="file-names__container" v-if="sAllSponcores.length">
            <h3>Название изображения:</h3>
            <p v-for="(file, index) in sAllSponcores" :key="file.name">
              {{ index + 1 }}) {{ file.name }}
              <span class="remove-file" @click="removeFile(index, sAllSponcores)">X</span>
            </p>
          </div>
        </div>

        <div class="btn-container">
          <button type="submit" class="btn">Создать комнату</button>
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
            <label for="spickerName">Имя спикера</label>
            <input type="text" id="spickerName" v-model="spickerName">
            <small v-if="spickerErrors.eName.length" >{{spickerErrors.eName}}</small>
          </div>
          <div class="spicker-group">
            <label for="spickerPosition">Должность спикера</label>
            <input type="text" id="spickerPosition" v-model="spickerPosition">
          </div>
          <div class="spicker-group">
            <label for="spickerTitle">Тема спикера</label>
            <input type="text" id="spickerTitle" v-model="spickerTitle">
            <small v-if="spickerErrors.eTitle.length" >{{spickerErrors.eTitle}}</small>
          </div>
          <div class="spicker-group">
            <label for="spickerTime">Время спикера</label>
            <input type="time" id="spickerTime" v-model="spickerTime">
          </div>
          <div class="spicker-group">
            <label for="spickerLink">LinkedIn спикера</label>
            <input type="text" id="spickerLink" v-model="spickerLink">
          </div>
          <div class="spicker-group file">
            <label for="spickerImage">Фото спикера</label>
            <input type="file" id="spickerImage" @change="spickerFileImage">
            <p v-if="spickerImage && spickerImage[0].name">{{spickerImage[0].name}}</p>
          </div>
          
          <button class="btn" @click.prevent="createSpicker">Добавить спикера</button>
        </div>
        
        <div class="spicker-items__container" v-if="allSpickers.length">
          <div class="spicker-item" v-for="(spicker, idx) in allSpickers" :key="spicker.id">
            <span @click="removeSpicker(idx, allSpickers, spickersImages)" class="remove-spicker">X</span>
            <img 
              :src="onFileChange(spicker.image[0]) ? onFileChange(spicker.image[0]) : spickersImages[idx] = {}" 
              :alt="spicker.name"
            >
            <h3>Имя: {{spicker.name}}</h3>
            <p>Должность: {{spicker.position}}</p>
            <p>Время: {{spicker.time}}</p>
            <p>Тема: {{spicker.title}}</p>
            <a :href="spicker.link">LinkedIn: {{spicker.link}}</a>
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
    anonimImage: anonymous,
    loader: false,
    dropdown: false,
    uId: '',
    // stream
    sColor: '#61A2BA',
    sName: '',
    usersLink: '',
    sKey: '',
    sKeySpicker: '',
    sChat: '',
    sDate: '',
    sKeyLanguage: '',
    sMainSponcores: [],
    sAllSponcores: [],
    showMessage: false,
    messageTitle: '', 
    messageDescription: '',
    // adv
    advImage: [],
    advAllImages: [],
    advTitle: '',
    advTitleLink: '',
    advBtnLink: '',
    advertisementArray: [],
    // spicker
    spickerTime: '',
    spickerLink: '',
    spickerName: '',
    spickerImage: '',
    spickersImages: [],
    spickerPosition: '',
    spickerTitle: '',
    id: null,
    allSpickers: [],
    showSpickers: true,
    // spicker errors
    spickerErrors: {
      eName: '',
      eTitle: ''
    },
    // stream errors
    streamErrors: {
      eTitle: '',
      eStreamKey: '',
      eDate: ''
    },
  }),
  async mounted() {
    this.uId = await this.$store.dispatch("userId");
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
      if (images) {
        images.splice(spickerId, 1);
      }
      array.splice(spickerId, 1);
    },
    onFileChange(image) {
      if (image) {
        const url = URL.createObjectURL(image);
        return url
      } else {
        return false
      }
      
    },
    async createNewStream() {
      this.id = Date.now()
      
      this.sName.length >= 0 ? this.streamErrors.eTitle = 'Please fill in the Stream Title field' : ''
      this.sKey.length >= 0 ? this.streamErrors.eStreamKey = 'Please fill in the Stream Key field' : ''
      this.sDate.length >= 0 ? this.streamErrors.eDate = 'Please fill in the Date field' : ''

      if(this.sName && this.sKey && this.sDate){
        const streamParams = {
          sColor: this.sColor,
          sName: this.sName,
          sKey: this.sKey,
          sKeyLanguage: this.sKeyLanguage,
          usersLink: this.usersLink,
          sId: this.id,
          sDate: this.sDate,
          sKeySpicker: this.sKeySpicker,
          sChat: this.sChat,
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
        this.loader = true
        await this.$store.dispatch('cteareStream', streamParams)
        this.loader = false
        this.$router.push(`/stream/${this.uId}/${this.id}`)
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
      }
    },
    createSpicker() {

      this.spickerName.length >= 0 ? this.spickerErrors.eName = 'Please fill in the Name field' : ''
      this.spickerTitle.length >= 0 ? this.spickerErrors.eTitle = 'Please fill in the Title field' : ''
      this.spickerTitle.length >= 0 ? this.spickerErrors.eTitle = 'Please fill in the Title field' : ''

      if(this.spickerName && this.spickerTitle) {
        const spicker = {
          name: this.spickerName,
          position: this.spickerPosition,
          link: this.spickerLink,
          image: this.spickerImage,
          title: this.spickerTitle,
          time: this.spickerTime,
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
    advFileImage(event) {
      this.advImage = event.target.files;
      this.advAllImages.push(event.target.files[0])
    },
    spickerFileImage(event) {
      this.spickerImage = event.target.files;
      if (event.target.files[0] || event.target.files[0].name) {
        this.spickersImages.push(event.target.files[0])
      } else {
        this.spickersImages.push({})
      }
    },
  },
  components: {
    Loader
  }
};
</script>
