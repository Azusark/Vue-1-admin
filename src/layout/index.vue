<template>
    <div class="layout_container">
        <div class="layout_slider">
            <Logo></Logo>
            <!--展示菜单-->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu background-color=#1f1e33 text-color="#fff" active-text-color="#ffd04b">
                    <Menu :menuList=userStore.menuRoutes></Menu>
                </el-menu>
            </el-scrollbar>
        </div>

        <div class="layout_tabbar">

        </div>

        <div class="layout_main">
            <p style="height:10000px;margin-top: 20px;background-color: black;"></p>
        </div>
    </div>
</template>

<script setup lang="ts">
//LOGO组件
import Logo from './logo/index.vue'
//菜单组件
import Menu from './menu/index.vue'
import useuseStore from '@/store/modules/user';
let userStore = useuseStore();
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    background: white;
    overflow: hidden; // 防止外层滚动条

    .layout_slider {
        width: $base-menu-width+5px;
        height: 100vh;
        background: $base-menu-background;
        float: left;

        .logo {
            margin-bottom: 20px;
        }

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background: cyan;
        top: 0px;
        left: $base-menu-width;
        z-index: 10;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: yellowgreen;
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto; // 只让这里滚动
    }
}
</style>