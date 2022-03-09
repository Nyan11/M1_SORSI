import React, { Component } from 'react';

function connect(credential) {
  console.log(credential)
}

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: {},
    }
  }

  handleInputChanged(event) {
    const oldLogin = this.state.login
    const newLogin = { ...oldLogin, [event.target.id]: event.target.value }
    this.setState({
      ...this.state,
      login: newLogin
    });
  }

  handleSubmitClicked(event) {
    event.preventDefault()
    connect(this.state.login)
  }

  render() {
    return (
    <form onSubmit={this.handleSubmitClicked.bind(this)} method="get">
      <div>
        <label for="login">login : </label>
        <input
          type="text"
          name="login"
          id="login"
          value={this.state.login.login || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <label for="password">mot de passe : </label>
        <input
          type="password"
          name="password"
          id="password"
          value={this.state.login.password || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <input type="submit" value="Se connecter"/>
      </div>
    </form>
  )}
}

