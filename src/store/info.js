import firebase from 'firebase/app'
import database from 'firebase/database'
import storage from 'firebase/storage'

export default {
  state: {
    info: []
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    cleaarInfo(state) {
      state.info = []
    }
  },
  getters: {
    info: s => s.info,
  },
  actions: {
    async getStreamParams({ dispatch, commit }, {id, uId}) {
      
      const uid = await dispatch('userId')
      if(id === false && uId === false  ) {
        const info = (await firebase.database().ref(`users/${uid}/stream`).once('value')).val()
        commit('setInfo', info)
      } else {
        const info = (await firebase.database().ref(`users/${uId}/stream/${id}`).once('value')).val()
        commit('setInfo', info)
      }
    }
  }
}