import { LOGIN, 
        GET_STAFFS,
        SET_STAFFS,
        GET_CUSTOMERS,
        SET_CUSTOMERS,
        GET_OWNERS,
        SET_OWNERS,
        SET_OWNERS_DOCUMENT,
        SET_OWNERS_CAR,
        GET_CARS,
        SET_CARS,
        GET_INVOICES,
        SET_INVOICES,
        GET_TRANSPORTATIONS,
        SET_TRANSPORTATIONS,
        SET_NEW_STAFF ,
        SET_RENDER_DELIVERY,
        SET_RENDER_RECEIVE
} from '../actions/constants'

const initState = {
    login:false,
    staffs:[],
    customers:[],
    owners:[],
    owners_document:[],
    owners_cars:[],
    cars:[],
    invoices:[],
    new_staff: null,
    render_delivery:false,
    render_receive:false
}

function reducer(state,action) {
    switch(action.type) {
        case LOGIN:
            return{
                ...state,
                login: action.payload,
            }
        case SET_STAFFS:
            return{
                ...state,
                staffs: action.payload
            }
        case SET_CUSTOMERS:
            return{
                ...state,
                customers: action.payload
            }
        case SET_OWNERS_DOCUMENT:
            return{
                ...state,
                owners_document : action.payload
            }
        case SET_OWNERS:
            return{
                ...state,
                owners: action.payload
            }
        case SET_OWNERS_CAR:
            return{
                ...state,
                owners_cars: action.payload
            }
        case SET_CARS:
            return{
                ...state,
                cars: action.payload
            }
        case SET_INVOICES:
            return{
                ...state,
                invoices: action.payload
            }
        case SET_NEW_STAFF:
                return{
                    ...state,
                    new_staff: action.payload
                }
        case SET_RENDER_DELIVERY:
            return{
                ...state,
                render_delivery: action.payload
            }
        case SET_RENDER_RECEIVE:
                return{
                    ...state,
                    render_receive: action.payload
                }
        default:
            return state
    }
}

export {initState}
export default reducer