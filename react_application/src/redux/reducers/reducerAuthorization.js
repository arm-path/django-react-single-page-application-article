import {createFormControl} from '../../form/FormControl/formControl'
import {AUTHORIZATION, AUTHORIZATION_CHANGE_EVENT_INPUT, ERROR_AUTHORIZATION} from '../actions/typeAction'

const initialState = {
    error: false,
    isFormValid: false,
    formControl: {
        loginControl: createFormControl({
            type: 'text', label: 'Логин',
            errorMessage: 'Пожалуйста введите корректный логин, минимальная длина 3 символа',
        }, {
            required: true, minLength: 3
        }),
        passwordControl: createFormControl(
            {
                type: 'password', label: 'Пароль',
                errorMessage: 'Пожалуйста введите корректный пароль, минимальная длина пароля должна составлять 6 симолов'
            },
            {
                required: true, minLength: 6
            }),
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZATION:
            return {
                ...state,
            }
        case AUTHORIZATION_CHANGE_EVENT_INPUT:
            return {
                ...state,
                formControl: action.formControl,
                isFormValid: action.isFormValid,
                error: false
            }
        case ERROR_AUTHORIZATION:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}