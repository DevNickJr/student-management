import BaseService from "./BaseService";

const ApiAdapter = {
    fetchData(params: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await BaseService(params)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default ApiAdapter;