import ActionType from "../ActionType"

export const UserAction = (response) => {
    return {
        type: ActionType.USER,
        payload: response
    }
}

export const UserTokenAction = (response) => {
    return {
        type: ActionType.TOKEN,
        payload: response
    }
}