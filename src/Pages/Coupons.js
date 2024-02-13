import React, { useEffect, useState } from 'react'
import AddCouponForm from '../Forms/AddCouponForm';
import CouponTable from '../Components/CouponPageComponents/CouponTable';
import { getAllCouponHandler } from '../Requests/RequestHandler/CouponRequestHandler';
import { useDispatch } from 'react-redux';

const Coupons = () => {
    const dispatch = useDispatch();
    const [editCouponData, setEditCouponData] = useState();
    useEffect(() => {
        getAllCouponHandler(dispatch);
    }, [dispatch])

    const handleEditCoupon = (couponData) => {
        setEditCouponData(couponData);
    }
    return (
        <div className='flex'>
            <div className='w-[40%]'>
                <AddCouponForm editCoupon={editCouponData}/>
            </div>
            <div className='flex justify-center border-l border-gray-400 w-[60%]'>
                <CouponTable handleEditCoupon={handleEditCoupon}/>
            </div>
        </div>
    )
}

export default Coupons;