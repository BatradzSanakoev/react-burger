import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructor from './BurgerConstructor.module.css';
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = props => {
    const bun = props.data.find(item => item.type === 'bun');
    const summaryPrice = () => {
        let sum = 0;
        props.data.forEach(item => {
            if (item.type !== 'bun') sum += item.price;
        });
        return sum + bun.price;
    };
    return (
        <div className={`mt-25 ${burgerConstructor.content}`}>
            <div>
                <div>
                    <BurgerConstructorItem key={bun._id} image={bun.image} name={bun.name} price={bun.price} type='bun-top' />
                </div>
                <div className={`mt-4 pr-2 ${burgerConstructor.list}`}>
                    {
                        props.data.map(item => (
                            item.type !== 'bun' && <BurgerConstructorItem key={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    }
                </div>
                <div className='mt-4'>
                    <BurgerConstructorItem key={bun._id} image={bun.image} name={bun.name} price={bun.price} type='bun-bottom' />
                </div>
            </div>
            <div className={`${burgerConstructor.summary} mt-10`}>
                <div className={`${burgerConstructor.summaryPrice} mr-10`}>
                    <p className={`text text_type_main-medium mr-2 ${burgerConstructor.summaryPriceValue}`}>{summaryPrice()}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <button className={`${burgerConstructor.button} pt-5 pr-10 pb-5 pl-10 text text_type_main-medium`}>Оформить заказ</button>
            </div>
        </div>
    )
};

BurgerConstructor.propTypes = {
    data: PropTypes.array.isRequired
};

export default BurgerConstructor;