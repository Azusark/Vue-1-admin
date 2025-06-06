//对外暴露配置路由（常量路由）

export const constantRoute = [{
    //登录页面
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
},

{
    //主页
    path: '/',
    name: 'layout',
    component: () => import('@/views/home/index.vue'),
},

{
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
},

{
    //其它
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any'
}
]