import React, { Component } from "react";

export default class Form extends Component {
  render() {
    return (
      <form onSubmit={this.props.getWeather}>
        <input
          onChange={(e) => this.props.cityChange(e)}
          type="text"
          name="city"
          placeholder="City..."
        ></input>
        <input type="text" name="country" placeholder="Country..."></input>
        <button>Get Weather</button>
      </form>
    );
  }
}
