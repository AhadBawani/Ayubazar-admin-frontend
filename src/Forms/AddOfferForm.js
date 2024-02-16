import React, { useState } from 'react'
import Input from '../Fields/Input';
import { IoMdClose } from 'react-icons/io';
import useAdminState from '../Hooks/useCouponState';
import { toast } from 'react-toastify';

const AddOfferForm = () => {
    const { products } = useAdminState();
    const [isChecked, setIsChecked] = useState(false);
    const [selectedProductArr, setSelectedProductArr] = useState([]);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleAddProductToArr = (e) => {
        const productId = e.target.value;
        const product = products.find((item) => item?._id === productId);
        if (product) {
            const index = selectedProductArr?.findIndex((item) => item?._id === productId)
            if (index >= 0) {
                toast.error('Product already selected!');
                e.target.value = 'Select Product';
                return;
            }
            // Reset the select element's value to its default
            setSelectedProductArr([...selectedProductArr, product]);
            e.target.value = 'Select Product';
        }
    }

    const handleRemoveProductFromSelected = (productId) => {
        const filtered = selectedProductArr?.filter((product) => product?._id !== productId);
        setSelectedProductArr([...filtered]);
    }
    return (
        <div className='p-4'>
            <div className='flex flex-col my-6'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Offer Title *
                </span>
                <Input name="coupon" />
            </div>
            <div className='flex flex-col my-6'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Discount *
                </span>
                <Input name="coupon" type="number" />
            </div>
            <div className='flex flex-col my-6'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Expire On *
                </span>
                <Input name="coupon" type="date" />
            </div>
            <div className='flex flex-col my-6'>
                <div className='flex justify-between'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Select Product
                    </span>
                    <div>
                        <input
                            type='checkbox'
                            className='mt-[-1px] mr-1 outline-none'
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor='checkbox'>All</label>
                    </div>
                </div>
                <select disabled={isChecked}
                    className='p-2 rounded-lg w-full outline-none'
                    style={{ border: '1px solid #d3d3d3' }} onClick={handleAddProductToArr}>
                    <option>Select Product</option>
                    {products?.map((product) => {
                        return (
                            <option
                                key={product?._id}
                                style={{ width: '100%' }}
                                value={product?._id}
                            >
                                {product?.productName}
                            </option>
                        );
                    })}
                </select>
                {
                    selectedProductArr.length > 0
                    &&
                    <div className='mt-4'>
                        {
                            selectedProductArr?.map((product, index) => (
                                <div key={index} className="flex justify-between mb-2">
                                    <span className="truncate mr-2 flex items-center">{product.productName}</span>
                                    <div className="rounded-full p-1 w-9 h-9 
                                        transition-all ease-in-out duration-200 hover:bg-[#f1f1f1]
                                        flex justify-center items-center cursor-pointer">
                                        <IoMdClose size={24} onClick={() => handleRemoveProductFromSelected(product?._id)} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
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
                    }}>
                    Create Offer
                </button>
            </div>
        </div>
    )
}

export default AddOfferForm;