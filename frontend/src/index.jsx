import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import Routes from './main/routes'
import reducers from './main/reducers'

/*
ESSE CÓDIGO UTILIZA UM TEMPLATE PADRÃO UTILIZADO NO CURSO DA UDEMY: https://www.udemy.com/course/react-redux-pt/
E FOI ADAPTADO PARA SUPORTAR AS NECESSIDADES O TRABALHO FINAL.

ALGUMAS REFERÊNCIAS FORAM RETIRADAS DE VÍDEOS, OS QUAIS:
https://www.youtube.com/watch?v=enxpq9EYyew "CRUD de Produtos com ReactJS (sem Hooks)", Créditos Renato Marques Teles
e, https://www.youtube.com/watch?v=XQxitgyZ_S4 "React JS Curso Rápido Masterclass #1 2020 - 100% Prático!", Créditos Cod3r Cursos
*/

//Constante devTools é devido à útilização de Middleware e métodos de autenticação
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
      && window.__REDUX_DEVTOOLS_EXTENSION__()

//Constante store aplicando o devtools ao middleware de fato
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

//Renderizando o elemento do React no DOM 
ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>
, document.getElementById('app')) //renderizando o React DOM no APP