import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Requests from '../../Requests/Requests/Request';
import { BestSalingProductHandler, ToggleProductCodHandler, disableProductHandler, enableProductHandler, getAllProductRequestHandler } from '../../Requests/RequestHandler/ProductRequestHandler';
import { ImSpinner8 } from "react-icons/im";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { DialogAction } from '../../Redux/Actions/ComponentsAction';

const InventoryTableRow = ({ product, index }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch = useDispatch();
    function formatDateString(dateString) {
        const date = new Date(dateString);
        // const hours = date.getHours();
        // const ampm = hours >= 12 ? 'PM' : 'AM';
        // const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        // const formattedDate = `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()} ${formattedHours}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())} ${ampm}`;
        const formattedDate = `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()}`;
        return formattedDate;
    }

    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    const handleDisabledProduct = (productId) => {
        setIsProcessing(true);
        disableProductHandler(productId, dispatch)
            .then((response) => {
                if (response) {
                    setTimeout(() => {
                        setIsProcessing(false);
                        toast.success(response?.message);
                    }, 1000)
                }
            })
            .catch((error) => {
                setTimeout(() => {
                    setIsProcessing(false);
                    toast.success(error?.message);
                }, 1000)
            })
    }

    const handleEnableProduct = (productId) => {
        setIsProcessing(true);
        enableProductHandler(productId, dispatch)
            .then((response) => {
                if (response) {
                    setTimeout(() => {
                        setIsProcessing(false);
                        toast.error(response?.message);
                    }, 1000)
                }
            })
            .catch((error) => {
                setTimeout(() => {
                    setIsProcessing(false);
                    toast.error(error?.message);
                }, 1000)
            })
    }

    const handleBestProduct = (productId) => {
        setIsProcessing(true);
        BestSalingProductHandler(productId)
            .then((response) => {
                if (response) {
                    setTimeout(() => {
                        toast.success(response.message);
                        getAllProductRequestHandler(dispatch);
                        setIsProcessing(false);
                    }, 1000)
                }
            })
            .catch((error) => {
                console.log('error in best salling product handler : ', error);
            })
    }

    const handleCodToggle = (productId) => {
        setIsProcessing(true);
        ToggleProductCodHandler(productId)
            .then((response) => {
                if (response) {
                    setTimeout(() => {
                        toast.success(response.message);
                        getAllProductRequestHandler(dispatch);
                        setIsProcessing(false);
                    }, 1000)
                }
            })
            .catch((error) => {
                console.log('error in best salling product handler : ', error);
            })
    }    
    return (
        <>
            {isProcessing && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                    <ImSpinner8 size={36} className="animate-spin text-black" />
                </div>
            )}
            <tr key={product._id} className={(index % 2 === 0) ? 'bg-gray-100 text-[#4D4D4D]' : 'bg-white text-[#4D4D4D]'}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border p-4 text-center">
                    <div className='h-[60px] w-[60px] rounded-sm mx-auto'
                        style={{ border: '1px solid #ececec' }}>
                        {
                            product?.productImages?.length > 0
                                ?
                                <>
                                    <img
                                        src={Requests.GET_PRODUCT_IMAGE + product?.productImages[0]}
                                        alt={product?.productName}
                                        className="h-full w-full object-cover"
                                    />
                                </>
                                :
                                <>
                                    <span>Upload Images</span>
                                </>
                        }
                    </div>
                </td>
                <td className="border px-4 py-2 text-center">{product.productName}</td>
                <td className="border px-4 py-2 text-center">{product.productCompany?.companyName}</td>
                <td className="border px-4 py-2 text-center">{product?.outOfStock ? 'Out of Stock' : 'Product is live'}</td>
                <td className="border px-4 py-2 text-center">{formatDateString(product.createdAt)}</td>
                <td className="border px-4 py-2 text-center">
                    <div className='flex justify-between'>
                        <span className="relative cursor-pointer">
                            <MdDelete
                                className="w-7 h-7 p-1 cursor-pointer rounded-full hover:bg-gray-200 m-1" />
                        </span>
                        <span className='relative cursor-pointer'>
                            <MdEdit
                                className="w-7 h-7 p-1 cursor-pointer rounded-full hover:bg-gray-200 m-1"
                                onClick={() => dispatch(DialogAction({ open: 'edit-product', data: product }))} />
                        </span>
                        <span className='m-1 mt-2'>
                            <input type='checkbox'
                                className='cursor-pointer'
                                checked={product?.codAvailable}
                                onChange={() => handleCodToggle(product?._id)} />
                        </span>
                        <span className='relative cursor-pointer'>
                            {
                                product?.bestSelling
                                    ?
                                    <>
                                        <FaStar
                                            className="w-7 h-7 p-1 cursor-pointer fill-yellow-300
                                            rounded-full hover:bg-gray-200 m-1"
                                            onClick={() => handleBestProduct(product?._id)} />
                                    </>
                                    :
                                    <>
                                        <CiStar
                                            className="w-7 h-7 p-1 cursor-pointer rounded-full hover:bg-gray-200 m-1"
                                            onClick={() => handleBestProduct(product?._id)} />
                                    </>
                            }
                        </span>
                    </div>
                </td>
                <td className="border px-4 py-2 text-center">
                    {
                        product?.outOfStock
                            ?
                            <>
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
                                    }} onClick={() => handleEnableProduct(product?._id)}>
                                    Enable
                                </button>
                            </>
                            :
                            <>
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
                                    }} onClick={() => handleDisabledProduct(product?._id)}>
                                    Disable
                                </button>
                            </>
                    }
                </td>
            </tr>
        </>
    )
}

export default InventoryTableRow;
