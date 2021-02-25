import is from 'is_js'


export function createFormControl(conf, validation) {
    return {
        ...conf,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

export function validateInput(value, validation = null) {
    // Функция проверяет валидацию полей.
    if (!validation) {
        return true
    }
    let isValid = true

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }
    if (validation.email) {
        isValid = is.email(value) && isValid
    }
    if (validation.number) {
        isValid = is.number(value) && isValid
    }
    if (validation.url) {
        isValid = is.url(value) && isValid
    }
    if (validation.minLength) {
        isValid = value.trim().length >= validation.minLength && isValid
    }
    if (validation.maxLength) {
        isValid = value.trim().length <= validation.maxLength && isValid
    }

    return isValid
}

export function validateForm(formControl) {
    // Функция проверяет валидацию формы.
    let isFormValid = true

    Object.keys(formControl).forEach(obj => {
        isFormValid = formControl[obj].valid && isFormValid
    })

    return isFormValid
}