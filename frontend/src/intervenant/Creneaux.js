import React, { Component } from 'react'
import TableCreneaux from './TableCreneaux'
import FormCreneau from './FormCreneau'
import Service from '../services/seance.service'


async function getCreneaux() {
  return Service.getCreneaux().then(data => data.data)
}

async function modifier(itemNew, itemOld) {
  Service.updateSeance(itemNew).then(data => data.data)
}
async function ajouter(item) {
  Service.createSeance(item).then(data => data.data)
}
async function updateView() {
  return Service.getSeancesIntervenants().then(data => data.data)
}

export default class Cours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seances: null,
      creneaux: null,
      showAjouter: false,
      showModifier: false,
      showInformation: false,
      actionAjouter: ajouter,
      actionModifier: modifier,
      selected: {},
    }
  }
  componentDidMount() {
    this._asyncRequest = updateView().then(
      liste => {
        this._asyncRequest = null
        this.setState((state) => {
          return {...state, seances: liste}
        })
      }
    )
    this._asyncRequestCreneaux = getCreneaux().then(
      liste => {
        this._asyncRequestCreneaux = null
        this.setState((state) => {
          return {...state, creneaux: liste}
        })
      }
    )
  }
  triggerAjouter(seance) {
    this.state.actionAjouter(seance)
    //window.location.reload(false)
  }
  triggerShowAjouter() {
    this.setState((state) => {
      return {...this.state, showAjouter: true}
    })
  }
  triggerHideAjouter() {
    this.setState((state) => {
      return {...this.state, showAjouter: false}
    })
  }
  triggerModifier(seance) {
    this.state.actionModifier(seance, this.state.selected)
    //window.location.reload(false)
  }
  triggerShowModifier(creneau) {
    this.setState((state) => {
      return {...this.state, showModifier: true, selected: creneau}
    })
  }
  triggerHideModifier() {
    this.setState((state) => {
      return {...this.state, showModifier: false}
    })
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
    if (this.state.seances === null || this.state.creneaux === null) {
      return (<div>
        <h3>Liste des séances</h3>
        Loading ...
      </div>)
    } else if (!this.state.seances) {
      return (<div>
        <h3>Liste des séances</h3>
        <button class="button-confirm" onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
        Aucune séance disponible
      </div>)
    } else {
      return (<div>
        <h3>Liste des séances</h3>
        <button class="button-confirm" onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
        <TableCreneaux
          creneaux={ this.state.seances }
          triggerInformation={ this.triggerShowInformation.bind(this) }
          triggerModifier={ this.triggerShowModifier.bind(this) }
        />
        {this.state.showAjouter &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Ajouter un creneau</h3>
              <FormCreneau creneaux={this.state.creneaux} trigger={  this.triggerAjouter.bind(this) }/>
              <button class="button-cancel" onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
            </div>
          </div>
        }
        {this.state.showInformation &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Infomation sur { this.state.selected.intitule }</h3>
              <div>
                <p>
                  {this.state.selected.commentaire}
                </p>
              </div>
              <button class="button-cancel" onClick={ this.triggerHideInformation.bind(this) }>Fermer</button>
            </div>
          </div>
        }
        {this.state.showModifier &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Modification de { this.state.selected.intitule }</h3>
              <FormCreneau creneaux={this.state.creneaux} creneau={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
              <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
            </div>
          </div>
        }
      </div>)
    }
  }
}
