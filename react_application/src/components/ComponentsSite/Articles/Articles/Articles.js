import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {articles, handleIsClick} from '../../../../redux/actions/actionsArticles'
import classes from './Articles.module.css'


class Articles extends React.Component {
    componentDidMount() {
        this.props.getArticles(false)
    }

    renderArticle() {
        if (Object.keys(this.props.articles).length === 0) {
            return <h3 style={{textAlign: 'center'}}>Статьи отсутствуют</h3>
        }
        return Object.keys(this.props.articles).map((key, index) => {
            let obj = this.props.articles[key]
            return (
                <ul key={key}>
                    {obj.image ? <p><img src={obj.image}/></p> : null}

                    <li>
                        <h2>{obj.title}</h2>
                        <p>{obj.description}...</p>
                        <div className={classes.clear}/>
                        <p className={classes.linkReadPost}>
                            <NavLink to='/' onClick={() => this.props.handleIsClick('DetailArticle', obj.pk)}>
                                Читать статью
                            </NavLink>
                        </p>
                    </li>
                </ul>
            )
        })
    }

    render() {
        return (
            <div className={classes.Articles}>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
