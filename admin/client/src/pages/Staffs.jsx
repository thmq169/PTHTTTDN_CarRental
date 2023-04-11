import React from 'react'
import { useParams } from "react-router-dom";
import ListStaffs from '../components/staff/ListStaffs';
import StaffDetail from '../components/staff/StaffDetail';
import { useStore } from '../store';
// import listStaffs from '../assets/JsonData/staffs-list.json'

function Staffs() {
    const [state, dispatch] = useStore()

    const listStaffs = state.staffs

    const { idStaff } = useParams();

    const staff = listStaffs.find(staff => staff._id === idStaff)
    let body

    if (window.location.pathname === "/staffs") {
        body = (<ListStaffs />)
    }

    if (staff) {
        body = (<StaffDetail staff={staff} />)
    }

    return (
        <>
            {body}
        </>
    )
}

export default Staffs