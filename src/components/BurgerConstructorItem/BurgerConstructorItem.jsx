import React from 'react';
import { CurrencyIcon, DragIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorItem from './BurgerConstructorItem.module.css';

const BurgerConstructorItem = props => {

    const burgerTopBottomNote = () => {
        if (!props.type) return '';
        if (props.type === 'bun-top') return '(верх)';
        if (props.type === 'bun-bottom') return '(низ)';
    };
    const burgerTopBottomClass = () => {
        if (!props.type) return burgerConstructorItem.itemData;
        if (props.type === 'bun-top') return burgerConstructorItem.itemDataBunTop;
        if (props.type === 'bun-bottom') return burgerConstructorItem.itemDataBunBottom;
    };

    return (
        <div className={`${burgerConstructorItem.item}`} style={{ justifyContent: `${props.type && 'flex-end'}`}}>
            {!props.type && <DragIcon type='primary' />}
            <div className={`${burgerTopBottomClass()} pl-6 pt-4 pb-4 pr-8`}>
                <img alt='item-card' src={props.image} className={burgerConstructorItem.image} />
                <p className={`text text_type_main-medium ${burgerConstructorItem.name}`}>
                    {`${props.name} ${burgerTopBottomNote()}`}
                </p>
                <div className={burgerConstructorItem.price}>
                    <p className={`text text_type_main-medium ${burgerConstructorItem.priceValue}`}>{props.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                {props.type ? <LockIcon type='secondary' /> : <DeleteIcon type='primary' />}
            </div>
        </div>
    )
};

export default BurgerConstructorItem;