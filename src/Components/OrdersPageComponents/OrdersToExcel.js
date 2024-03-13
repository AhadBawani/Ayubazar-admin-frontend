import React, { useEffect, useState } from 'react';
import { OrdersToExcelHandler, orderExcelDetailsHandler } from '../../Requests/RequestHandler/OrdersRequestHandler';
import Button from '../../Fields/Button';
import { toast } from 'react-toastify';

const OrdersToExcel = () => {
     const [orderIds, setOrderIds] = useState([]);
     const [fromOrderId, setFromOrderId] = useState('');
     const [toOrderId, setToOrderId] = useState('');
     const [errors, setErrors] = useState({
          from: false,
          to: false
     });

     useEffect(() => {
          orderExcelDetailsHandler()
               .then((response) => {
                    setOrderIds(response);
                    if (response.length > 0) {
                         setFromOrderId(response[0]);
                         setToOrderId(response[response.length - 1]);
                    }
               })
               .catch((error) => {
                    console.log('Error in getting order excel details: ', error);
               });
     }, []);

     const handleConvertToExcel = () => {
          let valid = true;
          let newErrors = { ...errors };

          if (!fromOrderId) {
               valid = false;
               newErrors.from = true;
          } else {
               newErrors.from = false;
          }

          if (!toOrderId) {
               valid = false;
               newErrors.to = true;
          } else {
               newErrors.to = false;
          }

          if (valid) {
               OrdersToExcelHandler(fromOrderId, toOrderId)
                    .then((blobData) => {
                         if (!(blobData instanceof Blob)) {
                              throw new Error('Data is not a Blob');
                         }

                         const url = window.URL.createObjectURL(blobData);
                         const a = document.createElement('a');
                         a.href = url;
                         a.download = 'orders.xlsx';
                         document.body.appendChild(a);
                         a.click();
                         document.body.removeChild(a);
                         window.URL.revokeObjectURL(url);
                    })
                    .catch((error) => {
                         console.error('Error converting orders to Excel: ', error);
                         toast.error('Error converting orders to Excel');
                    });
          }
          else {
               setErrors(newErrors);
          }
     }

     return (
          <div className='p-4'>
               <div className='flex justify-center items-center'>
                    <span className='text-2xl font-semibold text-[#333]'>Orders to Excel</span>
               </div>
               <div className='mt-8'>
                    <div className='flex w-full'>
                         <div className='flex flex-col mb-2 flex-grow'>
                              <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                   From *
                              </span>
                              <select
                                   className='p-2 rounded-lg w-full outline-none'
                                   style={errors.from ? { border: '1px solid red' } : { border: '1px solid #d3d3d3' }}
                                   value={fromOrderId}
                                   onChange={(e) => setFromOrderId(e.target.value)}
                              >
                                   {orderIds?.map((orderId) => (
                                        <option key={orderId} value={orderId}>
                                             {orderId}
                                        </option>
                                   ))}
                              </select>
                         </div>
                         <div className='flex flex-col mb-2 ml-2 flex-grow'>
                              <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                   To *
                              </span>
                              <select
                                   className='p-2 rounded-lg w-full outline-none'
                                   style={errors.to ? { border: '1px solid red' } : { border: '1px solid #d3d3d3' }}
                                   value={toOrderId}
                                   onChange={(e) => setToOrderId(e.target.value)}
                              >
                                   {orderIds?.slice().reverse().map((orderId) => (
                                        <option key={orderId} value={orderId}>
                                             {orderId}
                                        </option>
                                   ))}
                              </select>
                         </div>
                    </div>
               </div>
               <div>
                    <Button text="Convert to excel" onClick={handleConvertToExcel} />
               </div>
          </div>
     );
};

export default OrdersToExcel;