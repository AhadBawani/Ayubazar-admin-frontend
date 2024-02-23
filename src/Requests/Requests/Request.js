const url = 'http://localhost:5000';

const Requests = {
    GET_ALL_COMPANY: url + '/company',
    ADD_COMPANY: url + '/company',
    ADD_PRODUCT: url + '/product',
    GET_ALL_PRODUCTS: url + '/product',
    CREATE_COUPON: url + '/coupon/generate-coupon',
    GET_ALL_COUPONS: url + '/coupon/get-all-coupon',
    EDIT_COUPON: url + '/coupon/edit-coupon',
    DELETE_COUPON: url + '/coupon/delete-coupon/',
    GET_PRODUCT_IMAGE: url + '/product-images/',
    DISABLE_PRODUCT: url + '/product/disable-product/',
    ENABLE_PRODUCT: url + '/product/enable-product/',
    CREATE_OFFER: url + '/offer/create-offer/',
    GET_DISCOUNT_OFFER: url + '/offer/',
    EDIT_PRODUCT: url + '/product/edit-product/',
    LOGIN_ADMIN_USER: url + '/admin-user/login',
    VALIDATE_USER: url + '/admin-user/validate',
    GET_BLOG_IMAGE: url + '/blog-images/',
    GET_ALL_BLOGS: url + '/blog/',
    ADD_BLOG: url + '/blog/add-blog',
    EDIT_BLOG: url + '/blog/edit-blog/',
    DELETE_BLOG: url + '/blog/delete-blog/'
}

export default Requests;