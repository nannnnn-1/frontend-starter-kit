# Phoenix 前端启动套件 (phoenix-frontend-starter-kit) v1.0

## 1. 简介

`phoenix-frontend-starter-kit` 是一个基于 Vue 3, Vite, Ant Design Vue 和 Pinia 的、功能完备、工程化健全的前端开发脚手架。它专为快速构建企业级中后台AI应用而设计，内置了完善的认证流程、API请求封装、动态路由守卫和可复用的布局系统。

使用本套件的目标是：**让开发者能够跳过繁琐的前期配置，直接聚焦于业务逻辑和页面的开发。**

## 2. 技术栈

- **核心框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **UI框架**: Ant Design Vue 4.x
- **路由**: Vue Router 4.x
- **状态管理**: Pinia 2.x
- **HTTP客户端**: Axios
- **代码规范**: ESLint + Prettier
- **Git钩子**: Husky + lint-staged

## 3. 核心功能

- **完善的工程化配置**: 开箱即用的代码规范检查和自动格式化。
- **统一的API请求层**:
  - 自动附加JWT Token到请求头。
  - 统一的请求/响应拦截，实现全局错误提示和认证失效处理。
  - 模块化的API管理 (`src/api/modules`)。
- **强大的状态管理**:
  - 使用Pinia进行全局状态管理。
  - `userStore`内置登录、登出逻辑，并通过插件实现状态持久化。
- **动态路由与权限控制**:
  - 全局路由守卫，实现页面访问的登录拦截。
  - 登录后自动跳转回目标页面。
  - 根据路由`meta`信息自动更新页面标题。
- **可复用的布局系统**:
  - 内置经典的后台管理布局 (`BasicLayout`)。
  - 顶部导航栏、动态侧边菜单和内容区已完全组件化。
  - 通过Pinia的`appStore`管理全局UI状态（如菜单折叠）。

## 4. 如何开始

### 4.1 环境准备

- Node.js >= 18.0.0
- pnpm (推荐) 或 npm/yarn

### 4.2 安装

克隆本项目到本地：
```bash
git clone <your-repo-url>/phoenix-frontend-starter-kit.git new-project-name
cd new-project-name
```

安装依赖：
```bash
npm install
```

### 4.3 本地开发

运行开发服务器：
```bash
npm run dev
```
服务器将启动在 `http://localhost:5173`。

### 4.4 环境变量配置

项目根目录下的 `.env` 和 `.env.development` 文件用于配置环境变量。核心配置是API代理地址。

**`vite.config.js`**:
请根据你的中台微服务地址，修改`server.proxy`配置。当前配置适用于本地开发，将不同的API前缀代理到不同的服务端口。

```javascript
// vite.config.js
server: {
  proxy: {
    '/api/user': { target: 'http://localhost:8000', ... },
    '/api/data': { target: 'http://localhost:8002', ... },
    // ...
  }
}
```

## 5. 目录结构与开发规范

- **`src/api`**: 存放所有API请求模块。
- **`src/assets`**: 存放静态资源（图片、全局CSS）。
- **`src/components`**: 存放可复用的全局组件。
- **`src/layouts`**: 存放页面布局组件。
- **`src/router`**: 存放路由配置和导航守卫。
- **`src/stores`**: 存放Pinia的Store模块。
- **`src/utils`**: 存放通用工具函数（如`request.js`）。
- **`src/views`**: 存放页面级组件。

**开发新页面流程**:
1.  在`src/views`下创建你的页面组件 (`.vue`文件)。
2.  在`src/router/index.js`中配置新页面的路由，并指定其父组件为`BasicLayout`（如果需要）。
3.  在`src/components/SideMenu/index.vue`中添加新页面的菜单项。
4.  在页面组件中，通过 `import { ... } from '@/api/...'` 调用API，通过 `import { use...Store } from '@/stores/...'` 使用全局状态。

## 6. 构建与部署

构建生产环境包：
```bash
npm run build
```
构建产物将生成在`dist/`目录下。你可以将此目录下的所有文件部署到任何静态文件服务器（如Nginx, OSS静态网站托管）。