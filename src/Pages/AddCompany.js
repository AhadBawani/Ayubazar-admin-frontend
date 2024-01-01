import React, { useState } from 'react'
import Input from '../Fields/Input';
import Button from '../Fields/Button';
import { addCompanyHandler } from '../Requests/RequestHandler/CompanyRequestHandler';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AddCompany = () => {
    const dispatch = useDispatch();

    const [company, setCompany] = useState({
        companyName: null
    });
    const [errors, setErrors] = useState({
        companyName: false
    });
    const onInput = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value })
    }

    const handleAddCompany = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!company.companyName) {
            newErrors.companyName = true;
            valid = false;
        } else {
            newErrors.companyName = false;
        }
        if (valid) {
            addCompanyHandler(dispatch, company)
                .then((response) => {
                    if (response) {
                        toast.done('company created successfull!');
                        document.getElementById('companyNameInput').innerText = "";
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error);
                })
        } else {
            setErrors(newErrors);
        }
    }
    return (
        <div className='m-4 p-4'>
            <div
                className='flex justify-center text-xl font-semibold'>
                Add Company
            </div>
            <div>
                <div className='flex flex-col my-6'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                        Company Name *
                    </span>
                    <Input onChange={onInput} name="companyName" error={errors.companyName} id="companyNameInput" />
                </div>
                <div>
                    <Button text="Add Company" onClick={handleAddCompany} color="#90EE90" hoverColor="#65a765" />
                </div>
            </div>
        </div>
    )
}

export default AddCompany;