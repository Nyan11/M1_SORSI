import React, { Component } from 'react';

export default class TableComposantes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composantes: props.composantes,
      responsables: props.responsables,
      triggerModifier: props.triggerModifier,
      triggerSupprimer: props.triggerSupprimer,
    }
  }
  render() {
    return(
      <table>
        <thead>
          <tr>
            <td>nom</td>
            <td>responsable</td>
            <td>supprimer</td>
            <td>modifier</td>
          </tr>
        </thead>
        <tbody>
          {this.state.composantes.map((composante, index) =>
            <RowTableComposante
              key={ index }
              composante={ composante }
              responsable={ this.state.responsables.find(res => res.idResponsable === composante.idResponsable ) }
              triggerModifier={ this.state.triggerModifier }
              triggerSupprimer={ this.state.triggerSupprimer }
            />
          )}
        </tbody>
      </table>
    )
  }
}

class RowTableComposante extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composante: props.composante,
      responsable: props.responsable,
      triggerModifier: props.triggerModifier,
      triggerSupprimer: props.triggerSupprimer,
    }
  }
  handleModifierClicked(event) {
    console.log(event)
    this.state.triggerModifier(this.state.composante)
  }
  handleSupprimerClicked(event) {
    console.log(event)
    this.state.triggerSupprimer(this.state.composante)
  }
  render() {
    return(
      <tr>
        <td>{ this.state.composante.nomComposante }</td>
        <td>{ this.state.responsable.nomUsuel + " " + this.state.responsable.prenom + " <" + this.state.responsable.mail + ">" }</td>
        <td><button onClick={ this.handleSupprimerClicked.bind(this) }>supprimer</button></td>
        <td><button onClick={ this.handleModifierClicked.bind(this) }>modifier</button></td>
      </tr>
    )
  }
}
