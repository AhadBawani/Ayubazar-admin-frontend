import React, { useRef, useState } from 'react'
import Requests from '../Requests/Requests/Request';
import DynamicDescriptionInputs from '../Fields/DynamicDescriptionInputs';
import DynamicInputs from '../Fields/DynamicInputs';
import DynamicBulletDescription from '../Fields/DynamicBulletDescriptions';
import useAdminState from '../Hooks/useAdminState';
import { toast } from 'react-toastify';
import { editProductHandler } from '../Requests/RequestHandler/ProductRequestHandler';
import { useDispatch } from 'react-redux';
import { DialogAction } from '../Redux/Actions/ComponentsAction';

const EditProductForm = ({ product }) => {
    const { company } = useAdminState();
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const [descriptions, setDescriptions] = useState(product?.description);
    const [bulletDescription, setBulletDescription] = useState(product?.bulletDescription);
    const [productOptions, setProductOptions] = useState(product?.options);
    const [imageChange, setImageChange] = useState(false);
    const [formError, setFormError] = useState({
        productName: false,
        productCompany: false
    });
    const [productImage, setProductImage] = useState(product?.productImage);
    const [formValue, setFormValue] = useState({
        productName: product?.productName || null,
        productCompany: product?.productCompany?._id || null
    });
    const [productImageError, setProductImageError] = useState(false);

    const onInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        setProductImage(event.target.files[0]);
        setProductImageError(false);
        setImageChange(true);
    };

    const validate = () => {
        let valid = true;
        const newErrors = { ...formError };

        if (!productImage) {
            setProductImageError(true);
            valid = false;
        }

        if (!formValue.productName) {
            newErrors.productName = true;
            valid = false;
        } else {
            newErrors.productName = false;
        }

        if (!formValue.productCompany) {
            newErrors.productCompany = true;
            valid = false;
        } else {
            newErrors.productCompany = false;
        }

        if (!descriptions) {
            toast.error('Description is required!');
            valid = false;
            return;
        }

        if (!bulletDescription) {
            toast.error('Description is required!');
            valid = false;
            return;
        }

        if (valid) {
            return true;
        } else {
            setFormError(newErrors);
        }
    }

    const handleDescriptionChange = (updatedDescriptions) => {
        setDescriptions(JSON.stringify(updatedDescriptions));
    };

    const handleOptionChange = (updatedOptions) => {
        setProductOptions(JSON.stringify(updatedOptions));
    }

    const handleBulletDescriptionChange = (updatedDescriptions) => {
        setBulletDescription(JSON.stringify(updatedDescriptions));
    }

    const handleEditProduct = () => {
        let result = validate();
        if (result) {
            const formData = new FormData();
            formData.append('productName', formValue.productName.trim());
            formData.append('productImage', productImage);
            formData.append('productCompany', formValue.productCompany);
            formData.append('description', descriptions);
            formData.append('bulletDescription', bulletDescription);
            formData.append('options', productOptions);
            console.log(productImage);
            editProductHandler(dispatch, product?._id, formData)
                .then((updateResponse) => {
                    if (updateResponse) {
                        toast.success(updateResponse?.message);
                        dispatch(DialogAction(null));
                    }
                })
                .catch((error) => {
                    toast.error(error?.message);
                })
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center space-x-12'>
                <div className='w-[220px] h-[200px] rounded-lg flex justify-center items-center'
                    style={productImageError ?
                        { border: `1px solid red` }
                        :
                        { border: `1px solid #d3d3d3` }}
                    onClick={handleFileUpload}>
                    {product?.productImage ? (
                        <img
                            id='productImage'
                            src={imageChange ? URL.createObjectURL(productImage) : Requests.GET_PRODUCT_IMAGE + product?.productImage}
                            alt='Uploaded'
                            className='h-[180px] w-[180px] object-cover' />
                    ) : (
                        <span className='cursor-pointer'>
                            Click to Upload
                        </span>
                    )}
                    <input
                        type='file'
                        ref={fileInputRef}
                        className='hidden'
                        onChange={handleFileChange}
                    />
                </div>

                <div>
                    <div className='flex flex-col my-6'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                            Product Name *
                        </span>
                        <textarea
                            defaultValue={product?.productName}
                            className="border border-gray-300 p-2 rounded-md mr-2 flex-1 outline-none"
                            name='productName'
                            onChange={onInput}
                            rows={3}
                        />
                    </div>
                    <div className='flex flex-col my-6'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                            Company *
                        </span>
                        <div>
                            <select
                                className='p-2 rounded-lg w-full outline-none'
                                style={{ border: '1px solid #d3d3d3' }}
                                name='productCompany'
                                defaultValue={product?.productCompany?._id}
                                onChange={onInput}>
                                <option>Select Company</option>
                                {
                                    company.map((item) => {
                                        return <option key={item?._id} value={item?._id}>{item?.companyName}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <DynamicInputs existingOptions={JSON.parse(product?.options)} updateValues={handleOptionChange} />
                </div>
            </div>
            <div>
                <DynamicDescriptionInputs
                    initialDescriptions={JSON.parse(product?.description)}
                    updateValues={handleDescriptionChange}
                />
            </div>
            <div>
                <DynamicBulletDescription
                    existingDescriptions={JSON.parse(product?.bulletDescription)}
                    updateValues={handleBulletDescriptionChange}
                />
            </div>
            <div className='mt-4'>
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
                    onClick={handleEditProduct}>
                    Edit Product
                </button>
            </div>
        </div>
    )
}

export default EditProductForm;