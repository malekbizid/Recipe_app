import React from 'react';
import usePaginatedRecipes from '../app/features/pagination';
import styles from '../styles/RecipesList.module.css';
import { Section, Component, Recipe } from '../interfaces/types';
import UpdateRecipe from './UpdateRecipe';
import DeleteRecipe from './DeleteRecipe';

const RecipesList: React.FC = () => {
  const { data, addedRecipes, error, isLoading, isFetching, page, nextPage, prevPage, updateRecipe, deleteRecipe } = usePaginatedRecipes();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {(error as any).message}</div>;

  const allRecipes = [...addedRecipes, ...(data?.results ?? [])];

  return (
    <div className={styles.container}>
      <h1>Recipes</h1>
      {isFetching && <div>Fetching more recipes...</div>}
      <div className={styles['table-container']}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Ingredients</th>
              <th>Servings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRecipes.length > 0 ? (
              allRecipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.name}</td>
                  <td>{recipe.description}</td>
                  <td>
                    <img src={recipe.thumbnail_url} alt={recipe.name} />
                  </td>
                  <td>
                    {recipe.sections && recipe.sections.length > 0 ? (
                      <ul>
                        {recipe.sections.flatMap((section: Section) =>
                          section.components.map((ingredient: Component, index: number) => (
                            <li key={index}>{ingredient.raw_text}</li>
                          ))
                        )}
                      </ul>
                    ) : (
                      'No ingredients available'
                    )}
                  </td>
                  <td>{recipe.yields}</td>
                  <td>
                    {addedRecipes.some(r => r.id === recipe.id) && (
                      <>
                        <UpdateRecipe recipe={recipe} onUpdate={updateRecipe} />
                        <DeleteRecipe recipe={recipe} onDelete={deleteRecipe} />
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No recipes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={prevPage} disabled={page === 0}>
          Previous
        </button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default RecipesList;
