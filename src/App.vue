<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<!-- Bootstrap CDN di bagian <head> atau <style> -->
<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #f8f9fa; /* Menambahkan background abu-abu muda menggunakan Bootstrap */
}
</style>
