import Vue from 'vue'
import Router from 'vue-router'
import PostList from './components/PostList'
import Article from './components/Article'
import UserInfo from './components/UserInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main: PostList
      }
    },
    {
      name: 'post_content',
      path: '/topic/:id',
      components: {
        main: Article
      }
    },
    {
      name: 'user_info',
      path: '/userInfo/:id',
      components: {
        main: UserInfo
      }
    }
  ]
})
