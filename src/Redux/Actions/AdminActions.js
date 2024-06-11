import ActionType from "../ActionType"

export const CompanyAction = (response) => {
    return {
        type: ActionType.COMPANY,
        payload: response
    }
}

export const CompaniesAction = (response) => {
    return {
        type: ActionType.COMPANIES,
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

export const BlogsAction = (response) => {
    return {
        type: ActionType.BLOGS,
        payload: response
    }
}

export const OrdersAction = (response) => {
    return {
        type: ActionType.ORDERS,
        payload: response
    }
}

export const OrderAction = (response) => {
    return {
        type: ActionType.ORDER,
        payload: response
    }
}

export const ReportAction = (response) => {
    return {
        type: ActionType.REPORT,
        payload: response
    }
}

export const CurrentOrderAction = (response) => {
    return {
        type: ActionType.CURRENTORDERS,
        payload: response
    }
}