import axios from "axios";
import Request from '../Requests/Request';
import { CompanyAction } from "../../Redux/Actions/AdminActions";

export const getAllCompanyHandler = (dispatch) => {
    axios.get(Request.GET_ALL_COMPANY)
        .then((response) => {
            dispatch(CompanyAction(response.data));
        })
        .catch((error) => {
            console.log('error in get all company request handler : ', error);
        })
}

export const addCompanyHandler = (dispatch, data) => {    
    return new Promise((resolve, reject) => {
        axios.post(Request.ADD_COMPANY, data)
            .then((response) => {                
                if (response.data) {
                    getAllCompanyHandler(dispatch);
                    resolve(response.data?.message);
                }
            })
            .catch((loginError) => {
                const errorMessage = loginError?.response?.data || 'An error occurred';
                reject(errorMessage); // Rejecting with the error message
            })
    })
}