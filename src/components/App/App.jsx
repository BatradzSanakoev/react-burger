import React from 'react';
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
import { clearBurgerIngredientInfo } from '../../services/actions/burgerIngredient';
import { Login } from '../../pages/Login/Login';
import { Register } from '../../pages/Register/Register';
import { ForgotPassword } from '../../pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../../pages/ResetPassword/ResetPassword';

const App = () => {
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = React.useState(false);
  const [modalType, setModalType] = React.useState();

  const handleOpenModal = React.useCallback(() => {
    setModalDisplay(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setModalDisplay(false);
    dispatch(clearOrder());
    dispatch(clearBurgerIngredientInfo());
  }, []);

  const handleSetIngredientType = React.useCallback(() => {
    setModalType('ingredient');
  }, []);

  const handleSetOrderType = React.useCallback(() => {
    setModalType('order');
  }, []);

  React.useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);

  return (
    <BrowserRouter>
      {modalDisplay && (
        <Modal onModalClose={handleCloseModal} type={modalType}>
          {modalType === 'order' ? <OrderDetails /> : <IngredientDetails />}
        </Modal>
      )}
      <AppHeader />
      <Switch>
        <Route path='/' exact>
          <main className={appStyles.main}>
            <div className={appStyles.content}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients onModalOpen={handleOpenModal} onModalType={handleSetIngredientType} />
                <BurgerConstructor onModalOpen={handleOpenModal} onModalType={handleSetOrderType} />
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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
