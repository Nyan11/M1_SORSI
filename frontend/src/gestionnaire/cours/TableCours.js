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
  handleModifierClicked(event) {
    this.state.triggerModifier()
  }
  handleSupprimerClicked(event) {
    this.state.triggerSupprimer()
  }
  render() {
    return(
      <table>
        <thead>
          <tr>
            <td>intitule</td>
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
        <td><button onClick={ this.handleSupprimerClicked.bind(this) }>supprimer</button></td>
        <td><button onClick={ this.handleModifierClicked.bind(this) }>modifier</button></td>
      </tr>
    )
  }
}

