<template>
    <el-button type="primary" size="default" icon="Refresh" circle>
            </el-button>
            <el-button type="primary" size="default" icon="FullScreen" circle>
            </el-button>
            <el-button type="primary" size="default" icon="Setting" circle>
            </el-button>
            <img src="/public/logo.png" style="width:24px;height:24px;margin:0px 10px;">
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link" style="color:white">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
</template>

<script setup>
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router';

// 获取用户相关的小仓库
const userStore = useUserStore();
// 获取路由器对象
const $router = useRouter();

// 退出登录按钮的回调
const logout = async () => {
  // 1. 调用store的登出方法
  userStore.userLogout();
  // 2. 跳转到登录页面
  await $router.push({ path: '/login' });
  // 3. 刷新页面，确保路由和状态都已重置 (可选，但推荐)
  window.location.reload();
}
</script>

<style scoped>
</style>