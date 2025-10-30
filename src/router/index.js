// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'

const routes = [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
    },
    {
      path: '/',
      component: BasicLayout, // 所有子路由都将使用这个布局
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/DashboardView.vue'),
          meta: { title: '工作台' }
        },
        {
          path: 'project',
          name: 'project',
          redirect: '/project/list',
          children: [
            {
              path: 'list',
              name: 'project-list',
              component: () => import('@/views/project/ProjectListView.vue'),
              meta: { title: '项目列表' }
            }
          ]
        },
        {
          path: 'data',
          name: 'data',
          redirect: '/data/management',
          children: [
            {
              path: 'management',
              name: 'data-management',
              component: () => import('@/views/data/DataManagementView.vue'),
              meta: { title: '数据管理' }
            }
          ]
        },
        {
          path: 'task',
          name: 'task',
          redirect: '/task/list',
          children: [
             {
              path: 'creation',
              name: 'task-creation',
              component: () => import('@/views/task/TaskCreationView.vue'),
              meta: { title: '创建任务' }
            },
            {
              path: 'list',
              name: 'task-list',
              component: () => import('@/views/task/TaskListView.vue'),
              meta: { title: '任务列表' }
            },
          ]
        },
        {
          path: 'visualization',
          name: 'visualization',
          redirect: '/visualization/data',
          children: [
            {
              path: 'data',
              name: 'visualization-data',
              component: () => import('@/views/visualization/DataVisualizationView.vue'),
              meta: { title: '数据可视化' }
            },
            {
              path: 'task',
              name: 'visualization-task',
              component: () => import('@/views/visualization/TaskResultVisualizationView.vue'),
              meta: { title: '任务结果可视化' }
            }
          ]
        },
        {
          path: 'user',
          name: 'user',
          redirect: '/user/list',
          children: [
            {
              path: 'list',
              name: 'user-list',
              component: () => import('@/views/user/UserListView.vue'),
              meta: { title: '用户列表' }
            }
          ]
        },
        {
          path: 'api',
          name: 'api',
          redirect: '/api/list',
          children: [
            {
              path: 'list',
              name: 'api-list',
              component: () => import('@/views/api/ApiListView.vue'),
              meta: { title: '接口列表' }
            }
          ]
        }
      ]
    },
    // 404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/exception/404.vue'),
    }
  ]

// --- !! 新增：开发环境专属路由 !! ---
const devRoutes = [
  {
    path: '/dev',
    component: BasicLayout, // 所有子路由都将使用这个布局
    redirect: '/dev/pro-table',
    children: [
      {
        path: 'pro-table',
        name: 'dev-pro-table',
        component: () => import('@/views/develop/cases/ProTable.case.vue'),
      },
      {
        path: 'map-view',
        name: 'dev-map-view',
        component: () => import('@/views/develop/cases/MapView.case.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 根据环境合并路由
  routes: import.meta.env.DEV ? [...routes, ...devRoutes] : routes,
});

export default router
