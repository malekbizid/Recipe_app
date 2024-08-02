import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../../interfaces/types';
import { RootState } from '../store';

interface RecipesState {
  recipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.unshift(action.payload); 
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
    },
    deleteRecipe: (state, action: PayloadAction<number>) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
    },
  },
});

export const { addRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;

export const selectAllRecipes = (state: RootState) => state.recipes.recipes;

export default recipesSlice.reducer;
