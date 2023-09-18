import { IUserRegister, IUserLogin, IAdminCourse } from '@/interfaces'
import BaseService from "./BaseService"
import { User } from "next-auth"

const servicePrefix = "/core"

const Auth = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const apiGetAnalytics = () => {
    return BaseService.get(`${servicePrefix}/students/analytics/`)
}

export const apiGetStudents = ({query}: {query: string}) => {
    return BaseService.get(`${servicePrefix}/students/?${query || ''}`)
}

export const apiAddCourse = (data: IAdminCourse, token?: string) => {
    return BaseService.post(`/courses/add-course/`, data, Auth(token!))
}