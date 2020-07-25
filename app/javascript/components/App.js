import React from "react"
import PropTypes from "prop-types"
import NewUser from "./NewUser"
import Header from "./Header"
import Home from "./Home"
import Login from "./Login"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { withRouter } from 'react-router-dom';
const history = createBrowserHistory();

class App extends React.Component {
  constructor(props){
    super(props)

    this.state={
      user: props.user || {email: '', id: ' '},
      'access-token': ''
    }
  }
  render () {
    return(
      <div>
        <div className="container d-flex justify-content-center">
          <div className="col">
            <div className="row justify-content-center">
              <Header useremail={this.state.user['email']}/>
            </div>
            <div className="row justify-content-md-center">
              <Router>
                <Switch>
                  <Route path="/login">
                    {this.state.user['email'] ? null :
                      <Login {...this.props}
                              link=<Link to={`/newuser`}>Create a user</Link>
                              setUserInfo={this.setUserInfo}
                              setAuthToken={this.setAuthToken}
                              className="row"/> }
                  </Route>
                  <Route path="/newuser">
                    {this.state.user['email'] ? null :
                      <NewUser {...this.props}
                            link=<Link to={`/login`}>Sign in</Link>
                            setUserInfo={this.setUserInfo}
                            setAuthToken={this.setAuthToken}
                            className="row" /> }
                  </Route>
                  <Route path="*">
                    {this.getBodyForAuthedUser()}
                  </Route>
                </Switch>
              </Router>
              {this.getBodyForAuthedUser()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  getBodyForAuthedUser(){
    if(this.state.user['email'].length > 0){
      return(<div>
              <Home auth_token={this.state['access-token']}
                setAuthToken={this.setAuthToken}
                interestsPath={this.props.interestsPath}
                user_id={this.state.user['id']}/>
              </div>)
    } else {
      history.push("/login")
    }
  }

  setUserInfo = (id, email) => {
    const user = {id: id, email: email}

    this.setState({
      user: user
    })
  }

  setAuthToken = (token) => {
    this.setState({
      'access-token': token
    })
  }
}

export default App
