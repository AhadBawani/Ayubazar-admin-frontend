import ActionType from "../ActionType";

const AdminState = {
    company: null,
    category: null,
    products: null,
    coupons: null,
    discount: null,
    blogs: null,
    orders: null,
    order: null
};

const AdminReducer = (state = AdminState, { type, payload }) => {
    switch (type) {

        case ActionType.COMPANY:
            return { ...state, company: payload };

        case ActionType.CATEGORY:
            return { ...state, category: payload };

        case ActionType.PRODUCTS:
            return { ...state, products: payload };

        case ActionType.COUPONS:
            return { ...state, coupons: payload };

        case ActionType.OFFERDISCOUNT:
            return { ...state, discount: payload };

        case ActionType.BLOGS:
            return { ...state, blogs: payload };

        case ActionType.ORDERS:
            return { ...state, orders: payload };

        case ActionType.ORDER:
            return { ...state, order: payload };

        default:
            return state;
    }
}
export default AdminReducer;