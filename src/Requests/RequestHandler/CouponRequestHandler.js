import { CouponsAction } from "../../Redux/Actions/AdminActions"
import API from "../Middlewares/Api"
import Requests from "../Requests/Request"

export const getAllCouponHandler = (dispatch) => {
    API.post(Requests.GET_ALL_COUPONS)
        .then((response) => {
            if (response) {
                dispatch(CouponsAction(response.data));
            }
        })
        .catch((error) => {
            console.log('error in get all coupon handler : ', error);
        })
}

export const generateCouponHandler = (data) => {
    return new Promise((resolve, reject) => {
        API.post(Requests.CREATE_COUPON, data)
            .then((response) => {
                if (response) {
                    resolve(response.data);
                }
            })
            .catch((error) => {                
                reject(error);
            })
    })
}

export const editCouponHandler = (couponId, data) => {
    return new Promise((resolve, reject) => {
        API.put(Requests.EDIT_COUPON + couponId)
        .then((response) => {
            if(response){
                resolve(response.data);
            }
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const deleteCouponHandler = (couponId) => {
    return new Promise((resolve, reject) => {
        API.delete(Requests.DELETE_COUPON + couponId)
        .then((deleteResponse) => {
            if(deleteResponse){
                resolve(deleteResponse.data);
            }
        })
        .catch((error) => {
            reject(error);
        })
    })
}