import {
    ERROR_REGISTRATION_VALIDATION_SERVER,
    REGISTRATION,
    REGISTRATION_CHANGE_EVENT_INPUT, SUCCESS_REGISTRATION
} from '../actions/typeAction'
import {createFormControl} from '../../form/FormControl/formControl'

const initialState = {
    error: false,
    success: false,
    isFormValid: false,
    formControl: {
        loginControl: createFormControl({
            type: 'text', label: 'Логин',
            errorMessage: 'Пожалуйста введите корректный логин, минимальная длина 3 символа',
            errorServerValidationMessage: false
        }, {
            required: true, minLength: 3
        }),
        emailControl: createFormControl({
            type: 'email', label: 'Электронная почта',
            errorMessage: 'Пожалуйста введите корректный адрес электронной почты',
            errorServerValidationMessage: false
        }, {
            required: true, email: true
        }),
        passwordControl: createFormControl(
            {
                type: 'password', label: 'Пароль',
                errorMessage: 'Пожалуйста введите корректный пароль, минимальная длина пароля должна составлять 6 симолов',
                errorServerValidationMessage: false
            },
            {
                required: true, minLength: 6
            }),
        repeatedPasswordControl: createFormControl(
            {
                type: 'password', label: 'Повтор пароля',
                errorMessage: 'Пожалуйста введите корректный пароль, минимальная длина пароля должна составлять 6 симолов',
                errorServerValidationMessage: false
            },
            {
                required: true, minLength: 6
            }),
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION:
            return {
                ...state,
                success: false,
            }
        case REGISTRATION_CHANGE_EVENT_INPUT:
            return {
                ...state,
                success: false,
                formControl: action.formControl,
                isFormValid: action.isFormValid
            }
        case ERROR_REGISTRATION_VALIDATION_SERVER:
            return {
                ...state,
                formControl: action.formControl,
                error: action.error,
                success: false,
            }
        case SUCCESS_REGISTRATION:
            return {
                ...state,
                success: action.success
            }
        default:
            return state
    }
}