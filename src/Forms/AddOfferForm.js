import React, { useEffect, useState } from 'react'
import Input from '../Fields/Input';
import { IoMdClose } from 'react-icons/io';
import useAdminState from '../Hooks/useAdminState';
import { toast } from 'react-toastify';
import { createDiscountHandler } from '../Requests/RequestHandler/OfferDiscountHandler';
import { useDispatch } from 'react-redux';

const AddOfferForm = () => {
    const { products } = useAdminState();
    const [isChecked, setIsChecked] = useState(false);
    const [selectedProductArr, setSelectedProductArr] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedProductArr.length !== products?.length) {
            setIsChecked(false);
        }
    }, [selectedProductArr, products])
    const [formValue, setFormValue] = useState({
        offerTitle: null,
        discount: null,
        expiryDate: null,
    })

    const [formError, setFormError] = useState({
        offerTitle: false,
        discount: false,
        expiryDate: false,
        selectedProduct: false
    })

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setIsChecked(event.target.checked);
            setSelectedProductArr([...products]);
        } else {
            setIsChecked(event.target.checked);
            setSelectedProductArr([]);
        }
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

    const onInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }

    const handleRemoveProductFromSelected = (productId) => {
        const filtered = selectedProductArr?.filter((product) => product?._id !== productId);
        setSelectedProductArr([...filtered]);
    }

    const handleCreateOffer = () => {
        let valid = validateForm();

        if (valid) {
            const parsedExpiryDate = new Date(formValue.expiryDate);
            parsedExpiryDate.setHours(0, 0, 0, 0);
            const formattedExpiryDate = parsedExpiryDate.toISOString();

            const obj = {
                discountTitle: formValue.offerTitle,
                discountPercentage: formValue.discount,
                expiryDate: formattedExpiryDate,
                productArr: selectedProductArr
            }
            createDiscountHandler(dispatch, obj)
                .then((offerResponse) => {                    
                    if (offerResponse) {
                        toast.success(offerResponse?.message);
                    }
                })
                .catch((error) => {
                    console.log('error in create discount handler : ', error);
                })
        }
    }
    const validateForm = () => {
        let valid = true;
        const newErrors = { ...formError };

        if (!formValue.offerTitle) {
            newErrors.offerTitle = true;
            valid = false;
        } else {
            newErrors.offerTitle = false;
        }

        if (!formValue.discount) {
            newErrors.discount = true;
            valid = false;
        } else {
            newErrors.discount = false;
        }

        if (!formValue.expiryDate) {
            newErrors.expiryDate = true;
            valid = false;
        } else {
            newErrors.expiryDate = false;
        }

        if (!selectedProductArr.length > 0) {
            newErrors.selectedProduct = true;
            valid = false;
        } else {
            newErrors.selectedProduct = false;
        }

        if (valid) {
            setFormError(newErrors);
            return true;
        }
        else {
            setFormError(newErrors);
            toast.error('Fill all the required fields!');
        }
    }
    return (
        <div className='p-4'>
            <div className='flex flex-col my-6'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Offer Title *
                </span>
                <Input name="offerTitle" onChange={onInput} error={formError.offerTitle} />
            </div>
            <div className='flex flex-col my-6'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Discount *
                </span>
                <Input name="discount" type="number" onChange={onInput} error={formError.discount} />
            </div>
            <div className='flex flex-col my-6'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Expire On *
                </span>
                <Input name="expiryDate" type="date" onChange={onInput} error={formError.expiryDate} />
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
                    style={formError.selectedProduct ?
                        { border: '1px solid red' }
                        :
                        { border: '1px solid #d3d3d3' }}
                    onClick={handleAddProductToArr}>
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
                    }}
                    onClick={handleCreateOffer}>
                    Create Offer
                </button>
            </div>
        </div>
    )
}

export default AddOfferForm;