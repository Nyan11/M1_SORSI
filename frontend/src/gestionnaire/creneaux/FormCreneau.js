import React, { Component } from 'react';

export default class FormCreneau extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneau: {},
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
          value={this.state.creneau.intitule || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <label for="date_heure">date : </label>
        <input
          type="text"
          name="date_heure"
          id="date_heure"
          value={this.state.creneau.date_heure || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <label for="dureeEffective">duree effective : </label>
        <input
          type="text"
          name="dureeEffective"
          id="dureeEffective"
          value={this.state.creneau.dureeEffective || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <label for="type">type : </label>
        <select id="type" name="type" value={this.state.creneau.type} onChange={this.handleInputChanged.bind(this)}>
          <option value="CM">CM</option>
          <option value="TD">TD</option>
          <option value="TP">TP</option>
        </select>
      </div>
      <div>
        <label for="salle">salle : </label>
        <input
          type="text"
          name="salle"
          id="salle"
          value={this.state.creneau.salle || ""}
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
