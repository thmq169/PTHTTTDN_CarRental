import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { rentReducer } from "../reducers/rentReducer";
import { apiUrl } from "./constants";
import axios from 'axios'

export const RentContext = createContext()

const initState = {
    rentLoading: false,
    paymentCode: '',
    paymentTotal: 0,
    carUnvaliableInDateStart: false,
    carUnvaliableInDateEnd: false,
}

const RentContextProvider = ({ children }) => {
    const [rentState, dispatch] = useReducer(rentReducer, initState)

    const verifyRentalDate = async (day_type, day_check, car_id) => {
        if (day_check === '') {
            return true
        }

        dispatch({
            type: 'SET_RENT_LOADING',
            payload: { ...rentState }
        })

        try {
            const reponse = await axios.post(`${apiUrl}/rent/dayCheck`, { day_check, car_id })
            if (reponse.data.success) {
                dispatch({
                    type: 'VERIFY_DATE',
                    payload: { ...rentState, [day_type]: false }
                })

                return true
            } else {
                console.log("ngay nay khong được")

                dispatch({
                    type: 'VERIFY_DATE',
                    payload: { ...rentState, [day_type]: true }
                })
                return false
            }
        } catch (error) {
            dispatch({
                type: 'VERIFY_DATE',
                payload: { ...rentState, [day_type]: true }
            })
            return false
        }
    }

    const RentACar = async (payload) => {
        dispatch({
            type: 'SET_RENT_LOADING',
            payload: { ...rentState }
        })

        try {
            const reponse = await axios.post(`${apiUrl}/rent/`, payload)
            if (reponse.data.success) {
                dispatch({
                    type: 'RENT_CAR',
                    payload: {
                        ...rentState,
                        paymentCode: reponse.data.invoiceCode,
                        paymentTotal: reponse.data.prepayment
                    }
                })

                return true
            } else {
                dispatch({
                    type: 'SET_RENT_LOADED',
                    payload: { ...rentState }
                })

                return false
            }
        } catch (error) {
            dispatch({
                type: 'SET_RENT_LOADED',
                payload: { ...rentState }
            })

            return false
        }
    }

    const rentContextData = { rentState, verifyRentalDate, RentACar }

    return (
        <RentContext.Provider value={rentContextData}>
            {children}
        </RentContext.Provider>
    )
}

export default RentContextProvider