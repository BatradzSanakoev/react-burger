import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import appStyles from './App.module.css';
import { MAIN_API } from '../../utils/constants';
import { BurgerContext } from '../../contexts/BurgerContext';

const App = () => {
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
        fetch(`${MAIN_API}`)
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
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
                            <BurgerIngredients data={data} onModalOpen={handleOpenModal} onModalType={handleSetIngredientType} onIngredientProps={handleSetIngredientProps} />
                            <BurgerContext.Provider value={{ data: data, order: orderProps }}>
                                <BurgerConstructor onModalOpen={handleOpenModal} onModalType={handleSetOrderType} onOrderProps={handleSetOrderProps} />
                            </BurgerContext.Provider>
                        </div> : <></>
                }
            </main>
        </>
    )
};

export default App;

