import ActionType from "../ActionType"

export const CompanyAction = (response) => {
    return {
        type: ActionType.COMPANY,
        payload: response
    }
}

export const CategoryAction = (response) => {
    return {
        type: ActionType.CATEGORY,
        payload: response
    }
}

export const ProductsAction = (response) => {
    return {
        type: ActionType.PRODUCTS,
        payload: response
    }
}

export const CouponsAction = (response) => {
    return {
        type: ActionType.COUPONS,
        payload: response
    }
}

export const DiscountAction = (response) => {
    return {
        type: ActionType.OFFERDISCOUNT,
        payload: response
    }
}