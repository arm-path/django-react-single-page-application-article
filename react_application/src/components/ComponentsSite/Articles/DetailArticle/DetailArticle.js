import React from 'react'
import {connect} from 'react-redux'
import {article, get_date} from '../../../../redux/actions/actionsArticles'
import classes from './DetailArticle.module.css'


class DetailArticle extends React.Component {
    componentDidMount() {
        let primaryKey = localStorage.getItem('article')
        this.props.getArticle(false, primaryKey)
    }
    render() {
        return (
            <div>
                {this.props.article !== null ?
                    <div className={classes.DetailArticle}>
                        {this.props.article.image ? <p><img src={this.props.article.image}/></p> : null}
                        <div>
                            <h2>{this.props.article.title}</h2>
                            <small><b>Дата публикации:</b> {get_date(this.props.article.date_of_publication)}</small>
                            <div><small><b>Автор статьи:</b> {this.props.article.owner}</small></div>
                            {this.props.article.content ? <p>{this.props.article.content}</p> :
                                <p>{this.props.article.description}</p>}
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        article: state.articles.articles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getArticle: (profile, primaryKey) => dispatch(article(profile, primaryKey)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailArticle)