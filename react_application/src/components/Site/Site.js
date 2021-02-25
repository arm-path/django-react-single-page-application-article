import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import Header from '../ComponentsSite/Header/Header'
import Sidebar from '../ComponentsSite/Sidebar/Sidebar'
import Articles from '../ComponentsSite/Articles/Articles/Articles'
import ChangeArticle from '../ComponentsSite/Articles/ChangeArticle/ChangeArticle'
import ArticlesProfile from '../ComponentsSite/Articles/ArticlesProfile/ArticlesProfile'
import DetailArticle from '../ComponentsSite/Articles/DetailArticle/DetailArticle'
import classes from './Site.module.css'


class Site extends React.Component {

    route = () => {
        let page = localStorage.getItem('page')
        if (page === 'Articles') {
            return (<Switch> <Route path='/' component={Articles}/></Switch>)
        } else if (page === 'ChangeArticle') {
            return (<Switch><Route path='/' component={ChangeArticle}/> </Switch>)
        } else if (page === 'ProfileArticles') {
            return (<Switch> <Route path='/' component={ArticlesProfile}/></Switch>)
        }else if (page === 'DetailArticle'){
            return (<Switch> <Route path='/' component={DetailArticle}/></Switch>)
        }
    }

    render() {
        return (
            <div className={classes.Site}>
                <Header/>
                <div className={classes.content}>
                    <div className={classes.SiteSidebar}><Sidebar/></div>
                    <div className={classes.contentMain}>{this.route()}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Site)