import {combineReducers} from 'redux'
import reducer from './reducer'
import registration from './reducerRegistration'
import authorization from './reducerAuthorization'
import articles from './reducerArticles'
import changeArticle from './reducerChangeArticle'
import {CLEAR_STATE_REDUCERS} from '../actions/typeAction'


const appReducer = combineReducers({
    reducer: reducer, // Работа с token.
    registration: registration, // Регистрация в системе.
    authorization: authorization, // Авторизацие в системе.
    articles: articles, // Список статей, список статей пользователя.
    changeArticle: changeArticle // Добавление, редактирование, удаление статей.
},)


const rootReducer = (state, action) => {
    if (action.type === CLEAR_STATE_REDUCERS) {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer