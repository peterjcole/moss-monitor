import Vue from 'vue'

export const store = Vue.observable({
  token: '',
})

export const mutations = {
  setToken(token) {
    store.token = token
    window.localStorage.setItem('token', token)
  },
  retrieveTokenFromLocalStorage() {
    if (!store.token) {
      this.setToken(window.localStorage.getItem('token'))
    }
  },
  clearToken() {
    store.token = ''
    window.localStorage.removeItem('token')
  }
}
