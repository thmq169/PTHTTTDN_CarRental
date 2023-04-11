import { useParams } from "react-router-dom";
import React from 'react'
import ListCars from '../components/car/ListCars'
import CarDetail from '../components/car/CarDetail'
import { useStore } from "../store";
// import listCars from '../assets/JsonData/car-list.json'

function Cars() {
    //const [state, dispatch] = useStore()
    // const listCars = state.cars
    const { idCar } = useParams();

    let body

    if (window.location.pathname === "/cars") {
        body = (<ListCars />)
    }

    if (idCar) {

        body = (<CarDetail idCar={idCar} />)
    }

    return (
        <>
            {body}
        </>
    )
}

export default Cars