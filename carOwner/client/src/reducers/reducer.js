import { LOGIN, GET_CARS, GET_CAR, SET_USER, SET_ACTIVITY, GET_ACTIVITY,  SET_HISTORY } from '../actions/constants'
import activitys from '../../api/activity.json'
import histories from '../../api/history.json'

const initState = {
    login:false,
    cars: [],
    car: {},
    user: {},
    activity: {},
    history: {}
}

function reducer(state,action) {
    switch(action.type) {
        case LOGIN:
            return{
                ...state,
                login: action.payload,
            }
        case SET_USER:
            return{
                ...state,
                user: action.payload,
            }
        case GET_CARS:
            return{
                ...state,
                cars: action.payload,
            }
        case GET_CAR:
            return{
                ...state,
                car: state.cars.find(car => car.ID === Number.parseInt(action.payload))
            }
        case SET_ACTIVITY:
            return{
                ...state,
                activity: activitys.find(ac => ac.ID == action.payload),
            }
        case  SET_HISTORY:
            return{
                ...state,
                history: histories.find(history => history.ID == action.payload),
            }
        default:
            return state
    }
}

export {initState}
export default reducer