import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import burgerConstructor from './BurgerConstructor.module.css';
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContext } from '../../contexts/BurgerContext';
import { MAIN_API } from '../../utils/constants';

const BurgerConstructor = props => {
    const { data } = useContext(BurgerContext);
    const bun = React.useMemo(() => {
        return data.find(item => item.type === 'bun')
    }, [data]);
    const notBun = React.useMemo(() => {
        return data.filter(item => item.type !== 'bun')
    }, [data]);

    const summaryPrice = () => {
        let sum = 0;
        notBun.forEach(item => {
            if (item.type !== 'bun') sum += item.price;
        });
        return sum + 2 * bun.price;
    };

    const handleClick = () => {
        const itemsId = notBun.map(item => item._id);
        fetch(`${MAIN_API}/orders`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ ingredients: [...itemsId, bun._id] })
        })
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(res => {
                props.onOrderProps({ number: res.order.number });
                props.onModalType();
                props.onModalOpen();
            })
            .catch(err => console.log(err));

    };

    return (
        <div className={`mt-25 ${burgerConstructor.content}`}>
            <div>
                <div>
                    <BurgerConstructorItem key={bun._id} image={bun.image} name={bun.name} price={bun.price} type='bun-top' />
                </div>
                <div className={`mt-4 pr-2 ${burgerConstructor.list}`}>
                    {
                        notBun.map(item => (<BurgerConstructorItem key={item._id} image={item.image} name={item.name} price={item.price} />))
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
                <button className={`${burgerConstructor.button} pt-5 pr-10 pb-5 pl-10 text text_type_main-medium`} onClick={handleClick}>Оформить заказ</button>
            </div>
        </div>
    )
};

BurgerConstructor.propTypes = {
    onModalOpen: PropTypes.func.isRequired,
    onModalType: PropTypes.func.isRequired,
    onOrderProps: PropTypes.func.isRequired
};

export default BurgerConstructor;