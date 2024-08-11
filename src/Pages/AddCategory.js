import React, { useState } from 'react'
import Input from '../Fields/Input';
import Button from '../Fields/Button';
import { toast } from 'react-toastify';
import { addCategoryHandler, getAllCategoryHandler } from '../Requests/RequestHandler/CategoryRequestHandler';
import { useDispatch } from 'react-redux';

const AddCategory = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState({
        category: null
    });
    const [errors, setErrors] = useState({
        category: false
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
                category: category.category
            };
            addCategoryHandler(obj)
                .then((response) => {
                    if (response) {
                        getAllCategoryHandler(dispatch);
                        toast.success('Category added successfully!');
                        document.getElementById('category').value = null;
                    }
                })
                .catch((error) => {
                    if (error) {
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
                    <Input onChange={onInput} name="category" error={errors.category} id="category" />
                </div>
                <div>
                    <Button text="Add Category" onClick={handleAddCategory} color="#90EE90" hoverColor="#65a765" />
                </div>
            </div>
        </div>

    )
};

export default AddCategory;