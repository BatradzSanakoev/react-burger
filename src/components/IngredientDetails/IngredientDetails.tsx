import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import ingredientDetails from './IngredientDetails.module.css';
import { RootState } from '../../services/reducers';

type TIngredientsType = {
  _id: string;
  name: string;
  type: string;
  image?: string;
  image_large: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
};
type TBurgerIngredientsType = {
  ingredients: Array<TIngredientsType> | [];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsLoaded: boolean;
};

const IngredientDetails = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const data = useSelector(
    (state: Omit<RootState, 'burgerIngredients'> & { burgerIngredients: TBurgerIngredientsType }) => state.burgerIngredients.ingredients
  );
  const { ingredientsLoaded } = useSelector(
    (state: Omit<RootState, 'burgerIngredients'> & { burgerIngredients: TBurgerIngredientsType }) => state.burgerIngredients
  );
  const currentIngredient = useMemo(() => {
    return data.find(item => item._id === id);
  }, [data]);

  if (!ingredientsLoaded) return null;
  else if (ingredientsLoaded && !currentIngredient) return <Redirect to='/' />;
  return (
    <div className={ingredientDetails.container} style={{ height: `${!(location as any).state?.fromSite && '90vh'}` }}>
      <h3 className={`text text_type_main-large mt-15`}>Детали ингредиента</h3>
      <img src={currentIngredient?.image_large} alt='ingredient-icon' className={ingredientDetails.image} />
      <p className={`text text_type_main-medium mt-4`}>{currentIngredient?.name}</p>
      <div className={`${ingredientDetails.properties} mt-8`}>
        <div className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.calories}</p>
        </div>
        <div className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.proteins}</p>
        </div>
        <div className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.fat}</p>
        </div>
        <div className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
