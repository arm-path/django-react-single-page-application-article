import React from 'react'
import axios from 'axios'

import axiosConfig from './axiosConfig'
import {validateForm, validateInput} from '../../form/FormControl/formControl'
import Input from '../../components/UI/Input/Input'
import {
    ADD_ARTICLE_CHANGE_EVENT_INPUT, ADD_ARTICLE_SUCCESS, ARTICLES, CHANGE_TYPE_CHANGE_ARTICLE,
    CLEAR_ARTICLE, CLEAR_ARTICLES, CLEAR_VALIDATION_SERVER, ERROR_VALIDATION_SERVER
} from './typeAction'

// ---> Функции reducerArticles <--- //

// Функция получения статей из backend django.
export function articles(profile) {
    return async (dispatch) => {
        try {
            // Определение url. Все статьи <---> Статьи пользователя системы.
            let url = profile ? '/api/profile_article/?ordering=-date_of_publication' : '/api/articles/?ordering=-date_of_publication'
            // Получение данных от сервера через axios.
            let response = await axios.get(url, axiosConfig())
            let data = response.data // Полученные данные от сервера.
            // Функция построения state, список статей.
            dispatch(addArticlesInState(data, profile))
        } catch (e) {
            // JWT token invalid.
            if (e.response.status === 401) {
                localStorage.clear()
            }
        }
    }
}

// Функция получения статьи из backend django.
export function article(profile, primaryKey) {
    return async (dispatch) => {
        try {
            let url = `/api/article/${primaryKey}/`
            // Получение данных от сервера через axios.
            let response = await axios.get(url, axiosConfig())
            let data = response.data // Полученные данные от сервера.
            // Функция построения state, список статей.
            dispatch(addArticlesInState(data, profile))
        } catch (e) {
            // JWT token invalid.
            if (e.response.status === 401) {
                localStorage.clear()
            }
            // Страница не найдена.
            if (e.response.status === 404) {
                console.log('Страница не найдена, или была удалена')
            }
        }
    }
}

// Функция построения state, список статей.
export function addArticlesInState(articles, profile) {
    return {
        type: ARTICLES,
        articles, profile
    }
}

// Функция очищает state статей.
export function clearArticle() {
    return {
        type: CLEAR_ARTICLES
    }
}

// ---> Функции навигации. Манипуляции с компонентами. <--- //

// Функция навигации по страницам.
export function handleIsClick(name_page, primaryKey = false) {
    return dispatch => {
        dispatch(clearFormChangeArticle()) // Очищает state reducerChangeArticle.
        dispatch(clearArticle()) // Очищает state reducerArticles.
        // Манипуляции со state reducerChangeArticle. Изменение формы добавления или редактирования.
        name_page === 'ChangeArticleProfile' ? dispatch(typeChangeArticle('CHANGE', primaryKey)) : null
        name_page === 'ChangeArticleProfile' ? dispatch(getArticle(primaryKey)) : null
        name_page === 'ChangeArticle' ? dispatch(typeChangeArticle('ADD')) : null
        name_page = name_page === 'ChangeArticleProfile' ? 'ChangeArticle' : name_page
        // Манипуляции со state reducerArticle. Изменение формы списка статей или статьи.
        name_page === 'DetailArticle' && primaryKey ? localStorage.setItem('article', String(primaryKey)) : null
        name_page === 'DetailArticle' && primaryKey ? primaryKey = false : null
        name_page !== 'DetailArticle' ? localStorage.removeItem('article') : null
        localStorage.setItem('page', name_page) // Определяет активную страницу.
    }
}

// Изменение типа страницы: Редактирование <---> Добавление.
export function typeChangeArticle(typePage, primaryKey = false) {
    return {
        type: CHANGE_TYPE_CHANGE_ARTICLE,
        typePage, primaryKey
    }
}

// ---> Функции работы с формой добавления, редактирования и удаления <--- //

// Функции добавления и редактирование статей.
export function addArticle() {
    return async (dispatch, getState) => {
        try {
            let
                url = '',
                typePage = getState().changeArticle.typePage,
                primaryKey = getState().changeArticle.primaryKey,
                imageDefault = getState().changeArticle.formControl.imageControl.isImage

            url = (typePage === 'CHANGE' && primaryKey) ? `/api/profile_article/${primaryKey}/` : '/api/profile_article/'

            dispatch(clearValidationServer(false))
            const uploadData = new FormData(); // Получение данных из state и добавление в объект FormData.
            uploadData.append('title', getState().changeArticle.formControl.titleControl.value)
            if (typePage === 'CHANGE' && primaryKey && imageDefault) ;
            else uploadData.append('image', getState().changeArticle.formControl.imageControl.value)
            uploadData.append('description', getState().changeArticle.formControl.descriptionControl.value)
            uploadData.append('content', getState().changeArticle.formControl.contentControl.value)

            if (typePage === 'CHANGE' && primaryKey) {
                await axios.put(url, uploadData, axiosConfig()) // Изменение статьи в БД.
                dispatch(getArticle(primaryKey)) // Получение измененных записей, изменение state.
                // Добавление success после изменения state,
                // sleep в связи с асинхронным запросом перед получением нового state.
                setTimeout(() => {
                    dispatch(addSuccessArticle())
                }, 500)
            } else {
                await axios.post(url, uploadData, axiosConfig()) // Добавление статьи в БД.
                dispatch(clearFormChangeArticle()) // Очищает state reducerChangeArticle.
                dispatch(addSuccessArticle()) // Изменение state reducerChangeArticle, success--->true.
            }

        } catch (e) {
            // Обрабатывает возможные ответы от сервера.
            if (e.response.data) {
                let formControl = getState().changeArticle.formControl
                if (e.response.data.title) { // Ошибка в названии.
                    formControl.titleControl.errorServerValidationMessage = e.response.data.title[0]
                    dispatch(errorValidationServer(true, formControl))
                }
                if (e.response.data.image) { // Ошибка изображения.
                    formControl.imageControl.errorServerValidationMessage = e.response.data.image[0]
                    dispatch(errorValidationServer(true, formControl))
                }
                if (e.response.data.description) { // Ошибка краткого описания.
                    formControl.descriptionControl.errorServerValidationMessage = e.response.data.description[0]
                    dispatch(errorValidationServer(true, formControl))
                }
                if (e.response.data.content) { // Ошибка контента.
                    formControl.contentControl.errorServerValidationMessage = e.response.data.content[0]
                    dispatch(errorValidationServer(true, formControl))
                }
                if (e.response.status === 401) { // Ошибка JWT token.
                    if (localStorage.getItem('access_token')) {
                        localStorage.clear()
                    }
                }
            } else console.log(e)

        }
    }
}

