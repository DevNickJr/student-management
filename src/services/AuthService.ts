import ApiAdapter from "./ApiService"

const servicePrefix = "/auth"

export const apiRegister =  (data: any) => {
    return ApiAdapter.fetchData({
        url:  "/add_user_api.php",
        method: "post",
        data
    })
}

export const apiLogin =  (data: any) => {
    return ApiAdapter.fetchData({
        url: "/user_login_api.php",
        method: "post",
        data
    })
}

export const apiResetPassword =  (data: any) => {
    return ApiAdapter.fetchData({
        url: "/reset_user_password_api.php",
        method: "post",
        data
    })
}
export const apiCheckPassword =  ({ user_string, p_string }: any) => {
    // console.log("user_string", user_string, "p_string", p_string)
    return ApiAdapter.fetchData({
        url:`/check_user_password_api.php?user_string=${user_string}&p_string=${p_string}`,
        method: "get",
    })
}

export const apiForgotEmail =  (email: any) => {
    return ApiAdapter.fetchData({
        url: `/forgot_email_api.php?string=${email}`,
        method: "get",
    })
}

export const apiForgotPasswordTemp =  (data: any) => {
    return ApiAdapter.fetchData({
        url: `forgot_email_api.php`,
        method: "post",
        data 
    })
}

export const apiTest =  () => {
    return ApiAdapter.fetchData({
        url: "/fetch_approved_businesses_api.php",
        method: "get",
    })
}

