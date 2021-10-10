import React from 'react';
import { CurrencyIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredient from './BurgerIngredient.module.css';

const BurgerPiece = props => {
    return (
        <div className={burgerIngredient.item}>
            <img src={props.image} alt='burger-item' className={burgerIngredient.image} />
            <div className={`${burgerIngredient.price} mt-1`}>
                <p className={`text text_type_main-medium ${burgerIngredient.priceValue}`}>{props.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p style={{ margin: 0 }} className={`text text_type_main-medium ${burgerIngredient.name} mt-1`}>{props.name}</p>
        </div>
    )
};

export default BurgerPiece;