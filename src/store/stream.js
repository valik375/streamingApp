import firebase from 'firebase/app'
import database from 'firebase/database'
import storage from 'firebase/storage'

export default {
  actions: {
    async getUsers({ dispatch }, { url }) {
      const link = await fetch(url)
      return await link.json()
    },
    async removeRoom({ dispatch }, id) {
      try{
        const uid = await dispatch('userId')
        await firebase.database().ref(`users/${uid}/stream/${id}`).remove()
      }catch(e) {
        throw e
      }
    },
    async uploadImage({ dispatch }, {images, path}) {
      const uid = await dispatch('userId')
      const array = []
      for(let i = 0; images.length > i; i++) {
        if(images[i] !== undefined) {
          if(images[i].type) {
            let uploadImage = null
            const imagePath = await firebase.storage().ref(`${uid}/${path}/${images[i].name}`)
            uploadImage = await imagePath.put(images[i])
            array.push({url: await imagePath.getDownloadURL(), name: images[i].name})  
          } else {
            array.push(images[i])
          }
        } else {
          array.push({})
        }
        
      }
      return array
    },
    async cteareStream({ dispatch }, { sColor, sName, usersLink, sDate, sKey, sId, sKeySpicker, sKeyLanguage, sChat, sMainSponcores, sAllSponcores, spickers, spickersImages, advertisement, advertisementImages, showMessage, messageTitle, messageDescription }) {
      try {
        const uid = await dispatch('userId')
        
        const mainSponcores = await dispatch('uploadImage', {images: sMainSponcores, path: 'sponcores/main'} )
        const allSponcores = await dispatch('uploadImage', {images: sAllSponcores, path: 'sponcores/all'} )
        const allSpickersImages = await dispatch('uploadImage', {images: spickersImages, path: 'spickers'} )
        const advImages = await dispatch('uploadImage', {images: advertisementImages, path: 'advertisement'} )

        await firebase.database().ref(`users/${uid}/stream/${sId}/`).set({
          sName,
          sKey,
          sColor,
          sId,
          usersLink,
          sDate,
          sKeyLanguage,
          sKeySpicker,
          sChat,
          showMessage,
          messageTitle,
          messageDescription,
          allSponcores,
          mainSponcores,
          spickers,
          allSpickersImages,
          advImages, 
          advertisement
        })
      } catch (e) {
        throw e
      }
    },
    async updateImage({ dispatch }, {images, path}) {
      const uid = await dispatch('userId')
      const array = []
      for(let i = 0; images.length > i; i++) {
        if(images[i].length > 2) {
          const imagePath = await firebase.storage().ref(`${uid}/${path}/${images[i].name}`)        
          array.push({url: await imagePath.getDownloadURL(), name: images[i].name}) 
        }
      }
      return array
    },
  }
}
