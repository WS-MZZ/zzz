import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import AppMain from '../views/layout/components/AppMain'

/**
 * 实例化vue的时候只挂载constantRouter  
 * 如果没有项目中没有权限的概念，应该把所有的路由配置constantRouter中
 */

export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login/index'), hidden: true },
  { path: '/forget', component: () => import('@/views/login/forget_pwd'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    meta: {id: 0},
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
    }]
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'example' },
      }
    ]
  }
]

/**
 * 异步挂载的路由
 * 根据权限动态加载的路由表 
 */
export const asyncRouterMap = [
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/list',
    name: "banner",
    meta: { title: 'Banner', icon: 'example', permissions: ['BANNER_MANAGE'] },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/cms/banner/index'),
        meta: { title: 'Banner', icon: 'form', permissions: ['BANNER_MANAGE'] }
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/cms/banner/add'),
        meta: { title: '新增', icon: 'form', permissions: ['BANNER_MANAGE'] },
        hidden: true
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/cms/banner/edit'),
        meta: { title: '编辑', icon: 'form', permissions: ['BANNER_MANAGE'] },
        hidden: true
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/list',
    name: 'news',
    meta: { title: '新闻管理', icon: 'example', permissions: ['NEWS_MANAGE'] },
    children: [
      {
        path: 'list',
        name: 'news-list',
        component: () => import('@/views/cms/news/index'),
        meta: { title: '新闻管理', icon: 'form', permissions: ['NEWS_MANAGE'] }
      },
      {
        path: 'add',
        name: 'news-add',
        component: () => import('@/views/cms/news/add'),
        meta: { title: '新增新闻', icon: 'form', permissions: ['NEWS_MANAGE'] },
        hidden: true
      },
      {
        path: 'edit',
        name: 'news-edit',
        component: () => import('@/views/cms/news/edit'),
        meta: { title: '编辑新闻', icon: 'form', permissions: ['NEWS_MANAGE'] },
        hidden: true
      },
      {
        path: 'tag-list',
        name: 'news-tag-list',
        component: () => import('@/views/cms/news/tag/index'),
        meta: { title: '分类管理', icon: 'form', permissions: ['NEWS_MANAGE'] }
      },
      {
        path: 'tag-add',
        name: 'news-tag-add',
        component: () => import('@/views/cms/news/tag/add'),
        meta: { title: '新增分类', icon: 'form', permissions: ['NEWS_MANAGE'] },
        hidden: true
      },
      {
        path: 'tag-edit',
        name: 'news-tag-edit',
        component: () => import('@/views/cms/news/tag/edit'),
        meta: { title: '编辑分类', icon: 'form', permissions: ['NEWS_MANAGE'] },
        hidden: true
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user/list',
    name: "system-setting",
    meta: { title: '系统管理', icon: 'example', permissions: ['SYSTEM_MANGE'] },
    children: [
      {
        path: 'user',
        name: 'user',
        component: AppMain,
        redirect: '/system/user/list',
        children: [
          {
            path: 'list',
            name: 'user-list',
            component: () => import('@/views/system/user/index'),
            meta: { title: '用户管理', icon: 'form', permissions: ['SYSTEM_MANGE'] }
          },
          {
            path: 'add',
            name: 'user-add',
            component: () => import('@/views/system/user/add'),
            meta: { title: '添加用户', icon: 'form', permissions: ['SYSTEM_MANGE'] },
            hidden: true
          },
          {
            path: 'edit',
            name: 'user-edit',
            component: () => import('@/views/system/user/edit'),
            meta: { title: '编辑用户', icon: 'form', permissions: ['SYSTEM_MANGE'] },
            hidden: true
          }
        ]
      },
      {
        path: 'role',
        name: 'role',
        component: AppMain,
        redirect: '/system/role/list',
        children: [
          {
            path: 'list',
            name: 'role-list',
            component: () => import('@/views/system/role/index'),
            meta: { title: '角色管理', icon: 'form', permissions: ['SYSTEM_MANGE'] }
          },
          {
            path: 'add',
            name: 'role-add',
            component: () => import('@/views/system/role/add'),
            meta: { title: '添加角色', icon: 'form', permissions: ['SYSTEM_MANGE'] },
            hidden: true
          },
          {
            path: 'edit',
            name: 'role-edit',
            component: () => import('@/views/system/role/edit'),
            meta: { title: '编辑角色', icon: 'form', permissions: ['SYSTEM_MANGE'] },
            hidden: true
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
