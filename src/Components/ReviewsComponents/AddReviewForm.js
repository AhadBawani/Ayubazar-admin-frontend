import React, { useState } from 'react'
import Input from '../../Fields/Input'
import useComponentState from '../../Hooks/useComponentState'
import Button from '../../Fields/Button';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import useAdminState from '../../Hooks/useAdminState';
import { addAdminProductReviewHandler } from '../../Requests/RequestHandler/ReviewsRequestHandler';

const AddReviewForm = () => {
     const { dialog } = useComponentState();
     const { products } = useAdminState();
     const dispatch = useDispatch();
     const [formValue, setFormValue] = useState({
          firstName: null,
          lastName: null,
          email: null,
          productId: null,
          rating: null,
          review: null
     })
     const [errors, setErrors] = useState({
          firstName: false,
          lastName: false,
          email: false,
          productId: false,
          rating: false,
          review: false
     })
     const onInput = (e) => {
          setFormValue({ ...formValue, [e.target.name]: e.target.value });
     }

     const validateEmail = (email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
     };

     const handleAddReview = () => {
          const validateForm = validate(formValue, errors);
          if (!validateEmail(formValue.email)) {
               toast.error('Invalid Email!');
               setErrors({ email: true });
               return;
          }
          if (!validateForm.valid) {
               setErrors(validateForm.newErrors);
               toast.error('Please fill required fields!');
               return;
          }
          if (validateForm.valid) {
               setErrors(validateForm.newErrors);
               if (parseInt(formValue.rating) > 5) {
                    toast.error('Rating can not be more then 5!');
                    setErrors({ rating: true });
                    return;
               } else {
                    addAdminProductReviewHandler(dispatch, formValue)
                         .then((response) => {
                              if (response) {
                                   dispatch(DialogAction(null));
                                   toast.success('Review added successfully!');
                              }
                         })
                         .catch((error) => {
                              if (error?.message === 'User with this email already exist!') {
                                   toast.error('User email already exist!');
                                   setErrors({ email: true });
                              }
                              console.log('error in add admin review handler : ', error);
                         })
               }
          }
     }

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
     return (
          <div>
               <div className='flex mb-4 gap-2'>
                    <div className='w-1/2'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                              First Name *
                         </span>
                         <Input
                              name="firstName"
                              id="firstName"
                              onChange={onInput}
                              error={errors.firstName} />
                    </div>
                    <div className='w-1/2'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                              Last Name *
                         </span>
                         <Input name="lastName" id="lastName" onChange={onInput} error={errors.lastName} />
                    </div>
               </div>
               <div className='flex mb-4 gap-2'>
                    <div className='w-1/2'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                              Email *
                         </span>
                         <Input name="email" id="email" onChange={onInput} error={errors.email} />
                    </div>
                    <div className='w-1/2'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                              Rating *
                         </span>
                         <Input name="rating" id="rating" onChange={onInput} error={errors.rating} />
                    </div>
               </div>
               <div className='flex flex-col mb-4'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                         Product *
                    </span>
                    <div>
                         <select
                              className='p-2 rounded-lg w-full outline-none'
                              style={errors.productId ? { border: '1px solid red' } : { border: '1px solid #d3d3d3' }}
                              name='productId'
                              onChange={onInput}>
                              <option>Select Product</option>
                              {
                                   products.map((item) => {
                                        return <option key={item?._id} value={item?._id}>
                                             {item?.productName}
                                        </option>
                                   })
                              }
                         </select>
                    </div>
               </div>
               <div className='flex flex-col mb-4'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                         Review *
                    </span>
                    <textarea
                         className='p-2 rounded-md outline-none'
                         name='review'
                         rows={3}
                         style={errors.review ? { border: '1px solid red' } : { border: '1px solid #D3D3D3' }}
                         onChange={onInput} />
               </div>
               <div>
                    {
                         dialog?.open === 'add-review'
                         &&
                         <>
                              <Button text="Add Review" onClick={handleAddReview} />
                         </>
                    }
               </div>
          </div>
     )
}

export default AddReviewForm