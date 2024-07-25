import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import CreateOffer from '../Pages/CreateOffer';
import { getAllProductRequestHandler } from '../Requests/RequestHandler/ProductRequestHandler';
import { useDispatch } from 'react-redux';
import { getOfferDiscountHandler } from '../Requests/RequestHandler/OfferDiscountHandler';
import EditProductDialog from '../Components/DialogBoxes/EditProductDialog';
import { getAllCompaniesOnlyHandler, getAllCompanyHandler } from '../Requests/RequestHandler/CompanyRequestHandler';
import Authenticate from '../Pages/Authenticate';
import { validateAdminUserHandler } from '../Requests/RequestHandler/AdminUserRequestHandler';
import useUserState from '../Hooks/useUserState';
import { getAllCouponHandler } from '../Requests/RequestHandler/CouponRequestHandler';
import EditCouponDialog from '../Components/DialogBoxes/EditCouponDialog';
import EditBlogDialog from '../Components/BlogsPageComponents/EditBlogDialog';
import { getAllBlogsHandler } from '../Requests/RequestHandler/BlogRequestHandler';
import BlogConfirmationDialog from '../Components/BlogsPageComponents/BlogConfirmationDialog';
import { getAllCategoryHandler } from '../Requests/RequestHandler/CategoryRequestHandler';
import ContactUs from '../Pages/ContactUs';
import ScrollToTop from '../Pages/ScrollToTop';
import { getAllOrdersHandler, monthlyOrderReport } from '../Requests/RequestHandler/OrdersRequestHandler';
import Companies from '../Pages/Companies';
import Reviews from '../Pages/Reviews';
import ProductReviewDialog from '../Components/ReviewsComponents/Dialogs/ProductReviewDialog';
import ProductReviewDeleteDialog from '../Components/ReviewsComponents/Dialogs/ProductReviewDeleteDialog';
import { getAllProductsReviewHandler } from '../Requests/RequestHandler/ReviewsRequestHandler';
import Categories from '../Pages/Categories';
import { GetAllSubCategoryHandler } from '../Requests/RequestHandler/SubCategoryHandler';

const Routing = () => {
    const { user } = useUserState();
    const { confirmation, dialog } = useComponentState();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (user) {
            getAllProductRequestHandler(dispatch);
            getOfferDiscountHandler(dispatch);
            getAllCompanyHandler(dispatch);
            getAllCompaniesOnlyHandler(dispatch);
            getAllCouponHandler(dispatch);
            getAllBlogsHandler(dispatch);
            getAllCategoryHandler(dispatch);
            getAllOrdersHandler(dispatch);
            monthlyOrderReport(dispatch);
            getAllProductsReviewHandler(dispatch);
            GetAllSubCategoryHandler(dispatch);
        }
    }, [dispatch, user])

    useEffect(() => {
        if (!user) {
            validateAdminUserHandler(dispatch, { token: token });
        }
    }, [token, user, dispatch])
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                <div className="fixed h-[80px] top-0 left-0 w-full bg-white shadow-md z-50">
                    <Header />
                </div>
                <div className='mt-20'>
                    <Routes>
                        {
                            user
                                ?
                                <>
                                    <Route path='/home' element={<Home />} />
                                    <Route path='/add-product' element={<AddProduct />} />
                                    <Route path='/orders' element={<Orders />} />
                                    <Route path='/reports' element={<Reports />} />
                                    <Route path='/coupons' element={<Coupons />} />
                                    <Route path='/reviews' element={<Reviews />} />
                                    <Route path='/blogs' element={<Blogs />} />
                                    <Route path='/companies' element={<Companies />} />
                                    <Route path='/inventory' element={<Inventory />} />
                                    <Route path='/create-offer' element={<CreateOffer />} />
                                    <Route path='/contact-us' element={<ContactUs />} />
                                    <Route path='/categories' element={<Categories />} />
                                    <Route path='*' element={<Navigate to={'/home'} />} />
                                </>
                                :
                                <>
                                    <Route path='/authenticate' element={<Authenticate />} />
                                    <Route path='*' element={<Navigate to={'/authenticate'} />} />
                                </>
                        }
                    </Routes>
                </div>
                <div>
                    {
                        confirmation?.open === 'coupon'
                        &&
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                            <div className="bg-white rounded-md h-auto w-auto transition-all ease-in-out duration-200">
                                <ConfirmationDialog />
                            </div>
                        </div>
                    }
                    {
                        confirmation?.open === 'blog'
                        &&
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                            <div className="bg-white rounded-md h-auto w-auto transition-all ease-in-out duration-200">
                                <BlogConfirmationDialog />
                            </div>
                        </div>
                    }
                    {
                        confirmation?.open === 'review'
                        &&
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                            <div className="bg-white rounded-md h-auto w-auto transition-all ease-in-out duration-200">
                                <ProductReviewDeleteDialog />
                            </div>
                        </div>
                    }
                </div>
                {
                    dialog?.open === 'edit-product'
                    &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-white rounded-md h-auto w-auto">
                            <EditProductDialog />
                        </div>
                    </div>
                }
                {
                    dialog?.open === 'edit-coupon'
                    &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-white rounded-md h-auto w-auto">
                            <EditCouponDialog />
                        </div>
                    </div>
                }
                {
                    dialog?.open === 'add-review'
                    &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-white rounded-md h-auto w-auto">
                            <ProductReviewDialog />
                        </div>
                    </div>
                }
                {
                    dialog?.open === 'edit-blog'
                    &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-white rounded-md h-auto w-auto">
                            <EditBlogDialog />
                        </div>
                    </div>
                }
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