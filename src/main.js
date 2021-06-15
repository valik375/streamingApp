import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import './css/style.css'

const config = {
  apiKey: `${process.env.VUE_APP_API_KEY}`,
  authDomain: `${process.env.VUE_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.VUE_APP_PROJECT_ID}`,
  storageBucket: `${process.env.VUE_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.VUE_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.VUE_APP_APP_ID}`
}

let app

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount('#app')
  }
})