import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ModalProvider, Modal } from './context/Modal';
import store from './store';
import App from './App';

import './index.css';

function Root () {
    return (
        <ModalProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
            <Modal />
        </ModalProvider>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
