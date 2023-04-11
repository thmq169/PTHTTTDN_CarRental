import { CAR_LOADED_SUCCESS, CAR_LOADED_FAIL, GET_A_CAR } from "../contexts/constants"

const carReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CAR_LOADED_SUCCESS:
            return {
                ...state,
                cars: payload,
                carsLoading: false
            }

        case CAR_LOADED_FAIL:
            return {
                ...state,
                carsLoading: false
            }

        case GET_A_CAR:
            return {
                ...state,
                car: payload.car,
                dayRentalOfCar: payload.dayRentalOfCar,
                carsLoading: false
            }

        default:
            return state;
    }
}

export default carReducer