import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      meta: { title: '首页', icon: 'el-icon-s-help' },
      component: () => import('@/views/home/index')
    }, {
      path: 'personalInfo',
      name: 'personalInfo',
      component: () => import('@/views/personalInfo/index'),
      meta: { title: '个人信息', icon: 'el-icon-s-help' },
      hidden: true
    }]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/company/index'),
        meta: { title: '企业管理', icon: 'dashboard' }
      },
      {
        path: 'companyDetail',
        name: 'companyDetail',
        component: () => import('@/views/company/companyDetail'),
        meta: { title: '企业管理 / 新增企业', icon: 'dashboard' },
        hidden: true
      },
      {
        path: 'companyHome',
        name: 'companyHome',
        component: () => import('@/views/company/companyHome'),
        meta: { title: '企业管理 / 企业详情', icon: 'dashboard' },
        hidden: true
      }

    ]
  },

  {
    path: '/inter',
    component: Layout,
    redirect: '/inter/interface',
    name: 'inter',
    meta: { title: '接口管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'interface',
        name: 'interface',
        component: () => import('@/views/interface/index'),
        meta: { title: '应用授权管理', icon: 'table' }
      },
      {
        path: 'interfaceDetail',
        name: 'interfaceDetail',
        component: () => import('@/views/interface/modules/details'),
        meta: { title: '应用授权管理 / 应用详情', icon: 'table' },
        hidden: true
      },
      {
        path: 'addDetail',
        name: 'addDetail',
        component: () => import('@/views/interface/modules/addDetail'),
        meta: { title: '应用授权管理 / 新增应用', icon: 'table' },
        hidden: true
      },
      {
        path: 'interfaceDocumentation',
        name: 'interfaceDocumentation',
        component: () => import('@/views/interfaceDocumentation'),
        meta: { title: '接口文档', icon: 'table' }
      },
      {
        path: 'interView',
        name: 'interView',
        component: () => import('@/views/interView/index'),
        meta: { title: '接口访问记录', icon: 'table' }
      },
      {
        path: 'interViewDetails',
        name: 'interViewDetails',
        component: () => import('@/views/interView/modules/details'),
        meta: { title: '接口访问记录 / 应用详情', icon: 'table' },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   name: 'documentation',
  //   redirect: '/documentation/list',
  //   alwaysShow: true, // 这个会使根目录一直出现，不管有几个子目录
  //   meta: { title: '文档管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'documentationList',
  //       meta: { title: '文档列表', icon: 'el-icon-s-help' },
  //       component: () => import('@/views/documentation/index')
  //     },
  //     {
  //       path: 'detail',
  //       name: 'documentationDetail',
  //       meta: { title: '文档详情', icon: 'el-icon-s-help' },
  //       component: () => import('@/views/documentation/modules/details'),
  //       hidden: true
  //     }
  //   ]
  // },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/systemConfig',
    name: 'inter',
    alwaysShow: true, // 这个会使根目录一直出现，不管有几个子目录
    meta: { title: '系统管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'systemConfig',
        name: 'systemConfig',
        component: () => import('@/views/system/index'),
        meta: { title: '系统配置', icon: 'table' }
      },
      {
        path: 'systemLog',
        name: 'systemLog',
        component: () => import('@/views/system/systemLog'),
        meta: { title: '系统日志', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
