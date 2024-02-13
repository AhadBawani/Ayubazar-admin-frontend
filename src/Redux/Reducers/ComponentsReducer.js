import ActionType from "../ActionType"

const ComponentsState = {
    confirmation: null
}

const ComponentsReducer = (state = ComponentsState, { type, payload }) => {
    switch (type) {
        case ActionType.CONFIRMATIONDIALOG:
            return { ...state, confirmation: payload };

        default:
            return state;
    }
}

export default ComponentsReducer;