import { ReviewsAction } from "../../Redux/Actions/AdminActions";
import API from "../Middlewares/Api";
import Requests from "../Requests/Request";

export const getAllProductsReviewHandler = (dispatch) => {
     API.get(Requests.GET_ALL_REVIEWS)
          .then((productReview) => {
               if (productReview.status === 200) {
                    dispatch(ReviewsAction(productReview.data));
               }
          })
          .catch((error) => {
               const errorMessage = error?.response?.data || 'An error occurred';
               console.log(errorMessage);
          })
}

export const addAdminProductReviewHandler = (dispatch, data) => {
     return new Promise((resolve, reject) => {
          API.post(Requests.ADD_ADMIN_REVIEW, data)
               .then((productReview) => {
                    if (productReview.status === 201) {
                         getAllProductsReviewHandler(dispatch)
                         resolve(productReview.data);
                    }
               })
               .catch((error) => {
                    const errorMessage = error?.response?.data || 'An error occurred';
                    reject(errorMessage);
               })
     })
}

export const deleteProductReviewHandler = (dispatch, reviewId) => {
     return new Promise((resolve, reject) => {
          API.delete(Requests.DELETE_PRODUCT_REVIEW + reviewId)
               .then((productReview) => {
                    if (productReview.status === 200) {
                         getAllProductsReviewHandler(dispatch)
                         resolve(productReview.data);
                    }
               })
               .catch((error) => {
                    const errorMessage = error?.response?.data || 'An error occurred';
                    reject(errorMessage);
               })
     })
}