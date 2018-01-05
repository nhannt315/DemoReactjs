import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case action.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true});
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    });
};

const removeIngredient = (state, action) => {
    const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedSt);
};

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

export default reducer;