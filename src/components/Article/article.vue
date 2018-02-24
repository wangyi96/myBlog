<template>
    <v-app>
      <v-toolbar dense color="grey lighten-4">
        <v-toolbar-side-icon @click="isShow = !isShow"></v-toolbar-side-icon>
        <v-toolbar-title class="black--text">Article</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card dark color="primary">
              <v-card-text class="px-0">12</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6 v-for="i in 2" :key="`6${i}`">
            <v-card dark color="secondary">
              <v-card-text class="px-0">6</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 v-for="i in 3" :key="`4${i}`">
            <v-card dark color="primary">
              <v-card-text class="px-0">4</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs3 v-for="i in 4" :key="`3${i}`">
            <v-card dark color="secondary">
              <v-card-text class="px-0">3</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs2 v-for="i in 6" :key="`2${i}`">
            <v-card dark color="primary">
              <v-card-text class="px-0">2</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs1 v-for="i in 12" :key="`1${i}`">
            <v-card dark color="secondary">
              <v-card-text class="px-0">1</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>



      <v-navigation-drawer
        temporary
        v-model="isShow"
        absolute
      >
        <v-list class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Ryan</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="item in items" :key="item.title" @click="skip(item.to)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-app>
</template>

<script>
  export default {
    data(){
      return{
        isShow: false,
        items: [
          { title: 'Home', icon: 'dashboard',to:'/home'},
          { title: 'About', icon: 'question_answer' }
        ]
      }
    },
    methods:{
      skip(url){
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped>

</style>
