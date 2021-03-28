import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import FullClass from '../views/FullClass.vue'
import Student from '../views/Student.vue'
import EditStudentData from '../views/EditStudentData.vue'
import EditStudentGrades from '../views/EditStudentGrades.vue'
import AddStudent from '../views/AddStudent.vue'
import LoggedOut from '../views/LoggedOut.vue'
import Error404 from '../views/Error404.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
  },
   {
    path: '/:pathMatch(.*)*',
    redirect: "/Error404",
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router



