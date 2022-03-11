import React, { Component } from 'react';

export default class FormCreneau extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneau: {},
      validation: 0,
      submitValue: "Ajouter",
      trigger: () => {}
    }
    if (props.creneau) {
      this.state.creneau = props.creneau
    }
    if (props.submitValue) {
      this.state.submitValue = props.submitValue
    }
    if (props.trigger) {
      this.state.trigger = props.trigger
    }
  }

  handleInputChanged(event) {
    const oldItem = this.state.creneau
    const newItem = { ...oldItem, [event.target.id]: event.target.value }
    this.setState({
      ...this.state,
      creneau: newItem
    });
  }

  handleSubmitClicked(event) {
    var item = this.state.validation
    event.preventDefault()
    this.state.trigger(item)
  }

  render() {
    return (
    <form onSubmit={this.handleSubmitClicked.bind(this)}>
      <div>
        <label for="validation">code : </label>
        <select id="validation" name="validation" value={this.state.creneau.validation} onChange={this.handleInputChanged.bind(this)}>
          <option value="0">A valider</option>
          <option value="1">Fait</option>
          <option value="2">Annule</option>
        </select>
      </div>
      <div>
        <label for="commentaire">commentaire : </label>
        <textarea
          id="commentaire"
          name="commentaire"
          value={this.state.creneau.commentaire}
          onChange={this.handleInputChanged.bind(this)}
          placeholder="Write something..."
        ></textarea>
      </div>
      <div>
        <input type="submit" value={ this.state.submitValue }/>
      </div>
    </form>
  )}
}
