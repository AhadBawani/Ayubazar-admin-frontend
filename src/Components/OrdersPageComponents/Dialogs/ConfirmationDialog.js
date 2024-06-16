import React from 'react'
import useComponentState from '../../../Hooks/useComponentState';
import { useDispatch } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { DialogAction } from '../../../Redux/Actions/ComponentsAction';
import { OrderReadyForDeliverHandler, acceptOrderCancelRequestHandler, deleteOrderHandler, getAllCancelRequestOrderHandler, getAllOnTheWayOrdersHandler, getAllOrdersHandler, orderDeliveredHandler, rejectOrderCancelRequestHandler } from '../../../Requests/RequestHandler/OrdersRequestHandler';
import { toast } from 'react-toastify';

const ConfirmationDialog = () => {
     const { dialog } = useComponentState();
     const dispatch = useDispatch();
     const handleDialogConfirmation = () => {
          if (dialog?.state === 'pending') {
               OrderReadyForDeliverHandler(dialog?.data)
                    .then((response) => {
                         if (response) {
                              dialog?.setState(null);
                              dispatch(DialogAction(null));
                              toast.success('Order updated successfully!');
                         }
                    })
                    .catch((error) => {
                         console.log('error in order ready handler : ', error);
                    })
          }
          if (dialog?.state === 'delete-order') {
               deleteOrderHandler(dialog?.data)
                    .then((response) => {
                         if (response) {
                              getAllOrdersHandler(dispatch);
                              dialog?.setState(null);
                              dispatch(DialogAction(null));
                              toast.success('Order deleted successfully!');
                         }
                    })
                    .catch((error) => {
                         console.log('error in delete order handler : ', error);
                    })
          }
          if (dialog?.state === 'accept-request') {
               acceptOrderCancelRequestHandler(dialog?.data)
                    .then((response) => {
                         if (response) {
                              getAllCancelRequestOrderHandler(dispatch);
                              dialog?.setState(null);
                              dispatch(DialogAction(null));
                              toast.success('Request accepted successfully!');
                         }
                    })
                    .catch((error) => {
                         console.log('error in order accept request handler : ', error);
                    })
          }
          if (dialog?.state === 'reject-request') {
               rejectOrderCancelRequestHandler(dialog?.data)
                    .then((response) => {
                         if (response) {
                              getAllCancelRequestOrderHandler(dispatch);
                              dialog?.setState(null);
                              dispatch(DialogAction(null));
                              toast.success('Request rejected successfully!');
                         }
                    })
                    .catch((error) => {
                         console.log('error in order reject request handler : ', error);
                    })
          }
          if (dialog?.state === 'order-delivered') {
               orderDeliveredHandler(dialog?.data)
                    .then((response) => {
                         if (response) {
                              getAllOnTheWayOrdersHandler(dispatch);
                              dialog?.setState(null);
                              dispatch(DialogAction(null));
                              toast.success('Status updated successfully!');
                         }
                    })
                    .catch((error) => {
                         console.log('error in order reject request handler : ', error);
                    })
          }
     }
     const handleCloseDialog = () => {
          dispatch(DialogAction(null));
     }
     return (
          <div className="w-full m-2 p-2">
               <div className="flex justify-between">
                    <span className="text-xl font-semibold text-[#333]">{dialog?.title}</span>
                    <div className="rounded-full p-1 w-9 h-9 
                    transition-all ease-in-out duration-200 hover:bg-[#f1f1f1]
                    flex justify-center items-center cursor-pointer ml-4 mr-2">
                         <IoMdClose
                              className="mt-[-4px]"
                              size={24}
                              onClick={handleCloseDialog} />
                    </div>
               </div>
               <div className="mt-3 text-[#999] text-base">
                    <span>{dialog?.text}</span>
               </div>
               <div className="mt-6 flex justify-end space-x-4 mr-2">
                    <button
                         className="px-4 py-2 bg-blue-500 text-white outline-none
                    rounded-md hover:bg-blue-600 transition-colors duration-200"
                         onClick={handleDialogConfirmation}>
                         Confirm
                    </button>
                    <button
                         className="px-4 py-2 bg-gray-300 text-gray-700 outline-none
                    rounded-md hover:bg-gray-400 transition-colors duration-200"
                         onClick={handleCloseDialog}>
                         Cancel
                    </button>
               </div>
          </div>
     )
}

export default ConfirmationDialog;