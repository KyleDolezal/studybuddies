import React from "react"
import PropTypes from "prop-types"
import NewUser from "./NewUser"
import Header from "./Header"

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
      return(<p>Welcome</p>)
    } else {
      return(<NewUser createUserPath={this.props.createUserPath} rootPath={this.props.rootPath}/>)
    }
  }
}

export default App
