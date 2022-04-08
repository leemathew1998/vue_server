import { createRouter, createWebHashHistory } from 'vue-router'
// import { useStore } from 'vuex'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('../views/home'),
    children: [

      {
        path: '/groupsetting',
        name: 'groupsetting',
        component: () => import('../views/home/components/groupsetting.vue')
      },
      {
        path: '/creatsetting',
        name: 'creatsetting',
        component: () => import('../views/home/components/creatsetting.vue')
      },
      {
        path: '/usersetting',
        name: 'usersetting',
        component: () => import('../views/home/components/usersetting.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// const store = useStore();
router.beforeEach(async (to, from, next) => {
  if (to.fullPath !== '/login') {
    if (store.getters.userinfo.user_name) {
      next();
    } else {
      next('/login')
    }
  } else {
    next()
  }


});
export default router
