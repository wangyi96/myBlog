<template>
    <v-app>
      <v-toolbar dense color="grey lighten-4" class="toolbar" v-if="">
        <v-toolbar-side-icon @click="isShow = !isShow"></v-toolbar-side-icon>
        <v-toolbar-title class="black--text">Catalogue</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar>

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

      <v-content>
        <v-container>
          <v-layout row wrap align-center>
            <v-flex xs12 md12>
              <div class="text-xs-center">
                <v-avatar size="125px">
                  <img
                    class="img-circle elevation-7 mb-1"
                    src="./men.jpg"
                  >
                </v-avatar>
                <div class="headline">Ryan</div>
                <!--<div class="subheading text-xs-center grey&#45;&#45;text pt-1 pb-3">Lorem ipsum dolor sit amet</div>-->
                <!--<v-layout justify-space-between>
                  <a href="javascript:;" class="body-2">Home</a>
                  <a href="javascript:;" class="body-2">About</a>
                  <a href="javascript:;" class="body-2">Github</a>
                  <a href="javascript:;" class="body-2">Other</a>
                </v-layout>-->
              </div>
            </v-flex>
            <v-flex xs12 md12>
              <div v-for="post in posts" :key="post.title">
                <v-card class="my-3" hover>
                  <v-card-media
                    class="white--text"
                    height="170px"
                    :src="post.imgUrl"
                  >
                    <v-container fill-height fluid>
                      <v-layout>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline" style="font-size: 18px !important;">{{post.title}}</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-media>
                  <v-card-text >
                    {{ post.content }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat class="blue--text" @click="skip()">Read More</v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
  export default {
    data(){
      return{
        isShow: false,
        items: [
          { title: 'Home', icon: 'dashboard',to:'/home'},
          { title: 'About', icon: 'question_answer' },
          { title: 'Article', icon: 'book',to:'/article' },
        ],
        posts: [
          {
            title: 'Fusce ullamcorper tellus',
            content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna.',
            imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg'
          },
          {
            title: 'Donec vitae suscipit lectus, a luctus diam.',
            content: 'Donec vitae suscipit lectus, a luctus diam. Proin vitae felis gravida, lobortis massa sit amet, efficitur erat. Morbi vel ultrices nisi.',
            imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/docks.jpg'
          },
          {
            title: 'Vestibulum condimentum quam',
            content: 'At sagittis sapien vulputate. Vivamus laoreet lacus id magna rutrum dapibus. Donec vel pellentesque arcu. Maecenas mollis odio tempus felis elementum commodo.',
            imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/plane.jpg'
          }
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
