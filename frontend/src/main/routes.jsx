import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'
import AuthOrApp from './authOrApp'
import Dashboard from '../common/dashboard/dashboard'
import Contacts from '../contacts/contacts'
import Appointment from '../appointment/appointment'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='contatos' component={Contacts} />
            <Route path='compromissos' component={Appointment} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)