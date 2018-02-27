<template>
  <v-app>
    <v-toolbar dense color="grey lighten-4" class="toolbar">
      <v-btn icon @click="back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="black--text">Article</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>share</v-icon>
      </v-btn>
    </v-toolbar>

  </v-app>
</template>

<script>
  export default {
    methods:{
      data(){
        return{

        }
      },
      back(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

</style>
