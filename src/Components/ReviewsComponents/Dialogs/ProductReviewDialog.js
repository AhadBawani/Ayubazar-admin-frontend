import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { DialogAction } from '../../../Redux/Actions/ComponentsAction';
import { IoMdClose } from 'react-icons/io';
import AddReviewForm from '../AddReviewForm';
import useComponentState from '../../../Hooks/useComponentState';

const ProductReviewDialog = () => {
     const dispatch = useDispatch();
     const wrapperRef = useRef();
     const { dialog } = useComponentState();
     useEffect(() => {
          const handleOutsideClick = (event) => {
               if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                    dispatch(DialogAction(null));
               }
          };

          document.addEventListener('mousedown', handleOutsideClick);

          return () => {
               document.removeEventListener('mousedown', handleOutsideClick);
          };
     }, [dispatch]);
     return (
          <div className="p-4 m-4 max-h-[550px] min-w-[500px]" ref={wrapperRef}>
               <div className='flex justify-between'>
                    <div>
                         <span className='font-semibold text-xl'>
                              {dialog?.open === 'add-review' ? 'Add Review' : 'Show Review'}
                         </span>
                    </div>
                    <div>
                         <span className="relative">
                              <IoMdClose
                                   className="w-7 h-7 cursor-pointer rounded-full 
                                   hover:bg-gray-200 m-2 mt-[-1px]"
                                   onClick={() => dispatch(DialogAction(null))} />
                         </span>
                    </div>
               </div>
               <div className='mt-4'>
                    <AddReviewForm />
               </div>
          </div>
     )
}

export default ProductReviewDialog;