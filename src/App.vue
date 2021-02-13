<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<style>
</style>
<script>
import Nav from '@/Nav'

export default {
  components: { Nav },
}
</script>
