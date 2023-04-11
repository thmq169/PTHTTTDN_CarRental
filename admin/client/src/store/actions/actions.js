import { LOGIN, 
    SET_STAFFS,
    SET_CUSTOMERS,
    SET_OWNERS,
    SET_OWNERS_DOCUMENT,
    SET_OWNERS_CAR,
    SET_CARS,
    SET_INVOICES,
    SET_AUTH, 
    SET_USER ,
    SET_NEW_STAFF,
    SET_RENDER_DELIVERY,
    SET_RENDER_RECEIVE
} from "./constants";

export const login = payload => ({
    type: LOGIN,
    payload
})

export const setStaffs = payload => ({
    type: SET_STAFFS,
    payload
})

export const setCustomers = payload => ({
    type: SET_CUSTOMERS,
    payload
})

export const setOwners = payload => ({
    type: SET_OWNERS,
    payload
})

export const setOwnersDocument = payload => ({
    type: SET_OWNERS_DOCUMENT,
    payload
})

export const setOwnersCar = payload => ({
    type: SET_OWNERS_CAR,
    payload
})

export const setCars = payload => ({
    type: SET_CARS,
    payload
})

export const setInvoices = payload => ({
    type: SET_INVOICES,
    payload
})

export const setAuth = payload => ({
    type: SET_AUTH,
    payload
})

export const setUser = payload => ({
    type: SET_USER,
    payload
})

export const setNewStaff = payload => ({
    type: SET_NEW_STAFF,
    payload
})

export const setRenderDelivery = payload => ({
    type: SET_RENDER_DELIVERY,
    payload
})

export const setRenderReceive = payload => ({
    type: SET_RENDER_RECEIVE,
    payload
})