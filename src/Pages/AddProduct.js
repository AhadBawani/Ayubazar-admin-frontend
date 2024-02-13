import React, { useEffect } from 'react'
import AddCompany from './AddCompany';
import AddCategory from './AddCategory';
import { useDispatch } from 'react-redux';
import { getAllCompanyHandler } from '../Requests/RequestHandler/CompanyRequestHandler';
import AddProductForm from '../Forms/AddProductForm';

const AddProduct = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getAllCompanyHandler(dispatch);
    }, [dispatch])
    return (
        <>
            <div className='grid grid-cols-2 h-full'>
                <div>
                    <AddCompany />
                    <hr className='my-4' />
                    <AddCategory />
                </div>
                <div className='flex justify-center border-l border-gray-400'>
                    <AddProductForm />
                </div>
            </div>
        </>
    )
}

export default AddProduct;