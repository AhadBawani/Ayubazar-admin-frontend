import React, { useRef, useState } from 'react'
import Input from '../Fields/Input';
import Button from '../Fields/Button';
import { addCompanyHandler } from '../Requests/RequestHandler/CompanyRequestHandler';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AddCompany = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [companyImage, setCompanyImage] = useState();
    const [companyImageError, setCompanyImageError] = useState();

    const [company, setCompany] = useState({
        companyName: null
    });
    const [errors, setErrors] = useState({
        companyName: false,
        companyImage: false
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

        if (!companyImage) {
            setCompanyImageError(true);
        }
        if (valid) {
            setCompanyImageError(false);
            const formData = new FormData();
            formData.append('companyName', company.companyName);
            formData.append('companyImage', companyImage);
            addCompanyHandler(dispatch, formData)
                .then((response) => {
                    if (response) {
                        toast.success('company created successfull!');
                        document.getElementById('companyNameInput').innerText = "";
                    }
                })
                .catch((error) => {                    
                    toast.error(error?.message);
                })
        } else {
            setErrors(newErrors);
        }
    }
    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setCompanyImage(event.target.files[0]);
        setCompanyImageError(false);
    };
    return (
        <div className='m-4 p-4'>
            <div
                className='flex justify-center text-xl font-semibold'>
                Add Company
            </div>
            <div className='flex justify-center items-center space-x-12'>
                <div className='w-[160px] h-[130px] rounded-lg mt-8'
                    style={companyImageError ?
                        { border: `1px solid red` }
                        :
                        { border: `1px solid #d3d3d3` }}
                    onClick={handleFileUpload}>
                    {companyImage ? (
                        <div className='flex justify-center items-center'>
                            <img id='companyImage' src={URL.createObjectURL(companyImage)}
                                alt='Uploaded'
                                className='h-[100px] w-[130px] mt-3 object-cover' onClick={handleFileUpload} />
                        </div>
                    ) : (
                        <span className='flex justify-center items-center h-full'>Click to Upload</span>
                    )}
                    <input
                        type='file'
                        ref={fileInputRef}
                        className='hidden'
                        onChange={handleFileChange}
                    />
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col my-6'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                            Company Name *
                        </span>
                        <Input onChange={onInput} name="companyName" error={errors.companyName} id="companyNameInput" />
                    </div>
                    <div>
                        <Button text="Add Company"
                            onClick={handleAddCompany} color="#90EE90"
                            hoverColor="#65a765" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCompany;