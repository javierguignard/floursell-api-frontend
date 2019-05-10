import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import Base from '../components/Base'
import Client from '../components/Client'
import Login from '../components/Login'
import Sells from '../components/Sells'
import Registration from '../components/Registration'

Vue.use(VueRouter)

const routes = [
  { 
    path: '',
    component: Base,
    children: [
      { path: '/client', name: 'client', component: Client },
      { path: '/sell', name: 'sell', component: Sells }
    ]
  },
  {
    path: 'hola',
    component: App,
    children: [
      { path: '/login', name: 'login', component: Login },
      { path: '/registration', name: 'registration', component: Registration }
    ]
  }
]

export default new VueRouter({
  routes,
  mode: 'history'
})
