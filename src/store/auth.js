import firebase from 'firebase/app'
import database from 'firebase/database'

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try{
        await firebase.auth().signInWithEmailAndPassword(email, password)
      }catch(e) {
        throw e
      }
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