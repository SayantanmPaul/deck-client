import { useMutation } from "@tanstack/react-query"
import { INewUser } from "../types"
import { SignUpUser } from "@/api/apiClient"

export const useSignUpUser = () => {
    return useMutation({
        mutationFn: (user: INewUser) => {
            return SignUpUser(user);
        }
    })
}