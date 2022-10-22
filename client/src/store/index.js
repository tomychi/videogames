import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// composeWithDevTools nos evita escribir código para usar Redux DevTools
// redux thunk nos permite usar funciones asíncronas en las acciones
