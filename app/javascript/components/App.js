import React from "react"
import PropTypes from "prop-types"
import NewUser from "./NewUser"

class App extends React.Component {
  constructor(props){
    super(props)
  }
  render () {
    if(this.props.user){
      return(<p>Welcome</p>)
    } else {
      return(<NewUser createUserPath={this.props.createUserPath} rootPath={this.props.rootPath}/>)
    }
  }
}

export default App
