import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../Fields/Button';
import { AddProductThroughExcelHandler } from '../Requests/RequestHandler/ProductRequestHandler';

const AddProductExcel = () => {
     const [productsExcel, setProductsExcel] = useState();
     const handleFileChange = (event) => {
          const file = event.target.files[0];
          // setProductsExcel(file);
          const allowedExtensions = /(\.xlsx|\.xls)$/i; // Regular expression to match Excel file extensions

          if (!file) return;

          if (!allowedExtensions.test(file.name)) {
               toast.error('Please upload an Excel file (XLSX or XLS');
               event.target.value = null;
               event.target.style.borderColor = 'red';
          } else {
               setProductsExcel(file);
          }
     };

     const handleAddProducts = () => {
          const formData = new FormData();
          formData.append('productsExcel', productsExcel);
          AddProductThroughExcelHandler(formData)
               .then((response) => {
                    toast.success(response?.message);
               })
               .catch((error) => {
                    console.log("Error in add product through excel handler : ", error);
                    if (error.error) {
                         toast.error(error.error);
                    }
               })
     }

     return (
          <div className='border-t border-gray-400'>
               <div className='m-4 flex flex-col justify-center items-center my-8'>
                    <span className='text-2xl font-semibold'>Add Product Through Excel</span>
                    <div className='my-4 ml-24'>
                         <input type='file' onChange={handleFileChange}
                              accept='.xlsx, .xls'
                              className='cursor-pointer' />
                    </div>
                    <Button text="Add Products" onClick={handleAddProducts} />
               </div>
          </div>
     );
};

export default AddProductExcel;
