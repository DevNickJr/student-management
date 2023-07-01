import ApiAdapter from "./ApiService"

const servicePrefix = "/"
const serviceSuffix = ".php"

// const token = JSON.parse(sessionStorage.getItem("user")!)?.verify_string

/* Home/index */

export const apiHome =  () => {
    return ApiAdapter.fetchData({
        url: servicePrefix + "fetch_home_api" + serviceSuffix,
        method: "get"    
    })
}
