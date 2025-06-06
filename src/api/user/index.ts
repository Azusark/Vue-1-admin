//统一管理项目用户相关的接口
import request from '@/utils/request'
import type { loginForm,loginResponseData } from './type'

enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info',
}
//暴露请求函数
//登录接口方法
export const reqLogin = (data: loginForm)=> request.post<any,loginResponseData>(API.LOGIN_URL,data)

export const reqUserInfo = () => request.get(API.USERINFO_URL)



