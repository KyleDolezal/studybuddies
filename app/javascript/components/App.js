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
import { withRouter } from 'react-router-dom';
const history = createBrowserHistory();

class App extends React.Component {
  constructor(props){
    super(props)

    this.state={
      user: props.user || {email: '', id: ' '}
    }
  }
  render () {
    return(
      <div>
        <Header useremail={this.state.user['email']}/>
        <Router>
          <Switch>
            <Route path="/login">
              <Login {...this.props}
                      link=<Link to={`/newuser`}>Create a user</Link>
                      setUserInfo={this.setUserInfo} />
            </Route>
            <Route path="/newuser">
              <NewUser {...this.props}
                      link=<Link to={`/login`}>Sign in</Link>
                      setUserInfo={this.setUserInfo} />
            </Route>
            <Route path="*">
              {this.getBodyForAuthedUser()}
            </Route>
          </Switch>
        </Router>
        {this.getBodyForAuthedUser()}
      </div>
    )
  }

  getBodyForAuthedUser(){
    if(this.state.user['email'].length > 0){
      return(<h1>{this.state.user['email']}</h1>)
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
}

// {"data":{"id":3,"email":"asdfasdf@asdf.com","provider":"email","uid":"asdfasdf@asdf.com","allow_password_change":false}}

export default App
