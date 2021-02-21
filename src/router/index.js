import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    beforeEnter(to,from,next){
      
      if (store.state.loginUserState){
        
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter(to,from,next){
      console.log(store.state.loginUserState)
      if (store.state.loginUserState){
        console.log('here1')
        next()
      }else{
        console.log('here1')
        next(false)
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
