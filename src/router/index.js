import { createRouter, createWebHistory, onBeforeRouteUpdate } from 'vue-router'
import Inbox from '../webapp/DashBoard/components/Inbox.vue'
import Today from '../webapp/DashBoard/components/Today.vue'
import Upcoming from '../webapp/DashBoard/components/Upcoming.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Inbox,
      redirect: '/inbox'
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: Inbox,
      props: (route) => ({
        page: parseInt(route.query.page) || 1
      })
    },
    {
      path: '/today',
      name: 'today',
      component: Today
    },
    {
      path: '/upcoming',
      name: 'upcoming',
      component: Upcoming
    }
  ]
})
export default router
