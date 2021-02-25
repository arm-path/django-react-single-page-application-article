import {createFormControl} from '../../form/FormControl/formControl'
import {
    ADD_ARTICLE_CHANGE_EVENT_INPUT, ADD_ARTICLE_SUCCESS, CHANGE_TYPE_CHANGE_ARTICLE,
    CLEAR_ARTICLE, CLEAR_VALIDATION_SERVER, ERROR_VALIDATION_SERVER,
} from "../actions/typeAction"


const initialState = {
    typePage: 'ADD', // Изменение страницы Добавление <---> Редактирование.
    primaryKey: false, // Редактирование: Уникальный идентификатор статьи.
    error: false, // Валидация полей на уровне сервера. Учитывает полученные ошибки от сервера.
    success: false, // Успешное редактирование статьи или добавления на сервер.
    isFormValid: false, // Валидация полей на уровне клиента.
    formControl: { // Поля Input, значения, типы и валидация.
        titleControl: createFormControl({
            type: 'text', label: 'Название статьи',
            errorMessage: 'Пожалуйста введите корректное название, минимальная длина смиволов 3, максимальная: 69',
            errorServerValidationMessage: false,
        }, {
            required: true,
            minLength: 3,
            maxLength: 69
        }),
        imageControl: createFormControl({
            type: 'file',
            label: 'Изображение',
            errorMessage: '',
            errorServerValidationMessage: false,
            isImage: false
        }),
        descriptionControl: createFormControl({
            type: 'textarea', label: 'Краткое содержание',
            errorMessage: 'Пожалуйста введите корректное название, минимальная длина смиволов 25, максимальная: 255',
            errorServerValidationMessage: false,
        }, {
            required: true,
            minLength: 3,
            maxLength: 255
        }),
        contentControl: createFormControl({
            type: 'textarea', label: 'Контент', errorMessage: '', errorServerValidationMessage: false,
        }),
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE_CHANGE_EVENT_INPUT:
            return {
                ...state, error: false, success: false,
                formControl: action.formControl,
                isFormValid: action.isFormValid
            }
        case ERROR_VALIDATION_SERVER:
            return {
                ...state,
                error: action.error, success: false,
                formControl: action.formControl
            }
        case CLEAR_VALIDATION_SERVER:
            return {
                ...state, success: false,
                error: action.error,
            }
        case ADD_ARTICLE_SUCCESS:
            return {
                ...state, success: true
            }
        case CHANGE_TYPE_CHANGE_ARTICLE:
            return {
                ...state,
                typePage: action.typePage,
                primaryKey: action.primaryKey
            }
        case CLEAR_ARTICLE: // TODO: Дублирование кода, исправить.
            return {
                typePage: 'ADD',
                primaryKey: false,
                error: false,
                success: false,
                isFormValid: false,
                formControl: {
                    titleControl: createFormControl({
                        type: 'text', label: 'Название стратьии',
                        errorMessage: 'Пожалуйста введите корректное название, минимальная длина смиволов 3, максимальная: 69',
                        errorServerValidationMessage: false,
                    }, {
                        required: true,
                        minLength: 3,
                        maxLength: 69
                    }),
                    imageControl: createFormControl({
                        type: 'file',
                        label: 'Изображение',
                        errorMessage: '',
                        errorServerValidationMessage: false,
                        isImage: false
                    }),
                    descriptionControl: createFormControl({
                        type: 'textarea', label: 'Краткое содержание',
                        errorMessage: 'Пожалуйста введите корректное название, минимальная длина смиволов 25, максимальная: 255',
                        errorServerValidationMessage: false,
                    }, {
                        required: true,
                        minLength: 3,
                        maxLength: 255
                    }),
                    contentControl: createFormControl({
                        type: 'textarea', label: 'Контент', errorMessage: '',
                    }),
                }
            }
        default:
            return state
    }
}