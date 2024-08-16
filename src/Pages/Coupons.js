import React from 'react'
import AddCouponForm from '../Forms/AddCouponForm';
import CouponTable from '../Components/CouponPageComponents/CouponTable';

const Coupons = () => {
    return (
        <div className='flex'>
            <div className='w-[40%]'>
                <AddCouponForm />
            </div>
            <div className='flex justify-center border-l border-gray-400 w-[60%]'>
                <CouponTable />
            </div>
        </div>
    )
}

export default Coupons;