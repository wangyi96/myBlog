<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  import Home from './components/Home/Home.vue'
  export default {
    data(){
      return{

      }
    },
    components:{
      Home
    }
  }
</script>

<style>
</style>
