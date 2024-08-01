import React from 'react';
import { Recipe } from '../interfaces/types';

interface DeleteRecipeProps {
  recipe: Recipe;
  onDelete: (recipeId: number) => void;
}

const DeleteRecipe: React.FC<DeleteRecipeProps> = ({ recipe, onDelete }) => {
  return <button onClick={() => onDelete(recipe.id)}>Delete</button>;
};

export default DeleteRecipe;
