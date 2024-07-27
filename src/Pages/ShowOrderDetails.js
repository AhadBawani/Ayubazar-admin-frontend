import React from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuIndianRupee } from 'react-icons/lu';
import Requests from '../Requests/Requests/Request';
import Button from '../Fields/Button';
import { useDispatch } from 'react-redux';
import { DialogAction } from '../Redux/Actions/ComponentsAction';

const ShowOrderDetails = ({ order, setOrder, state }) => {
     const dispatch = useDispatch();
     const scrollToTop = () => {
          const c = document.documentElement.scrollTop || document.body.scrollTop;
          if (c > 0) {
               window.requestAnimationFrame(scrollToTop);
               window.scrollTo(0, c - c / 8);
          }
     };
     const handleSubmit = () => {
          scrollToTop();
          dispatch(DialogAction({
               open: true,
               title: `Is Order #${order?.orderId} is ready to deliver ?`,
               text: "Once this dialog is confirm the action cannot be undo.",
               data: order?._id,
               setState: setOrder,
               state: 'pending'
          }))
     }
     const handleDeleteOrder = () => {
          scrollToTop();
          dispatch(DialogAction({
               open: true,
               title: `Delete order #${order?.orderId}?`,
               text: "Once the is delete it cannot be reversed.",
               data: order?._id,
               setState: setOrder,
               state: 'delete-order'
          }))
     }

     const handleAcceptCancelRequest = () => {
          scrollToTop();
          dispatch(DialogAction({
               open: true,
               title: `Accept return request #${order?.orderId}?`,
               text: "Are you sure you want to accept the order cancellation request.",
               data: order?._id,
               setState: setOrder,
               state: 'accept-request'
          }))
     }

     const handleRejectCancelRequest = () => {
          scrollToTop();
          dispatch(DialogAction({
               open: true,
               title: `Reject return request #${order?.orderId}?`,
               text: "Are you sure you want to reject the order cancellation request.",
               data: order?._id,
               setState: setOrder,
               state: 'reject-request'
          }))
     }

     const handleOrderDelivered = () => {
          scrollToTop();
          dispatch(DialogAction({
               open: true,
               title: `Order Delivered #${order?.orderId}?`,
               text: `Are you sure you the #${order?.orderId} is delivered.`,
               data: order?._id,
               setState: setOrder,
               state: 'order-delivered'
          }))
     }
     return (
          <div className='relative'>
               <div className='absolute top-3 left-1'>
                    <IoMdArrowRoundBack onClick={() => setOrder(null)}
                         className="w-7 h-7 cursor-pointer rounded-full 
                         hover:bg-gray-200 m-2 mt-[-1px] text-[#333]"/>
               </div>
               <div className='flex justify-center items-center'>
                    <span className='text-2xl font-semibold text-[#333]'>Order #{order?.orderId}</span>
               </div>
               <div className='mt-8 m-4 p-4' style={{ border: '1px solid #ECECEC' }}>
                    {
                         JSON.parse(order?.products)?.map((product, index) => {
                              return <>
                                   <div className='flex justify-between w-full mb-6'>
                                        <div className='flex space-x-4 items-center'>
                                             <div className='min-h-[90px] max-h-[90px] min-w-[90px] max-w-[90px] flex justify-center items-center rounded-md'
                                                  style={{ border: '1px solid #ececec' }}>
                                                  <img className='min-h-[80px] max-h-[80px] min-w-[80px] max-w-[80px]'
                                                       src={Requests.GET_PRODUCT_IMAGE + product?.product?.productImage}
                                                       alt='Ayubazar' />
                                             </div>
                                             <div className='flex flex-col mb-4' key={index}>
                                                  <div>
                                                       <span
                                                            className='transition-all duration-200 ease-in-out text-[#333] hover:text-[#000]' style={{ fontWeight: '500' }}>
                                                            {product?.product?.productName}
                                                       </span>
                                                       <span className='text-[#333] font-semibold ml-1'
                                                            style={{ lineHeight: 'inherit' }}>
                                                            x {product?.quantity}
                                                       </span>
                                                  </div>
                                                  <div className='font-bold'>
                                                       <span className='text-base
                                                        text-[#333]'>Weight :
                                                            <span className='ml-1'>
                                                                 {Object.keys(product?.option)}</span>
                                                       </span>
                                                  </div>
                                             </div>
                                        </div>
                                        <div>
                                             <span className='text-[#333] font-bold'>
                                                  <div className='flex'>
                                                       <span className='ml-2'>
                                                            <LuIndianRupee className='mt-1' /></span>
                                                       <span>{Object.values(product?.option)}.00</span>
                                                  </div>
                                             </span>
                                        </div>
                                   </div>
                              </>
                         })
                    }
                    <div className='bg-[#F8F8F8] mt-6'>
                         <div className='p-4'>

                              <div className='flex justify-between text-[#333] font-semibold mb-5'>
                                   <span style={{ lineHeight: '1.24138em', fontSize: '1.06897em' }}>
                                        Subtotal :
                                   </span>
                                   <div className='flex'>
                                        <span className='ml-2'><LuIndianRupee className='mt-1' /></span>
                                        <span>{order?.subTotal}.00</span>
                                   </div>
                              </div>
                              <div className='flex justify-between text-[#333] font-semibold mb-5'>
                                   <span style={{ lineHeight: '1.24138em', fontSize: '1.06897em' }}>
                                        Shipping :
                                   </span>
                                   {
                                        order?.shipping === 'free'
                                             ?
                                             <>
                                                  <span className='text-[#333] font-semibold'>
                                                       Free Shipping
                                                  </span>
                                             </>
                                             :
                                             <>
                                                  <div className='flex'>
                                                       <span className='ml-2'><LuIndianRupee className='mt-1' /></span>
                                                       <span>{order?.shipping}.00</span>
                                                  </div>
                                             </>
                                   }
                              </div>
                              <div className='flex justify-between text-[#333] font-semibold mb-2'>
                                   <span style={{ lineHeight: '1.24138em', fontSize: '1.06897em' }}>Payment method : </span>
                                   <span>{order?.paymentType}</span>
                              </div>
                         </div>
                         <hr />
                         <div className='p-4'>
                              <div className='flex justify-between text-[#333] font-semibold'>
                                   <span style={{ lineHeight: '1.24138em', fontSize: '1.06897em' }}>
                                        Total :
                                   </span>
                                   <div className='flex'>
                                        <span className='ml-2'><LuIndianRupee className='mt-1' /></span>
                                        <span>{order?.total}.00</span>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className='flex justify-between m-4 p-4 text-[#333]'>
                    <div>
                         <span className='text-xl sm:text-2xl font-semibold'>User Details</span>
                         <div className='flex flex-col space-y-1 mt-4'>
                              <span>{order?.userId?.displayName}</span>
                              <span>{order?.userId?.firstName} {order?.userId?.lastName}</span>
                              <span>{order?.userId?.email}</span>
                         </div>
                    </div>
                    <div>
                         <span className='text-xl sm:text-2xl font-semibold'>Billing Address</span>
                         <div className='flex flex-col space-y-1 mt-4'>
                              <span>{order?.orderBillingAddress?.streetAddress}</span>
                              <span>{order?.orderBillingAddress?.apartment}</span>
                              <span>{order?.orderBillingAddress?.city} {order?.orderBillingAddress?.postcode}</span>
                              <span>{order?.orderBillingAddress?.state}</span>
                         </div>
                    </div>
                    <div>
                         <span className='text-xl sm:text-2xl font-semibold'>Shipping Address</span>
                         <div className='flex flex-col space-y-1 mt-4'>
                              <span>{order?.orderShippingAddress?.houseNumberAndStreetName}</span>
                              <span>{order?.orderShippingAddress?.apartment}</span>
                              <span>{order?.orderShippingAddress?.city} {order?.orderShippingAddress?.postcode}</span>
                              <span>{order?.orderShippingAddress?.state}</span>
                         </div>
                    </div>
               </div>
               {
                    state === 'on-the-way'
                    &&
                    <div className='m-4 p-4'>
                         <Button text="Order Delivered" onClick={handleOrderDelivered} />
                    </div>
               }
               {
                    state === 'pending' &&
                    <div className='m-4 p-4 flex space-x-2'>
                         <button
                              style={{
                                   letterSpacing: '2px',
                                   lineHeight: '1.4',
                                   height: '42px',
                                   fontSize: '12px'
                              }}
                              className='w-[100%] uppercase font-bold bg-red-500
                               hover:bg-red-600 outline-none text-white p-2
                                rounded-md transition-all ease-in-out duration-200'
                              onClick={handleDeleteOrder}
                         >
                              Delete Order
                         </button>
                         <Button text="Ready to deliver" onClick={handleSubmit} />
                    </div>
               }
               {
                    state === 'request-for-cancel'
                    &&
                    <div className='m-4 p-4 flex space-x-2'>
                         <button
                              style={{
                                   letterSpacing: '2px',
                                   lineHeight: '1.4',
                                   height: '42px',
                                   fontSize: '12px'
                              }}
                              className='w-[100%] uppercase font-bold bg-red-500
                               hover:bg-red-600 outline-none text-white p-2
                                rounded-md transition-all ease-in-out duration-200'
                              onClick={handleRejectCancelRequest}
                         >
                              Reject Cancel Request
                         </button>
                         <Button text="Accept Cancel Request" onClick={handleAcceptCancelRequest} />
                    </div>
               }
          </div>
     )
}

export default ShowOrderDetails;