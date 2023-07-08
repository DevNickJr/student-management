import ApiAdapter from "./ApiService"
import { IUserRegister, IUserLogin } from '@/interfaces'
import BaseService from "./BaseService"
import { User } from "next-auth"


const servicePrefix = "/auth"

export const apiRegister = (data: IUserRegister) => {
    return BaseService.post(`${servicePrefix}/register/`, data)
}

export const apiRegisterFace = (data: IUserRegister) => {
    return ApiAdapter.fetchData({
        url:  `${servicePrefix}/face/register/`,
        method: "post",
        data
    })
}

export const apiLogin =  (data: IUserLogin) => {
    return BaseService.post<User>(`${servicePrefix}/login/`, data)
}