import React, { Component } from 'react';

export default class TableCours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cours: props.cours,
      triggerModifier: props.triggerModifier,
      triggerSupprimer: props.triggerSupprimer,
    }
  }
  render() {
    return(
      <table>
        <thead>
          <tr>
            <td>intitule</td>
            <td>filieres</td>
            <td>intervenants</td>
            <td>supprimer</td>
            <td>modifier</td>
          </tr>
        </thead>
        <tbody>
          {this.state.cours.map((item, index) =>
            <RowTableCours
              key={ index }
              cours={ item }
              triggerModifier={ this.state.triggerModifier }
              triggerSupprimer={ this.state.triggerSupprimer }
            />
          )}
        </tbody>
      </table>
    )
  }
}

class RowTableCours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cours: props.cours,
      triggerModifier: props.triggerModifier,
      triggerSupprimer: props.triggerSupprimer,
    }
  }
  handleModifierClicked(event) {
    this.state.triggerModifier(this.state.cours)
  }
  handleSupprimerClicked(event) {
    this.state.triggerSupprimer(this.state.cours)
  }
  render() {
    return(
      <tr>
        <td>{ this.state.cours.intitule }</td>
        <td>{ this.state.cours.filiereLangue.reduce((acc, filiere) => { return acc ? (acc + " " + filiere.codeFiliereLangue) : (filiere.codeFiliereLangue) }, "") }</td>
        <td>{ this.state.cours.intervenants.reduce((acc, inter) => { return acc ? (acc + " " + inter.nomUsuel) : (inter.nomUsuel) }, "") }</td>
        <td><button onClick={ this.handleSupprimerClicked.bind(this) }>supprimer</button></td>
        <td><button onClick={ this.handleModifierClicked.bind(this) }>modifier</button></td>
      </tr>
    )
  }
}
