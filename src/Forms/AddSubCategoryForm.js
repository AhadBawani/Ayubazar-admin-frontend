import React from 'react'
import { useState } from 'react';
import Input from '../Fields/Input';
import Button from '../Fields/Button';
import { toast } from 'react-toastify';
import useAdminState from '../Hooks/useAdminState';
import {
     AddSubCategoryHandler,
     GetAllSubCategoryHandler
}
     from '../Requests/RequestHandler/SubCategoryHandler';
import { useDispatch } from 'react-redux';
import { getAllCategoryHandler } from '../Requests/RequestHandler/CategoryRequestHandler';

const AddSubCategoryForm = () => {
     const { category } = useAdminState();
     const dispatch = useDispatch();
     const [formValue, setFormValue] = useState({
          category: null,
          subCategory: null
     })
     const [errors, setErrors] = useState({
          category: false,
          subCategory: false
     })

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

     const handleAddSubCategory = () => {
          const validateCategory = validate(formValue, errors);
          if (!validateCategory.valid) {
               setErrors(validateCategory.newErrors);
               toast.error('Please fill required fields!');
          }
          if (validateCategory.valid) {
               AddSubCategoryHandler(formValue)
                    .then((response) => {
                         if (response) {
                              GetAllSubCategoryHandler(dispatch);
                              getAllCategoryHandler(dispatch);
                              toast.success('Sub Category added successfully!');
                              document.getElementById('subCategory').value = null;
                              document.getElementById('category').value = 'Select Category';
                         }
                    })
                    .catch((error) => {
                         if (error) {
                              console.log('error in add category : ', error.response);
                         }
                    })
          }
     }

     const onInput = (e) => {
          setFormValue({ ...formValue, [e.target.name]: e.target.value });
     }
     return (
          <div className='m-4 p-4'>
               <div
                    className='flex justify-center text-xl font-semibold'>
                    Add Sub Categories
               </div>
               <div>
                    <div className='flex flex-col my-4'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                              Sub Category *
                         </span>
                         <Input onChange={onInput}
                              name="subCategory"
                              error={errors.subCategory}
                              id="subCategory" />
                    </div>
                    <div className='flex flex-col my-4'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                              Category *
                         </span>
                         <div>
                              <select
                                   className='p-2 rounded-lg w-full outline-none'
                                   style={errors.category ? { border: '1px solid red' } : { border: '1px solid #d3d3d3' }}
                                   name='category'
                                   onChange={onInput}>
                                   <option>Select Category</option>
                                   {
                                        category.map((item) => {
                                             return <option key={item?._id} value={item?._id}>
                                                  {item?.category}
                                             </option>
                                        })
                                   }
                              </select>
                         </div>
                    </div>
                    <div>
                         <Button
                              text="Add Sub Category"
                              onClick={handleAddSubCategory}
                              color="#90EE90" hoverColor="#65a765" />
                    </div>
               </div>
          </div>
     )
}

export default AddSubCategoryForm;