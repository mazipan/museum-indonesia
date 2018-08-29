<template>
  <div class="home">
    <h1>Welcome to <br>Museum Indonesia!</h1>
    <br>
    <router-link to="/museum">
      <img alt="Museum Indonesia logo" src="../assets/logo.png" class="logo-100">
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
