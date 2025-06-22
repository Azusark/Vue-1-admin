import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes';
import useUserStore from '@/store/modules/user';

let router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),
  routes: constantRoute,
  //路由滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
});

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 获取用户相关的小仓库，以判断用户是否登录
  const userStore = useUserStore();
  const token = userStore.token;

  // 判断用户是否登录
  if (token) {
    // 用户已登录
    // 如果已登录用户访问登录页，则重定向到首页
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // 访问其他页面则直接放行
      next();
    }
  } else {
    // 用户未登录
    // 如果用户访问的是登录页，则直接放行
    if (to.path === '/login') {
      next();
    } else {
      // 如果访问其他页面，则重定向到登录页
      // 并将他们原本想去的页面路径作为查询参数保存，以便登录后跳转回来
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  }
});

export default router
