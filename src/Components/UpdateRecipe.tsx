import React, { useState } from 'react';
import { Recipe, Component as Ingredient } from '../interfaces/types';

interface UpdateRecipeProps {
  recipe: Recipe;
  onUpdate: (updatedRecipe: Recipe) => void;
}

const UpdateRecipe: React.FC<UpdateRecipeProps> = ({ recipe, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: recipe.name,
    description: recipe.description,
    thumbnail_url: recipe.thumbnail_url,
    yields: recipe.yields,
    ingredients: recipe.sections
      ? recipe.sections.flatMap((section) => section.components.map((comp) => comp.raw_text)).join(', ')
      : '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    const { name, description, thumbnail_url, yields, ingredients } = formData;

    if (!name || !description || !thumbnail_url || !yields || !ingredients) {
      setError('All fields are required');
      return;
    }

    setError('');
    onUpdate({
      ...recipe,
      name,
      description,
      thumbnail_url,
      yields,
      sections: [
        {
          components: ingredients.split(',').map((ingredient) => ({
            raw_text: ingredient.trim(),
          })),
        },
      ],
    });
    setIsEditing(false); 
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <div>
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label htmlFor="thumbnail_url">Thumbnail URL:</label>
            <input 
              type="text" 
              id="thumbnail_url" 
              name="thumbnail_url" 
              value={formData.thumbnail_url} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label htmlFor="yields">Yields:</label>
            <input 
              type="text" 
              id="yields" 
              name="yields" 
              value={formData.yields} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients (comma separated):</label>
            <textarea 
              id="ingredients" 
              name="ingredients" 
              value={formData.ingredients} 
              onChange={handleInputChange} 
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>Update</button>
      )}
    </div>
  );
};

export default UpdateRecipe;
