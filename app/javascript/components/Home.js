import React from "react"
import PropTypes from "prop-types"
import UserInput from "./userInput"
import fetch_with_auth_headers from '../modules/fetch_wrapper'
import styles from "../../assets/stylesheets/Home.module.css"
import SimpleList from './SimpleList'
import parseUserInterests from '../modules/parse_user_interests'

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

  componentDidMount(){
    const query="user_id=" + this.props.user_id
    fetch_with_auth_headers(this.props.interestsPath + "/" + query, {
      method: "GET" }, this.props.auth_token, this.props.setAuthToken)
      .then((response) => {
        return(response.json())
      })
      .then((result) => {
        this.setState({
          interests: parseUserInterests(result['included'], 'interests', 'title')
        })
      })
  }

  submitNewInterest = () => {
    fetch_with_auth_headers(this.props.interestsPath, {
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
          const newInterest = {title: result['included'][1]['attributes']['title'],
                                id: result['included'][1]['id']};
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
