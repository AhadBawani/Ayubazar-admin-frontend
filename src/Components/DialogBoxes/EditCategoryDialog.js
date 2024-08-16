import React, { useState } from 'react'
import Input from '../../Fields/Input'
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import { useDispatch } from 'react-redux';
import useComponentState from '../../Hooks/useComponentState';
import { IoMdClose } from 'react-icons/io';
import { useRef } from 'react';
import { EditCategoryHandler, getAllCategoryHandler } from '../../Requests/RequestHandler/CategoryRequestHandler';
import { toast } from 'react-toastify';

const EditCategoryDialog = () => {
     const { dialog } = useComponentState();
     const [updatedCategory, setUpdatedCategory] = useState(dialog?.data?.category || null);
     const [errors, setErrors] = useState(false);     
     const wrapperRef = useRef();
     const dispatch = useDispatch();
     const handleEditCategory = () => {
          if (!updatedCategory) {
               setErrors(true);
               return;
          }
          if (updatedCategory) {
               const obj = {
                    category: updatedCategory
               }
               EditCategoryHandler(dialog?.data?._id, obj)
                    .then((response) => {
                         if (response) {
                              getAllCategoryHandler(dispatch);
                              toast.success('Category updated successfully!');
                              dispatch(DialogAction(null));
                         }
                    })
                    .catch((error) => {
                         console.log('error in edit categoy handler : ', error);
                    })
          }
     }
     return (
          <div className="p-4 m-4 w-[500px]" ref={wrapperRef}>
               <div className='flex justify-between'>
                    <div>
                         <span className='font-semibold text-xl'>Edit Categories</span>
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
                    <div className='flex flex-col my-6'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                              Category *
                         </span>
                         <Input
                              onChange={(e) => setUpdatedCategory(e.target.value)}
                              name="coupon"
                              error={errors}
                              defaultValue={dialog?.data?.category} />
                    </div>
               </div>
               <div>
                    <button
                         className='transition-all ease-in-out duration-200 w-full
                         bg-[#d0bdac] text-white hover:bg-[#bfae9e] uppercase outline-none'
                         style={{
                              letterSpacing: '2px',
                              lineHeight: '1.4',
                              height: '42px',
                              fontSize: '12px',
                              padding: '0 30px',
                              borderRadius: '5px',
                              fontWeight: '600'
                         }} onClick={handleEditCategory}>
                         Edit Category
                    </button>
               </div>
          </div>
     )
}

export default EditCategoryDialog