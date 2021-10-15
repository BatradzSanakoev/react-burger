import React from 'react';
import ingredientDetails from './IngredientDetails.module.css';

const IngredientDetails = props => {
    const { closeIcon } = props;
    return (
        <div className={ingredientDetails.container}>
            <img src={closeIcon} alt='close-icon' className={ingredientDetails.closeIcon} onClick={props.onModalClose} />
            <h3 className={`text text_type_main-large mt-15`}>Детали ингредиента</h3>
            <img src={props.ingredientProps.image} alt='ingredient-icon' className={ingredientDetails.image} />
            <p className={`text text_type_main-medium mt-4`}>{props.ingredientProps.name}</p>
            <div className={`${ingredientDetails.properties} mt-8`}>
                <div className={ingredientDetails.property}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.ingredientProps.calories}</p>
                </div>
                <div className={ingredientDetails.property}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.ingredientProps.proteins}</p>
                </div>
                <div className={ingredientDetails.property}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.ingredientProps.fat}</p>
                </div>
                <div className={ingredientDetails.property}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.ingredientProps.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
};

export default IngredientDetails;