import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Cars from './pages/Cars';
import Staffs from './pages/Staffs';
import RentalInvoice from './pages/RentalInvoice';
import Transportation from './pages/Transportation';
import Owner from './pages/Owner';
import Login from './components/authen/Login';
import MainLayout from './components/mainlayout/MainLayout';
import './assets/boxicons-2.0.7/css/boxicons.min.css'

function App() {
      let role = localStorage.getItem('role')
  return (
    <BrowserRouter>
    
            <Routes>
                  {/* {
                        role 
                  } */}
                <Route index  path="login" element={<Login />}/>
                <Route  path="/" element={<MainLayout props={<Dashboard />} route="/" />}/>
                {/* <Route path="register" element={<MainLayout route="register" />}/> */}
                <Route path="customers" element={<MainLayout props={<Customers />} route="/customers" />}>
                      <Route path=':idCustomer' element="" />
                </Route> 
                <Route path="cars" element={<MainLayout props={<Cars />} route="/cars" />}>
                      <Route path=':idCar' element="" />
                </Route> 
                <Route path="staffs" element={<MainLayout props={<Staffs />} route="/staffs" />}>
                      <Route path=':idStaff' element="" />
                </Route> 
                <Route path="rental-invoice" element={<MainLayout props={<RentalInvoice />} route="/rental-invoice" />}>
                      <Route path=':idInvoice' element="" />
                </Route> 
                <Route path="transportation" element={<MainLayout props={<Transportation route="/transportation" />} route="/transportation" />}>
                      <Route path='delivery-detail/:idDelivery' element="" />
                      <Route path='receive-detail/:idReceive' element="" />
                </Route> 
                <Route path="activity" element={<MainLayout props={<Transportation route="/activity" />} route="/activity" />}>
                      <Route path='detail/:idDelivery' element="" />
                      <Route path='receive-activity-detail/:idReceive' element="" />
                </Route> 
                <Route path="History" element={<MainLayout props={<Transportation route="/history" />} route="/history" />}>
                      <Route path='delivery-hitory-detail/:idDelivery' element="" />
                      <Route path='receive-history-detail/:idReceive' element="" />
                </Route> 
                <Route path="owners" element={<MainLayout props={<Owner />} route="/owners" />}>
                      <Route path=':idOwner' element="" />
                </Route> 
            </Routes>
        </BrowserRouter>
  );
}

export default App;
