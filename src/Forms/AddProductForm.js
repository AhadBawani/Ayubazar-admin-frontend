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
import Input from '../Fields/Input';
import { getAllCategoryHandler } from '../Requests/RequestHandler/CategoryRequestHandler';
import { GetAllSubCategoryHandler } from '../Requests/RequestHandler/SubCategoryHandler';

const AddProductForm = () => {
    const { companies, category, subCategories } = useAdminState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState([]);
    const [productOptions, setProductOptions] = useState() || [];
    const [productDescription, setProductDescription] = useState(['']);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [productBulletDescription, setProductBulletDescription] = useState(['']);
    const [product, setProduct] = useState({
        productName: null,
        productCompany: null,
        category: null,
        subCategory: null,
        taxClass: null,
        taxStatus: null,
        discount: 0
    });
    const updateProductOptions = (values) => {
        setProductOptions(values);
    };
    const [errors, setErrors] = useState({
        productName: false,
        productCompany: false,
        category: false,
        subCategory: false
    })
    const onInput = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const validate = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!product.productName) {
            newErrors.productName = true;
            valid = false;
        } else {
            newErrors.productName = false;
        }

        if (!product.category) {
            newErrors.category = true;
            valid = false;
        } else {
            newErrors.category = false;
        }

        if (!product.subCategory) {
            newErrors.subCategory = true;
            valid = false;
        } else {
            newErrors.subCategory = false;
        }

        if (!product.productCompany) {
            newErrors.productCompany = true;
            valid = false;
        } else {
            newErrors.productCompany = false;
        }
        return { valid, newErrors };
    }
    // const validate = (value, errors) => {

    //     // let valid = true;
    //     // const newErrors = { ...errors };

    //     // Object.keys(value).forEach((key) => {
    //     //     if (!value[key]) {
    //     //         newErrors[key] = true;
    //     //         valid = false;
    //     //     } else {
    //     //         newErrors[key] = false;
    //     //     }
    //     // });

    //     // return { valid, newErrors };
    // };    
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
            formData.append('productSubCategory', product.subCategory);
            formData.append('taxClass', product.taxClass);
            formData.append('taxStatus', product.taxStatus);
            formData.append('discount', product.discount);
            formData.append('bulletDescription', productBulletDescriptions);
            formData.append('options', productOption);

            AddProductRequestHandler(dispatch, formData)
                .then((response) => {
                    if (response) {
                        toast.success(response);
                        getAllCategoryHandler(dispatch);
                        GetAllSubCategoryHandler(dispatch);
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

    const handleImagesSelected = (images) => {
        setSelectedImages(images);
    };

    const onCategoryChange = (e) => {
        onInput(e);
        const categoryId = e.target.value;
        const filtered = subCategories.filter((cat) => cat?.category?._id === categoryId);
        setFilteredSubCategories(filtered);
    }
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
            <div className='flex flex-col my-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Category *
                </span>
                <div>
                    <select
                        className='p-2 rounded-lg w-full outline-none'
                        style={errors.category ? { border: '1px solid red' } : { border: '1px solid #d3d3d3' }}
                        name='category'
                        onChange={onCategoryChange}>
                        <option>Select Category</option>
                        {
                            category.map((item) => {
                                return <option key={item?._id} value={item?._id}>{item?.category}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='flex flex-col my-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Sub Category *
                </span>
                <div>
                    <select
                        className='p-2 rounded-lg w-full outline-none'
                        style={errors.subCategory ? { border: '1px solid red' } : { border: '1px solid #d3d3d3' }}
                        name='subCategory'
                        onChange={onInput}>
                        <option>Select Sub Category</option>
                        {
                            filteredSubCategories.map((item) => {
                                return <option key={item?._id} value={item?._id}>{item?.subCategory}</option>
                            })
                        }
                    </select>
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
                        onChange={onInput}>
                        <option>Select Company</option>
                        {
                            companies.map((item) => {
                                return <option key={item?._id} value={item?._id}>{item?.companyName}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='flex gap-4 mt-4'>
                <div className='flex flex-col w-1/2'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Tax Status *
                    </span>
                    <Input name="taxStatus" onChange={onInput} />
                </div>
                <div className='flex flex-col w-1/2'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Tax Class *
                    </span>
                    <Input name="taxClass" onChange={onInput} />
                </div>
            </div>
            <div className='mt-2'>
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
            <div className='flex flex-col'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Discount in Percentage
                </span>
                <Input name="discount" onChange={onInput} type='number' />
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