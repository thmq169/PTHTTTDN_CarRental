// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import { Tabs, Tab } from 'react-bootstrap';
// import Receive from './Receive';
// import Delivery from './Delivery';
// import "./transportation.css"

// function History({ ...state }) {
//     const [deliveryState, setDelivery] = useState(state.deliveries)
//     const [receiveState, setReceive] = useState(state.receives)
//     let body1, body2

//     const hanleSetRenderDelivery = (data) => {
//         console.log("render Delivery");
//         setDelivery(data)
//     }

//     const hanleSetRenderReceive = (data) => {
//         setReceive(data)
//     }

//     body1 = (<><Delivery deliveryState={state.deliveries}
//         hanleSetRenderDelivery={hanleSetRenderDelivery}
//         route={state.route}
//     /></>)

//     body2 = (<><Receive receiveState={state.receives}
//         hanleSetRenderReceive={hanleSetRenderReceive}
//         route={state.route}
//     /></>)



//     useEffect(() => {
//         setDelivery(deliveryState)
//         console.log("render 2");
//         setReceive(receiveState)

//     }, [deliveryState])


//     return (
//         <div className="tab-wrapper">
//             <h2 className="page-header">
//                 {
//                     state.route === "transportation" ? "Transportation" : "Activity"
//                 }

//             </h2>
//             <div className="row">
//                 <div className="col-12">
//                     <div className="card">
//                         <div className="card__body">
//                             <Tabs defaultActiveKey="Delivery" className=''>
//                                 <Tab eventKey="Delivery" title="Delivery" className='delivery'>
//                                     <div className="tab-item-wrapper">
//                                         {body1}
//                                     </div>
//                                 </Tab>

//                                 <Tab eventKey="Receive" title="Receive" >
//                                     <div className="tab-item-wrapper">
//                                         {body2}
//                                     </div>
//                                 </Tab>
//                             </Tabs>
//                         </div>
//                     </div>


//                 </div>
//             </div>
//         </div>
//     )
// }

// export default History