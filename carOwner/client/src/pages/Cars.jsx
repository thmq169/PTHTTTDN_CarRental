import { useParams } from "react-router-dom";
import React from 'react'
import ListCars from '../components/car/ListCars'
import CarDetail from '../components/car/CarDetail'
// import listCars from '../assets/JsonData/car-list.json'

function Cars() {
    return (
        <>
            <ListCars />
        </>
    )
}

export default Cars