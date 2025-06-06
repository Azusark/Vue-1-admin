<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                <el-form-item>
                    <el-input :prefix-icon=User placeholder="请输入用户名" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" :prefix-icon=Lock placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login_btn" type="primary" size="default" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { User,Lock } from '@element-plus/icons-vue';
import { reactive } from 'vue';
//引入用户相关小仓库
import useUserStore  from '@/store/modules/user';
let userStore = useUserStore();
//收集账号与密码的数据
let loginForm = reactive({
    username: 'admin',
    password: '111111'
}); 

const login = () => {
    //通知请求
    //请求成功
    //请求失败
    useStore.userLogin();
}
</script>

<style scoped>  

.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
}

.login_form {
    position: relative;
    width: 62%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    h1{
        color:white;
        font-size: 40px;
    }
}

.login_form h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
}

.login_btn {
    width: 100%;
    height: 40px;
    
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}


</style>