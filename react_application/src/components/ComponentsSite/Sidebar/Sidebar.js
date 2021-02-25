import React from 'react'
import classes from './Sidebar.module.css'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleIsClick} from '../../../redux/actions/actionsArticles'

class Sidebar extends React.Component {
    render() {
        return (
            <div className={classes.Sidebar}>
                <ul>
                    <li>
                        <NavLink to="/" onClick={() => this.props.handleIsClick('Articles')}>
                            Статьи
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" onClick={() => this.props.handleIsClick('ProfileArticles')}>
                            Мои статьи
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" onClick={() => this.props.handleIsClick('ChangeArticle')}>
                            Добавить статью
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleIsClick: (name_page) => dispatch(handleIsClick(name_page))
    }
}

export default connect(null, mapDispatchToProps)(Sidebar)