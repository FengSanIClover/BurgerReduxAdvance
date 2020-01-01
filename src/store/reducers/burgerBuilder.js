import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const ingredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const ingredients = updateObject(state.ingredients, ingredient);
    return updateObject(state, {
        ingredients: ingredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    });
}

const removeIngredient = (state, action) => {
    const removeIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const removeIngredients = updateObject(state.ingredients, removeIngredient);
    return updateObject(state, {
        ingredients: removeIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    });
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
    });
}

const fetchIngredientError = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENT_ERROR:
            return fetchIngredientError(state, action);
        default:
            return state;
    }
};

export default reducer;