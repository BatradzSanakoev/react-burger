import React, { useContext, useRef, useEffect, useState, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerIngredients from './BurgerIngredients.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { BurgerContext } from '../../contexts/BurgerContext';

const BurgerIngredients = props => {
    const tabsRef = useRef();
    const bunsRef = useRef();
    const saucesRef = useRef();
    const mainsRef = useRef();
    const { data } = useContext(BurgerContext);
    const [currentTab, setCurrentTab] = useState('bun');
    const buns = useMemo(() => {
        return data.filter(item => item.type === 'bun');
    }, [data]);
    const sauces = useMemo(() => {
        return data.filter(item => item.type === 'sauce');
    }, [data]);
    const main = useMemo(() => {
        return data.filter(item => item.type === 'main');
    }, [data]);

    const checkActualTab = () => {
        const bunsDistance = tabsRef.current.getBoundingClientRect().top - bunsRef.current.getBoundingClientRect().top;
        const saucesDistance = tabsRef.current.getBoundingClientRect().top - saucesRef.current.getBoundingClientRect().top;
        const mainsDistance = tabsRef.current.getBoundingClientRect().top - mainsRef.current.getBoundingClientRect().top;
        (Math.abs(bunsDistance) < Math.abs(saucesDistance) && Math.abs(bunsDistance) < Math.abs(mainsDistance)) ? setCurrentTab('bun')
            : (Math.abs(saucesDistance) < Math.abs(bunsDistance) && Math.abs(saucesDistance) < Math.abs(mainsDistance)) ? setCurrentTab('sauce')
                : setCurrentTab('main');
    };

    return (
        <div className={burgerIngredients.content}>
            <h1 className='mt-10 text text_type_main-large' style={{ marginBottom: 0 }}>Соберите бургер</h1>
            <div className={`${burgerIngredients.tabs} mt-5`} ref={tabsRef}>
                <Tab value='bun' active={currentTab === 'bun'}>Булки</Tab>
                <Tab value='sauce' active={currentTab === 'sauce'}>Соусы</Tab>
                <Tab value='main' active={currentTab === 'main'}>Начинка</Tab>
            </div>
            <div className={burgerIngredients.categories} onScroll={checkActualTab}>
                <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>Булки</h2>
                <div className={`${burgerIngredients.category} pl-4 mt-6`} ref={bunsRef}>
                    {
                        buns.map(item => (
                            <BurgerIngredient key={item._id} image={item.image_large} price={item.price} name={item.name} proteins={item.proteins} fat={item.fat} carbohydrates={item.carbohydrates} calories={item.calories} onModalOpen={props.onModalOpen} onModalType={props.onModalType} onIngredientProps={props.onIngredientProps} />
                        ))
                    }
                </div>
                <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>Соусы</h2>
                <div className={`${burgerIngredients.category} pl-4 mt-6`} ref={saucesRef}>
                    {
                        sauces.map(item => (
                            <BurgerIngredient key={item._id} image={item.image_large} price={item.price} name={item.name} proteins={item.proteins} fat={item.fat} carbohydrates={item.carbohydrates} calories={item.calories} onModalOpen={props.onModalOpen} onModalType={props.onModalType} onIngredientProps={props.onIngredientProps} />
                        ))
                    }
                </div>
                <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>Начинка</h2>
                <div className={`${burgerIngredients.category} pl-4 mt-6`} ref={mainsRef}>
                    {
                        main.map(item => (
                            <BurgerIngredient key={item._id} image={item.image_large} price={item.price} name={item.name} proteins={item.proteins} fat={item.fat} carbohydrates={item.carbohydrates} calories={item.calories} onModalOpen={props.onModalOpen} onModalType={props.onModalType} onIngredientProps={props.onIngredientProps} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

BurgerIngredients.propTypes = {
    onModalOpen: PropTypes.func.isRequired,
    onModalType: PropTypes.func.isRequired,
    onIngredientProps: PropTypes.func.isRequired
};

export default BurgerIngredients;