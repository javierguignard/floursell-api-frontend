import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import Base from '../components/Base'
import Client from '../components/Client'
import Login from '../components/Login'
import Orders from '../components/Orders'
import AddClient from '../components/AddClient'
import ClientSells from '../components/ClientSells'
import Registration from '../components/Registration'
import AddPayment from '../components/addPayment'
import AddOrder from '../components/addOrder'
import AddSell from '../components/addSell'
import ProductionOrders from '../components/ProductionOrders'
import ProductionTemplate from '../components/productionTemplate'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/base',
    component: Base,
    children: [
      { path: '/client', name: 'client', component: Client },
      { path: '/order', name: 'order', component: Orders },
      { path: '/addClient', name: 'AddClient', component: AddClient },
      { path: '/clientSells', name: 'ClientSells', component: ClientSells },
      { path: '/addPayment', name: 'AddPayment', component: AddPayment },
      { path: '/addOrder', name: 'AddOrder', component: AddOrder },
      { path: '/addSell', name: 'AddSell', component: AddSell },
      { path: '/productionOrders', name: 'productionOrders', component: ProductionOrders },
      { path: '/productionTemplate', name: 'productionTemplate', component: ProductionTemplate }
    ]
  },
  {
    path: '',
    component: App,
    children: [
      { path: '', name: 'login', component: Login },
      { path: '/registration', name: 'registration', component: Registration }
    ]
  }
]

export default new VueRouter({
  routes,
  mode: 'history'
})
