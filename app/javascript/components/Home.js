import React from "react"
import PropTypes from "prop-types"
import UserInput from "./userInput"
import fetch_with_auth_headers from '../modules/fetch_wrapper'
import styles from "../../assets/stylesheets/Home.module.css"
import SimpleList from './SimpleList'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      flashMessage:'',
      interests:[]
    }
  }

  updateInterest = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  submitNewInterest = () => {
    fetch_with_auth_headers(this.props.newInterestPath, {
        method: "POST",
        body: JSON.stringify({user_interest: {...this.state}})
      }, this.props.auth_token, this.props.setAuthToken)
      .then((response) => response.json())
      .then((result) => {
        this.setState({title: ''})
        if (result.errors) {
          this.showFlash(result.errors.join(', '))
        } else {
          this.showFlash("Interest added")
          const newInterest = result['included'][1];
          let newInterests = this.state.interests.
            concat({...newInterest});
          this.setState({ interests: newInterests })
        }
      })
  }

  showFlash = (message) => {
    this.setState({flashMessage: message, showFlash: true});
    setTimeout(()=>{this.setState({showFlash: false})}, 3000);
  }

  render () {
    const flashClass = this.state.showFlash ? '' : "hidden";

    return (
      <React.Fragment>
        <div id="flash" className={flashClass}><h3>{this.state.flashMessage}</h3></div>
        <UserInput headerText="Add an interest"
          inputType="text"
          eventFunction={this.updateInterest}
          val={this.state.title}/>
        <div><button onClick={() => this.submitNewInterest()}>Submit interest</button></div>
        <SimpleList header="Interests" interests={this.state.interests} />
      </React.Fragment>
    );
  }
}

export default Home
