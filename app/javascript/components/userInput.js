import React from 'react';

const userInput = (props) => {
  return(
    <div>
      <h3>{props.headerText}</h3>
      <input type={props.inputType}
             onChange={(event) => props.eventFunction(event, props.eventName)}
             defaultValue={""}/>
    </div>
  );
}

export default userInput;
