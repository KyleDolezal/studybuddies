import React from "react"
import PropTypes from "prop-types"
import NewUser from "./NewUser"
import Header from "./Header"
import Login from "./Login"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props){
    super(props)
  }
  render () {
    return(
      <div>
        <Header user={this.props.user}/>
        <Router>

          <Switch>
            <Route path="/login">
              <Login {...this.props}
                      link=<Link to={`/newuser`}>Create a user</Link> />
            </Route>
            <Route path="/newuser">
              <NewUser {...this.props}
                      link=<Link to={`/login`}>Sign in</Link> />
            </Route>
            <Route path="/">
              {this.getBodyForAuthedUser()}
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

  getBodyForAuthedUser(){
    if(this.props.user){
      return(<h1>Welcome</h1>)
    } else {
      history.push("/login")
    }
  }
}

export default App
