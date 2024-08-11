import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import useComponentState from '../../Hooks/useComponentState';
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import Requests from '../../Requests/Requests/Request';
import { editCompanyHandler, getAllCompaniesOnlyHandler } from '../../Requests/RequestHandler/CompanyRequestHandler';
import { toast } from 'react-toastify';
import Input from '../../Fields/Input';

const EditCompanyDialog = () => {
     const dispatch = useDispatch();
     const { dialog } = useComponentState();
     const [imageChange, setImageChange] = useState(false);
     const [companyImage, setCompanyImage] = useState();
     const [company, setCompany] = useState({
          companyName: dialog?.data?.companyName || null,
          gstNumber: dialog?.data?.gstNumber || null,
          address: dialog?.data?.address || null,
          city: dialog?.data?.city || null,
          pincode: dialog?.data?.pincode || null
     });
     const [errors, setErrors] = useState({
          companyName: false,
     })
     const [companyImageError, setCompanyImageError] = useState(false);
     const fileInputRef = useRef(null);
     const wrapperRef = useRef();
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

     const handleFileUpload = () => {
          fileInputRef.current.click();
     };
     console.log('company : ', company);
     console.log('data : ', dialog?.data);
     const handleFileChange = (event) => {
          setCompanyImage(event.target.files[0]);
          setCompanyImageError(false);
          setImageChange(true);
     };

     const onInput = (e) => {
          setCompany({ ...company, [e.target.name]: e.target.value });
     }

     const validate = () => {
          let valid = true;
          const newErrors = { ...errors };

          if (!company.companyName) {
               newErrors.companyName = true;
               valid = false;
          } else {
               newErrors.companyName = false;
          }

          if (valid) {
               return true;
          } else {
               setErrors(newErrors);
          }
     }

     const handleEditCompany = () => {
          let result = validate();
          if (result) {

               const formData = new FormData();
               if (imageChange) {
                    formData.append('companyImage', companyImage);
               }
               formData.append('companyName', company.companyName);
               formData.append('pincode', company.pincode);
               formData.append('city', company.city);
               formData.append('gstNumber', company.gstNumber);
               formData.append('address', company.address);
               editCompanyHandler(dispatch, dialog?.data?._id, formData)
                    .then((editResponse) => {
                         if (editResponse) {
                              toast.success(editResponse);
                              dispatch(DialogAction(null));
                              getAllCompaniesOnlyHandler(dispatch);
                         }
                    })
                    .catch((error) => {
                         console.log('error in edit company : ', error);
                    })
          }
     }
     return (
          <div className="p-4 m-4 max-h-[550px] min-w-[500px] overflow-y-scroll" ref={wrapperRef}>
               <div className='flex justify-between'>
                    <div>
                         <span className='font-semibold text-xl'>Edit Company</span>
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
               <div className='my-4'>
                    <div className='flex gap-4 mb-4'>
                         <div className='min-h-[140px] max-h-[140px] flex justify-center w-1/2
                              items-center rounded-md cursor-pointer'
                              onClick={handleFileUpload}
                              style={companyImageError ?
                                   { border: `1px solid red` }
                                   :
                                   { border: `1px solid #d3d3d3` }}
                         >
                              <img className='min-h-[130px] max-h-[130px]'
                                   src={imageChange ?
                                        URL.createObjectURL(companyImage)
                                        :
                                        Requests.GET_COMPANY_IMAGES + dialog?.data?.companyImage}
                                   alt='Ayubazar' />
                              <input
                                   type='file'
                                   ref={fileInputRef}
                                   className='hidden'
                                   onChange={handleFileChange}
                              />
                         </div>
                         <div className='flex flex-col w-1/2'>
                              <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                                   Company Name *
                              </span>
                              <textarea
                                   id="companyName"
                                   name="companyName"
                                   className="border border-gray-300 rounded px-3 py-2 outline-none"
                                   placeholder="Company Name"
                                   rows={4}
                                   onChange={onInput}
                                   defaultValue={company.companyName}
                              />
                         </div>
                    </div>
                    <div className='mb-2'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                              GST Number *
                         </span>
                         <Input name="gstNumber" id="gstNumber"
                              onChange={onInput} defaultValue={company.gstNumber} />
                    </div>
                    <div className='flex flex-col my-2'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                              Address *
                         </span>
                         <textarea
                              id="address"
                              name="address"
                              className="border border-gray-300 rounded px-3 py-2 outline-none"
                              placeholder="Company Address"
                              rows={4}
                              required
                              onChange={onInput}
                              defaultValue={company.address}
                         />
                    </div>
                    <div className='flex gap-2'>
                         <div className='w-1/2'>
                              <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                   City *
                              </span>
                              <Input name="city" id="city"
                                   defaultValue={company.city}
                                   onChange={onInput} />
                         </div>
                         <div className='w-1/2'>
                              <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                   Pincode *
                              </span>
                              <Input name="pincode" id="pincode"
                                   defaultValue={company.pincode}
                                   onChange={onInput} />
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
                         }}
                         onClick={handleEditCompany}>
                         Edit Company
                    </button>
               </div>
          </div>
     )
}

export default EditCompanyDialog