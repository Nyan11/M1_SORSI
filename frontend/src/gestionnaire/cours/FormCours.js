import React, { Component } from 'react';

export default class FormCours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cours: {},
      submitValue: "Ajouter",
      trigger: () => {}
    }
    if (props.cours) {
      this.state.cours = props.cours
    }
    if (props.submitValue) {
      this.state.submitValue = props.submitValue
    }
    if (props.trigger) {
      this.state.trigger = props.trigger
    }
  }

  handleInputChanged(event) {
    const oldItem = this.state.cours
    const newItem = { ...oldItem, [event.target.id]: event.target.value }
    this.setState({
      ...this.state,
      cours: newItem
    });
  }

  handleSubmitClicked(event) {
    var item = this.state.cours
    event.preventDefault()
    this.state.trigger(item)
  }

  render() {
    return (
    <form onSubmit={this.handleSubmitClicked.bind(this)}>
      <div>
        <label for="intitule">intitule : </label>
        <input
          type="text"
          name="intitule"
          id="intitule"
          value={this.state.cours.intitule || ""}
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
