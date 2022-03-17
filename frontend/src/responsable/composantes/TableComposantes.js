import React, { Component } from 'react';

export default class TableComposantes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composantes: props.composantes,
    }
  }
  render() {
    return(
      <table>
        <thead>
          <tr>
            <td>nom</td>
          </tr>
        </thead>
        <tbody>
          {this.state.composantes.map((composante, index) =>
            <RowTableComposante
              key={ index }
              composante={ composante }
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
    }
  }
  render() {
    return(
      <tr>
        <td>{ this.state.composante.nomComposante }</td>
      </tr>
    )
  }
}
