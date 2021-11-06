import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredient from './BurgerIngredient.module.css';
import { addBurgerIngredientInfo } from '../../services/actions/burgerIngredient';

const BurgerIngredient = props => {
    const dispatch = useDispatch();
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