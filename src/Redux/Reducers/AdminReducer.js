import ActionType from "../ActionType";

const AdminState = {
    company: null,
    category: null
};

const AdminReducer = (state = AdminState, { type, payload }) => {
    switch (type) {
        case ActionType.COMPANY:
            return { ...state, company: payload };

        case ActionType.CATEGORY:
            return { ...state, category: payload };

        default:
            return state;
    }
}
export default AdminReducer;