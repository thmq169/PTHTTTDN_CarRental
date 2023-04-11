import { useReducer, useEffect, useState } from 'react'
import Context from './Context'
import axios from 'axios'
import reducer, {initState} from './reducers/reducer'
import { LOCAL_STORAGE_TOKEN_NAME, URL_BACKEND } from './actions/constants'
import { actions } from './index'

function Provider({children}) {

    const [state,dispatch] = useReducer(reducer,initState)

    useEffect(() => {
        axios.get(URL_BACKEND + "/api/staff/auth/allStaffs")
        .then((response) =>{
            console.log(response.data);
            dispatch(actions.setStaffs(response.data))
        })
        
        // axios.get("../api/customers-list.json")
        // .then((response) =>{
        //     dispatch(actions.setCustomers(response.data))
            
        // })
        
        // axios.get("../api/owner-document.json")
        // .then((response) =>{
        //     dispatch(actions.setOwnersDocument(response.data))
        // })
        
        // axios.get("../api/owner-list.json")
        // .then((response) =>{
        //     dispatch(actions.setOwners(response.data))
        // })
        
        // axios.get("../api/car-list-owner.json")
        // .then((response) =>{
        //     dispatch(actions.setOwnersCar(response.data))
        // })
        
        axios.get(URL_BACKEND + "/api/staff/cars")
        .then((response) =>{
            console.log(response.data);
            dispatch(actions.setCars(response.data))
        })
        
        axios.get(URL_BACKEND + "/api/staff/invoices")
        .then((response) =>{
            // console.log(response.data);
            dispatch(actions.setInvoices(response.data.invoices))
        })
    },[])
    

    return (
        <Context.Provider value={[state,dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider