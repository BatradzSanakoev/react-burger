import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import appStyles from './App.module.css';
import { MAIN_API } from '../../utils/constants';

const App = () => {
    const [data, setData] = React.useState();
    const [modalDisplay, setModalDisplay] = React.useState(false);
    const [modalType, setModalType] = React.useState();
    const [ingredientProps, setIngredientProps] = React.useState([]);

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

    React.useEffect(() => {
        fetch(`${MAIN_API}`)
            .then(res => {
                return res.json();
            })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            {
                modalDisplay &&
                <ModalOverlay>
                    <Modal type={modalType} onModalClose={handleCloseModal} ingredientProps={ingredientProps} />
                </ModalOverlay>
            }
            <AppHeader />
            <main className={appStyles.main}>
                {
                    data ?
                        <div className={appStyles.content}>
                            <BurgerIngredients data={data} onModalOpen={handleOpenModal} onModalType={handleSetIngredientType} onIngredientProps={handleSetIngredientProps} />
                            <BurgerConstructor data={data} onModalOpen={handleOpenModal} onModalType={handleSetOrderType} />
                        </div> : <></>
                }
            </main>
        </>
    )
};

export default App;

