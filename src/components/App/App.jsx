import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import appStyles from './App.module.css';
import { getBurgerIngredients } from '../../services/actions/burgerIngredients';
import { clearOrder } from '../../services/actions/order';
import { Login } from '../../pages/Login/Login';
import { Register } from '../../pages/Register/Register';
import { ForgotPassword } from '../../pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../../pages/ResetPassword/ResetPassword';
import { Profile } from '../../pages/Profile/Profile';
import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/constants';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { GET_USER_FAILED } from '../../services/types';

const App = () => {
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = useCallback(() => {
    setModalDisplay(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalDisplay(false);
    dispatch(clearOrder());
  }, []);

  const handleSetIngredientType = useCallback(() => {
    setModalType('ingredient');
  }, []);

  const handleSetOrderType = useCallback(() => {
    setModalType('order');
  }, []);

  useEffect(() => {
    if (getCookie('accessToken')) dispatch(getUser());
    else dispatch({ type: GET_USER_FAILED });
    dispatch(getBurgerIngredients());
  }, []);

  return (
    <BrowserRouter>
      {modalDisplay && (
        <Modal onModalClose={handleCloseModal} type={'order'}>
          <OrderDetails />
        </Modal>
      )}
      <AppHeader />
      <Switch>
        <Route path='/' exact>
          <main className={appStyles.main}>
            <div className={appStyles.content}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor onModalOpen={handleOpenModal} />
              </DndProvider>
            </div>
          </main>
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path='/forgot-password' exact>
          <ForgotPassword />
        </Route>
        <Route path='/reset-password' exact>
          <ResetPassword />
        </Route>
        <ProtectedRoute path='/profile'>
          <Profile />
        </ProtectedRoute>
        <Route path='/ingredients/:id' render={({ location: { state } }) => !state?.fromSite && <IngredientDetails />} />
      </Switch>
      <Route
        path='/ingredients/:id'
        render={({ location: { state } }) =>
          state?.fromSite && (
            <Modal onModalClose={handleCloseModal} type={'ingredient'}>
              <IngredientDetails />
            </Modal>
          )
        }
      />
    </BrowserRouter>
  );
};

export default App;
