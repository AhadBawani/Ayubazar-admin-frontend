import React, { useEffect, useRef, useState } from 'react'
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import { useDispatch } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import useComponentState from '../../Hooks/useComponentState';
import { toast } from 'react-toastify';
import Input from '../../Fields/Input';

const EditCouponDialog = () => {
    const dispatch = useDispatch();
    const { dialog } = useComponentState();
    const wrapperRef = useRef();
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // Click outside the component
                dispatch(DialogAction(null));
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [dispatch]);

    const [couponValue, setCouponValue] = useState({
        coupon: dialog.data?.coupon || null,
        percentage: dialog.data?.percentage || null,
        canUse: dialog.data?.canUse || null
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

    const handleEditCoupon = () => {
        let valid = validateForm();
        if(valid){
            console.log(couponValue);
        }
    }

    return (
        <div className="p-4 m-4 w-[500px]" ref={wrapperRef}>
            <div className='flex justify-between'>
                <div>
                    <span className='font-semibold text-xl'>Edit Coupon</span>
                </div>
                <div>
                    <span className="relative">
                        <IoMdClose
                            className="w-7 h-7 cursor-pointer rounded-full hover:bg-gray-200 m-2 mt-[-1px]"
                            onClick={() => dispatch(DialogAction(null))} />
                    </span>
                </div>
            </div>
            <div className='mt-4'>
                <div className='flex flex-col my-6'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Coupon Code *
                    </span>
                    <Input
                        onChange={onInput}
                        name="coupon"
                        error={couponFormError.coupon}
                        defaultValue={couponValue?.coupon} />
                </div>
                <div className='flex flex-col my-6'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Percentage off *
                    </span>
                    <Input
                        onChange={onInput}
                        name="percentage"
                        type="number"
                        error={couponFormError.percentage}
                        defaultValue={couponValue?.percentage} />
                </div>
                <div className='flex flex-col my-6'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Offer Valid For *
                    </span>
                    <Input
                        onChange={onInput}
                        name="canUse"
                        type="number"
                        error={couponFormError.canUse}
                        defaultValue={couponValue?.canUse} />
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
                        }} onClick={handleEditCoupon}>
                        Edit Coupon
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditCouponDialog