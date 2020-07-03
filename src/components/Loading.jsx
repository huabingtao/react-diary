import React from "react";

class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
      len: new Array(5),
    };
  }
  render() {
    return (
      <div className="loading-container">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}

export default Loading;
