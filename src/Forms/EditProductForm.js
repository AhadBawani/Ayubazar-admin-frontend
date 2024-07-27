import React, { useEffect, useState } from 'react'
import DynamicDescriptionInputs from '../Fields/DynamicDescriptionInputs';
import DynamicInputs from '../Fields/DynamicInputs';
import DynamicBulletDescription from '../Fields/DynamicBulletDescriptions';
import useAdminState from '../Hooks/useAdminState';
import { toast } from 'react-toastify';
import { editProductHandler } from '../Requests/RequestHandler/ProductRequestHandler';
import { useDispatch } from 'react-redux';
import { DialogAction } from '../Redux/Actions/ComponentsAction';
import Input from '../Fields/Input';
import DynamicImageInputs from '../Fields/DynamicImageInputs';

const EditProductForm = ({ product }) => {
    const { company, category } = useAdminState();
    const dispatch = useDispatch();
    const [descriptions, setDescriptions] = useState(product?.description);
    const [bulletDescription, setBulletDescription] = useState(product?.bulletDescription);
    const [productOptions, setProductOptions] = useState(product?.options);
    const [selectedImages, setSelectedImages] = useState([product?.productImage]);
    const [subCategories, setSubCategories] = useState([]);
    const [formError, setFormError] = useState({
        productName: false,
        productCompany: false
    });
    const [formValue, setFormValue] = useState({
        productName: product?.productName || null,
        productCompany: product?.productCompany?._id || null,
        taxClass: product?.taxClass || null,
        discount: product?.discount || null,
        taxStatus: product?.taxStatus || null,
        category: product?.productCategory?._id || null,
        subCategory: product?.productSubCategory?._id || null
    });

    const onInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const filteredSubCategory = category?.filter((item) => item?._id === formValue.category);
        if (filteredSubCategory?.length > 0) {
            setSubCategories(filteredSubCategory[0]?.subCategories);
        }
    }, [category, formValue.category])

    const validate = () => {
        let valid = true;
        const newErrors = { ...formError };

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
            selectedImages.forEach((image, index) => {
                formData.append(`productImages`, image);
            });
            formData.append('productCompany', formValue.productCompany);
            formData.append('taxStatus', formValue.taxStatus);
            formData.append('taxClass', formValue.taxClass);
            formData.append('category', formValue.category);
            formData.append('subCategory', formValue.subCategory);
            formData.append('description', descriptions);
            formData.append('discount', formValue.discount);
            formData.append('bulletDescription', bulletDescription);
            formData.append('options', productOptions);
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
    const handleImagesSelected = (images) => {
        setSelectedImages(images);
    };

    return (
        <div>
            <div className='flex justify-center items-center space-x-12'>
                <DynamicImageInputs updateValues={handleImagesSelected} />
                <div className='w-1/3'>
                    <div className='flex flex-col my-2'>
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
                    <div className='flex flex-col my-2'>
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
                    <div className='flex flex-col my-2'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                            Tax Status
                        </span>
                        <Input
                            defaultValue={product?.taxStatus}
                            name='taxStatus'
                            onChange={onInput}
                        />
                    </div>
                    <div className='flex flex-col my-2'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                            Tax Class
                        </span>
                        <Input
                            defaultValue={product?.taxClass}
                            name='taxClass'
                            onChange={onInput}
                        />
                    </div>
                </div>
                {
                    product?.options?.length > 0
                        ?
                        <div>
                            <DynamicInputs existingOptions={JSON.parse(product?.options)} updateValues={handleOptionChange} />
                        </div>
                        :
                        <div>
                            <DynamicInputs existingOptions={[]} updateValues={handleOptionChange} />
                        </div>
                }
            </div>
            <div className='flex flex-col'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Discount *
                </span>
                <Input name="discount" onChange={onInput} type='number' defaultValue={formValue.discount} />
            </div>
            <div className='flex flex-col my-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                    Category *
                </span>
                <div>
                    <select
                        className='p-2 rounded-lg w-full outline-none'
                        style={{ border: '1px solid #d3d3d3' }}
                        name='category'
                        onChange={onInput}>
                        <option>Select Category</option>
                        {
                            category.map((item) => {
                                return <option key={item?._id}
                                    value={item?._id}
                                    selected={item?._id === formValue?.category}>
                                    {item?.category}
                                </option>
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
                        style={{ border: '1px solid #d3d3d3' }}
                        name='subCategory'
                        onChange={onInput}>
                        <option>Select Sub Category</option>
                        {
                            subCategories.map((item) => {
                                return <option
                                    key={item?._id}
                                    value={item?._id}
                                    selected={item?._id === formValue?.subCategory}>
                                    {item?.subCategory}
                                </option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div>
                {
                    product?.description?.length > 0
                        ?
                        <div>
                            <DynamicDescriptionInputs
                                initialDescriptions={JSON.parse(product?.description)}
                                updateValues={handleDescriptionChange}
                            />
                        </div>
                        :
                        <div>
                            <DynamicDescriptionInputs
                                initialDescriptions={[]}
                                updateValues={handleDescriptionChange}
                            />
                        </div>
                }
            </div>
            <div>
                {
                    product?.bulletDescription?.length > 0
                        ?
                        <DynamicBulletDescription
                            existingDescriptions={JSON.parse(product?.bulletDescription)}
                            updateValues={handleBulletDescriptionChange}
                        />
                        :
                        <DynamicBulletDescription
                            existingDescriptions={[]}
                            updateValues={handleBulletDescriptionChange}
                        />
                }
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