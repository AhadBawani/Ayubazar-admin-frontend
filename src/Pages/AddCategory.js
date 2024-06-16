import React, { useState } from 'react'
import Input from '../Fields/Input';
import Button from '../Fields/Button';
import useAdminState from '../Hooks/useAdminState';
import { toast } from 'react-toastify';
import { addCategoryHandler, getAllCategoryHandler } from '../Requests/RequestHandler/CategoryRequestHandler';
import { useDispatch } from 'react-redux';

const AddCategory = () => {
    const { company } = useAdminState();
    const dispatch = useDispatch();
    const [category, setCategory] = useState({
        category: null,
        company: null
    });
    const [errors, setErrors] = useState({
        category: false,
        company: false
    });
    const onInput = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
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

    const handleAddCategory = () => {
        const validateCategory = validate(category, errors);
        if (!validateCategory.valid) {
            setErrors(validateCategory.newErrors);
            toast.error('Please fill required fields!');
        }
        if (validateCategory.valid) {
            setErrors(validateCategory.newErrors);
            const obj = {
                company: category.company,
                category: category.category
            };
            addCategoryHandler(obj)
                .then((response) => {
                    if(response){
                        getAllCategoryHandler(dispatch);
                        toast.success('Category added successfully!');
                        document.getElementById('category').value = null;
                        document.getElementById('company').value = 'Select Company';
                    }
                })
                .catch((error) => {
                    if(error){
                        console.log('error in add category : ', error.response);
                    }
                })
        }
    }
    return (
        <div className='m-4 p-4'>
            <div
                className='flex justify-center text-xl font-semibold'>
                Add Category
            </div>
            <div>
                <div className='flex flex-col my-4'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Category *
                    </span>
                    <Input onChange={onInput} name="category" error={errors.category} id="category"/>
                </div>
                <div className='flex flex-col my-4'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Company *
                    </span>
                    <div>
                        <select className='p-2 rounded-lg w-full outline-none' name='company' onChange={onInput}
                        id='company'
                            style={errors.company ? { border: '1px solid red' } : { border: '1px solid #d3d3d3' }}>
                            <option>Select Company</option>
                            {
                                company.map((item) => {
                                    return <option key={item?._id} value={item?._id}>{item?.companyName}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <Button text="Add Category" onClick={handleAddCategory} color="#90EE90" hoverColor="#65a765" />
                </div>
            </div>
        </div>

    )
};

export default AddCategory;