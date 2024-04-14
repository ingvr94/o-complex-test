import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ShoppingCartProvider } from './context/ShoppingCartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ShoppingCartProvider>
      <App />
    </ShoppingCartProvider>
 
)
