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
                        <el-dropdown-item>退出登录</el-dropdown-item>


                    </el-dropdown-menu>
                </template>
            </el-dropdown>
</template>

<script setup>    
</script>

<style scoped>
</style>