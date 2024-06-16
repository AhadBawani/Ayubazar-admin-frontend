import React, { useState } from 'react'
import ReviewTableRow from './ReviewTableRow';
import { useDispatch } from 'react-redux';
import { DialogAction } from '../../Redux/Actions/ComponentsAction';

const ReviewTable = ({ reviews }) => {
     const [searchedReview, setSearchedReview] = useState([]);
     const [searchResult, setSearchResult] = useState(false);
     const dispatch = useDispatch();
     const handleOnChange = (e) => {
          setSearchResult(false);
          let value = e.target.value.toLowerCase(); // Convert search string to lowercase for case-insensitive search
          const filteredReviews = reviews.filter((item) => item.review.toLowerCase().includes(value));
          if (filteredReviews?.length === 0) {
               setSearchResult(true);
               return;
          } else {
               setSearchedReview(filteredReviews);
          }
     };

     const handleAddReview = () => {
          dispatch(DialogAction({ open: 'add-review' }))
     }
     return (
          <>
               <div className='flex flex-col'>
                    <div className='flex'>
                         <div className='flex justify-center'>
                              <div className='flex mt-2'>
                                   <div>All</div>
                                   <div className='ml-1'>({reviews?.length})</div>
                              </div>
                              <div className='ml-4'>
                                   <input
                                        placeholder='Search Review'
                                        onChange={handleOnChange}
                                        className='p-2 border-2 border-gray-200 rounded-lg outline-none'
                                   />
                              </div>
                         </div>
                         <div className='flex justify-end items-end w-full'>
                              <button
                                   style={{
                                        letterSpacing: '2px',
                                        lineHeight: '1.4',
                                        height: '42px',
                                        fontSize: '12px',
                                   }}
                                   className='w-[15%] uppercase font-bold bg-[#027148] hover:bg-[#013220]
                    text-white p-2 rounded-md transition-all ease-in-out duration-200' onClick={handleAddReview}>
                                   + Add Review
                              </button>
                         </div>
                    </div>
                    <div className='mt-4'>
                         <table className="table-auto min-w-full">
                              <thead>
                                   <tr>
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Product Image</th>
                                        <th className="px-4 py-2">Product Name</th>
                                        <th className="px-4 py-2">Username</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Review</th>
                                        <th className="px-4 py-2">Rating</th>
                                        <th className="px-4 py-2">Created At</th>
                                        <th className="px-4 py-2">Actions</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {searchResult ? (
                                        <tr>
                                             <td colSpan="8" className='text-center py-4 pt-24'>
                                                  <span className='font-semibold text-2xl text-[#999]'>No Product Found!</span>
                                             </td>
                                        </tr>
                                   ) : (
                                        <>
                                             {searchedReview?.length > 0
                                                  ? searchedReview.map((item, index) => (
                                                       <ReviewTableRow review={item} index={index} key={index} />
                                                  ))
                                                  : reviews.map((item, index) => (
                                                       <ReviewTableRow review={item} index={index} key={index} />
                                                  ))}
                                        </>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div>
          </>
     )
}

export default ReviewTable;