//引入项目中全部全局组件

import SvgIcon from './SvgIcon/index.vue';
import Pagination from './Pagination/index.vue';
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import type { App } from 'vue';
//对外暴露插件对象

const allGloablComponents: Record<string, any> = { SvgIcon, Pagination };
console.log(allGloablComponents);
export default {
    //务必叫做install方法
    install(app: App) {
        //注册项目全部全局组件
        Object.keys(allGloablComponents).forEach(key => {
            app.component(key, allGloablComponents[key]);
        });
        //将element-plus提供的全部图标全局注册
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}