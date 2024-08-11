import React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useComponentState from '../../Hooks/useComponentState';
import { IoMdClose } from 'react-icons/io';
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../Fields/Input';
import useAdminState from '../../Hooks/useAdminState';
import { EditSubCategoryHandler, GetAllSubCategoryHandler } from '../../Requests/RequestHandler/SubCategoryHandler';

const EditSubCategoryDialog = () => {
     const { dialog } = useComponentState();
     const [formValue, setFormValue] = useState({
          subCategory: dialog?.data?.subCategory || null,
          category: dialog?.data?.category?.category || null
     })
     const [formError, setFormError] = useState({
          subCategory: false,
          category: false
     })
     const { category } = useAdminState();
     const wrapperRef = useRef();
     const dispatch = useDispatch();

     const validate = (value, errors) => {
          let valid = true;
          const newErrors = { ...errors };

          Object.keys(value).forEach((key) => {
               if (!value[key]) {
                    newErrors[key] = true;
                    valid = false;
               } else {
                    newErrors[key] = false;
               }
          });

          return { valid, newErrors };
     };
     const handleEditSubCategory = () => {
          const validateForm = validate(formValue, formError);
          if (!validateForm.valid) {
               setFormError(validateForm.newErrors);
               toast.error('Please fill required fields!');
               return;
          }
          if (validateForm.valid) {
               EditSubCategoryHandler(dialog?.data?._id, formValue)
                    .then((response) => {
                         if (response) {
                              toast.success('Sub category updated successfully!');
                              dispatch(DialogAction(null));
                              GetAllSubCategoryHandler(dispatch);
                         }
                    })
                    .catch((error) => {
                         console.log('error in edit sub category handler : ', error);
                    })
          }
     }

     const onInput = (e) => {
          setFormValue({ ...formValue, [e.target.name]: e.target.value })
     }
     return (
          <div className="p-4 m-4 w-[500px]" ref={wrapperRef}>
               <div className='flex justify-between'>
                    <div>
                         <span className='font-semibold text-xl'>Edit Sub Categories</span>
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
                    <div className='flex flex-col my-6'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                              Sub Category *
                         </span>
                         <Input
                              onChange={onInput}
                              name="subCategory"
                              error={formError.subCategory}
                              defaultValue={dialog?.data?.subCategory}
                         />
                    </div>
                    <div className='flex flex-col my-4'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                              Category *
                         </span>
                         <div>
                              <select
                                   className='p-2 rounded-lg w-full outline-none'
                                   style={formError.category ?
                                        { border: '1px solid red' } : { border: '1px solid #d3d3d3' }}
                                   name='category'
                                   onChange={onInput}>
                                   <option>Select Category</option>
                                   {
                                        category.map((item) => {
                                             return <option key={item?._id}
                                                  selected={dialog?.data?.category?.category}
                                                  value={item?._id}>
                                                  {item?.category}
                                             </option>
                                        })
                                   }
                              </select>
                         </div>
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
                         }} onClick={handleEditSubCategory}>
                         Edit Sub Category
                    </button>
               </div>
          </div>
     )
}

export default EditSubCategoryDialog