import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { ChakraProvider,CSSReset } from '@chakra-ui/react'


import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <ChakraProvider>
      <CSSReset/>
      <Provider store={store}>
    <App />
      </Provider>
    </ChakraProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

