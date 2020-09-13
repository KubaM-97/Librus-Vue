import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Router from 'vue-router'
// import Start from '../views/Start.vue'
import FullClass from '../views/FullClass.vue'
import Student from '../views/Student.vue'
import EditStudentData from '../views/EditStudentData.vue'
import EditStudentGrades from '../views/EditStudentGrades.vue'
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
      children: [
        {
          path: 'EditData',
          name: 'EditData',
          component: EditStudentData,
          props: true
        },
        {
          path: 'editGrades',
          name: 'EditGrades',
          component: EditStudentGrades,
          props: true
        }
      ]
    },{
      path: '/AddStudent',
      name: 'AddStudent',
      component: AddStudent,
      props: true
    },
    {
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
    // },
    //  {
    //   path: '*',
    //   redirect: "/Error404"
    }
  ]
})
