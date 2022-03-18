import React, { Component } from 'react'
import TableCreneaux from './TableCreneaux'
import Service from '../../services/seance.service'
import TableSeances from './TableSeances'
import Gest from '../../services/gestionnaire.service'

async function getCours() {
  return Gest.getCours().then(data => {
    return data.data.reduce((acc, cours) => {
      if (acc.find(item => item.idCours === cours.idCours)) {
        return acc
      } else {
        acc.push({idCours: cours.idCours, intitule: cours.intitule})
        return acc
      }
    }, [])
  })
}
async function updateView() {
  return Service.getCreneaux().then(data => data.data)
}

export default class Cours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneaux: null,
      cours: null,
      showInformation: false,
      selected: {},
    }
  }
  componentDidMount() {
    this._asyncRequest = updateView().then(
      liste => {
        this._asyncRequest = null
        this.setState((state) => {
          return {...state, creneaux: liste}
        })
      }
    )
    this._asyncRequestCours = getCours().then(
      cours => {
        this._asyncRequestCours = null
        this.setState((state) => {
          return {...state, cours: cours}
        })
      }
    )
  }
  triggerShowInformation(creneau) {
    this.setState((state) => {
      return {...this.state, showInformation: true, selected: creneau}
    })
  }
  triggerHideInformation() {
    this.setState((state) => {
      return {...this.state, showInformation: false}
    })
  }
  render() {
    if (this.state.creneaux === null || this.state.cours === null) {
      return (<div>
        <h3>Liste des creneaux</h3>
        Loading ...
      </div>)
    } else {
      return (<div>
        <h3>Liste des creneaux</h3>
        <TableCreneaux
          creneaux={ this.state.creneaux }
          triggerInformation={ this.triggerShowInformation.bind(this) }
        />
        {this.state.showInformation &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Liste des séances</h3>
              <TableSeances
                creneau={ this.state.selected }
              />
              <button class="button-cancel" onClick={ this.triggerHideInformation.bind(this) }>Fermer</button>
            </div>
          </div>
        }
      </div>)
    }
  }
}
