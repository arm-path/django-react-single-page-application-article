import {ADD_TOKENS_IN_STATE} from '../actions/typeAction'

const initialState = {
    access_token: null,
    refresh_token: null,
    page: null,
    page_number: 0
}

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TOKENS_IN_STATE:
            return {
                access_token: action.access_token,
                refresh_token: action.refresh_token
            }
        default:
            return state
    }
}