// Функция выполнения при изменении Input.
export function onChangeEventInputArticle(event, obj) {
    return (dispatch, getState) => {
        let formControl = getState().changeArticle.formControl
        let control = formControl[obj]
        // Если type=image получает изображение, Если type=text,textarea получает текст.
        obj === 'imageControl' ? control.value = event.target.files[0] : control.value = event.target.value
        obj === 'imageControl' ? control.isImage = false : null
        // Валидация полей.
        control.touched = true
        control.errorServerValidationMessage = false
        control.valid = validateInput(control.value, control.validation)

        formControl[obj] = control

        let isFormValid = validateForm(formControl) // Валидация формы.
        dispatch(addChangeEventInputArticle({...formControl}, isFormValid)) // Изменение state->reducerChangeArticle
    }
}

// Функция добавления произошедших изменений в полях ввода в state->reducerChangeArticle.
export function addChangeEventInputArticle(formControl, isFormValid) {
    return {
        type: ADD_ARTICLE_CHANGE_EVENT_INPUT,
        formControl, isFormValid
    }
}

// Функция rendering input in html.
export function renderInputArticle() {
    return (dispatch, getState) => {
        let // Определение необходимых переменных.
            success = getState().changeArticle.success,
            primaryKey = getState().changeArticle.primaryKey,
            formControl = getState().changeArticle.formControl
        // Rendering input in html.
        return Object.keys(formControl).map((obj, index) => {
            let control = formControl[obj]
            return (
                <Input key={obj + '_' + index}

                       value={success && !primaryKey ? '' : control.value}
                       type={control.type}
                       label={control.label}
                       errorMessage={control.errorMessage}
                       errorServerValidationMessage={control.errorServerValidationMessage}
                       valid={control.valid}
                       touched={control.touched}
                       shouldValidate={true}
                       onChange={event => dispatch(onChangeEventInputArticle(event, obj))}
                />
            )
        })
    }
}

// Функция изменяет state, очищает ошибки полученные от сервера.
export function clearValidationServer(error) {
    return {
        type: CLEAR_VALIDATION_SERVER,
        error
    }
}

// Функция изменяет state, добавляет ошибки полученные от сервера.
export function errorValidationServer(error, formControl) {
    return {
        type: ERROR_VALIDATION_SERVER,
        error, formControl
    }
}

// Функция изменяет state->reducerChangeArticle->success->true.
export function addSuccessArticle() {
    return {
        type: ADD_ARTICLE_SUCCESS,
    }
}

// Функция возвращает state->reducerChangeArticle в первоначальное состояние.
export function clearFormChangeArticle() {
    return {
        type: CLEAR_ARTICLE,
    }
}

// Функция получает статью из БД, для редактирования.
export function getArticle(primaryKey) {
    return async (dispatch, getState) => {
        try {
            let url = `/api/profile_article/${primaryKey}/`
            let response = await axios.get(url, axiosConfig())
            let data = response.data
            let
                formControl = getState().changeArticle.formControl,
                title = formControl.titleControl,
                description = formControl.descriptionControl,
                content = formControl.contentControl

            // Изменения state полученными данными от сервера.
            title.value = data.title // Название.
            title.touched = true
            title.errorServerValidationMessage = false
            title.valid = validateInput(title.value, title.validation)
            formControl.titleControl = title
            description.value = data.description // Краткое описание.
            description.touched = true
            description.errorServerValidationMessage = false
            description.valid = validateInput(description.value, description.validation)
            formControl.descriptionControl = description
            content.value = data.content // Контент.
            content.touched = true
            content.errorServerValidationMessage = false
            content.valid = validateInput(content.value, content.validation)
            formControl.contentControl = content

            // Валидация формы.
            let isFormValid = validateForm(formControl)

            if (data.image !== null) formControl.imageControl.isImage = true

            dispatch(addChangeEventInputArticle({...formControl}, isFormValid))

        } catch (e) {
            console.log(e)
        }
    }
}

// Функция удаляет статью из БД.
export function deleteArticle(primaryKey) {
    return async (dispatch) => {
        try {
            let url = `/api/profile_article/${primaryKey}/`
            await axios.delete(url, axiosConfig())
            dispatch(articles(true))
        } catch (e) {
            console.log(e)
        }
    }
}

// ---> Вспомогательные функции <--- //
export function get_date(date) {
    date = new Date(date)
    let day = addZero(date.getDate()),
        month = addZero(date.getMonth()),
        year = date.getFullYear(),
        hours = addZero(date.getHours()),
        minutes = addZero(date.getMinutes())
    return `${year}/${month}/${day} ${hours}:${minutes}`
}

export function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}