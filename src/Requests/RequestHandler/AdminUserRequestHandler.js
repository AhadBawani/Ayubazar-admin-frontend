import axios from "axios"
import Requests from "../Requests/Request"
import { UserAction, UserTokenAction } from "../../Redux/Actions/AdminUserActions"

export const loginAdminUserHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.LOGIN_ADMIN_USER, data)
            .then((response) => {
                if (response) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}

export const validateAdminUserHandler = (dispatch, data) => {
    axios.post(Requests.VALIDATE_USER, data)
        .then((userResponse) => {
            if (userResponse) {
                dispatch(UserAction(userResponse.data?.user));
                dispatch(UserTokenAction(userResponse.data?.token));
            }
        })
        .catch((error) => {
            const errorMessage = error?.response?.data || 'An error occurred';
            if (errorMessage?.message === 'Token Expired!') {                
                localStorage.removeItem('token');
            }
        })
}