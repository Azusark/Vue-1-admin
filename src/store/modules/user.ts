import { defineStore } from 'pinia';
//创建用户相关的小仓库
let useUserStore = defineStore('User', {
  //小仓库
  state: () => {
    return {}
  },
  //异步
  actions: {
    //用户登录
      userLogin() {
        console.log('123');
      }

  },
  getters: {

  }

})
//对外暴露获取小仓库方法
export default useUserStore;