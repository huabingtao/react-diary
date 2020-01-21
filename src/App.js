import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom'
import Login from './views/login'
import Register from './views/register'

const routes = [
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '*',
    component: NoMatch
  }
]

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          {/* <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/index">index</Link>
            </li>
          </ul> */}

          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </Router>
    )
  }
}

function Index() {
  return <h3>Index</h3>
}

function NoMatch() {
  let location = useLocation()

  return (
    <div>
      <h3>No match for {location.pathname}</h3>
    </div>
  )
}
export default App
