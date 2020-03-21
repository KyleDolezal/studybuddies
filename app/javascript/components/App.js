import React from "react"
import PropTypes from "prop-types"
import NewUser from "./NewUser"
import Header from "./Header"
import Login from "./Login"

class App extends React.Component {
  constructor(props){
    super(props)
  }
  render () {
    return(
      <div>
        <Header user={this.props.user}/>
        {this.getBody()}
      </div>
    )
  }

  getBody(){
    if(this.props.user){
      return(<Login loginPath={this.props.loginPath} rootPath={this.props.rootPath}/>)
    } else {
      return(<NewUser createUserPath={this.props.createUserPath} rootPath={this.props.rootPath}/>)
    }
  }
}

export default App
