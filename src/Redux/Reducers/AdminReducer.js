import ActionType from "../ActionType";

const AdminState = {
    company: null,
    category: null,
    products: null,
    coupons: null
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

        default:
            return state;
    }
}
export default AdminReducer;