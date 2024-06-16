import ActionType from "../ActionType";

const AdminState = {
    company: null,
    companies: null,
    category: null,
    products: null,
    coupons: null,
    discount: null,
    blogs: null,
    orders: null,
    currentOrders: null,
    order: null,
    report: null,
    reviews: null
};

const AdminReducer = (state = AdminState, { type, payload }) => {
    switch (type) {

        case ActionType.COMPANY:
            return { ...state, company: payload };

        case ActionType.COMPANIES:
            return { ...state, companies: payload };

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

        case ActionType.CURRENTORDERS:
            return { ...state, currentOrders: payload };

        case ActionType.ORDER:
            return { ...state, order: payload };

        case ActionType.REPORT:
            return { ...state, report: payload };

        case ActionType.REVIEWS:
            return { ...state, reviews: payload };

        default:
            return state;
    }
}
export default AdminReducer;