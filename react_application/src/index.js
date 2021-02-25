import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import rootReducer from './redux/reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware(reduxThunk))

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('app')
)