import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import appStyles from './App.module.css';
import data from '../../utils/data.json';

const App = () => {
    return (
        <>
            <AppHeader />
            <main className={appStyles.main}>
                <div className={appStyles.content}>
                    <BurgerIngredients data={data} />
                    <BurgerConstructor data={data} />
                </div>
            </main>
        </>
    )
};

export default App;

