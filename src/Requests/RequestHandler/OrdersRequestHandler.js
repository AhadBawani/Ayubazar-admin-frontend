import { CurrentOrderAction, OrdersAction, ReportAction } from "../../Redux/Actions/AdminActions"
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

export const getAllDeletedOrdersHandler = (dispatch) => {
     API.get(Requests.GET_DELETED_ORDERS)
          .then((deletedOrders) => {
               dispatch(CurrentOrderAction(deletedOrders.data));
          })
          .catch((error) => {
               console.log("error in getting all the delted orders : ", error);
          })
}

export const getAllCancelRequestOrderHandler = (dispatch) => {
     API.get(Requests.GET_ALL_CANCEL_REQUEST_ORDERS)
          .then((response) => {
               if (response) {                    
                    dispatch(CurrentOrderAction((response.data)));
               }
          })
          .catch((error) => {
               console.log("error in getting all the cancel orders : ", error);
          })
}

export const getAllOnTheWayOrdersHandler = (dispatch) => {
     API.get(Requests.GET_ALL_ON_THE_WAY_ORDERS)
          .then((response) => {
               if (response) {
                    dispatch(CurrentOrderAction(response.data));
               }
          })
          .catch((error) => {
               console.log('error in getting all the all the way orders : ', error);
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
          API.post(Requests.ORDER_DETAILS_IN_EXCEL + from + "/" + to, {}, { responseType: 'blob' })
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

export const monthlyOrderReport = (dispatch) => {
     API.get(Requests.GET_MONTHLY_REPORT)
          .then((response) => {
               if (response && response.data !== null) {
                    dispatch(ReportAction(response.data));
               }
          })
          .catch((error) => {
               console.log('error in monthly order report handler : ', error);
          })
}