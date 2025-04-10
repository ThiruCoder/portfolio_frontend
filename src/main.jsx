import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MyContext } from './Context.jsx'
import { Provider } from 'react-redux'
import { store } from './ReduxPalace/ReduxStore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyContext>
        <Provider store={store}>
          <App />
        </Provider>
      </MyContext>
    </BrowserRouter>
  </StrictMode>,
)

