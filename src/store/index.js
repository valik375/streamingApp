import { createStore } from 'vuex'
import auth from './auth'
import stream from './stream'
import info from './info'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, stream, info
  }
})
