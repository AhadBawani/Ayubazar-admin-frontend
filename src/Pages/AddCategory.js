import React, { useState } from 'react'
import Input from '../Fields/Input';
import Button from '../Fields/Button';
import useCompanyState from '../Hooks/useCompanyState';

const AddCategory = () => {
    const company = useCompanyState();

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

    const handleAddCategory = () => {
        setErrors(...errors);
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
                    <Input onChange={onInput} name="category" error={errors.category} />
                </div>
                <div className='flex flex-col my-4'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Company *
                    </span>
                    <div>
                        <select className='p-2 rounded-lg w-full outline-none' style={{ border: '1px solid #d3d3d3' }}>
                            <option>Select Company</option>
                            {
                                company.map((item) => {
                                    return <option key={item?._id}>{item?.companyName}</option>
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