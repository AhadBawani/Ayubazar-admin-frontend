import React from 'react';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { ConfirmationDialogAction, DialogAction } from '../../Redux/Actions/ComponentsAction';
import { useDispatch } from 'react-redux';
import useAdminState from '../../Hooks/useAdminState';
import { formatDateString } from '../../Utils/FormateDate';

const CouponTable = () => {
    const { coupons } = useAdminState();
    const dispatch = useDispatch();

    

    const handleDeleteCoupon = (data) => {
        dispatch(
            ConfirmationDialogAction(
                {
                    open: 'coupon',
                    id: data?._id,
                    body: `Are you sure you want to delete ${data?.coupon} ?`
                }));
    }
    const handleEditCoupon = (coupon) => {
        dispatch(DialogAction({ open: 'edit-coupon', data: coupon }))
    }
    return (
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Coupon</th>
                        <th className="px-4 py-2">Percentage</th>
                        <th className="px-4 py-2">Valid for</th>
                        <th className="px-4 py-2">Used</th>
                        <th className="px-4 py-2">Created On</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coupons?.map((item, index) => (
                            <tr key={item._id}
                                className={(index % 2 === 0) ? 'bg-gray-100 text-[#4D4D4D]' : 'bg-white text-[#4D4D4D]'}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{item.coupon}</td>
                                <td className="border text-center px-4 py-2">{item.percentage} %</td>
                                <td className="border text-center px-4 py-2">{item.canUse}</td>
                                <td className="border text-center px-4 py-2">{item.alreadyUsed}</td>
                                <td className="border px-4 py-2">{formatDateString(item.createdAt)}</td>
                                <td className="border px-4 py-2">
                                    <div className='flex justify-between'>
                                        <span className='cursor-pointer'>
                                            <MdDelete onClick={() => handleDeleteCoupon(item)} />
                                        </span>
                                        <span className='cursor-pointer'>
                                            <MdEdit onClick={() => handleEditCoupon(item)} />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default CouponTable;
