import axios from "axios"
import API from "../Middlewares/Api"
import Requests from "../Requests/Request"
import { DiscountAction } from "../../Redux/Actions/AdminActions"

export const createDiscountHandler = (dispatch, data) => {
    return new Promise((resolve, reject) => {
        API.post(Requests.CREATE_OFFER, data)
            .then((response) => {
                if (response) {
                    getOfferDiscountHandler(dispatch);
                    resolve(response.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const getOfferDiscountHandler = (dispatch) => {
    axios.get(Requests.GET_DISCOUNT_OFFER)
        .then((response) => {
            if (response) {
                dispatch(DiscountAction(response.data));
            }
        })
        .catch((error) => {
            console.log('error in getting discount offer : ', error);
        })
}