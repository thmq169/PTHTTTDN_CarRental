import { createContext, useReducer, useCallback, useState, useEffect } from "react";
import { accountReducer } from "../reducers/accountReducer";
import { apiUrl, SET_ACCOUNT_LOADING, UPDATE_ACCOUNT, SET_WISHLIST } from "./constants.js";
import axios from "axios";

export const AccountContext = createContext()

const initState = {
    accountLoading: false,
    accountInfo: null,
    CICInfo: null,
    driverLicenseInfo: null,
    wishlist: { cars: [] },
    rentalHistory: [],
}

const AccountContextProvider = ({ children }) => {
    const [accountState, dispatch] = useReducer(accountReducer, initState)

    const updateAccount = async (updateAccount) => {
        dispatch({
            type: SET_ACCOUNT_LOADING,
            payload: { accountInfo: null, CICInfo: null, driverLicenseInfo: null, wishlist: null }
        })

        try {
            const reponse = await axios.put(`${apiUrl}/account`, updateAccount)
            if (reponse.data.success) {
                dispatch({
                    type: UPDATE_ACCOUNT,
                    payload: {
                        accountInfo: reponse.data.updateInfo,
                        CICInfo: reponse.data.updateCIC,
                        driverLicenseInfo: reponse.data.updateDriverLicense,
                        wishlist: null
                    }
                })
            }

            return true
        } catch (error) {
            dispatch({
                type: UPDATE_ACCOUNT,
                payload: {
                    accountInfo: null,
                    CICInfo: null,
                    driverLicenseInfo: null,
                    wishlist: null
                }
            })

            return false
        }
    }

    const getWishlist = async () => {
        try {
            const reponse = await axios.get(`${apiUrl}/account/wishlist`)
            if (reponse.data.success) {
                dispatch({
                    type: SET_WISHLIST,
                    payload: {
                        accountInfo: null,
                        CICInfo: null,
                        driverLicenseInfo: null,
                        wishlist: reponse.data.wishlist
                    }
                })
            }
        } catch (error) {

        }
    }

    const updateWishlist = async (id_car) => {
        dispatch({
            type: SET_ACCOUNT_LOADING,
            payload: {
                ...accountState
            }
        })

        try {
            const reponse = await axios.post(`${apiUrl}/account/wishlist/${id_car}`)
            if (reponse.data.success) {
                dispatch({
                    type: SET_WISHLIST,
                    payload: {
                        accountInfo: null,
                        CICInfo: null,
                        driverLicenseInfo: null,
                        wishlist: reponse.data.wishlist
                    }
                })

                return true
            }
        } catch (error) {

        }
    }

    const getHistory = async () => {
        try {
            const reponse = await axios.get(`${apiUrl}/account/history`)
            if (reponse.data.success) {
                console.log(reponse.data.rentalInvoice)


                dispatch({
                    type: 'SET_HISTORY',
                    payload: {
                        ...accountState,
                        rentalHistory: reponse.data.rentalInvoice
                    }
                })
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getWishlist()
        getHistory()
    }, [])

    console.log(accountState)


    // ======================== 
    const accountContextData = {
        accountState, updateAccount, updateWishlist
    }

    return (
        <AccountContext.Provider value={accountContextData}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountContextProvider