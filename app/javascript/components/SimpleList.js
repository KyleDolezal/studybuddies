import React from 'react';

const SimpleList = (props) => {
  return(
    <div>
      <h3>{props.header}</h3>
      {props.interests ?
        <ul>
          {props.interests.map((interest) => {
            return(
              <li key={interest['id']}
                    className="interestItem">{interest['title']}</li>
            )
          })}
        </ul>
      : '' }
    </div>
  );
}

export default SimpleList;
