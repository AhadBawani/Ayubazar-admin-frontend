import ActionType from "../ActionType"

const ComponentsState = {
    confirmation: null,
    dialog: null
}

const ComponentsReducer = (state = ComponentsState, { type, payload }) => {
    switch (type) {
        case ActionType.CONFIRMATIONDIALOG:
            return { ...state, confirmation: payload };

        case ActionType.DIALOG:
            return { ...state, dialog: payload };

        default:
            return state;
    }
}

export default ComponentsReducer;