<template>
    <div class="login_container">
        <el-row>
            <el-col :span="14" :xs="0"></el-col>
            <el-col :span="10" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎访问莱茵数据中心</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon=User placeholder="请输入用户名" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon=Lock placeholder="请输入密码" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
//引入用户相关小仓库
import useuseStore from '@/store/modules/user';
import { lo } from 'element-plus/es/locales.mjs';
import { triggerEvent } from 'element-plus/es/utils/index.mjs';
let useStore = useuseStore();
//获取路由器
let loginForms = ref();
let $router = useRouter();
//收集账号与密码的数据
let loading = ref(false);
//控制按钮加载


let loginForm = reactive({
    username: 'admin1',
    password: '111111'
});
//定义表单校验需要配置对象

const login = async () => {
    //保证全部表单项校验通过才能发请求
    await loginForms.value.validate();

    loading.value = true;
    try {
        //保证登录成功

        await useStore.userLogin(loginForm);
        $router.push('/'); // 登录成功后跳转到首页
        ElNotification({
            title: '登录成功',
            message: '欢迎回来！',
            type: 'success',
            duration: 3000
        });
        loading.value = false;
    } catch (error) {
        loading.value = false;
        ElNotification({
            title: '登录失败',
            message: '请检查用户名和密码是否正确',
            type: 'error',
            duration: 3000
        })

    }
}

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 6, max: 10, message: '用户名长度需为6到10个字符', trigger: 'blur' }
    ],
    //trigger: 'blur' 失去焦点时验证
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度需为6到16个字符', trigger: 'blur' }
    ]
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
    width: 50%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;

    h1 {
        color: white;
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
