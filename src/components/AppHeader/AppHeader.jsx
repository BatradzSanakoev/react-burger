import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './AppHeader.module.css';

const AppHeader = () => {
    return (
        <header className={`${appHeader.header} pt-4 pb-4`}>
            <div className={appHeader.headerContent}>
                <div className={`${appHeader.navGroup}`}>
                    <div className={`${appHeader.navButton} pt-4 pb-4 pl-5 pr-5 mr-2`}>
                        <BurgerIcon type='primary' />
                        <p className={`text text_type_main-medium ml-2 ${appHeader.navText}`}>Конструктор</p>
                    </div>
                    <div className={`${appHeader.navButton} pt-4 pb-4 pl-5 pr-5`}>
                        <ListIcon type='secondary' />
                        <p className={`text text_type_main-medium text_color_inactive ml-2 ${appHeader.navText}`}>Лента заказов</p>
                    </div>
                </div>
                <Logo />
                <div className={`${appHeader.navGroup}`} style={{ justifyContent: 'flex-end' }}>
                    <div className={`${appHeader.navButton} pt-4 pb-4 pl-5 pr-5`}>
                        <ProfileIcon type='secondary' />
                        <p className={`text text_type_main-medium text_color_inactive ml-2 ${appHeader.navText}`}>Личный кабинет</p>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default AppHeader;