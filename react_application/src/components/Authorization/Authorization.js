import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import Button from '../UI/Button/Button'
import {authorization, renderInput} from '../../redux/actions/actions'
import classes from './Authorization.module.css'


const TYPE_FORM = 'authorization'

class Authorization extends React.Component {
    render() {
        return (
            <div className={classes.Authorization}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.props.submitForm}>
                        {this.props.error ? <div className={classes.error}>{this.props.error}</div> : null}
                        {this.props.renderInput()}
                        <div style={{textAlign: 'center'}}>
                            <Button onClick={this.props.authorization}
                                    disabled={!this.props.isFormValid}> Войти </Button>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <NavLink to='registration/'>Регистрация</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFormValid: state.authorization.isFormValid,
        formControl: state.authorization.formControl,
        error: state.authorization.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authorization: () => dispatch(authorization()),
        renderInput: () => dispatch(renderInput(TYPE_FORM)),
        submitForm: (event) => event.preventDefault()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization)