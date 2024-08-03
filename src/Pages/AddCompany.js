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
        companyName: null,
        gstNumber: null,
        address: null,
        city: null,
        pincode: null
    });
    const [errors, setErrors] = useState({
        companyName: false
    });
    const onInput = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value })
    }

    const validate = () => {
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
            toast.error('Company image is required!');
            return;
        }

        if (valid) {
            return true;
        } else {
            setErrors(newErrors);
        }
    };

    const handleAddCompany = () => {
        const validateForm = validate();
        if (validateForm) {
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
        }
    }
    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setCompanyImage(event.target.files[0]);
        setCompanyImageError(false);
    };
    console.log(errors);
    return (
        <>
            <div className='m-4'>
                <div
                    className='flex justify-center text-xl font-semibold'>
                    Add Company
                </div>
                <div>
                    <div className='flex justify-between'>
                        <div className='w-[220px] h-[180px] rounded-lg mt-8'
                            style={companyImageError ?
                                { border: `1px solid red` }
                                :
                                { border: `1px solid #d3d3d3` }}
                            onClick={handleFileUpload}>
                            {companyImage ? (
                                <div className='flex justify-center items-center'>
                                    <img id='companyImage' src={URL.createObjectURL(companyImage)}
                                        alt='Uploaded'
                                        className='h-[150px] w-[150px] mt-3 object-cover' onClick={handleFileUpload} />
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
                        <div className='ml-4 w-2/3'>
                            <div className='flex flex-col my-6'>
                                <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                                    Company Name *
                                </span>
                                <textarea
                                    id="companyName"
                                    name="companyName"
                                    className="border border-gray-300 rounded px-3 py-2 outline-none"
                                    placeholder="Company Name"
                                    rows={6}
                                    required
                                    onChange={onInput}
                                    style={errors.companyName ? { border: '1px solid red' } : {}}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            GST Number *
                        </span>
                        <Input name="gstNumber" id="gstNumber"
                            value={company.gstNumber} onChange={onInput} />
                        <div className='flex flex-col my-2'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-2'>
                                Address *
                            </span>
                            <textarea
                                id="address"
                                name="address"
                                className="border border-gray-300 rounded px-3 py-2 outline-none"
                                placeholder="Company Address"
                                rows={4}
                                required
                                onChange={onInput}
                                style={errors.address ? { border: '1px solid red' } : {}}
                            />
                        </div>
                        <div className='flex gap-2'>
                            <div className='w-1/2'>
                                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                    City *
                                </span>
                                <Input name="city" id="city"
                                    value={company.city} error={errors.city} onChange={onInput} />
                            </div>
                            <div className='w-1/2'>
                                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                    Pincode *
                                </span>
                                <Input name="pincode" id="pincode"
                                    value={company.pincode} error={errors.pincode} onChange={onInput} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <Button text="Add Company"
                            onClick={handleAddCompany} color="#90EE90"
                            hoverColor="#65a765" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCompany;