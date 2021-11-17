import React, { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredient from './BurgerIngredient.module.css';
import { addBurgerIngredientInfo } from '../../services/actions/burgerIngredient';
import Count from '../Count/Count';

const BurgerIngredient = props => {
    const dispatch = useDispatch();
    const { constructorBuns, constructorIngredients } = useSelector(state => state.burgerConstructor);
    const bunsCount = useMemo(() => {
        if (!constructorBuns) return;
        if (constructorBuns) return constructorBuns._id === props._id && 2;
    }, [constructorBuns]);
    const ingredientCount = useMemo(() => {
        let count = 0;
        constructorIngredients.forEach(item => {
            if (item._id === props._id) count = count + 1;
        });
        return count;
    }, [constructorIngredients]);
    const handleClick = () => {
        dispatch(addBurgerIngredientInfo({ ...props }));
        props.onModalType();
        props.onModalOpen();
    };

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { _id: props._id, name: props.name, type: props.type, image: props.image, price: props.price },
        collect: monitor => ({
            opacity: monitor.isDragging() ? .5 : 1
        })
    });

    return (
        <div className={burgerIngredient.item} onClick={handleClick} ref={dragRef} style={{ opacity: `${opacity}` }}>
            <Count count={props.type === 'bun' ? bunsCount : ingredientCount} />
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