import React from 'react'
import axios from 'axios'
import {
    ADD_TOKENS_IN_STATE,
    AUTHORIZATION_CHANGE_EVENT_INPUT,
    ERROR_AUTHORIZATION, ERROR_REGISTRATION_VALIDATION_SERVER, ERROR_VALIDATION_SERVER,
    REGISTRATION_CHANGE_EVENT_INPUT, SUCCESS_REGISTRATION,
} from './typeAction'
import {validateForm, validateInput} from '../../form/FormControl/formControl'
import Input from '../../components/UI/Input/Input'

// csrftoken для post запросов на сервер Django.
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

// Функция регистрации пользователя.
export function registration() {
    return async (dispatch, getState) => {
        try {
            let data = {
                username: getState().registration.formControl.loginControl.value,
                password: getState().registration.formControl.passwordControl.value,
                email: getState().registration.formControl.emailControl.value
            }

            let url = '/api/auth/users/'
            await axios.post(url, data) // Получение ответа от сервера через axios.
            dispatch(successRegistration(true))

        } catch (e) {
            console.log(e.response)
            if (e.response.data) {
                let formControl = getState().registration.formControl
                if (e.response.data.username) {
                    formControl.loginControl.errorServerValidationMessage = e.response.data.username[0]
                    dispatch(errorRegistrationValidationServer(true, formControl))
                }
                if (e.response.data.password) {
                    formControl.passwordControl.errorServerValidationMessage = e.response.data.password[0]
                    dispatch(errorRegistrationValidationServer(true, formControl))
                }
                if (e.response.data.email) {
                    formControl.emailControl.errorServerValidationMessage = e.response.data.email[0]
                    dispatch(errorRegistrationValidationServer(true, formControl))
                }
            } else console.log(e)
        }
    }
}

// Функция изменяет state, добавляет ошибки полученные от сервера.
export function errorRegistrationValidationServer(error, formControl) {
    return {
        type: ERROR_REGISTRATION_VALIDATION_SERVER,
        error, formControl
    }
}

// Функиция изменяет state при успешноей регистрации.
export function successRegistration(success) {
    return {
        type: SUCCESS_REGISTRATION,
        success
    }
}

// Функция авторизации пользователя.
export function authorization() {
    return async (dispatch, getState) => {
        try {
            let data = {
                username: getState().authorization.formControl.loginControl.value,
                password: getState().authorization.formControl.passwordControl.value,
            }

            let url = '/api/auth/jwt/create/'

            let response = await axios.post(url, data)

            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            dispatch(authorized())

        } catch (e) {
            if (e.response.data.detail === 'No active account found with the given credentials')
                dispatch(errorAuthorization('Запись с указанными учетными данными не найдена'))
            else if (e.response.data.username.includes('This field is required.'))
                console.log('Поле ввода логина является обязательным')
            else if (e.response.data.password.includes('This field is required.'))
                console.log('Поле ввода пароля является обязательным')
            else console.log(e.response)
        }
    }
}

// Функция выполнения при изменении Input.
export function onChangeEventInput(value, obj, TYPE_FORM) {
    return (dispatch, getState) => {
        let formControl

        (TYPE_FORM === 'registration') ? formControl = getState().registration.formControl
            : (TYPE_FORM === 'authorization') ? formControl = getState().authorization.formControl : null

        let control = formControl[obj]

        control.value = value
        control.touched = true
        control.errorServerValidationMessage = false
        control.valid = validateInput(control.value, control.validation)
        formControl[obj] = control
        let isFormValid = validateForm(formControl)

        dispatch(addChangeEventInput({...formControl}, isFormValid, TYPE_FORM))
    }
}

// Функция добавления изменений из Input в state.
export function addChangeEventInput(formControl, isFormValid, TYPE_FORM) {
    let type
    (TYPE_FORM === 'registration') ? type = REGISTRATION_CHANGE_EVENT_INPUT
        : (TYPE_FORM === 'authorization') ? type = AUTHORIZATION_CHANGE_EVENT_INPUT : null

    return {
        type: type,
        formControl, isFormValid
    }
}

// Функция rendering Input.
export function renderInput(TYPE_FORM) {
    return (dispatch, getState) => {
        let formControl = (TYPE_FORM === 'registration') ? getState().registration.formControl
            : (TYPE_FORM === 'authorization') ? getState().authorization.formControl : null
        let success = getState().registration.success
        return Object.keys(formControl).map((obj, index) => {
            let control = formControl[obj]
            return (
                <Input
                    key={obj + '_' + index}
                    value={success ? '' : control.value}
                    type={control.type}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={true}
                    errorServerValidationMessage={control.errorServerValidationMessage}
                    onChange={event => dispatch(onChangeEventInput(event.target.value, obj, TYPE_FORM))}
                />
            )
        })
    }
}

// Функция при взникновении ошибоки.
export function errorAuthorization(error) {
    return {
        type: ERROR_AUTHORIZATION,
        error: error
    }
}
// Функиция получает token из localStorage и отправляет данные в функцию добавления в State.
export function authorized() {
    return dispatch => {
        let access_token = localStorage.getItem('access_token')
        let refresh_token = localStorage.getItem('refresh_token')

        dispatch(addTokens(access_token, refresh_token))
    }
}

// Функция добавления token в state.
export function addTokens(access_token, refresh_token) {
    return {
        type: ADD_TOKENS_IN_STATE,
        access_token, refresh_token
    }

}

