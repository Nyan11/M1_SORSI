import React, { Component } from 'react';

export default class TableCreneaux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneaux: props.creneaux,
      triggerModifier: props.triggerModifier,
    }
  }
  render() {
    return(
      <table>
        <thead>
          <tr>
            <td>validation</td>
            <td>date</td>
            <td>intitule</td>
            <td>type</td>
            <td>salle</td>
            <td>heureDebut</td>
            <td>heureFin</td>
            <td>modifier</td>
          </tr>
        </thead>
        <tbody>
          {this.state.creneaux.map((item, index) =>
            <RowTableCreneau
              key={ index }
              creneau={ item }
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
    }
  }
  handleModifierClicked(event) {
    this.state.triggerModifier(this.state.creneau)
  }
  render() {
    return(
      <tr>
        <td>{ this.state.creneau.validation }</td>
        <td>{ this.state.creneau.date }</td>
        <td>{ this.state.creneau.intitule }</td>
        <td>{ this.state.creneau.type }</td>
        <td>{ this.state.creneau.salle }</td>
        <td>{ this.state.creneau.heureDebut }</td>
        <td>{ this.state.creneau.heureFin }</td>
        <td><button onClick={ this.handleModifierClicked.bind(this) }>modifier</button></td>
      </tr>
    )
  }
}
