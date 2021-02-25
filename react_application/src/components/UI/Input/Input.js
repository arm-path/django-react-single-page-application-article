import React from 'react'

import classes from './Input.module.css'


const isInvalid = ({valid, touched, shouldValidate}) => {
    return !valid && shouldValidate && touched
}

const Input = props => {
    let clsInput = [classes.Input]
    let type = props.type || 'text'
    let idInput = type + '_' + Math.random()

    if (isInvalid(props)) {
        clsInput.push(classes.invalid)
    }
    return (
        <div className={clsInput.join(' ')}>
            <label htmlFor={idInput}>{props.label}</label>
            { // Изменение формы и атрибутов в зависимости от типа поля Input.
                type === 'textarea' ?
                    <textarea id={idInput} value={props.value} onChange={props.onChange} className={classes.textarea}/>
                    : (type === 'file') ?
                    <input type={type} id={idInput} onChange={props.onChange}/>
                    :
                    <input type={type} id={idInput} value={props.value} onChange={props.onChange}/>}
            { // Ошибки валидации полей React.
                isInvalid(props) ?
                    <span>{props.errorMessage || 'Поля заполнены неправильно'}</span> :
                    null
            }
            { // Ошибки валидации полей Django.
                props.errorServerValidationMessage ?
                    <span>{props.errorServerValidationMessage}</span> : null
            }
        </div>
    )
}
/*
    props.label: Текст для тега label.
    props.type: Атрибут type в input.
    props.value: Атрибут value в input.
    props.onChange: Событие изменения в input.
    props.errorMessage: Текст сообщения при возникновении ошибки.
    props.errorServerValidationMessage: Текст сообщения при возникновении ошибок от сервера.
    props.valid: Проверяет валидацию input. true - Поле является провалидированным.
    props.shouldValidate - Проверяет необходимость валидирования input.
    props.touched - Проверяет,  был ли ввод данных в input.
*/

export default Input