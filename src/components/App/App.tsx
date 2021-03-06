import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from '../../services/hooks';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
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
import { Feed } from '../../pages/Feed/Feed';
import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/constants';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { GET_USER_FAILED } from '../../services/types';
import { FeedDetails } from '../../pages/FeedDetails/FeedDetails';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();
  const backgroundForIngredient = location.state?.backgroundForIngredient;
  const backgroundForFeed = location.state?.backgroundForFeed;
  const backgroundForProfile = location.state?.backgroundForProfile;
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string | null>(null);

  const handleOpenModal = useCallback(() => {
    setModalDisplay(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalDisplay(false);
    if (modalType === 'order') {
      dispatch(clearOrder());
      setModalType(null);
    }
    if (backgroundForIngredient) history.replace(backgroundForIngredient);
    if (backgroundForFeed) history.replace(backgroundForFeed);
    if (backgroundForProfile) history.replace(backgroundForProfile);
  }, [modalType, backgroundForIngredient, history, backgroundForFeed, backgroundForProfile, dispatch]);

  const handleSetOrderType = useCallback(() => {
    setModalType('order');
  }, []);

  useEffect(() => {
    if (getCookie('accessToken')) dispatch(getUser());
    else dispatch({ type: GET_USER_FAILED });
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <div>
      {modalDisplay && (
        <Modal onModalClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
      <AppHeader />
      <Switch location={backgroundForIngredient ?? backgroundForFeed ?? backgroundForProfile ?? location}>
        <Route path='/' exact>
          <main className={appStyles.main}>
            <div className={appStyles.content}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor onModalOpen={handleOpenModal} onModalType={handleSetOrderType} />
              </DndProvider>
            </div>
          </main>
        </Route>
        <Route path='/feed' exact>
          <Feed />
        </Route>
        <Route path='/feed/:id' exact>
          <FeedDetails />
        </Route>
        <Route path='/profile/orders/:id' exact>
          <FeedDetails />
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
        <Route path='/ingredients/:id' exact>
          <IngredientDetails />
        </Route>
      </Switch>
      {backgroundForIngredient && (
        <Route path='/ingredients/:id' exact>
          <Modal onModalClose={handleCloseModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {backgroundForFeed && (
        <Route path='/feed/:id' exact>
          <Modal onModalClose={handleCloseModal}>
            <FeedDetails />
          </Modal>
        </Route>
      )}
      {backgroundForProfile && (
        <Route path='/profile/orders/:id' exact>
          <Modal onModalClose={handleCloseModal}>
            <FeedDetails />
          </Modal>
        </Route>
      )}
    </div>
  );
};

export default App;
