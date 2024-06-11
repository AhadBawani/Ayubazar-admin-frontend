import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import logo from '../Images/logo.png';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-between items-center'>
            <div className='mt-2 ml-2'>
                <img src={logo} alt='Ayubazar' width="250px"
                    className='cursor-pointer' onClick={() => navigate('/home')}/>
            </div>
            <div className='mr-8 mt-4'>
                <Dropdown navigate={navigate} />
            </div>
        </div>
    )
}

export default Header;