<template>
  <div>
    <h1>Museum Indonesia</h1>
    <router-link to="/">
      <img alt="Museum Indonesia logo" src="../assets/logo.png" class="logo">
    </router-link>
    <br>
    <br>
    Crafted by <a href="https://github.com/mazipan" target="_blank" rel="noopener">Irfan Maulana</a>
    <br>
    <br>
    <small>Feel free to submit issue if you found bugs or some data that not updated</small>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.logo{
  width: 100px;
  height: 100px;
}
</style>
