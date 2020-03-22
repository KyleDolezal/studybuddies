import React from "react"
import PropTypes from "prop-types"
import validateUserInfo from "../modules/validateUserInfo"
import UserInput from "./userInput"
import csrf from "../modules/csrf"
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  updateUserInfo = (event, attribute) => {
    this.setState({
      [attribute]: event.target.value
    })
  }

  submitUserInfo = () => {
    const data = {
      ...this.state
    };

    fetch(this.props.loginPath, {
      method: "POST",
      body: JSON.stringify({
          ...this.state,
          confirm_success_url: this.props.rootPath
      }),
      headers: {
       'Content-Type': 'application/json',
       'X-CSRF-Token': csrf
      }
    })
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            finishedRequest: true
          })
          if (result.errors) {
            this.setState({flashMessage: result.errors.join(". ")});
            setTimeout(()=>{this.setState({finishedRequest: false})}, 3000);
          } else {
            this.props.setUserInfo(result['data']['id'], result['data']['email'])
            this.setState({flashMessage: 'Log in success'})
            setTimeout(history.push('/'), 1000);
          }
      })
  }

  render () {
    const flashClass = this.state.finishedRequest ? '' : "hidden";
    const loginClass = this.state.finishedRequest ? "hidden" : "";

    return (
      <React.Fragment>
        <div id="flash" className={flashClass}><h3>{this.state.flashMessage}</h3></div>
        <div id="signUp" className={loginClass + " userForm"}>
          <h1>Login</h1>
          <UserInput headerText="Email"
            inputType="text"
            eventFunction={this.updateUserInfo}
            eventName="email"/>
          <UserInput headerText="Password"
            inputType="password"
            eventFunction={this.updateUserInfo}
            eventName="password"/>
          <div><button onClick={() => this.submitUserInfo()}>Log in</button></div>
          {this.props.link}
        </div>
      </React.Fragment>
    );
  }
}

export default Login
