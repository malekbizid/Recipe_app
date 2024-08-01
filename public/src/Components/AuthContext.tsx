import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLoginMutation } from '../app/features/authApi';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const token=localStorage.getItem('token')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(token));
  const [login] = useLoginMutation();

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login({ username, password }).unwrap();
      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context?.isAuthenticated) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
