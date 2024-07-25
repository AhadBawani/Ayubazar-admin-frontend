import axios from "axios";
import Request from '../Requests/Request';
import { CompaniesAction, CompanyAction } from "../../Redux/Actions/AdminActions";
import Requests from "../Requests/Request";
import API from "../Middlewares/Api";

export const getAllCompanyHandler = (dispatch) => {
    axios.get(Request.GET_ALL_COMPANY)
        .then((response) => {
            dispatch(CompanyAction(response.data));
        })
        .catch((error) => {
            console.log('error in get all company request handler : ', error);
        })
}

export const getAllCompaniesOnlyHandler = (dispatch) => {
    axios.get(Request.GET_ALL_COMPANIES_ONLY)
        .then((response) => {
            dispatch(CompaniesAction(response.data));
        })
        .catch((error) => {
            console.log('error in get all company request handler : ', error);
        })
}

export const addCompanyHandler = (dispatch, data) => {
    return new Promise((resolve, reject) => {
        API.post(Requests.ADD_COMPANY, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                if (response.data) {
                    getAllCompanyHandler(dispatch);
                    resolve(response.data?.message);
                }
            })
            .catch((loginError) => {
                const errorMessage = loginError?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}

export const editCompanyHandler = (dispatch, companyId, companyData) => {
    return new Promise((resolve, reject) => {
        API.put(Request.EDIT_COMPANY + companyId, companyData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                if (response.data) {
                    getAllCompanyHandler(dispatch);
                    resolve(response.data?.message);
                }
            })
            .catch((loginError) => {
                const errorMessage = loginError?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}