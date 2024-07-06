import React, { useState } from 'react'
import Button from '../Fields/Button';
import DynamicInputs from '../Fields/DynamicInputs';
import { AddProductRequestHandler } from '../Requests/RequestHandler/ProductRequestHandler';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DynamicDescriptionInputs from '../Fields/DynamicDescriptionInputs';
import DynamicBulletDescriptions from '../Fields/DynamicBulletDescriptions';
import useAdminState from '../Hooks/useAdminState';
import { useNavigate } from 'react-router-dom';
import DynamicImageInputs from '../Fields/DynamicImageInputs';

const AddProductForm = () => {
    const { companies, category } = useAdminState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState([]);
    const [productOptions, setProductOptions] = useState() || [];
    const [productDescription, setProductDescription] = useState(['']);
    const [productBulletDescription, setProductBulletDescription] = useState(['']);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        productName: null,
        productCompany: null,
        category: null
    });
    const updateProductOptions = (values) => {
        setProductOptions(values);
    };
    const [errors, setErrors] = useState({
        productName: false,
        productCompany: false,
        category: null
    })
    const onInput = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const validate = (value, errors) => {
        let valid = true;
        const newErrors = { ...errors };

        Object.keys(value).forEach((key) => {
            if (!value[key]) {
                newErrors[key] = true;
                valid = false;
            } else {
                newErrors[key] = false;
            }
        });

        return { valid, newErrors };
    };
    const handleAddProduct = () => {
        const validateForm = validate(product, errors);
        if (!validateForm.valid) {
            setErrors(validateForm.newErrors);
            toast.error('Please fill required fields!');
            return;
        }
        if (validateForm.valid) {
            setErrors(validateForm.newErrors);
            const productOption = JSON.stringify(productOptions);
            const productDescriptions = JSON.stringify(productDescription);
            const productBulletDescriptions = JSON.stringify(productBulletDescription);
            const formData = new FormData();
            formData.append('productName', product.productName.trim());
            selectedImages.forEach((image, index) => {
                formData.append(`productImages`, image);
            });
            formData.append('productCompany', product.productCompany);
            formData.append('description', productDescriptions);
            formData.append('productCategory', product.category);
            formData.append('bulletDescription', productBulletDescriptions);
            formData.append('options', productOption);

            AddProductRequestHandler(dispatch, formData)
                .then((response) => {
                    if (response) {
                        toast.success(response);
                        navigate('/inventory');
                    }
                })
                .catch((error) => {
                    toast.error(error?.message);
                });
        }
    }

    const updateBulletDescription = (values) => {
        setProductBulletDescription(values);
    }

    const updateDescription = (values) => {
        setProductDescription(values);
    }

    const onCompanyChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
        const companyId = e.target.value;
        const filtered = category.filter((cat) => cat?.company === companyId);
        setCategories(filtered);
    }
    const handleImagesSelected = (images) => {
        setSelectedImages(images);
    };
    return (
        <div className='m-4'>
            <div
                className='flex justify-center text-xl font-semibold'>
                Add Product
            </div>
            <div className='flex justify-between items-center space-x-12'>
                <div>
                    <DynamicImageInputs updateValues={handleImagesSelected} />
                </div>
                <div className='mt-6 flex-grow'>
                    <div className='flex flex-col my-6'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                            Product Name *
                        </span>
                        <textarea
                            id="productName"
                            name="productName"
                            className="border border-gray-300 rounded px-3 py-2 outline-none"
                            placeholder="Product Name"
                            rows={6}
                            required
                            onChange={onInput}
                            style={errors.productName ? { border: '1px solid red' } : {}}
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Company Name *
                </span>
                <div>
                    <select
                        className='p-2 rounded-lg w-full outline-none'
                        style={errors.productCompany ? { border: '1px solid red' } : { border: '1px solid #d3d3d3' }}
                        name='productCompany'
                        onChange={onCompanyChange}>
                        <option>Select Company</option>
                        {
                            companies.map((item) => {
                                return <option key={item?._id} value={item?._id}>{item?.companyName}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='flex flex-col my-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Category *
                </span>
                <div>
                    <select
                        className='p-2 rounded-lg w-full outline-none'
                        style={errors.category ? { border: '1px solid red' } : { border: '1px solid #d3d3d3' }}
                        name='category'
                        onChange={onInput}>
                        <option>Select Category</option>
                        {
                            categories.map((item) => {
                                return <option key={item?._id} value={item?._id}>{item?.category}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='mt-4'>
                <DynamicDescriptionInputs
                    updateValues={updateDescription} />
            </div>
            <div className='mt-4'>
                <DynamicBulletDescriptions
                    updateValues={updateBulletDescription} />
            </div>
            <div className='mt-4'>
                <DynamicInputs updateValues={updateProductOptions} />
            </div>
            <div className='mt-4'>
                <Button text="Add Product"
                    onClick={handleAddProduct} color="#90EE90"
                    hoverColor="#65a765" />
            </div>
        </div>
    )
}

export default AddProductForm;