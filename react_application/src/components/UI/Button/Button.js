import React from 'react'

import classes from './Button.module.css'


const Button = props => {
    const styleButton = [
        classes.Button,
        classes[props.type],
        classes['block']
    ]
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={styleButton.join(' ')}>
            {props.children}
        </button>
    )
}
/*
    props.type: Определяет стиль кнопки, принимает класс для стилизации кнопки.
    props.onClick: Определяет событие клика по кнопке.
    props.children: Название кнопки, текст в кнопке.
*/

export default Button