import React, { Component } from 'react';

export default class TableCours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cours: props.cours,
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
          </tr>
        </thead>
        <tbody>
          {this.state.cours.map((item, index) =>
            <RowTableCours
              key={ index }
              cours={ item }
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
    }
  }
  render() {
    return(
      <tr>
        <td>{ this.state.cours.intitule }</td>
        <td>{ this.state.cours.filiereLangue.reduce((acc, filiere) => { return acc ? (acc + " " + filiere.codeFiliereLangue) : (filiere.codeFiliereLangue) }, "") }</td>
        <td>{ this.state.cours.intervenants.reduce((acc, inter) => { return acc ? (acc + " " + inter.nomUsuel) : (inter.nomUsuel) }, "") }</td>
      </tr>
    )
  }
}
