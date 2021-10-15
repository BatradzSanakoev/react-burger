import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerIngredients from './BurgerIngredients.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

const BurgerIngredients = props => {
    const [currentTab, setCurrentTab] = React.useState('bun');
    const buns = React.useMemo(() => {
        return props.data.filter(item => item.type === 'bun');
    }, [props.data]);
    const sauces = React.useMemo(() => {
        return props.data.filter(item => item.type === 'sauce');
    }, [props.data]);
    const main = React.useMemo(() => {
        return props.data.filter(item => item.type === 'main');
    }, [props.data]);
    return (
        <div className={burgerIngredients.content}>
            <h1 className='mt-10 text text_type_main-large' style={{ marginBottom: 0 }}>Соберите бургер</h1>
            <div className={`${burgerIngredients.tabs} mt-5`}>
                <Tab value='bun' active={currentTab === 'bun'} onClick={setCurrentTab}>Булки</Tab>
                <Tab value='sauce' active={currentTab === 'sauce'} onClick={setCurrentTab}>Соусы</Tab>
                <Tab value='main' active={currentTab === 'main'} onClick={setCurrentTab}>Начинка</Tab>
            </div>
            <div className={burgerIngredients.categories}>
                <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>Булки</h2>
                <div className={`${burgerIngredients.category} pl-4 mt-6`}>
                    {
                        buns.map(item => (
                            <BurgerIngredient key={item._id} image={item.image} price={item.price} name={item.name} proteins={item.proteins} fat={item.fat} carbohydrates={item.carbohydrates} calories={item.calories} onModalOpen={props.onModalOpen} onModalType={props.onModalType} onIngredientProps={props.onIngredientProps} />
                        ))
                    }
                </div>
                <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>Соусы</h2>
                <div className={`${burgerIngredients.category} pl-4 mt-6`}>
                    {
                        sauces.map(item => (
                            <BurgerIngredient key={item._id} image={item.image} price={item.price} name={item.name} proteins={item.proteins} fat={item.fat} carbohydrates={item.carbohydrates} calories={item.calories} onModalOpen={props.onModalOpen} onModalType={props.onModalType} onIngredientProps={props.onIngredientProps} />
                        ))
                    }
                </div>
                <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>Начинка</h2>
                <div className={`${burgerIngredients.category} pl-4 mt-6`}>
                    {
                        main.map(item => (
                            <BurgerIngredient key={item._id} image={item.image} price={item.price} name={item.name} proteins={item.proteins} fat={item.fat} carbohydrates={item.carbohydrates} calories={item.calories} onModalOpen={props.onModalOpen} onModalType={props.onModalType} onIngredientProps={props.onIngredientProps} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

BurgerIngredients.propTypes = {
    data: PropTypes.array.isRequired
};

export default BurgerIngredients;