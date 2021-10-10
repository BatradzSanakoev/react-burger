import React from 'react';
import { Counter, Tab, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './BurgerIngredients.module.css';
import BurgerPiece from '../BurgerIngredient/BurgerIngredient';

const BurgerIngredients = props => {
    const [currentTab, setCurrentTab] = React.useState('bun');
    const buns = props.data.filter(item => item.type === 'bun');
    const sauces = props.data.filter(item => item.type === 'sauce');
    const main = props.data.filter(item => item.type === 'main');
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
                            <BurgerPiece key={item._id} image={item.image} price={item.price} name={item.name} />
                        ))
                    }
                </div>
                <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>Соусы</h2>
                <div className={`${burgerIngredients.category} pl-4 mt-6`}>
                    {
                        sauces.map(item => (
                            <BurgerPiece key={item._id} image={item.image} price={item.price} name={item.name} />
                        ))
                    }
                </div>
                <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>Начинка</h2>
                <div className={`${burgerIngredients.category} pl-4 mt-6`}>
                    {
                        main.map(item => (
                            <BurgerPiece key={item._id} image={item.image} price={item.price} name={item.name} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default BurgerIngredients;