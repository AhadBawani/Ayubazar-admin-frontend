import React from 'react';
import ReviewTable from '../Components/ReviewsComponents/ReviewTable';
import useAdminState from '../Hooks/useAdminState';

const Reviews = () => {
     const { reviews } = useAdminState();
     return (
          <>
               <div>
                    <div className='flex justify-center border-l border-gray-400 p-4'>
                         <ReviewTable reviews={reviews} />
                    </div>
               </div>
          </>
     )
}

export default Reviews;