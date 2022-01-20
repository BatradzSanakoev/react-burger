import React, { useMemo } from 'react';
import { useSelector } from '../../services/hooks';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import ingredientDetails from './IngredientDetails.module.css';

const IngredientDetails = () => {
  const location = useLocation<any>();
  const { id } = useParams<{ id: string }>();
  const data = useSelector(state => state.burgerIngredients.ingredients);
  const { ingredientsLoaded } = useSelector(state => state.burgerIngredients);
  const currentIngredient = useMemo(() => {
    return data && data.find(item => item._id === id);
  }, [data]);

  if (!ingredientsLoaded) return null;
  else if (ingredientsLoaded && !currentIngredient) return <Redirect to='/' />;
  return (
    <div className={ingredientDetails.container} >
      <h3 className={`text text_type_main-large mt-15`}>Детали ингредиента</h3>
      <img src={currentIngredient?.image_large} alt='ingredient-icon' className={ingredientDetails.image} />
      <p className={`text text_type_main-medium mt-4`}>{currentIngredient?.name}</p>
      <div className={`${ingredientDetails.properties} mt-8`}>
        <div id='calories' className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.calories}</p>
        </div>
        <div id='proteins' className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.proteins}</p>
        </div>
        <div id='fat' className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.fat}</p>
        </div>
        <div id='carbohydrates' className={ingredientDetails.property}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
