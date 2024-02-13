import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Header from '../Components/Header';
import AddProduct from '../Pages/AddProduct';
import Orders from '../Pages/Orders';
import Reports from '../Pages/Reports';
import { ToastContainer } from 'react-toastify';
import Coupons from '../Pages/Coupons';
import useComponentState from '../Hooks/useComponentState';
import ConfirmationDialog from '../Forms/ConfirmationDialog';
import Blogs from '../Pages/Blogs';
import Inventory from '../Pages/Inventory';

const Routing = () => {
    const { confirmation } = useComponentState();
    return (
        <>
            <BrowserRouter>
                <div className="fixed h-[70px] top-0 left-0 w-full bg-white shadow-md z-50">
                    <Header />
                </div>
                <div className='mt-20'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/add-product' element={<AddProduct />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/reports' element={<Reports />} />
                        <Route path='/coupons' element={<Coupons />} />
                        <Route path='/blogs' element={<Blogs />} />
                        <Route path='/inventory' element={<Inventory />} />
                    </Routes>
                </div>
                <div>
                    {
                        confirmation?.open
                        &&
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                            <div className="bg-white rounded-md h-auto w-auto transition-all ease-in-out duration-200">
                                <ConfirmationDialog />
                            </div>
                        </div>
                    }
                </div>
            </BrowserRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Routing;