//创建用户相关的小仓库
import { defineStore } from 'pinia';
//引入接口
import { reqLogin } from '@/api/user';
//引入数据类型
import type { loginForm,loginResponseData } from '@/api/user/type';
import type { UserState } from './types/type';
//
import { SET_TOKEN } from '@/utils/token';
let useuseStore = defineStore('User', {
  //小仓库
  state: (): UserState => {
    return {
      token: localStorage.getItem('token')  // 新增token字段
    }
  },
  //异步
  actions: {
    //用户登录
      async userLogin(data: loginForm) {
        //登录请求
        let result: loginResponseData = await reqLogin(data);
        //登录请求：成功200->token
        //登录请求：失败->登录失败错误的信息
        if(result.code === 200) {
          //pinia仓库存储一下token
          this.token = (result.data.token as string);
          //本地存储
          SET_TOKEN(result.data.token as string);
          //能保证当前async函数返回一个成功的promise
          return 'ok';
        }
        else {
          return Promise.reject(new Error(result.data.message));
        }
      }
  },
  getters: {

  }

})
//对外暴露获取小仓库方法
export default useuseStore;