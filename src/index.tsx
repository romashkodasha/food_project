import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import './index.css'
import './styles/Roboto/fonts.scss'
import './styles/styles.scss'
import 'config/configureMobX'
import * as Router from 'react-router-dom'
import 'regenerator-runtime'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router.BrowserRouter>
            <App />
        </Router.BrowserRouter>
    </React.StrictMode>
)


if(module.hot) {
    module.hot.accept();
}