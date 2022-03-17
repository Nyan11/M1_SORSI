import React, { Component } from 'react';

export default class TableCreneaux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneaux: props.creneaux,
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
            <td>intervenant</td>
            <td>intitule</td>
            <td>type</td>
            <td>salle</td>
            <td>date_heure</td>
            <td>dureeEffective</td>
            <td>information</td>
          </tr>
        </thead>
        <tbody>
          {this.state.creneaux.map((item, index) =>
            <RowTableCreneau
              key={ index }
              creneau={ item }
              triggerInformation={ this.state.triggerInformation }
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
      triggerInformation: props.triggerInformation,
    }
  }
  handleInformationClicked(event) {
    this.state.triggerInformation(this.state.creneau)
  }
  render() {
    return(
      <tr>
        <td>{ this.state.creneau.valide }</td>
        <td>{ this.state.creneau.estEffectue }</td>
        <td>{ this.state.creneau.nomUsuel }</td>
        <td>{ this.state.creneau.intitule }</td>
        <td>{ this.state.creneau.type }</td>
        <td>{ this.state.creneau.salle }</td>
        <td>{ this.state.creneau.date_heure }</td>
        <td>{ this.state.creneau.dureeEffective }</td>
        <td><button onClick={ this.handleInformationClicked.bind(this) }>information</button></td>
      </tr>
    )
  }
}
