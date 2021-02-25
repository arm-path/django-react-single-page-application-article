import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch, Route, withRouter} from 'react-router-dom'
import Authorization from './Authorization/Authorization'
import Registration from './Registration/Registration'
import Site from './Site/Site'
import {authorized} from '../redux/actions/actions'


class App extends Component {
    componentDidMount() {
        this.props.authorized() // Verification JWT token.
    }

    render() {
        let route = ( // Route Authorization and registration.
            <Switch>
                <Route path='/registration/' component={Registration}/>
                <Route path='/' exact component={Authorization}/>
            </Switch>
        )

        if (this.props.token !== null) { // Route Page Site.
            route = (<Switch> <Route path='/' exact component={Site}/> </Switch>)
        }
        return (
            <React.Fragment> {route} </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return { // Token JWT in State.
        token: state.reducer.access_token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authorized: () => dispatch(authorized()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


