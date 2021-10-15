import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredient from './BurgerIngredient.module.css';

const BurgerIngredient = props => { 
    const ingredientProps = {
        name: props.name,
        proteins: props.proteins,
        fat: props.fat,
        carbohydrates: props.carbohydrates,
        calories: props.calories,
        image: props.image
    };
    const handleClick = () => {
        props.onModalType();
        props.onIngredientProps(ingredientProps);
        props.onModalOpen();
    };

    return (
        <div className={burgerIngredient.item} onClick={handleClick}>
            <img src={props.image} alt='burger-item' className={burgerIngredient.image} />
            <div className={`${burgerIngredient.price} mt-1`}>
                <p className={`text text_type_main-medium ${burgerIngredient.priceValue}`}>{props.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p style={{ margin: 0 }} className={`text text_type_main-medium ${burgerIngredient.name} mt-1`}>{props.name}</p>
        </div>
    )
};

BurgerIngredient.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string
};

export default BurgerIngredient;