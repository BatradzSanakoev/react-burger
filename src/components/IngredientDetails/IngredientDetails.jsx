import React from 'react';
import PropTypes from 'prop-types';
import ingredientDetails from './IngredientDetails.module.css';

const IngredientDetails = props => {
    return (
        <div className={ingredientDetails.container}>
            <h3 className={`text text_type_main-large mt-15`}>Детали ингредиента</h3>
            <img src={props.image} alt='ingredient-icon' className={ingredientDetails.image} />
            <p className={`text text_type_main-medium mt-4`}>{props.name}</p>
            <div className={`${ingredientDetails.properties} mt-8`}>
                <div className={ingredientDetails.property}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.calories}</p>
                </div>
                <div className={ingredientDetails.property}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.proteins}</p>
                </div>
                <div className={ingredientDetails.property}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.fat}</p>
                </div>
                <div className={ingredientDetails.property}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
};

IngredientDetails.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired
};

export default IngredientDetails;