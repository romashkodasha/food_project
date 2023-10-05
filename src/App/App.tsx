import { Routes, Route, Navigate } from 'react-router-dom'
import RecipePage from './pages/RecipePage'
import RecipesPage from './pages/RecipesPage'
import PlanPage from './pages/PlanPage'
import Header from '../components/Header'
import './../styles/styles.scss'
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit'
import React from 'react'
import FavoritesPage from './pages/FavoritesPage'
import ChatBotPage from './pages/ChatBotPage'

function App() {
    useQueryParamsStoreInit()
    return (
        <>
            <Header />
            <Routes>
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/recipes/:id" element={<RecipePage />} />
                <Route path="/planning" element={<PlanPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/chatbot" element={<ChatBotPage />} />
                <Route path="*" element={<Navigate to="/recipes" replace />} />
            </Routes>
            
        </>
    )
}

export default App
