<template>
  <aside class="sidebar">
    <div class="sidebar__content">
      <div class="sidebar__head">
        <img src="../assets/logo.png" alt="Logo Museum Indonesia">
      </div>
      <ul class="sidebar__menu">

        <li class="sidebar__item">
          <router-link to="/" @click.native="navigateTo" class="sidebar__link">
            <svg viewBox="0 0 512 512" width="30px" height="30px" class="ion__svg"><path d="M256 112L96 240v208h112V320h96v128h112V240L256 112z"></path><path d="M256 64l-96 76.8V96H96v95.999l-32 25.499 11.51 11.384L256 84.49l180.49 144.393L448 217.498 256 64z"></path></svg>  Home
          </router-link>
        </li>

        <li class="sidebar__item">
          <router-link to="/about" @click.native="navigateTo" class="sidebar__link">
              <svg viewBox="0 0 512 512" width="30px" height="30px" class="ion__svg"><path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm20.2 326.7c-.5 17.8-13.7 28.8-30.8 28.3-16.4-.5-29.3-12.2-28.8-30.1.5-17.8 14.1-29.1 30.5-28.6 17.2.5 29.7 12.6 29.1 30.4zm48.7-127.3c-4.2 5.9-13.6 13.5-25.4 22.7l-13.1 9c-6.4 4.9-10.4 10.7-12.5 17.3-1.1 3.5-1.9 12.6-2.1 18.7-.1 1.2-.8 3.9-4.5 3.9h-39.1c-4.1 0-4.6-2.4-4.5-3.6.6-16.6 3-30.3 9.9-41.3 9.3-14.8 35.5-30.4 35.5-30.4 4-3 7.1-6.2 9.5-9.7 4.4-6 8-12.7 8-19.9 0-8.3-2-16.2-7.3-22.8-6.2-7.7-12.9-11.4-25.8-11.4-12.7 0-20.1 6.4-25.4 14.8-5.3 8.4-4.4 18.3-4.4 27.3H175c0-34 8.9-55.7 27.7-68.5 12.7-8.7 28.9-12.5 47.8-12.5 24.8 0 44.5 4.6 61.9 17.8 16.1 12.2 24.6 29.4 24.6 52.6 0 14.3-5 26.3-12.1 36z"></path></svg> About
          </router-link>
        </li>

      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    navigateTo: function (e) {
      this.$bus.$emit('setShowSidebar', false)
      e.preventDefault()
    },
    hideSidebar: function () {
      this.$bus.$emit('setShowSidebar', false)
    }
  }
}
</script>

<style lang="scss" scoped>
 .sidebar {
    position: fixed; top: 0; bottom: 0; left: 0;
    overflow: hidden;
    width: 70%;
    height: 40em;
    height: 100vh;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 20;
    transform: translateX(-100%);
    -webkit-transition: transform 300ms;
       -moz-transition: transform 300ms;
         -o-transition: transform 300ms;
            transition: transform 300ms;
    &--open {
      -ms-transform: translateX(0);
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    &__head {
      height: 60px;
      background-color: #fed15b;
      text-align: left;
      img {
        height: 50px;
        margin: 3px 0 0 15px;
        border: 2px solid #fff;
        border-radius: 100%;
      }
    }
    &__content {
      position: absolute;
      top: 0; right: 0; ; bottom: 0; left: 0;
      z-index: 1;
      overflow: auto;
      background: #fff;
    }
    &__menu {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    &__link {
      display: block;
      color: #000;
      text-decoration: none;
      padding: 15px 25px;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
  }
</style>
