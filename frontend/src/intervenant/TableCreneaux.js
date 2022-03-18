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
            <td>modification</td>
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
        <td>{ this.state.creneau.valide === 1 ? "oui" : "non" }</td>
        <td>{ this.state.creneau.estEffectue === 1 ? "oui" : "non" }</td>
        <td>{ this.state.creneau.nomCours }</td>
        <td>{ this.state.creneau.typeCours }</td>
        <td>{ this.state.creneau.salle }</td>
        <td>{ this.state.creneau.date_heure }</td>
        <td>{ this.state.creneau.dureeEffective }</td>
        <td>{ this.state.creneau.commentaire ? (<button onClick={ this.handleInformationClicked.bind(this) }>commentaires</button>) : "" }</td>
        <td><button onClick={ this.handleModifierClicked.bind(this) }>modifier</button></td>
      </tr>
    )
  }
}
