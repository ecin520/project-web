import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '../components/Home'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/common/Login')
    },
    {
      path: '/transit',
      name: 'Transit',
      redirect: '/home-page',
      meta: {
        requireAuth: true
      },
      component: () => import('../components/views/Transit'),
      children: [
        {
          path: '/home-page',
          name: 'HomePage',
          redirect: '/my-home',
          component: () => import('../components/views/content/HomePage'),
          children: [
            {
              path: '/my-home',
              name: 'MyHome',
              component: () => import('../components/views/content/home/MyHome'),
            },
            {
              path: '/my-project',
              name: 'MyProject',
              component: () => import('../components/views/content/home/MyProject'),
            },
            {
              path: '/my-task',
              name: 'MyTask',
              component: () => import('../components/views/content/home/MyTask'),
            },
            {
              path: '/work-space',
              name: 'WorkSpace',
              component: () => import('../components/views/content/single/WorkSpace')
            },
            {
              path: '/contact',
              name: 'Contact',
              component: () => import('../components/views/content/single/Contact')
            }
          ]
        },
        {
          path: '/project-home',
          name: 'ProjectHome',
          component: () => import('../components/views/content/single/ProjectHome')
        },
        {
          path: '/project-browse',
          name: 'ProjectBrowse',
          component: () => import('../components/views/content/single/ProjectBrowse')
        },
        {
          path: '/task-detail',
          name: 'TaskDetail',
          component: () => import('../components/views/content/single/TaskDetail')
        },
        {
          path: '/user-info',
          name: 'UserInfo',
          component: () => import('../components/views/content/single/UserInfo')
        }
      ]
    },
    {
      path: '/*',
      component: () => import('../components/common/404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      Message({ message: 'token已过期或未登录', type: 'error' })
      store.dispatch('logout')
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router