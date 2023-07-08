import { MutationFunction, useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { AxiosResponse } from "axios";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

const usePost = <T,K>(api: (data: T) => Promise<AxiosResponse>, { onSuccess, onError, showSuccessMessage=true, showErrorMessage=true, ...rest }: any) => {

    const Mutation = useMutation<K, K, T>({
        mutationFn: async (data: T) => {
          const response =  await api(data)
          // console.log("response from usePost", response)
          if (response?.data?.status === "success") {
            return response?.data?.data
          } else {
            throw new Error(response?.data?.message)
            }
        },
        onSuccess: (data, variables, context) => {
            // console.log("success", data)
            if (showSuccessMessage) {
              // toast.success(data?.message);
              toast.success("Successful !");
            }
            if (onSuccess) {
                onSuccess(data, variables, context)
            }
        },
        onError: (error: any, variables, context) => {
            // console.log("error", error)
            if (showErrorMessage) {
              toast.error(error?.message || "An Error Occurred!");
            } else {
              // toast.error("An Error Occurred!");
            }
            if (onError) {
                onError(error, variables, context)
            }
        },
        ...rest
      })

    return Mutation
}

export default usePost