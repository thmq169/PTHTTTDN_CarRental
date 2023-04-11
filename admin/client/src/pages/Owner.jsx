import React from 'react'
import { useParams } from "react-router-dom";
import ListOwner from '../components/owner/ListOwner';
import OwnerDetail from '../components/owner/OwnerDetail';
import { useStore } from "../store";
// import listOwner from '../assets/JsonData/owner-list.json'
// import listOwnerDocument from '../assets/JsonData/owner-document.json'
// import listCarOwner from '../assets/JsonData/car-list-owner.json'

function Owner() {
    const [state, dispatch] = useStore()

    const listOwner = state.owners
    const listOwnerDocument = state.owners_document
    const listCarOwner = state.owners_cars

    // console.log(listCarOwner);

    const { idOwner } = useParams()

    let owner, ownerDocument, carOwner
    if (idOwner) {

        owner = listOwner.find(owner => owner.id === Number.parseInt(idOwner))
        ownerDocument = listOwnerDocument.find(owner2 => owner2.id === Number.parseInt(owner.id))
        carOwner = listCarOwner.find(car => car.ID === Number.parseInt(ownerDocument.id))
    }


    let body

    if (window.location.pathname === "/owners") {
        body = (<ListOwner />)
    }

    if (owner) {
        body = (<OwnerDetail
            owner={owner}
            ownerDocument={ownerDocument}
            carOwner={carOwner}
        />)
    }


    return (
        <>{body}</>
    )
}

export default Owner