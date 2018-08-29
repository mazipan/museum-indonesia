<template>
  <div id="app">
    <div class="sidebar-cover" v-show="isShowSidebar" @click="hideSidebar"></div>
    <sidebar-section v-bind:class="{'sidebar--open': isShowSidebar}"></sidebar-section>
    <header-section></header-section>
    <div class="main">
      <transition
        name="fade"
        mode="out-in">
          <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import SidebarSection from './components/SidebarSection'
import HeaderSection from './components/HeaderSection'

export default {
  name: 'MuseumApp',
  components: {
    SidebarSection,
    HeaderSection
  },
  data () {
    return {
      isShowSidebar: false
    }
  },
  methods: {
    toggleSidebar: function () {
      this.$bus.$emit('setShowSidebar', !this.isShowSidebar)
    },
    hideSidebar: function () {
      this.$bus.$emit('setShowSidebar', false)
    }
  },
  created () {
    this.$bus.$on('setShowSidebar', (param) => {
      this.isShowSidebar = param
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.sidebar-cover{
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top:0px; right: 0px; bottom: 0px; left: 0px;
  height: 100%;
  z-index: 19;
}
a{
  color: #fed15b;
  text-decoration: none;
}
.logo-100{
  width: 100px;
  height: 100px;
}
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}
.google-ads{
  width: 90%;
}
</style>
