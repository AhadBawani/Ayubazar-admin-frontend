import ActionType from "../ActionType"

export const ConfirmationDialogAction = (response) => {
    return {
        type: ActionType.CONFIRMATIONDIALOG,
        payload: response
    }
}

export const DialogAction = (response) => {
    return {
        type: ActionType.DIALOG,
        payload: response
    }
}