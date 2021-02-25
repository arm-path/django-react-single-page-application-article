import React from 'react'
import {connect} from 'react-redux'
import {addArticle, renderInputArticle} from '../../../../redux/actions/actionsArticles'
import Button from '../../../UI/Button/Button'
import classes from './ChangeArticle.module.css'


class ChangeArticle extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h1 style={{textAlign: 'center'}}>
                        {this.props.type === 'ADD' ? 'Добавление статьи' : 'Редактирование статьи'}
                    </h1>
                    {
                        this.props.success ?
                            <h3 className={classes.AddArticleSuccess}>
                                {this.props.type === 'ADD' ? 'Статья успешно добавлена' : 'Статья успешно сохранена'}
                            </h3>
                            : null
                    }
                    <form onSubmit={this.props.submitForm} method="POST" encType="multipart/form-data">
                        {this.props.renderInput()}
                        <div style={{textAlign: 'center'}}>
                            <Button onClick={this.props.addArticle} disabled={!this.props.isFormValid}>
                                {this.props.type === 'ADD' ? 'Добавить' : 'Сохранить'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFormValid: state.changeArticle.isFormValid,
        formControl: state.changeArticle.formControl,
        success: state.changeArticle.success,
        error: state.changeArticle.error,
        type: state.changeArticle.typePage,
        primaryKey: state.changeArticle.primaryKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addArticle: () => dispatch(addArticle()),
        renderInput: () => dispatch(renderInputArticle()),
        submitForm: (event) => event.preventDefault()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeArticle)