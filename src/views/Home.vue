<template>
  <div class="home">
    <h1>Welcome to <br>Museum Indonesia!</h1>
    <br>
    <router-link to="/museum">
      <img alt="Museum Indonesia logo" src="../assets/logo.png" class="logo">
    </router-link>
    <br>
    <small>Click logo to enter apps.</small>
    <br>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  }
}
</script>

<style scoped>
.logo{
  width: 100px;
  height: 100px;
}
</style>
