import React, { useRef } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import useComponentState from '../../Hooks/useComponentState';
import { DeleteProductHandler, getAllProductRequestHandler } from '../../Requests/RequestHandler/ProductRequestHandler';
import { toast } from 'react-toastify';

const DeleteProductDialog = () => {
     const wrapperRef = useRef();
     const { dialog } = useComponentState();
     const dispatch = useDispatch();

     const handleCloseDialog = () => {
          dispatch(DialogAction(null));
     }

     const handleDialogConfirmation = () => {
          DeleteProductHandler(dialog?.data?._id)
               .then((response) => {                    
                    dispatch(DialogAction(null));
                    getAllProductRequestHandler(dispatch);
                    toast.success(response?.message);
               })
               .catch((error) => {
                    console.log('error in delete product handler : ', error);
               })
     }
     return (
          <div className="p-4 w-[500px]" ref={wrapperRef}>
               <div className='flex justify-between'>
                    <div>
                         <span className='font-semibold text-xl'>Delete Product</span>
                    </div>
                    <div>
                         <span className="relative">
                              <IoMdClose
                                   className="w-7 h-7 cursor-pointer rounded-full hover:bg-gray-200 m-2 mt-[-1px]"
                                   onClick={() => dispatch(DialogAction(null))} />
                         </span>
                    </div>
               </div>
               <div className='mt-4'>
                    Are you sure you want to delete Product ?
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

export default DeleteProductDialog