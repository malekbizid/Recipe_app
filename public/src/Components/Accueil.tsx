import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import "../styles/Accueil.css";

const Accueil: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isAuthenticated, login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(username, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/recipe" />;
  }

  return (

    <div className="background">
      <Paper className="login-container" elevation={3}>
        <Typography variant="h4" component="h1" className="login-header">
          Login
        </Typography>
        <Typography variant="h5" component="h2" className="login-header">
          Welcome to Recipe Haven
        </Typography>
        <Typography className="login-header">
          Discover and share your favorite recipes with our community. Please
          log in to continue.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            className="login-button" 
            color="primary"
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </Box>
        <Typography className="login-footer">
          Don't have an account? <a href="/">Sign up now!</a>
        </Typography>
      </Paper>
    </div>
    
  );
};

export default Accueil;
