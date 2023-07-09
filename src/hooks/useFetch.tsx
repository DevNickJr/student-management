import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import getData from '@/utils/getData'
import { AxiosResponse } from 'axios'

interface IProps<T> {
    api: (a?: any, b?: any) =>  Promise<AxiosResponse<T, any>>
    param?: any
    key: string[]
    onSuccess?: (a: any) => void
    requireAuth?: boolean
    select?: (a: any) => any
}

const useFetch = <T,>({ api, param, key, onSuccess, requireAuth, select, ...rest }: IProps<T>) => {
  const { data: session } = useSession()


    const { data, error, isLoading, isSuccess, isFetching, remove, refetch, fetchStatus } = useQuery({
        queryKey: [...key],
        queryFn: () => requireAuth ? api(session?.user?.token.access, param) : api(param),
        select: select || ((d: any) => d?.data?.data),
        ...rest
    })

    // useEffect(() => {
    //     return () => {
    //       if (clear) remove()
    //     }
    // }, [clear])

    useEffect(() => {
        if (onSuccess && isSuccess && data) {
            // console.log("data", data, "onSuccess", onSuccess, "isSuccess", isSuccess)
            onSuccess(data)
        }
    }, [data, isSuccess, onSuccess])

    return { data, error, isLoading, isFetching, remove, refetch, fetchStatus }
}

export default useFetch