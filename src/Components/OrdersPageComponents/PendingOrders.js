import React, { useEffect, useState } from 'react'
import useAdminState from '../../Hooks/useAdminState';
import { formatDateString } from '../../Utils/FormateDate';
import ShowOrderDetails from '../../Pages/ShowOrderDetails';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

     const handleInvoiceDownload = (event, orderData) => {
          event.stopPropagation();
          const products = JSON.parse(orderData?.products);
          const invoiceElement = document.createElement('div');
          invoiceElement.style.padding = '20px';
          invoiceElement.style.position = 'absolute';
          invoiceElement.style.top = '-9999px'; // Hide the element off-screen
          invoiceElement.innerHTML = `
        <h2>Invoice</h2>
        <p><strong>Order ID:</strong> ${orderData.orderId}</p>
        <p><strong>Date:</strong> ${formatDateString(orderData.createdAt)}</p>
        <p><strong>Status:</strong> ${orderData.status}</p>
        <h3><strong>Products</strong></h3>
        <ul style="list-style-type: disc;">
            ${products.map(product => `                
            <li style="margin: 6px;">
            ${product?.product?.productName} - ${product?.quantity} x ${Object.values(product?.option).join(', ')}
            </li>
        `).join('')}
        </ul>
        <div style="margin-top: 20px;">
            <h3><strong>Total: ${orderData?.total}</strong></h3>
        </div>
        <div style="margin-top: 20px;">
            <h3><strong>Shipping Address</strong></h3>
            <div style="padding-left: 20px;">
                <div style="margin: 6px 0;">
                    <strong>Username:</strong> ${orderData?.orderShippingAddress?.firstName} ${orderData?.orderShippingAddress?.lastName}
                </div>
                <div style="margin: 6px 0;">
                    <strong>Phone Number:</strong> ${orderData?.orderShippingAddress?.phoneNumber}
                </div>
                <div style="margin: 6px 0;">
                    <strong>Email:</strong> ${orderData?.orderShippingAddress?.email}
                </div>
                <div style="margin: 6px 0;">
                    <strong>Address:</strong>
                    <div style="padding-left: 20px;">
                        <div>${orderData?.orderShippingAddress?.apartment} ${orderData?.orderShippingAddress?.houseNumberAndStreetName}</div>
                        <div>${orderData?.orderShippingAddress?.state} ${orderData?.orderShippingAddress?.city}, ${orderData?.orderShippingAddress?.postcode}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
          document.body.appendChild(invoiceElement);
          html2canvas(invoiceElement).then(canvas => {
               const imgData = canvas.toDataURL('image/png');
               const pdf = new jsPDF();
               pdf.addImage(imgData, 'PNG', 0, 0);
               pdf.save(`invoice_${orderData.orderId}.pdf`);

               document.body.removeChild(invoiceElement);
          });
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
                                                  <th className="px-4 py-2">Total Products</th>
                                                  <th className="px-4 py-2">Contact</th>
                                                  <th className="px-4 py-2">City</th>
                                                  <th className="px-4 py-2">Total</th>
                                                  <th className="px-4 py-2">Date</th>
                                                  <th className="px-4 py-2">Download</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {
                                                  data?.length > 0 && data?.map((order, index) => {
                                                       const products = JSON.parse(order?.products);
                                                       return <>
                                                            <tr key={order._id} onClick={() => handleShowOrder(order)}
                                                                 className={(index % 2 === 0) ? 'bg-gray-100 text-[#4D4D4D] cursor-pointer' : 'bg-white text-[#4D4D4D] cursor-pointer'}>
                                                                 <td className="border text-center px-4 py-2">
                                                                      {order?.orderId}
                                                                 </td>
                                                                 <td className="border text-center px-4 py-2">
                                                                      {order?.userId?.displayName}
                                                                 </td>
                                                                 <td className="border text-center px-4 py-2">
                                                                      {products.length > 1 ? `${products?.length} Products` : `${products?.length} Product`}
                                                                 </td>
                                                                 <td className="border text-center px-4 py-2">
                                                                      {order?.userId?.phoneNumber ? order?.userId?.phoneNumber : order?.userId?.email}
                                                                 </td>
                                                                 <td className="border text-center px-4 py-2">
                                                                      {order?.orderShippingAddress?.city}
                                                                 </td>
                                                                 <td className="border text-center px-4 py-2">
                                                                      {order?.total}
                                                                 </td>
                                                                 <td className="border text-center px-4 py-2">
                                                                      {formatDateString(order.createdAt)}
                                                                 </td>
                                                                 <td className="border text-center px-4 py-2 cursor-pointer hover:underline transition-all ease-in-out duration-200"
                                                                      onClick={(e) => handleInvoiceDownload(e, order)}>
                                                                      Download
                                                                 </td>
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