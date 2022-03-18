import React, { Component } from 'react';

export default class FormCreneau extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneau: {},
      creneaux: props.creneaux,
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
    var item = this.state.creneau
    event.preventDefault()
    this.state.trigger(item)
  }

  render() {
    return (
    <form onSubmit={this.handleSubmitClicked.bind(this)}>
    {this.state.submitValue !== "Ajouter" &&
    <div>
      <label for="estEffectue">est effectué : </label>
      <select id="estEffectue" name="estEffectue" value="0" onChange={this.handleInputChanged.bind(this)}>
        <option value="0">non</option>
        <option value="1">oui</option>
      </select>
    </div>}
    <div>
      <label for="durreEffective">durreEffective : </label>
      <input
        type="time"
        name="durreEffective"
        id="durreEffective"
        value={this.state.creneau.durreEffective || ""}
        onChange={this.handleInputChanged.bind(this)}
      />
    </div>
    <div>
      <label for="idCreneau">creneaux : </label>
      <select id="idCreneau" name="idCreneau" value={this.state.creneau.idCreneau} onChange={this.handleInputChanged.bind(this)}>
        {this.state.creneaux.map((item, index) =>
          <option
            key={ index }
            value={ item.idCreneau }
          >{item.date_heure + " " + item.type + " " + item.salle}</option>
        )}
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
