import BaseService from "./BaseService";

const ApiAdapter = {
    fetchData(params: any) {
        return new Promise(async (resolve, reject) => {
            BaseService(params)
                .then((response: any) => {
                        resolve(response)
                })    
                .catch((error: any) => {
                        reject(error)
                })
        }
    )}
}
export default ApiAdapter;