import React from 'react'
import {NavLink} from 'react-router-dom'
import classes from './Header.module.css'

const Header = props => (
    <div className={classes.header}>
        <ul>
            <li><NavLink to='/'></NavLink></li>
            <li><NavLink to='/'></NavLink></li>
            <li className={classes.last}><a onClick={exit} href="#">Выход</a></li>
        </ul>
    </div>
)

function exit(){
    localStorage.clear()
    location.reload()
}

export default Header