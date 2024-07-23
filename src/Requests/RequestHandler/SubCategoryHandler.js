import { SubCategoriesAction } from "../../Redux/Actions/AdminActions"
import API from "../Middlewares/Api"
import Requests from "../Requests/Request"

export const AddSubCategoryHandler = async (data) => {
     return new Promise((resolve, reject) => {
          API.post(Requests.ADD_SUB_CATEGORY, data)
               .then((response) => {
                    if (response.data) {
                         resolve(response.data);
                    }
               })
               .catch((error) => {
                    reject(error);
               })
     })
}

export const GetAllSubCategoryHandler = async (dispatch) => {
     API.get(Requests.GET_ALL_SUB_CATEGORY)
          .then((response) => {
               dispatch(SubCategoriesAction(response.data));
          })
}

export const EditSubCategoryHandler = async (id, data) => {
     return new Promise((resolve, reject) => {
          API.put(Requests.EDIT_SUB_CATEGORY + id, data)
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