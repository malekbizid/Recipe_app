import { useState, useEffect } from 'react';
import { useGetRecipesQuery } from '../features/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllRecipes, updateRecipe as updateRecipeAction, deleteRecipe as deleteRecipeAction } from '../features/recipesSlice';
import { Recipe } from '../../interfaces/types';

const usePaginatedRecipes = (initialSize = 5, tags = 'under_30_minutes') => {
  const [page, setPage] = useState(0);
  const { data, error, isLoading, isFetching } = useGetRecipesQuery({
    from: page * initialSize,
    size: initialSize,
    tags,
  });

  const addedRecipes = useSelector(selectAllRecipes);
  const dispatch = useDispatch();

  const updateRecipe = (updatedRecipe: Recipe) => {
    dispatch(updateRecipeAction(updatedRecipe));
  };

  const deleteRecipe = (recipeId: number) => {
    dispatch(deleteRecipeAction(recipeId));
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  return {
    data,
    addedRecipes,
    error,
    isLoading,
    isFetching,
    page,
    nextPage,
    prevPage,
    updateRecipe,
    deleteRecipe,
  };
};

export default usePaginatedRecipes;
