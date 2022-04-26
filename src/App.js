import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import UsersScreen from './screens/UsersScreen';
import ServiceScreen from './screens/ServiceScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import CategoryScreen from './screens/CategoryScreen';
import TransactionScreen from './screens/TransactionScreen';
import ServiceDetailsScreen from './screens/ServiceDetailsScreen';
import CategoryDetailsScreen from './screens/CategoryDetailsScreen';

import {
  AuthGuard,
  Header,
  MainAlert,
  Portal,
  SideNav
} from './components';
import { getAdminInfo } from './features/Admin/adminSlice';
import { getMainAlert } from './features/MainAlert/mainAlertSlice';
import OrderScreen from './screens/OrderScreen';
import AccountScreen from './screens/AccountScreen';
import { useSocket } from './customHooks/useSocket';
import { getAsyncLancer } from './features/Lancer/lancerAcion';

const App = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { adminInfo } = useSelector(getAdminInfo);
  const { variant, show, message } = useSelector(getMainAlert);

  useEffect(() => {
    if (adminInfo)
      dispatch(getAsyncLancer());
  }, [dispatch, adminInfo]);

  return (
    <>
      <BrowserRouter>
        <section className="d-flex">
          {adminInfo && <SideNav />}

          <Routes>
            <Route path='/login' element={adminInfo ? <Navigate to='/' /> : <LoginScreen />} />
            <Route path='/' element={<AuthGuard childern={<HomeScreen socket={socket} />} />} />

            <Route path='/users'>
              <Route path='' element={<AuthGuard childern={<UsersScreen />} />} />
              <Route path='page/:pageNumber' element={<AuthGuard childern={<UsersScreen />} />} />
              <Route path=':search/page/:pageNumber' element={<AuthGuard childern={<UsersScreen />} />} />
              <Route path='*' element={<AuthGuard childern={<NotFoundScreen />} />} />
            </Route>

            <Route path='/services'>
              <Route path='' element={<AuthGuard childern={<ServiceScreen />} />} />
              <Route path='page/:pageNumber' element={<AuthGuard childern={<ServiceScreen />} />} />
              <Route path=':search/page/:pageNumber' element={<AuthGuard childern={<ServiceScreen />} />} />
              <Route path=':id' element={<AuthGuard childern={<ServiceDetailsScreen />} />} />
              <Route path='*' element={<AuthGuard childern={<NotFoundScreen />} />} />
            </Route>

            <Route path='/transactions'>
              <Route path='' element={<AuthGuard childern={<TransactionScreen />} />} />
              <Route path=':type/:status/page/:pageNumber' element={<AuthGuard childern={<TransactionScreen />} />} />
              <Route path=':type/page/:pageNumber' element={<AuthGuard childern={<TransactionScreen />} />} />
              <Route path='page/:pageNumber' element={<AuthGuard childern={<TransactionScreen />} />} />
              <Route path=':type/:status' element={<AuthGuard childern={<TransactionScreen />} />} />
              <Route path=':type' element={<AuthGuard childern={<TransactionScreen />} />} />
              <Route path='*' element={<AuthGuard childern={<NotFoundScreen />} />} />
            </Route>

            <Route path='/categories'>
              <Route path='' element={<AuthGuard childern={<CategoryScreen />} />} />
              <Route path=':id' element={<AuthGuard childern={<CategoryDetailsScreen />} />} />
              <Route path='page/:pageNumber' element={<AuthGuard childern={<CategoryScreen />} />} />
              <Route path=':search/page/:pageNumber' element={<AuthGuard childern={<CategoryScreen />} />} />
              <Route path='*' element={<AuthGuard childern={<NotFoundScreen />} />} />
            </Route>

            <Route path='/orders'>
              <Route path='page/:pageNumber' element={<AuthGuard childern={<OrderScreen />} />} />
              <Route path=':status/page/:pageNumber' element={<AuthGuard childern={<OrderScreen />} />} />
              <Route path=':status' element={<AuthGuard childern={<OrderScreen />} />} />
              <Route path='*' element={<AuthGuard childern={<NotFoundScreen />} />} />
            </Route>
            <Route path='/account' element={<AuthGuard childern={<AccountScreen />} />} />

            <Route path='*' element={<AuthGuard childern={<NotFoundScreen />} />} />
          </Routes>

        </section>

        {adminInfo &&
          <Portal id='lancer-header'>
            <Header />
          </Portal>}

        {show && <Portal>
          <MainAlert variant={variant} message={message} />
        </Portal>}
      </BrowserRouter>
    </>
  );
};

export default App;