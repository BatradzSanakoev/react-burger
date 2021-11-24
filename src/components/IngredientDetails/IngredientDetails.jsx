import React from 'react';
import { useSelector } from 'react-redux';
import ingredientDetails from './IngredientDetails.module.css';

const IngredientDetails = () => {
  const { name, image, calories, proteins, fat, carbohydrates } = useSelector(state => state.burgerIngredient.ingredient);
  return (
    <div className={ingredientDetails.container}>
      <h3 className={`text text_type_main-large mt-15`}>Детали ингредиента</h3>
      <img src={image} alt='ingredient-icon' className={ingredientDetails.image} />
      <p className={`text text_type_main-medium mt-4`}>{name}</p>
      <div className={`${ingredientDetails.properties} mt-8`}>
        <div className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_main-default text_color_inactive'>{calories}</p>
        </div>
        <div className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_main-default text_color_inactive'>{proteins}</p>
        </div>
        <div className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_main-default text_color_inactive'>{fat}</p>
        </div>
        <div className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_main-default text_color_inactive'>{carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
