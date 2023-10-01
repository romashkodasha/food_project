import {  Routes, Route, Navigate } from 'react-router-dom';
import RecipePage from './pages/RecipePage';
import RecipesPage from './pages/RecipesPage';
import Header from '../components/Header';
import './../styles/styles.scss';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';
import React from 'react';


function App() {
  useQueryParamsStoreInit();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="*" element={<Navigate to="/recipes" replace />} />
      </Routes>
    </>
  );
}

export default App;
