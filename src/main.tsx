import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import './index.css'
import './styles/Roboto/fonts.scss'
import 'config/configureMobX.ts'
import * as Router from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router.BrowserRouter>
            <App />
        </Router.BrowserRouter>
    </React.StrictMode>
)
