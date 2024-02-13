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
    DISABLE_PRODUCT : url + '/product/disable-product/',
    ENABLE_PRODUCT : url + '/product/enable-product/'
}

export default Requests;