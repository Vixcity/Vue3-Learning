import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store';
import { checkLogin } from "@/utils";
import Layout from '@/layouts';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "about" */ '../views/401.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const whiteList = ['/login', '/404', '/401']
// 路由守卫
router.beforeEach((to, from, next) => {
  // to如果在白名单内，进行放行
  // console.log(to.path)
  if (whiteList.includes(to.path)) {
    next()
  } else {
    // 验证是否登录
    // console.log(store.state.user.userInfo.username,'用户信息')
    if (checkLogin()) {
      // 登录情况

      // 即使是刷新也是从本地存储中获取
      // 后续 是否登录 应该从本地存储获取后 重新验证
      // 判断 是否已经动态生成菜单
      // 如果生成 next
      // 否则现场请求后台生成菜单

      // 判断动态路由菜单是否已经生成
      if (store.state.user.hasMenus) {
        next()
      } else {
        // 没有菜单
        // 需要发请求获取路由生成菜单再放行
        loadMenus(next, to)
      }
    } else {
      // 未登录情况，跳转到登录页面
      next('/login?redirect=' + to.full)
    }
  }
})

function asyncRouteHandler(routes) {
  return routes.map(route => {
    if (route.component === 'Layout') {
      route.component = Layout
    } else {
      // children
      const componentPath = route.component
      route.component = () => import(`../views/${componentPath}.vue`)
    }

    if (route.children) {
      route.children = asyncRouteHandler(route.children)
    }

    return route
  })
}

import Axios from 'axios';
async function loadMenus(next, to) {
  // 先发请求获取后台的路由接口数据
  const res = await Axios.get('/menus/build');
  // console.log(res.data)
  const asyncRoutes = asyncRouteHandler(res.data)
  // console.log(asyncRoutes)

  store.commit('user/setMenus',asyncRoutes); // 不含404
  // 在末尾添加404处理
  asyncRoutes.push({ path: "/:catchAll(.*)", redirect: '/404' })

  // 添加到路由中
  asyncRoutes.forEach(route => {
    router.addRoute(route)
  });

  // 处理 hasMenus 
  store.commit('user/setMenus',true)
  
  // 最终放行
  next({ ...to, replace: true })
}

export default router
