//引入项目中全部全局组件
// @ts-ignore
import SvgIcon from './SvgIcon/index.vue';
// @ts-ignore
import Pagination from './Pagination/index.vue';
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
    }
}