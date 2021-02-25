import React from 'react'
import {connect} from 'react-redux'
import Button from '../UI/Button/Button'
import classes from './Registration.module.css'
import {NavLink} from 'react-router-dom'
import {registration, renderInput} from '../../redux/actions/actions'

const TYPE_FORM = 'registration'

class Registration extends React.Component {

    render() {
        return (
            <div className={classes.Registration}>
                <div>
                    <h1>Регистрация</h1>
                    {this.props.success ?
                        <h3>Регистрация прошла успешно, пожалуйста подтвердите электронный адрес почты</h3>
                        : null
                    }
                    <form onSubmit={this.props.submitForm}>
                        {this.props.renderInput()}
                        <div style={{textAlign: 'center'}}>
                            <Button onClick={this.props.registration} disabled={!this.props.isFormValid}>
                                Регистрация
                            </Button>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <NavLink to='/'> Войти </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFormValid: state.registration.isFormValid,
        formControl: state.registration.formControl,
        error: state.registration.error,
        success: state.registration.success,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registration: () => dispatch(registration()),
        renderInput: () => dispatch(renderInput(TYPE_FORM)),
        submitForm: (event) => event.preventDefault(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)