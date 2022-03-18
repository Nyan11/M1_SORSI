import React, { Component } from 'react';
import Service from '../../services/seance.service'

async function updateView(id) {
  return Service.getSeancesByIdCreneaux(id).then(data => {
    console.log(data.data)
    return data.data
  })
}

export default class TableSeances extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneau: props.creneau,
      seances: null,
    }
  }
  componentDidMount() {
    this._asyncRequest = updateView(this.state.creneau.idCreneau).then(
      liste => {
        console.log("debug")
        console.log(liste)
        this._asyncRequest = null
        this.setState((state) => {
          return {...state, seances: liste}
        })
      }
    )
  }
  render() {
    if (this.state.seances === null) {
      return <div>Loading ...</div>
    } else if (!this.state.seances){
      return <div>Aucune séance de formation pour ce créneau</div>
    } else {
      return(
        <div>
          <table>
            <thead>
              <tr>
                <td>intervenant</td>
                <td>estEffectue</td>
                <td>valide</td>
                <td>commentaire</td>
                <td>dureeEffective</td>
              </tr>
            </thead>
            <tbody>
              {this.state.seances.map((item, index) =>
                <RowTableSeances
                  key={ index }
                  seance={ item }
                />
              )}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

class RowTableSeances extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seance: props.seance,
    }
  }
  render() {
    return(
      <tr>
        <td>{ this.state.seance.nomUsuel + " " + this.state.seance.prenom + " <" + this.state.seance.mail + ">" }</td>
        <td>{ this.state.seance.estEffectue === 1 ? "oui" : "non" }</td>
        <td>{ this.state.seance.valide === 1 ? "valide" : "non valide"}</td>
        <td>{ this.state.seance.commentaire }</td>
        <td>{ this.state.seance.dureeEffective }</td>
      </tr>
    )
  }
}
