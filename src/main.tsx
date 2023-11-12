import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core'
import App from './app/App'
import MainLayout from './layouts/MainLayout/MainLayout'
import { store } from './store'
import '@mantine/core/styles.css'
import './css/normalize.css'
import './css/global.css'
import ErrorBoundary from './layouts/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <MantineProvider>
                <BrowserRouter>
                    <ErrorBoundary>
                        <MainLayout>
                            <App />
                        </MainLayout>
                    </ErrorBoundary>
                </BrowserRouter>
            </MantineProvider>
        </Provider>
    </React.StrictMode>
)
