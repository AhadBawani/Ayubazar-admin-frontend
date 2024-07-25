import ActionType from "../ActionType";

const UserState = {
    user: null,
    token: null
}

const AdminUserReducer = (state = UserState, { type, payload }) => {
    switch (type) {
        case ActionType.USER:
            return { ...state, user: payload };

        case ActionType.TOKEN:
            return { ...state, token: payload };

        default:
            return state;
    }
}

export default AdminUserReducer;