import { IUserRegister, IUserLogin, IUser, IProfile, IPassword, IRegisterFace, IVerifiedFace, IForgotPassword, IChangePassword } from '@/interfaces'
import BaseService from "./BaseService"
import { User } from "next-auth"

const servicePrefix = "/courses"

const Auth = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const apiGetCourses =  (token: string) => {
    return BaseService.get(`${servicePrefix}/course-dashboard/`, Auth(token))
}

export const apiGetRegisteredCourses =  (token: string) => {
    return BaseService.get(`${servicePrefix}/list-registered-course/`, Auth(token))
}

export const apiFilterCourses =  (token: string, param: { level: string, semester: string }) => {
    // console.log(param)
    return BaseService.get(`${servicePrefix}/filter-course/?level=${param.level}&semester=${param.semester}`, Auth(token))
}

export const apiRegisterCourses =  (data: any, token?: string) => {
    console.log(data)
    return BaseService.post(`${servicePrefix}/register-course/`, data, Auth(token!))
}

// export const apiGetUser =  (token: string) => {
//     return BaseService.get<IProfile>(`${servicePrefix}/user/`, Auth(token))
// }

// export const apiUpdateUser =  (data: IProfile, token?: string) => {
//     const formData = new FormData()
//     Object.keys(data).forEach(key => formData.append(key, data[key as keyof IProfile]))

//     return BaseService.patch<IUser>(`${servicePrefix}/user/`, formData, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data"
//         }
//     })
// }
