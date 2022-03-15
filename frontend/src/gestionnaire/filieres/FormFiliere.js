import React, { Component } from 'react';
import Service from '../../services/gestionnaire.service'


export default class FormFiliere extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filiere: {},
      submitValue: "Ajouter",
      composantes: props.composantes,
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
        <label for="idComposante">code : </label>
        <select id="idComposante" name="idComposante" value={this.state.filiere.idComposante} onChange={this.handleInputChanged.bind(this)}>
          {this.state.composantes.map((composante, index) =>
            <option
              key={ index }
              value={ composante.idComposante }
            >{composante.nomComposante}</option>
          )}
        </select>
      </div>
      <div>
        <input type="submit" value={ this.state.submitValue }/>
      </div>
    </form>
  )}
}
