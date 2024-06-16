import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import useComponentState from '../../Hooks/useComponentState';
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import Requests from '../../Requests/Requests/Request';
import { editCompanyHandler, getAllCompaniesOnlyHandler } from '../../Requests/RequestHandler/CompanyRequestHandler';
import { toast } from 'react-toastify';

const EditCompanyDialog = () => {
     const dispatch = useDispatch();
     const { dialog } = useComponentState();
     const [imageChange, setImageChange] = useState(false);
     const [companyImage, setCompanyImage] = useState();
     const [companyName, setCompanyName] = useState(dialog?.data?.companyName);
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
     const handleFileChange = (event) => {
          setCompanyImage(event.target.files[0]);
          setCompanyImageError(false);
          setImageChange(true);
     };

     const handleEditCompany = () => {
          const formData = new FormData();
          if (imageChange) {
               formData.append('companyImage', companyImage);
          }
          formData.append('companyName', companyName);
          editCompanyHandler(dispatch, dialog?.data?._id, formData)
               .then((editResponse) => {
                    if(editResponse){                         
                         toast.success(editResponse);
                         dispatch(DialogAction(null));
                         getAllCompaniesOnlyHandler(dispatch);
                    }
               })
               .catch((error) => {
                    console.log('error in edit company : ', error);
               })
     }
     return (
          <div className="p-4 m-4 max-h-[550px] min-w-[500px]" ref={wrapperRef}>
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
               <div className='mt-4 flex flex-col'>
                    <div className='min-h-[190px] max-h-[190px] flex justify-center 
                    items-center rounded-md cursor-pointer'
                         onClick={handleFileUpload}
                         style={companyImageError ?
                              { border: `1px solid red` }
                              :
                              { border: `1px solid #d3d3d3` }}
                    >
                         <img className='min-h-[180px] max-h-[180px]'
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
                    <div className='flex flex-col my-6'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                              Product Name *
                         </span>
                         <textarea
                              id="companyName"
                              name="companyName"
                              className="border border-gray-300 rounded px-3 py-2 outline-none"
                              placeholder="Company Name"
                              rows={4}
                              onChange={(e) => setCompanyName(e.target.value)}
                              defaultValue={dialog?.data?.companyName}
                         />
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