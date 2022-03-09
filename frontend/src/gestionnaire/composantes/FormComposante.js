import React, { Component } from 'react';

export default class FormComposante extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composante: {},
      submitValue: "Ajouter",
      trigger: () => {}
    }
    if (props.composante) {
      this.state.composante = props.composante
    }
    if (props.submitValue) {
      this.state.submitValue = props.submitValue
    }
    if (props.trigger) {
      this.state.trigger = props.trigger
    }
  }

  handleInputChanged(event) {
    const oldItem = this.state.composante
    const newItem = { ...oldItem, [event.target.id]: event.target.value }
    this.setState({
      ...this.state,
      composante: newItem
    });
  }

  handleSubmitClicked(event) {
    var item = this.state.composante
    event.preventDefault()
    this.state.trigger(item)
  }

  render() {
    return (
    <form onSubmit={this.handleSubmitClicked.bind(this)}>
      <div>
        <label for="nom">nom : </label>
        <input
          type="text"
          name="nom"
          id="nom"
          value={this.state.composante.nom || ""}
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
