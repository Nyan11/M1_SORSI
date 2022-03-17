import React, { Component } from 'react';


export default class TableFilieres extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filieres: props.filieres,
      composantes: props.composantes,
    }
  }
  render() {
    return(
      <table>
        <thead>
          <tr>
            <td>code</td>
            <td>nom</td>
            <td>composante</td>
          </tr>
        </thead>
        <tbody>
          {this.state.filieres.map((item, index) =>
            <RowTableFiliere
              key={ index }
              filiere={ item }
              composantes={ this.state.composantes }
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
      composante: props.composantes.find(comp => {return props.filiere.idComposante === comp.idComposante}),
    }
  }
  render() {
    return(
      <tr>
        <td>{ this.state.filiere.codeFiliereLangue }</td>
        <td>{ this.state.filiere.nomFiliereLangue }</td>
        <td>{ this.state.composante ? this.state.composante.nomComposante : '-' }</td>
      </tr>
    )
  }
}
