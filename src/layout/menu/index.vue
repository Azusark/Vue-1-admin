<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <!-- 有子路由（无论多少个） -->
        
        <el-sub-menu v-if="item.children && item.children.length && item.meta.hidden==false" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
        <!-- 没有子路由 -->
        <el-menu-item v-if="!item.children&&item.meta.hidden==false" :index="item.path"  @click="goRoute">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
defineProps(['menuList'])
import { useRouter } from 'vue-router'
let $router = useRouter()
const goRoute = (vc:any) => {
    //路由跳转
    $router.push(vc.index)
}

</script>

<script lang="ts">
export default {
    name: 'Menu',
}
</script>

<style scoped></style>