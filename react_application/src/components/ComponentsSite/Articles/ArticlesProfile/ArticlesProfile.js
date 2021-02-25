import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {articles, deleteArticle, handleIsClick} from '../../../../redux/actions/actionsArticles'
import classes from './ArticlesProfile.module.css'


class Articles extends React.Component {
    componentDidMount() {
        this.props.getArticles(true)
    }

    renderArticle() {
        if (Object.keys(this.props.articles).length === 0) {
            return <h3 style={{textAlign: 'center'}}>Статьи отсутствуют</h3>
        }
        return Object.keys(this.props.articles).map((key, index) => {
            let obj = this.props.articles[key]
            let url = `/?article=${obj.pk}`
            return (
                <ul key={key}>
                    <p><img src={obj.image}/></p>
                    <li>
                        <h2>{obj.title}</h2>
                        <p>{obj.description}...</p>
                        <div className={classes.clear}/>
                        <div className={classes.links}>
                            <span className={classes.linkReadPost}>
                                <NavLink to='/'
                                         onClick={() => this.props.handleIsClick('ChangeArticleProfile', obj.pk)}>Редактировать</NavLink>
                            </span>
                            <span className={classes.linkReadPost}>
                                <NavLink to='/'
                                         onClick={() => this.props.handleIsClick('DetailArticle', obj.pk)}>Читать</NavLink>
                            </span>
                            <span className={classes.linkReadPost}>
                                <NavLink to='/' onClick={() => this.props.deleteArticle(obj.pk)}>Удалить</NavLink>
                            </span>
                        </div>

                    </li>
                </ul>
            )
        })
    }

    render() {
        return (
            <div className={classes.ArticlesProfile}>
                <h1 style={{textAlign: 'center'}}>Список статей</h1>
                {this.props.articles !== null ? this.renderArticle() :
                    <h3 style={{textAlign: 'center', color: 'red'}}>Доступ закрыт</h3>}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles.articles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getArticles: (profile) => dispatch(articles(profile)),
        handleIsClick: (name_page, primaryKey) => dispatch(handleIsClick(name_page, primaryKey)),
        deleteArticle: (primaryKey) => dispatch(deleteArticle(primaryKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
