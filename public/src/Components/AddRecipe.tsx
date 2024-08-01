import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { addRecipe } from '../app/features/recipesSlice';
import { Recipe } from '../interfaces/types';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import styles from '../styles/AddRecipe.module.css';

const AddRecipe: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [yields, setYields] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe: Recipe = {
      id: Date.now(),
      name,
      thumbnail_url: thumbnailUrl,
      ingredients,
      sections: [
        {
          components: ingredients.map((ingredient) => ({
            raw_text: ingredient,
          })),
        },
      ],
      description,
      yields,
    };

    dispatch(addRecipe(newRecipe));

    setName('');
    setThumbnailUrl('');
    setIngredients([]);
    setDescription('');
    setYields('');
  };

  return (
    <div className={styles.container}>
      <Container maxWidth="sm" className={styles.formContainer}>
        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add a New Recipe
          </Typography>
          <Box component="form" onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Thumbnail URL"
              variant="outlined"
              fullWidth
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Ingredients (comma separated)"
              variant="outlined"
              fullWidth
              value={ingredients.join(',')}
              onChange={(e) => setIngredients(e.target.value.split(','))}
              margin="normal"
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Yields"
              variant="outlined"
              fullWidth
              value={yields}
              onChange={(e) => setYields(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Recipe
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default AddRecipe;
