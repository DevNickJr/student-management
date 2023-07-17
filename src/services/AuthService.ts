import { IUserRegister, IUserLogin, IUser, IProfile, IPassword, IRegisterFace, IVerifiedFace, IForgotPassword, IChangePassword } from '@/interfaces'
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

export const apiRegisterFace = (data: FormData) => {
    
    return BaseService.post(`${servicePrefix}/face/register/`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const apiLogin =  (data: IUserLogin) => {
    return BaseService.post<User>(`${servicePrefix}/login/`, data)
}

export const apiRefreshToken =  (data: { refresh: string }) => {
    return BaseService.post(`${servicePrefix}/token/refresh/`, data)
}

export const apiForgotPassword =  (data: IForgotPassword) => {
    return BaseService.post(`${servicePrefix}/password/reset/`, data)
}

export const apiChangePassword =  (data: IChangePassword) => {
    return BaseService.patch(`${servicePrefix}/password/reset/complete/`, data)
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

export const apiVerifyFace =  (data: FormData, token?: string) => {
    // const formData = new FormData()
    // Object.keys(data).forEach(key => formData.append(key, data[key as keyof FormData]))

    return BaseService.post(`${servicePrefix}/face/verify/`, data, {
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