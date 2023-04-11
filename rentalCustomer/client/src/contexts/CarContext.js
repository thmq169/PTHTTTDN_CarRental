import { createContext, useReducer, useCallback, useState } from "react";
import carReducer from "../reducers/carReducer.js";
import { apiUrl, CAR_LOADED_SUCCESS, CAR_LOADED_FAIL, GET_A_CAR } from "./constants.js";
import axios from "axios";

export const CarContext = createContext()

const initState = {
    car: null,
    cars: [],
    carsLoading: true,
    dayRentalOfCar: []
}

const CarContextProvider = ({children}) => {
    const [carState, dispatch] = useReducer(carReducer, initState)

    const getCars = useCallback(async () => {
        try {
            const reponse = await axios.get(`${apiUrl}/cars`)
            if (reponse.data.success) {
                dispatch({
                    type: CAR_LOADED_SUCCESS,
                    payload: reponse.data.cars
                })
            }
        } catch (error) {
            dispatch({
                type: CAR_LOADED_FAIL,
            })
        }
    }, [])

    const getCar = useCallback(async (id) => {
        try {
            const reponse = await axios.get(`${apiUrl}/cars/${id}`)
            if (reponse.data.success) {
                dispatch({
                    type: GET_A_CAR,
                    payload: {car: reponse.data.car, dayRentalOfCar: reponse.data.dayRentalOfCar}
                })
            }
        } catch (error) {
            dispatch({
                type: CAR_LOADED_FAIL,
            })
        }
    }, [])

    // ======================== 
    const carContextData = {
        carState, getCars, getCar
    }

    return (
        <CarContext.Provider value={carContextData}>
            {children}
        </CarContext.Provider>
    )
}

export default CarContextProvider