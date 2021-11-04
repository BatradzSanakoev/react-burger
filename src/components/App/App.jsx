import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import appStyles from './App.module.css';
import { MAIN_API } from '../../utils/constants';
import { BurgerContext } from '../../contexts/BurgerContext';
import { getAllIngredients } from '../../services/actions/allIngredients';

const App = () => {
    const dispatch = useDispatch();
    const [data, setData] = React.useState();
    const [modalDisplay, setModalDisplay] = React.useState(false);
    const [modalType, setModalType] = React.useState();
    const [ingredientProps, setIngredientProps] = React.useState([]);
    const [orderProps, setOrderProps] = React.useState([]);

    const handleOpenModal = React.useCallback(() => {
        setModalDisplay(true);
    }, []);

    const handleCloseModal = React.useCallback(() => {
        setModalDisplay(false);
    }, []);

    const handleSetIngredientType = React.useCallback(() => {
        setModalType('ingredient');
    }, []);

    const handleSetOrderType = React.useCallback(() => {
        setModalType('order');
    }, []);

    const handleSetIngredientProps = React.useCallback(props => {
        setIngredientProps({ ...ingredientProps, image: props.image, name: props.name, proteins: props.proteins, fat: props.fat, carbohydrates: props.carbohydrates, calories: props.calories });
    }, []);

    const handleSetOrderProps = React.useCallback(props => {
        setOrderProps({ ...orderProps, number: props.number });
    }, []);

    React.useEffect(() => {
        fetch(`${MAIN_API}/ingredients`)
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
        dispatch(getAllIngredients());
    }, []);

    return (
        <>
            {
                modalDisplay &&
                <Modal onModalClose={handleCloseModal} type={modalType}>
                    {
                        modalType === 'order'
                            ? <OrderDetails number={orderProps.number} />
                            : <IngredientDetails {...ingredientProps} />
                    }
                </Modal>
            }
            <AppHeader />
            <main className={appStyles.main}>
                {
                    data ?
                        <div className={appStyles.content}>
                            <BurgerContext.Provider value={{ data: data, order: orderProps }}>
                                <BurgerIngredients data={data} onModalOpen={handleOpenModal} onModalType={handleSetIngredientType} onIngredientProps={handleSetIngredientProps} />
                                <BurgerConstructor onModalOpen={handleOpenModal} onModalType={handleSetOrderType} onOrderProps={handleSetOrderProps} />
                            </BurgerContext.Provider>
                        </div> : <></>
                }
            </main>
        </>
    )
};

export default App;

