import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom'
import Login from './views/login'
import Register from './views/register'
import Index from './views/index'
import WriteDiary from './views/write-diary'
import DiaryDetail from './views/diary-detail'
import './App.css'

const routes = [
  {
    path: '/diaryDetail/:id',
    component: DiaryDetail
  },
  {
    path: '/writeDiary',
    component: WriteDiary
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
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
      </Router>
    )
  }
}

// function Index() {
//   return <h3>Index</h3>
// }

function NoMatch() {
  let location = useLocation()

  return (
    <div>
      <h3>No match for {location.pathname}</h3>
    </div>
  )
}
export default App
