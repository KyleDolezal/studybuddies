import React from "react"
import PropTypes from "prop-types"
import validateUserInfo from "../modules/validateUserInfo"
import UserInput from "./userInput"
import csrf from "../modules/csrf"

class NewUser extends React.Component {
  constructor(props){
    super();
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    };
  }

  updateUserInfo = (event, attribute) => {
    this.setState({
      [attribute]: event.target.value
    })
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

    fetch(this.props.createUserPath, {
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
          if (result.status == 'success') {
            this.setState({flashMessage: 'Registration success'})

            setTimeout(this.props.history.push(this.props.rootPath), 1000);
          } else {
            this.setState({flashMessage: result.errors.full_messages.join(". ")});
            setTimeout(()=>{this.setState({finishedRequest: false})}, 3000);
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
        </div>
      </React.Fragment>
    );
  }
}

export default NewUser
