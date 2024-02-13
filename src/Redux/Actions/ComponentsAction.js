import ActionType from "../ActionType"

export const ConfirmationDialogAction = (response) => {
    return {
        type: ActionType.CONFIRMATIONDIALOG,
        payload: response
    }
}