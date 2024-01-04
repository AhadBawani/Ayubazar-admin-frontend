import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Header from '../Components/Header';
import AddProduct from '../Pages/AddProduct';
import Orders from '../Pages/Orders';
import Reports from '../Pages/Reports';
import { ToastContainer } from 'react-toastify';

const Routing = () => {
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
                    </Routes>
                </div>
            </BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
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