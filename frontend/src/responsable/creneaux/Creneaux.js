import React, { Component } from 'react'
import TableCreneaux from './TableCreneaux'
import Service from '../../services/seance.service'


async function updateView() {
  return Service.getSeances().then(data => data.data)
}

export default class Cours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneaux: null,
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
    if (this.state.creneaux === null) {
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
              <h3>Infomation sur { this.state.selected.intitule }</h3>
              <div>
                <span>realiser par : {this.state.selected.nomUsuel}</span>
              </div>
              <div>
                <span>commentaires</span>
                <p>
                  {this.state.selected.commentaire}
                </p>
              </div>
              <button class="button-cancel" onClick={ this.triggerHideInformation.bind(this) }>Fermer</button>
            </div>
          </div>
        }
      </div>)
    }
  }
}
