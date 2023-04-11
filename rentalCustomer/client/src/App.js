import MainLayout from './components/mainlayout/MainLayout'
import Home from "./pages/Home";
import About from "./pages/About";
import RegisterOwner from './pages/RegisterOwner';
import Detail from './pages/Detail';
import LoginForm from './components/authen/Login'
import UserAccount from './pages/UserAccount';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import CarContextProvider from './contexts/CarContext'
import AuthContextProvider from './contexts/AuthContext'
import MessageContextProvider from './contexts/MessageContext';
import AccountContextProvider from './contexts/AccountContext';
import RentContextProvider from './contexts/RentContext';
import Payment from './pages/Payment';

function App() {
  return (
    <MessageContextProvider>
      <AuthContextProvider>
        <RentContextProvider>
          <AccountContextProvider>
            <CarContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route index path="/" element={<MainLayout route='home' props={<Home />} />} />
                  <Route path="login" element={<MainLayout route='login' />} />
                  <Route path="register" element={<MainLayout route='register' />} />
                  <Route path="home" element={<Navigate to="/" replace />} />
                  <Route path='about' element={<MainLayout props={<About />} />} />
                  <Route path='payment' element={<MainLayout route='payment' />} />
                  <Route path='register-owner' element={<MainLayout props={<RegisterOwner />} />} />
                  <Route path='detail/:id' element={<MainLayout props={<Detail />} />} />
                  <Route path='user-account' element={<MainLayout props={<UserAccount />} />} >
                    <Route path=':slug' element="" />
                    <Route path=':slug/:code' element="" />
                  </Route>
                </Routes>
              </BrowserRouter>
            </CarContextProvider>
          </AccountContextProvider>
        </RentContextProvider>
      </AuthContextProvider>
    </MessageContextProvider>
  );
}

export default App;
