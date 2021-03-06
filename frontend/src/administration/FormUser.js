import React, { Component } from 'react';

export default class FormUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      submitValue: "Ajouter",
      trigger: () => {}
    }
    if (props.user) {
      this.state.user = props.user
    }
    if (props.submitValue) {
      this.state.submitValue = props.submitValue
    }
    if (props.trigger) {
      this.state.trigger = props.trigger
    }
  }

  handleInputChanged(event) {
    const oldUser = this.state.user
    const newUser = { ...oldUser, [event.target.id]: event.target.value }
    this.setState({
      ...this.state,
      user: newUser
    });
  }

  handleSubmitClicked(event) {
    var user = {
      login: this.state.user.login,
      nom: this.state.user.nomUsuel,
      prenom: this.state.user.prenom,
      mail: this.state.user.mail,
      mot_de_passe: this.state.user.motDePasse,
    }
    event.preventDefault()
    this.state.trigger(user)
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
          value={this.state.user.login || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <label for="nom">nom : </label>
        <input
          type="text"
          name="nomUsuel"
          id="nomUsuel"
          value={this.state.user.nomUsuel || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <label for="prenom">prénom : </label>
        <input
          type="text"
          name="prenom"
          id="prenom"
          value={this.state.user.prenom || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <label for="mail">mail : </label>
        <input
          type="email"
          name="mail"
          id="mail"
          value={this.state.user.mail || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <label for="password">mot de passe : </label>
        <input
          type="password"
          name="motDePasse"
          id="motDePasse"
          value={this.state.user.motDePasse || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <input type="submit" value={ this.state.submitValue }/>
      </div>
    </form>
  )}
}
