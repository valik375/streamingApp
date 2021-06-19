import firebase from 'firebase/app'
import database from 'firebase/database'

export default {
  state: {
    error: []
  },
  mutations: {
    setError(state, e) {
      state.error = e
    },
    clearError(state) {
      state.error = []
    }
  },
  getters: {
    error: s => s.error,
  },
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
      }).catch((e) => {
        commit('setError', e)
      })
    },
    async register({ dispatch }, {name, email, password}) {
      try{
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('userId')
        await firebase.database().ref(`users/${uid}/info`).set({
          name
        })
      }catch(e) {
        throw e
      }
    },
    userId() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout() {
      await firebase.auth().signOut()
    },
  }
}