import React, { Component } from 'react';

export default class TableComposantes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composantes: props.composantes,
      responsables: props.responsables,
    }
  }
  render() {
    return(
      <table>
        <thead>
          <tr>
            <td>nom</td>
            <td>responsable</td>
          </tr>
        </thead>
        <tbody>
          {this.state.composantes.map((composante, index) =>
            <RowTableComposante
              key={ index }
              composante={ composante }
              responsable={ this.state.responsables.find(res => res.idResponsable === composante.idResponsable ) }
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
    }
  }
  render() {
    return(
      <tr>
        <td>{ this.state.composante.nomComposante }</td>
        <td>{ this.state.responsable.nomUsuel + " " + this.state.responsable.prenom + " <" + this.state.responsable.mail + ">" }</td>
      </tr>
    )
  }
}
