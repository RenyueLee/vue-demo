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
    icon: 'svg-name'             the icon show in the sidebar
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
      path: '/home',
      name: '首页',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

/**
 * 受角色控制由路配置
 */
export const asyncRoutes = [
  {
    path: '/video',
    component: Layout,
    name:'视频管理',
    redirect: '/video/detail',
    meta: {
      title:"视频列表",
      icon:'dashboard',
      roles: ['浏览报警详细', '回复报警人', '填写报警受理结果', '分发报警任务'] ,
    },
    children: [{
      path: '/video/detail',
      name: '视频详细',
      component: () => import('@/views/video/detail'),
      meta: { title:"视频详细", icon:'dashboard', roles: ['浏览报警列表'] },
      hidden: true
    },{
      path: '/video/index',
      name: '视频列表',
      component: () => import('@/views/video/index'),
      meta: { title:"视频列表", icon:'dashboard', roles: ['浏览报警列表'] },
      hidden: true
    }]
  },
  {
    path: '/paper',
    component: Layout,
    name:'试卷管理',
    redirect: '/paper/index',
    meta: {
      title:"试卷列表",
      icon:'dashboard',
      roles: ['浏览报警详细', '回复报警人', '填写报警受理结果', '分发报警任务'] ,
    },
    children: [{
      path: '/paper/index',
      name: '试卷列表',
      component: () => import('@/views/paper/index'),
      meta: { title:"试卷列表", icon:'dashboard', roles: ['浏览报警列表'] },
    },{
      path: '/paper/detail',
      name: '正在考试',
      component: () => import('@/views/paper/detail'),
      meta: { title:"正在考试", icon:'dashboard', roles: ['浏览报警列表'] },
    },]
  },
  {
    path: '/alarmInfo',
    component: Layout,
    redirect: '/alarmInfo',
    meta: { roles: ['浏览报警列表'] },
    children: [{
      path: 'index',
      name: '报警管理',
      component: () => import('@/views/alarmInfo/index'),
      meta: {
        title: '报警管理',
        icon: 'bug',
        roles: ['浏览报警列表'] }
    }]
  },
  {
    path: '/policeman',
    component: Layout,
    redirect: '/policeman',
    meta: { roles: ['浏览警员列表'] },
    children: [{
      path: 'index',
      name: '警员管理',
      component: () => import('@/views/policeman/index'),
      meta: {
        title: '警员管理',
        icon: 'peoples',
        roles: ['浏览警员列表'] }
    }]
  },
  {
    path: '/smsNotification',
    component: Layout,
    redirect: '/smsNotification',
    meta: {
      roles: ['浏览短信通知列表']
    },
    children: [{
      path: 'index',
      name: '短信通知',
      component: () => import('@/views/smsNotification/index'),
      meta: {
        title: '短信通知',
        icon: 'message',
        roles: ['浏览短信通知列表']
      }
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/department',
    name: '系统设置',
    meta: {
      title: '系统设置',
      icon: 'example',
      roles: ['浏览部门列表', '浏览短信模板列表', '浏览权限列表']
    },
    children: [{
      path: 'department',
      name: '部门设置',
      component: () => import('@/views/system/department/index'),
      meta: {
        title: '部门设置',
        icon: 'tree',
        roles: ['浏览部门列表', '浏览部门详细', '添加部门', '编辑部门', '删除部门']
      }
    },
    {
      path: 'smsTemplate',
      name: '短信模板设置',
      component: () => import('@/views/system/smsTemplate/index'),
      meta: {
        title: '短信模板设置',
        icon: 'skill',
        roles: ['浏览短信模板列表', '浏览短信模板详细', '添加短信模板', '编辑短信模板', '删除短信模板']
      }
    },
    {
      path: 'group',
      name: '权限设置',
      component: () => import('@/views/system/group/index'),
      meta: {
        title: '权限设置',
        icon: 'skill',
        roles: ['浏览权限列表', '浏览权限详细', '添加权限', '编辑权限', '删除权限']
      }
    }]
  },{
    path: '/alarmInfo/detail/:id',
    component: Layout,
    redirect: '/alarmInfo/detail',
    meta: { roles: ['浏览报警详细', '回复报警人', '填写报警受理结果', '分发报警任务'] },
    children: [{
      path: '/alarmInfo/detail/:id',
      name: '报警详细',
      component: () => import('@/views/alarmInfo/detail'),
      meta: { roles: ['浏览报警详细', '回复报警人', '填写报警受理结果', '分发报警任务'] },
      hidden: true
    }]
  },{
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { roles: ['浏览报警详细', '回复报警人', '填写报警受理结果', '分发报警任务'] },
    children: [{
      path: '/profile/index',
      name: '报警详细',
      component: () => import('@/views/profile/index'),
      meta: { roles: ['浏览报警详细', '回复报警人', '填写报警受理结果', '分发报警任务'] },
      hidden: true
    },{
      path: '/profile/myexams',
      name: '报警详细',
      component: () => import('@/views/profile/myExams'),
      meta: { roles: ['浏览报警详细', '回复报警人', '填写报警受理结果', '分发报警任务'] },
      hidden: true
	},{
      path: '/profile/mycourses',
      name: '报警详细',
      component: () => import('@/views/profile/myCourses'),
      meta: { roles: ['浏览报警详细', '回复报警人', '填写报警受理结果', '分发报警任务'] },
      hidden: true	
	}]
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
