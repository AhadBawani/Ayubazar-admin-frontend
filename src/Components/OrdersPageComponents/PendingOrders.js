import React, { useEffect, useState } from 'react'
import useAdminState from '../../Hooks/useAdminState';
import { formatDateString } from '../../Utils/FormateDate';
import ShowOrderDetails from '../../Pages/ShowOrderDetails';

const PendingOrders = () => {
     const [data, setData] = useState();
     const [order, setOrder] = useState();
     const { orders } = useAdminState();

     useEffect(() => {
          if (orders?.length > 0) {
               let result = orders?.filter((order) => order?.status === 'Pending' && order?.delete === false);
               setData(result);
          }
     }, [orders])

     const handleShowOrder = (order) => {
          setOrder(order);
     }

     return (
          <>
               {
                    order
                         ?
                         <>
                              <ShowOrderDetails order={order} setOrder={setOrder} state="pending" />
                         </>
                         :
                         <>
                              <div className="overflow-x-auto">
                                   <table className="table-auto min-w-full">
                                        <thead>
                                             <tr>
                                                  <th className="px-4 py-2">Order ID</th>
                                                  <th className="px-4 py-2">Username</th>
                                                  <th className="px-4 py-2">Contact</th>
                                                  <th className="px-4 py-2">Total Products</th>
                                                  <th className="px-4 py-2">City</th>
                                                  <th className="px-4 py-2">Total</th>
                                                  <th className="px-4 py-2">Date</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {
                                                  data?.length > 0 && data?.map((order, index) => {
                                                       const products = JSON.parse(order?.products);
                                                       return <>
                                                            <tr key={order._id} onClick={() => handleShowOrder(order)}
                                                                 className={(index % 2 === 0) ? 'bg-gray-100 text-[#4D4D4D] cursor-pointer' : 'bg-white text-[#4D4D4D] cursor-pointer'}>
                                                                 <td className="border text-center px-4 py-2">{order?.orderId}</td>
                                                                 <td className="border text-center px-4 py-2">{order?.userId?.displayName}</td>
                                                                 <td className="border text-center px-4 py-2">
                                                                      {products.length > 1 ? `${products?.length} Products` : `${products?.length} Product`}
                                                                 </td>
                                                                 <td className="border text-center px-4 py-2">
                                                                      {order?.userId?.phoneNumber ? order?.userId?.phoneNumber : order?.userId?.email}
                                                                 </td>
                                                                 <td className="border text-center px-4 py-2">{order?.orderShippingAddress?.city}</td>
                                                                 <td className="border text-center px-4 py-2">{order?.total}</td>
                                                                 <td className="border text-center px-4 py-2">{formatDateString(order.createdAt)}</td>
                                                            </tr>
                                                       </>
                                                  })
                                             }
                                        </tbody>
                                   </table>
                              </div>
                         </>
               }
          </>
     )
}

export default PendingOrders;