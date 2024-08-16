import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllCompanyHandler } from '../Requests/RequestHandler/CompanyRequestHandler';
import AddProductForm from '../Forms/AddProductForm';
import AddProductExcel from '../Forms/AddProductExcel';

const AddProduct = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getAllCompanyHandler(dispatch);
    }, [dispatch])
    return (
        <>
            <div>
                <div className='flex justify-center items-center py-4'>
                    <div className='w-[62%] shadow-2xl'>
                        <AddProductForm />
                    </div>
                </div>
                <div>
                    <AddProductExcel />
                </div>
            </div>
        </>
    )
}

export default AddProduct;