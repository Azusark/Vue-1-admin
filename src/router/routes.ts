//对外暴露配置路由（常量路由）

import { createLoadingComponent } from 'element-plus/es/components/loading/src/loading.mjs';
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';
import { fa } from 'element-plus/es/locales.mjs';

export const constantRoute = [{
    //登录页面
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
        title: '登录',//标题
        hidden: true,//是否隐藏
        icon: "Promotion",//图标,已全局注册element-plus所有图标
    }
},

{
    //主页
    path: '/',
    name: 'layout',
    meta: {
        title: 'layout',
        hidden: false,
        icon: "UserFilled",//图标
        redirect: '/home',//重定向
    },
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/index.vue'),
            meta: {
                title: '首页',//菜单标题
                hidden: false,
                icon: "HomeFilled"//图标
            }
        },

    ]

},

{
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
        title: '404',
        hidden: true,
        icon: 'DocumentDelete'
    }
},

{
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
        hidden: false,
        title: '数据展示',
        icon: 'Platform'
    }
},

{
    //其它
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '任意路由',
        hidden: true,
        icon: 'DataLine'
    }
}
]