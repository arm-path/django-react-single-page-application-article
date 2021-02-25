import {ARTICLES, CLEAR_ARTICLES} from "../actions/typeAction";

const initialState = {
    error: false,
    profile: false,
    articles: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ARTICLES:
            return {
                ...state,
                profile: action.profile,
                articles: action.articles
            }
        case CLEAR_ARTICLES:
            return {
                error: false,
                profile: false,
                articles: null
            }

        default:
            return state
    }
}