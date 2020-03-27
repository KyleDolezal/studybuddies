import React from "react"
import PropTypes from "prop-types"
import validateUserInfo from "../modules/validateUserInfo"
import UserInput from "./userInput"
import { createBrowserHistory } from 'history';
import fetch_with_auth_headers from '../modules/fetch_wrapper'

const history = createBrowserHistory();
let _isMounted = ''

class NewUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    };
  }

  updateUserInfo = (event, attribute) => {
    this._safeSetStateWrapper({
      [attribute]: event.target.value
    })
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

  submitUserInfo = () => {
    if(!validateUserInfo(this.state.password,
                          this.state.password_confirmation,
                          this.state.email)) {
                                              return;
                                             }

    const data = {
      ...this.state
    };

    fetch_with_auth_headers(this.props.createUserPath, {
      method: "POST",
      body: JSON.stringify({
          ...this.state,
          confirm_success_url: "this.props.rootPath"
        })
      }, '', this.props.setAuthToken)
      .then((response) => response.json())
      .then(
        (result) => {
          this._safeSetStateWrapper({
            finishedRequest: true
          })
          if (result.status == 'success') {
            this._safeSetStateWrapper({flashMessage: 'Registration success'})
            this.props.setUserInfo(result['data']['id'], result['data']['email'])
            setTimeout(history.push('/'), 1000);
          } else {
            this._safeSetStateWrapper({flashMessage: result.errors.full_messages.join(". ")});
            setTimeout(()=>{this._safeSetStateWrapper({finishedRequest: false})}, 3000);
          }
      })
  }

  render () {
    const flashClass = this.state.finishedRequest ? '' : "hidden";
    const signUpClass = this.state.finishedRequest ? "hidden" : "";

    return (
      <React.Fragment>
        <div id="flash" className={flashClass}><h3>{this.state.flashMessage}</h3></div>
        <div id="signUp" className={signUpClass + " userForm"}>
          <h1>New user</h1>
          <UserInput headerText="Email"
            inputType="text"
            eventFunction={this.updateUserInfo}
            eventName="email"/>
          <UserInput headerText="Password"
            inputType="password"
            eventFunction={this.updateUserInfo}
            eventName="password"/>
          <UserInput headerText="Confirm password"
            inputType="password"
            eventFunction={this.updateUserInfo}
            eventName="password_confirmation"/>
          <div><button onClick={() => this.submitUserInfo()}>Sign me up</button></div>
          {this.props.link}
        </div>
      </React.Fragment>
    );
  }
}

export default NewUser
