import React from "react"
import PropTypes from "prop-types"
import validateUserInfo from "../modules/validateUserInfo"
import UserInput from "./userInput"
import { createBrowserHistory } from 'history';
import fetch_with_auth_headers from '../modules/fetch_wrapper'

const history = createBrowserHistory();
let _isMounted = ''

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    _isMounted = true;
  }

  componentWillUnmount() {
    _isMounted = false;
  }

  _safeSetStateWrapper(newState){
    if(_isMounted){
      this.setState({
        ...newState
      })
    }
  }

  updateUserInfo = (event, attribute) => {
    this._safeSetStateWrapper({
      [attribute]: event.target.value
    })
  }

  submitUserInfo = () => {
    const data = {
      ...this.state
    };

    fetch_with_auth_headers(this.props.loginPath, {
      method: "POST",
      body: JSON.stringify({
        ...this.state,
        confirm_success_url: this.props.rootPath})
      }, '', this.props.setAuthToken)
      .then((response) => response.json())
      .then(
        (result) => {
          this._safeSetStateWrapper({
            finishedRequest: true
          })
          if (result.errors) {
            this._safeSetStateWrapper({flashMessage: result.errors.join(". ")});
            setTimeout(()=>{this.setState({finishedRequest: false})}, 3000);
          } else {
            this.props.setUserInfo(result['data']['id'], result['data']['email'])
            this._safeSetStateWrapper({flashMessage: 'Log in success'})
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
