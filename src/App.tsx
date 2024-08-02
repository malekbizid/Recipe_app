import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './App.css';
import Home from './Pages/Home';
import Recipe from './Pages/Recipe';
import Add from './Pages/Add';
import Sidebar from './Components/Sidebar';
import { store, persistor } from './app/store';
import { AuthProvider } from './Components/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <BrowserRouter>
            <div className="App">
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/recipe"
                    element={
                      <PrivateRoute>
                        <Recipe />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/add"
                    element={
                      <PrivateRoute>
                        <Add />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </div>
              <Sidebar />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
