import React, { Component } from 'react';

export default class TableFilieres extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filieres: props.filieres,
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
            <td>code</td>
            <td>nom</td>
            <td>supprimer</td>
            <td>modifier</td>
          </tr>
        </thead>
        <tbody>
          {this.state.filieres.map((item, index) =>
            <RowTableFiliere
              key={ index }
              filiere={ item }
              triggerModifier={ this.state.triggerModifier }
              triggerSupprimer={ this.state.triggerSupprimer }
            />
          )}
        </tbody>
      </table>
    )
  }
}

class RowTableFiliere extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filiere: props.filiere,
      triggerModifier: props.triggerModifier,
      triggerSupprimer: props.triggerSupprimer,
    }
  }
  handleModifierClicked(event) {
    this.state.triggerModifier(this.state.filiere)
  }
  handleSupprimerClicked(event) {
    this.state.triggerSupprimer(this.state.filiere)
  }
  render() {
    return(
      <tr>
        <td>{ this.state.filiere.code }</td>
        <td>{ this.state.filiere.nom }</td>
        <td><button onClick={ this.handleSupprimerClicked.bind(this) }>supprimer</button></td>
        <td><button onClick={ this.handleModifierClicked.bind(this) }>modifier</button></td>
      </tr>
    )
  }
}

