import { CategoryAction } from "../../Redux/Actions/AdminActions"
import API from "../Middlewares/Api"
import Requests from "../Requests/Request"

export const addCategoryHandler = async (data) => {
    return new Promise((resolve, reject) => {
        API.post(Requests.ADD_CATEGORY, data)
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

export const getAllCategoryHandler = async (dispatch) => {
    API.get(Requests.GET_ALL_CATEGORIES)
        .then((response) => {
            if (response) {
                dispatch(CategoryAction(response.data));
            }
        })
        .catch((error) => {
            console.log('error in getting all the categoy : ', error);
        })
}

export const EditCategoryHandler = async (id, data) => {
    return new Promise((resolve, reject) => {
        API.put(Requests.EDIT_CATEORY + id, data)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}