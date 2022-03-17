import React, { Component } from 'react';

export default class TableCreneaux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneaux: props.creneaux,
      triggerModifier: props.triggerModifier,
      triggerInformation: props.triggerInformation,
    }
  }
  render() {
    return(
      <table>
        <thead>
          <tr>
            <td>valide</td>
            <td>estEffectue</td>
            <td>intitule</td>
            <td>type</td>
            <td>salle</td>
            <td>date_heure</td>
            <td>dureeEffective</td>
            <td>information</td>
            <td>validation</td>
          </tr>
        </thead>
        <tbody>
          {this.state.creneaux.map((item, index) =>
            <RowTableCreneau
              key={ index }
              creneau={ item }
              triggerInformation={ this.state.triggerInformation }
              triggerModifier={ this.state.triggerModifier }
            />
          )}
        </tbody>
      </table>
    )
  }
}

class RowTableCreneau extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneau: props.creneau,
      triggerModifier: props.triggerModifier,
      triggerInformation: props.triggerInformation,
    }
  }
  handleModifierClicked(event) {
    this.state.triggerModifier(this.state.creneau)
  }
  handleSupprimerClicked(event) {
    this.state.triggerSupprimer(this.state.creneau)
  }
  handleInformationClicked(event) {
    this.state.triggerInformation(this.state.creneau)
  }
  render() {
    return(
      <tr>
        <td>{ this.state.creneau.valide }</td>
        <td>{ this.state.creneau.estEffectue }</td>
        <td>{ this.state.creneau.intitule }</td>
        <td>{ this.state.creneau.type }</td>
        <td>{ this.state.creneau.salle }</td>
        <td>{ this.state.creneau.date_heure }</td>
        <td>{ this.state.creneau.dureeEffective }</td>
        <td><button onClick={ this.handleInformationClicked.bind(this) }>information</button></td>
        <td><button onClick={ this.handleModifierClicked.bind(this) }>validation</button></td>
      </tr>
    )
  }
}
