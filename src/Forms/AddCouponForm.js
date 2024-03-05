import React, { useState } from 'react'
import Input from '../Fields/Input';
import { toast } from 'react-toastify';
import { generateCouponHandler, getAllCouponHandler } from '../Requests/RequestHandler/CouponRequestHandler';
import { useDispatch } from 'react-redux';

const AddCouponForm = () => {
    const dispatch = useDispatch();

    const [couponValue, setCouponValue] = useState({
        coupon: null,
        percentage: null,
        canUse: null
    })

    const [couponFormError, setCouponFormError] = useState({
        coupon: false,
        percentage: false,
        canUse: false
    })
    const onInput = (e) => {
        setCouponValue({ ...couponValue, [e?.target?.name]: e?.target?.value })
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...couponFormError };

        if (!couponValue.coupon) {
            newErrors.coupon = true;
            valid = false;
        } else {
            newErrors.coupon = false;
        }

        if (!couponValue.canUse) {
            newErrors.canUse = true;
            valid = false;
        } else {
            newErrors.canUse = false;
        }

        if (!couponValue.percentage) {
            newErrors.percentage = true;
            valid = false;
        } else {
            newErrors.percentage = false;
        }

        if (valid) {
            setCouponFormError(newErrors);
            return true;
        }
        else {
            setCouponFormError(newErrors);
            toast.error('Fill all the required fields!')
        }
    }

    const handleAddCoupon = () => {
        let valid = validateForm();
        if (valid) {
            const obj = {
                coupon: couponValue.coupon,
                percentage: couponValue.percentage,
                canUse: couponValue.canUse
            }
            generateCouponHandler(obj)
                .then((response) => {
                    if (response) {
                        getAllCouponHandler(dispatch);
                        toast.success('Coupon created successfully!');
                    }
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message);
                })
        }
    }

    return (
        <div className='mb-[8.5rem]'>
            <div className='p-4'>
                <div
                    className='flex justify-center text-xl font-semibold'>
                    Add Coupon
                </div>
                <div className='flex flex-col my-6'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Coupon Code *
                    </span>
                    <Input
                        onChange={onInput}
                        name="coupon"
                        error={couponFormError.coupon} />
                </div>
                <div className='flex flex-col my-6'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Percentage off *
                    </span>
                    <Input
                        onChange={onInput}
                        name="percentage"
                        type="number"
                        error={couponFormError.percentage} />
                </div>
                <div className='flex flex-col my-6'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Offer Valid For *
                    </span>
                    <Input
                        onChange={onInput}
                        name="canUse"
                        type="number"
                        error={couponFormError.canUse} />
                </div>
                <div>
                    <button
                        className='transition-all ease-in-out duration-200 w-full
                         bg-[#d0bdac] text-white hover:bg-[#bfae9e] uppercase outline-none'
                        style={{
                            letterSpacing: '2px',
                            lineHeight: '1.4',
                            height: '42px',
                            fontSize: '12px',
                            padding: '0 30px',
                            borderRadius: '5px',
                            fontWeight: '600'
                        }} onClick={handleAddCoupon}>
                        Add Coupon
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddCouponForm;