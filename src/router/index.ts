import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
// import Start from '../views/Start.vue'
import FullClass from '../views/FullClass.vue'
import Student from '../views/Student.vue'
import EditStudent from '../views/EditStudent.vue'
import AddStudent from '../views/AddStudent.vue'
import LoggedOut from '../views/LoggedOut.vue'
import Error404 from '../views/Error404.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      component: FullClass,
      props: true
    },
    {
      path: '/FullClass',
      name: 'FullClass',
      component: FullClass,
      props: true
    },
    {
      path: '/Student/:lastName:firstName',
      name: 'Student',
      component: Student,
      props: true,
      // children: [
      //   {
      //     path: "edit",
      //     name: EditStudent,
      //     component: EditStudent,
      //     props: true
      //   }
      // ]
    },{
      path: '/AddStudent',
      name: 'AddStudent',
      component: AddStudent,
      props: true
    },{
      path: '/LoggedOut',
      name: 'LoggedOut',
      component: LoggedOut,
      props: true
    },
    {
      path: '/Error404',
      name: 'Error404',
      component: Error404,
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
