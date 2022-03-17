import React, { Component } from 'react';

export default class FormComposante extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composante: {},
      submitValue: "Ajouter",
      trigger: () => {},
      responsables: props.responsables,
      idResponsable: -1,
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
          name="nomComposante"
          id="nomComposante"
          value={this.state.composante.nomComposante || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <div>
        <label for="idResponsable">composante : </label>
        <select id="idResponsable" name="idResponsable" value={this.state.composante.idResponsable} onChange={this.handleInputChanged.bind(this)}>
          {this.state.responsables.map((responsable, index) =>
            <option
              key={ index }
              value={ responsable.idResponsable }
            >{responsable.nomUsuel + " " + responsable.prenom + " <" + responsable.mail + ">"}</option>
          )}
        </select>
      </div>
      <div>
        <input type="submit" value={ this.state.submitValue }/>
      </div>
    </form>
  )}
}
