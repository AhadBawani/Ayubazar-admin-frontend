import axios from "axios";
import API from "../Middlewares/Api"
import Requests from "../Requests/Request"
import { BlogsAction } from "../../Redux/Actions/AdminActions";

export const addBlogHandler = (dispatch, data) => {
    return new Promise((resolve, reject) => {
        API.post(Requests.ADD_BLOG, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((blogResponse) => {
                if (blogResponse) {
                    getAllBlogsHandler(dispatch);
                    resolve(blogResponse);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const getAllBlogsHandler = (dispatch) => {
    axios.get(Requests.GET_ALL_BLOGS)
        .then((response) => {
            if (response) {
                dispatch(BlogsAction(response.data));
            }
        })
        .catch((error) => {
            console.log('error in getting all blogs : ', error);
        })
}

export const editBlogHandler = (dispatch, blogId, data) => {
    return new Promise((resolve, reject) => {
        API.put(Requests.EDIT_BLOG + blogId, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                if (response) {
                    getAllBlogsHandler(dispatch);
                    resolve(true);
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}

export const deleteBlogHandler = (dispatch, blogId) => {
    return new Promise((resolve, reject) => {
        API.delete(Requests.DELETE_BLOG + blogId)
            .then((response) => {
                if (response) {
                    resolve(response.data);
                    getAllBlogsHandler(dispatch);
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data || 'An error occurred';
                reject(errorMessage);
            })
    })
}