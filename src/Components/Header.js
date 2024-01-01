import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

const Header = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <div className='flex justify-end items-end m-4 mr-8'>
                <Dropdown navigate={navigate}/>
            </div>
        </div>
    )
}

export default Header;