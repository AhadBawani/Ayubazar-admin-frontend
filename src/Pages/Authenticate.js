import React, { useState } from 'react'
import Input from '../Fields/Input';
import Button from '../Fields/Button';
import { toast } from 'react-toastify';
import { loginAdminUserHandler } from '../Requests/RequestHandler/AdminUserRequestHandler';
import { useDispatch } from 'react-redux';
import { UserAction, UserTokenAction } from '../Redux/Actions/AdminUserActions';

const Authenticate = () => {
    const dispatch = useDispatch();
    const [userState, setUserState] = useState({
        email: null,
        password: null
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })
    const onInput = (e) => {
        setUserState({ ...userState, [e.target.name]: e.target.value })
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLoginSubmit = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!userState.email) {
            newErrors.email = true;
            valid = false;
        } else {
            newErrors.email = false;
        }

        if (!validateEmail(userState.email)) {
            newErrors.email = true;
            valid = false;
            toast.error('Invalid Email!');
        } else {
            newErrors.email = false;
        }

        if (!userState.password) {
            newErrors.password = true;
            valid = false;
        } else {
            newErrors.password = false;
        }

        if (valid) {
            loginAdminUserHandler(userState)
                .then((response) => {
                    if (response) {
                        toast.success('User login successfull!');
                        dispatch(UserAction(response?.user));
                        dispatch(UserTokenAction(response?.token));
                        localStorage.setItem('token', response?.token);                        
                    }
                })
                .catch((error) => {
                    if (error) {
                        if (error?.message === 'User not found!') {
                            newErrors.email = true;
                            newErrors.password = true;
                            setErrors(newErrors);
                            toast.error(error?.message);
                        }
                    }
                })
        } else {
            setErrors(newErrors);
        }
    }
    return (
        <div className='flex flex-col justify-center items-center mt-36'>
            <span className='text-[#333] font-semibold text-2xl'>User Login</span>
            <div className='m-4 p-4 shadow-2xl w-[300px] lg:w-[500px] rounded-lg'>
                <div className='flex flex-col mb-6'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Email Address *
                    </span>
                    <Input onChange={onInput} name="email" error={errors.email} />
                </div>
                <div className='flex flex-col mb-6'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Password *
                    </span>
                    <Input type="password" name="password" onChange={onInput} error={errors.password} />
                    <span className='mt-1 text-[#4D4D4D] cursor-pointer'>Forgot Password?</span>
                </div>
                <div>
                    <Button text="Sign in to your account" color="#027148" hoverColor="#013220" onClick={handleLoginSubmit} />
                </div>
            </div>
        </div>
    )
}

export default Authenticate;