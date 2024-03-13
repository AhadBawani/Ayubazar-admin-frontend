import { OrdersAction } from "../../Redux/Actions/AdminActions"
import API from "../Middlewares/Api"
import Requests from "../Requests/Request"

export const getAllOrdersHandler = (dispatch) => {
     API.get(Requests.GET_ALL_ORDERS)
          .then((orderResponse) => {
               if (orderResponse) {
                    dispatch(OrdersAction(orderResponse.data));
               }
          })
          .catch((error) => {
               console.log('error in getting all orders : ', error);
          })
}

export const OrderReadyForDeliverHandler = (orderId) => {
     return new Promise((resolve, reject) => {
          API.post(Requests.ORDER_READY_FOR_DELIVER + orderId)
               .then((orderResponse) => {
                    if (orderResponse) {
                         resolve(orderResponse.data);
                    }
               })
               .catch((error) => {
                    reject(error);
               })
     })
}

export const deleteOrderHandler = (orderId) => {
     return new Promise((resolve, reject) => {
          API.delete(Requests.DELETE_ORDER + orderId)
               .then((orderResponse) => {
                    if (orderResponse) {
                         resolve(orderResponse.data);
                    }
               })
               .catch((error) => {
                    reject(error);
               })
     })
}

export const getAllCancelRequestOrderHandler = () => {
     return new Promise((resolve, reject) => {
          API.get(Requests.GET_ALL_CANCEL_REQUEST_ORDERS)
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

export const getAllOnTheWayOrdersHandler = () => {
     return new Promise((resolve, reject) => {
          API.get(Requests.GET_ALL_ON_THE_WAY_ORDERS)
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

export const acceptOrderCancelRequestHandler = (orderId) => {
     return new Promise((resolve, reject) => {
          API.post(Requests.ACCEPT_ORDER_CANCEL_REQUEST + orderId)
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

export const rejectOrderCancelRequestHandler = (orderId) => {
     return new Promise((resolve, reject) => {
          API.post(Requests.REJECT_ORDER_CANCEL_REQUEST + orderId)
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

export const orderDeliveredHandler = (orderId) => {
     return new Promise((resolve, reject) => {
          API.post(Requests.ORDER_DELIVERED + orderId)
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

export const orderExcelDetailsHandler = () => {
     return new Promise((resolve, reject) => {
          API.get(Requests.ORDER_EXCEL_DETAILS)
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

export const OrdersToExcelHandler = (from, to) => {
     return new Promise((resolve, reject) => {
          API.post(Requests.ORDER_DETAILS_IN_EXCEL + from + "/" + to, { responseType: 'blob' })
               .then((response) => {
                    if (response && response.data !== null) {
                         resolve(response.data);
                    } else {
                         reject(new Error('Received null response from the server'));
                    }
               })
               .catch((error) => {
                    reject(error);
               })
     })
}