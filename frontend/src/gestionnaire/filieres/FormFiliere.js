import React, { Component } from 'react';

export default class FormFiliere extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filiere: {},
      submitValue: "Ajouter",
      trigger: () => {}
    }
    if (props.filiere) {
      this.state.filiere = props.filiere
    }
    if (props.submitValue) {
      this.state.submitValue = props.submitValue
    }
    if (props.trigger) {
      this.state.trigger = props.trigger
    }
  }

  handleInputChanged(event) {
    const oldItem = this.state.filiere
    const newItem = { ...oldItem, [event.target.id]: event.target.value }
    this.setState({
      ...this.state,
      filiere: newItem
    });
  }

  handleSubmitClicked(event) {
    var item = this.state.filiere
    event.preventDefault()
    this.state.trigger(item)
  }

  render() {
    return (
    <form onSubmit={this.handleSubmitClicked.bind(this)}>
      <div>
        <label for="codeFiliereLangue">code : </label>
        <input
          type="text"
          name="codeFiliereLangue"
          id="codeFiliereLangue"
          value={this.state.filiere.codeFiliereLangue || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <label for="nomFiliereLangue">nom : </label>
        <input
          type="text"
          name="nomFiliereLangue"
          id="nomFiliereLangue"
          value={this.state.filiere.nomFiliereLangue || ""}
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
