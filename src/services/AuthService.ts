import ApiAdapter from "./ApiService"
import { IUserRegister, IUserLogin, IUser, IProfile, IPassword } from '@/interfaces'
import BaseService from "./BaseService"
import { User } from "next-auth"

const servicePrefix = "/auth"

const Auth = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const apiRegister = (data: IUserRegister) => {
    return BaseService.post(`${servicePrefix}/register/`, data)
}

export const apiLogin =  (data: IUserLogin) => {
    return BaseService.post<User>(`${servicePrefix}/login/`, data)
}

export const apiGetUser =  (token: string) => {
    return BaseService.get<IProfile>(`${servicePrefix}/user/`, Auth(token))
}

export const apiUpdateUser =  (data: IProfile, token?: string) => {
    const formData = new FormData()
    Object.keys(data).forEach(key => formData.append(key, data[key as keyof IProfile]))

    return BaseService.patch<IUser>(`${servicePrefix}/user/`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })
}

export const apiUpdateProfileImage =  (data: FormData, token?: string) => {

    return BaseService.patch<IUser>(`${servicePrefix}/user/`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            "Accept": "*/*"
        }
    })
}

export const apiUpdatePassword =  (data: IPassword, token?: string) => {
    return BaseService.patch(`${servicePrefix}/password/change/`, data, Auth(token!))
}