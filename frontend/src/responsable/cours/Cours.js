import React, { Component } from 'react'
import TableCours from './TableCours'
import Service from '../../services/gestionnaire.service'
import Admin from '../../services/administration.service'


async function updateView() {
  return Service.getCours().then(res => {
    var data = res.data
    return data.reduce((previousValue, currentValue) => {
      var value = previousValue.find((item) => {return item.idCours === currentValue.idCours})
      var filiere = {idFiliereLangue: currentValue.idFiliereLangue, codeFiliereLangue: currentValue.codeFiliereLangue }
      var intervenant = {idIntervenant: currentValue.idIntervenant, nomUsuel: currentValue.nomUsuel, prenom: currentValue.prenom }
      if (value) {
        if (!value.filiereLangue.find(item => item.idFiliereLangue === filiere.idFiliereLangue)) {
          value.filiereLangue.push(filiere)
        }
        if (!value.intervenants.find(item => item.idIntervenant === intervenant.idIntervenant)) {
          value.intervenants.push(intervenant)
        }
      } else {
        previousValue.push({idCours: currentValue.idCours, intitule: currentValue.intitule, filiereLangue:[filiere], intervenants: [intervenant]})
      }
      return previousValue
    }, [])
  })
}

export default class Cours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cours: null,
      ready: false,
    }
  }
  componentDidMount() {
    this._asyncRequestCours = updateView().then(
      liste => {
        this._asyncRequestCours = null
        this.setState((state) => {
          return {...state, cours: liste, ready: true}
        })
      }
    )
  }
  render() {
    if (!this.state.ready) {
      return (<div>
        <h3>Liste des cours</h3>
        Loading ...
      </div>)
    } else {
      return (<div>
        <h3>Liste des cours</h3>
        <TableCours
          cours={ this.state.cours }
        />
      </div>)
    }
  }
}
