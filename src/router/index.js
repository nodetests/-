import Vue from 'vue'
import VueRouter from 'vue-router'
import Home   from  '../pages/Home.vue'
import users  from  '../pages/users/users'
import rights from  '../pages/rights/rights'
import roles  from  '../pages/rights/roles'
import goods  from  '../pages/goods/goods'
import params from  '../pages/goods/params'
import categories from '../pages/goods/categories'
import orders from  '../pages/orders/orders'
import reports from '../pages/reports/reports'

Vue.use(VueRouter)

const routes = [
    {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/login')
   },
 
  {
    path: '/',
    component: Home,
    children: [{
        path: '',
        name: 'index',
        component: () =>import ('../pages/index/index')
    }]
  },

{
  path: '/',
  name: 'home',
  component: Home,
    children:[
      {
        path: '/users',
        name: 'users',
        component: () => import ('../pages/users/users')   
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import ('../pages/rights/rights')   
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import ('../pages/rights/roles')   
      },

      {
        path: '/goods',
        name: 'goods',
        component: () => import ('../pages/goods/goods')   
      },
      {
        path: '/addgoods',
        name: 'addgoods',
        component: () => import ('../pages/goods/addgoods')   
      },
      {
        path: '/params',
        name: 'params',
        component: () => import ('../pages/goods/params')   
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import ('../pages/goods/categories')   
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import ('../pages/orders/orders')   
      },
      {
        path: '/reports',
        name: 'reports',
        component: () => import ('../pages/reports/reports')   
      },
  ]
},

  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home,
  //     children:[
  //     {
  //       path: '/users/users',
  //       name: 'users',
  //       component: () => import ('../pages/users/users')   
  //     },
  //     {
  //       path: '/rights/rights',
  //       name: 'rights',
  //       component: () => import ('../pages/rights/rights')   
  //     },
  //     {
  //       path: '/rights/roles',
  //       name: 'roles',
  //       component: () => import ('../pages/rights/roles')   
  //     },
  //     {
  //       path: '/goods/goods',
  //       name: 'goods',
  //       component: () => import ('../pages/goods/goods')   
  //     },
  //     {
  //       path: '/goods/params',
  //       name: 'params',
  //       component: () => import ('../pages/goods/params')   
  //     },
  //     {
  //       path: '/goods/categories',
  //       name: 'categories',
  //       component: () => import ('../pages/goods/categories')   
  //     },
  //     {
  //       path: '/orders/orders',
  //       name: 'orders',
  //       component: () => import ('../pages/orders/orders')   
  //     },
  //     {
  //       path: '/reports/reports',
  //       name: 'reports',
  //       component: () => import ('../pages/reports/reports')   
  //     },
  //     ]
  // },

 

]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
  mode: isPro ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
