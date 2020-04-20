import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
import FullClass from '../views/FullClass.vue'
import AddStudent from '../views/AddStudent.vue'
import MainLogPanel from '../views/MainLogPanel.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      // component: Start,
      props: true
    },
    {
      path: '/FullClass',
      name: 'FullClass',
      component: FullClass,
      props: true
    },{
      path: '/AddStudent',
      name: 'AddStudent',
      component: AddStudent,
      props: true
    },{
      path: '/MainLogPanel',
      name: 'MainLogPanel',
      component: MainLogPanel,
      props: true
    },
    {
      path: '/Error404',
      name: 'Error404',
      // component: Error404,
      props: false
    },
     {
      path: '*',
      redirect: "/Error404"
    }
  ]
})
  // const routes: Array<RouteConfig> = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })
//
// export default router
