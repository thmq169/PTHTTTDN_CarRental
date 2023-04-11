import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Cars from './pages/Cars';
import OwnerDetail from './components/MyInfor/OwnerDetail';
import MainLayout from './components/mainlayout/MainLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NewCar from './components/car/NewCar';
import './assets/boxicons-2.0.7/css/boxicons.min.css'

import AuthContextProvider from './contexts/AuthContext'
import CarContextProvider from './contexts/CarContext'
import MessageContextProvider from './contexts/MessageContext'
import CarDetail from './components/car/CarDetail';

function App() {
      return (
            <MessageContextProvider>
                  <AuthContextProvider>
                        <CarContextProvider>
                              <BrowserRouter>
                                    <Routes>
                                          <Route path="/" element={<MainLayout props={<OwnerDetail />} route="/" />} />
                                          <Route path="/newcar" element={<MainLayout props={<NewCar />} route="/newcar" />} />
                                          <Route path="cars" element={<MainLayout props={<Cars />} route="/cars" />}>
                                          </Route>
                                          <Route path='/cars/:idCar' element={<MainLayout props={<CarDetail />} />} />


                                          <Route path="login" element={<Login />} />
                                          <Route path="register" element={<Register />} />
                                    </Routes>
                              </BrowserRouter>
                        </CarContextProvider>
                  </AuthContextProvider>
            </MessageContextProvider>
      );
}

export default App;
