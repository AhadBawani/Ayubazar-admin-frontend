import axios from "axios"
import Requests from "../Requests/Request"
import { ProductsAction } from "../../Redux/Actions/AdminActions"
import API from "../Middlewares/Api"
import useTokenValidHook from "../../Hooks/useTokenValidHook"

export const AddProductRequestHandler = (dispatch, data) => {
    return new Promise((resolve, reject) => {
        API.post(Requests.ADD_PRODUCT, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                if (response.data) {
                    getAllProductRequestHandler(dispatch);
                    resolve(response.data?.message);
                }
            })
            .catch((loginError) => {
                const errorMessage = loginError?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}

export const getAllProductRequestHandler = (dispatch) => {
    axios.get(Requests.GET_ALL_PRODUCTS)
        .then((response) => {
            dispatch(ProductsAction(response.data));
        })
        .catch((error) => {
            console.log('error in get all product request handler : ', error);
        })
}

export const disableProductHandler = (productId, dispatch) => {
    return new Promise((resolve, reject) => {
        API.put(Requests.DISABLE_PRODUCT + productId)
            .then((productResponse) => {
                if (productResponse) {
                    resolve(productResponse.data);
                    getAllProductRequestHandler(dispatch)
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data || 'An error occurred';
                useTokenValidHook(error);
                reject(errorMessage);
            })
    })
}

export const enableProductHandler = (productId, dispatch) => {
    return new Promise((resolve, reject) => {
        API.put(Requests.ENABLE_PRODUCT + productId)
            .then((productResponse) => {
                if (productResponse) {
                    resolve(productResponse.data);
                    getAllProductRequestHandler(dispatch);
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}

export const editProductHandler = (dispatch, productId, data) => {
    return new Promise((resolve, reject) => {
        API.put(Requests.EDIT_PRODUCT + productId, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((updatedResponse) => {
                if (updatedResponse) {
                    resolve(updatedResponse.data);
                    getAllProductRequestHandler(dispatch);
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}

export const AddProductThroughExcelHandler = (data) => {
    return new Promise((resolve, reject) => {
        API.post(Requests.ADD_PRODUCTS_THROUGH_EXCEL, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((addResponse) => {
                if (addResponse.status === 201) {
                    resolve(addResponse.data);
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}

export const BestSalingProductHandler = (productId) => {
    return new Promise((resolve, reject) => {
        API.post(Requests.BEST_SALING_PRODUCT + productId)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}

export const ToggleProductCodHandler = (productId) => {
    return new Promise((resolve, reject) => {
        API.post(Requests.TOGGLE_PRODUCT_COD + productId)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}

export const DeleteProductHandler = (productId) => {
    return new Promise((resolve, reject) => {
        API.delete(Requests.DELETE_PRODUCT + productId)
            .then((response) => {                
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                if (error) {
                    reject(error);
                }
            })
    })
}