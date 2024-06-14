import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

  // {
  //   path: '/Emp',
  //   name: 'Emp',
  //   component: () => import("@/views/tilas/EmpView.vue"),
  // },
  
  // {
  //   path: '/res',
  //   name: 'res',
  //   component: () => import("@/views/tilas/resView.vue"),
  // },
  // {
  //   path: '/pro',
  //   name: 'pro',
  //   component: () => import("@/views/tilas/proView.vue"),
  // },
  // {
  //   path: '/achi',
  //   name: 'achi',
  //   component: () => import("@/views/tilas/achiView.vue"),
  // },
  // {
  //   path:'/',
  //   redirect:'/Emp'
  // }

   {
    path: '/bu',
    name: 'bu',
    component: () => import("@/views/tilas/buJian.vue"),
  }, 
  {
    path:'/',
    redirect:'/bu'
  }
]

const router = new VueRouter({
  routes
})

export default router
