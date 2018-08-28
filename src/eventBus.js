import Vue from 'vue'

let state = {
  isShowSidebar: false
}

const eventBus = new Vue()
eventBus.__state = state
eventBus.$on('setShowSidebar', (param) => {
  state.isShowSidebar = param
})
eventBus.$on('getShowSidebar', () => {
  return state.isShowSidebar
})

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return eventBus
    }
  }
})
