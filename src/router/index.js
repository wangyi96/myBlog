import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home'
import Article from '../components/Article/article'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/home',
      component:Home,
    },
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/article',
      component:Article
    }
  ]
})
