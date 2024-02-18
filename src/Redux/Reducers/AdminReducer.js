import ActionType from "../ActionType";

const AdminState = {
    company: null,
    category: null,
    products: null,
    coupons: null,
    discount: null
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

        default:
            return state;
    }
}
export default AdminReducer;