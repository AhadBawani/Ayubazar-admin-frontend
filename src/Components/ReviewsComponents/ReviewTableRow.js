import React from 'react';
import { formatDateString } from '../../Utils/FormateDate';
import { MdDelete } from 'react-icons/md';
import Requests from '../../Requests/Requests/Request';
import { useDispatch } from 'react-redux';
import { ConfirmationDialogAction } from '../../Redux/Actions/ComponentsAction';

const ReviewTableRow = ({ review, index }) => {
     const dispatch = useDispatch();
     const handleDeleteReview = (review) => {
          dispatch(
               ConfirmationDialogAction(
                    {
                         open: 'review',
                         id: review?._id,
                         body: `Are you sure you want to delete Review ?`
                    }));
     }
     return (
          <tr key={review._id} className={(index % 2 === 0) ? 'bg-gray-100 text-[#4D4D4D]' : 'bg-white text-[#4D4D4D]'}>
               <td className="border px-4 py-2 text-center">{index + 1}</td>
               <td className="border p-4 text-center">
                    <div className='h-[60px] w-[60px] rounded-sm mx-auto'
                         style={{ border: '1px solid #ececec' }}>
                         <img
                              src={Requests.GET_PRODUCT_IMAGE + review.productId?.productImages[0]}
                              alt={review?.blogImage}
                              className="h-full w-full object-cover"
                         />
                    </div>
               </td>
               <td className="border px-4 py-2 text-center">
                    <b>{review?.productId?.productName}</b>
               </td>
               <td className="border px-4 py-2 text-center">
                    {
                         review?.userId?.firstName && review?.userId?.lastName
                              ?
                              <>
                                   <span>{review?.userId?.firstName} {review?.userId?.lastName}</span>
                              </>
                              :
                              <>
                                   <span>{review?.userId?.displayName}</span>
                              </>
                    }
               </td>
               <td className="border px-4 py-2 text-center">
                    {review?.userId?.email}
               </td>
               <td className="border px-4 py-2 text-center">
                    {review?.review}
               </td>
               <td className="border px-4 py-2 text-center">
                    {review?.rating}
               </td>
               <td className="border px-4 py-2 text-center">{formatDateString(review?.createdAt)}</td>
               <td className="border px-4 py-2 text-center">
                    <div className='flex justify-between'>
                         <span className="relative cursor-pointer">
                              <MdDelete
                                   className="w-7 h-7 p-1 cursor-pointer rounded-full hover:bg-gray-200 m-2"
                                   onClick={() => handleDeleteReview(review)} />
                         </span>
                    </div>
               </td>
          </tr>
     )
}

export default ReviewTableRow