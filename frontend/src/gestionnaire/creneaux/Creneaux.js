import React, { Component } from 'react'
import TableCreneaux from './TableCreneaux'
import TableSeances from './TableSeances'
import FormCreneau from './FormCreneau'
import Service from '../../services/seance.service'
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
async function modifier(itemNew, itemOld) {
  Service.postCreneaux(itemNew).then(data => data.data)
}
async function supprimer(item) {
  Service.delCreneaux(item).then(data => data.data)
}
async function ajouter(item) {
  Service.putCreneaux(item).then(data => data.data)
}
async function updateView() {
  return Service.getCreneaux().then(data => data.data)
}

export default class Cours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneaux: null,
      showAjouter: false,
      showSupprimer: false,
      showModifier: false,
      showInformation: false,
      actionAjouter: ajouter,
      actionSupprimer: supprimer,
      actionModifier: modifier,
      cours: null,
      selected: {},
    }
  }
  componentDidMount() {
    this._asyncRequestCreneaux = updateView().then(
      liste => {
        this._asyncRequestCreneaux = null
        this.setState((state) => {
          return {...state, creneaux: liste}
        })
      }
    )
    this._asyncRequestCours = getCours().then(
      liste => {
        this._asyncRequestCours = null
        this.setState((state) => {
          return {...state, cours: liste}
        })
      }
    )
  }
  triggerAjouter(cours) {
    this.state.actionAjouter(cours)
    window.location.reload(false)
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
  triggerModifier(creneau) {
    this.state.actionModifier(creneau, this.state.selected)
    window.location.reload(false)
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
  triggerSupprimer() {
    this.state.actionSupprimer(this.state.selected)
    window.location.reload(false)
  }
  triggerShowSupprimer(creneau) {
    this.setState((state) => {
      return {...this.state, showSupprimer: true, selected: creneau}
    })
  }
  triggerHideSupprimer() {
    this.setState((state) => {
      return {...this.state, showSupprimer: false}
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
    if (this.state.creneaux === null || this.state.cours === null) {
      return (<div>
        <h3>Liste des creneaux</h3>
        Loading ...
      </div>)
    } else {
      return (<div>
        <h3>Liste des creneaux</h3>
        <button class="button-confirm" onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
        <TableCreneaux
          creneaux={ this.state.creneaux }
          triggerInformation={ this.triggerShowInformation.bind(this) }
          triggerModifier={ this.triggerShowModifier.bind(this) }
          triggerSupprimer={ this.triggerShowSupprimer.bind(this) }
        />
        {this.state.showAjouter &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Ajouter un creneau</h3>
              <FormCreneau trigger={  this.triggerAjouter.bind(this) } cours={this.state.cours} />
              <button class="button-cancel" onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
            </div>
          </div>
        }
        {this.state.showSupprimer &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Confirmer la suppression de { this.state.selected.intitule }</h3>
              <button class="button-confirm" onClick={ this.triggerSupprimer.bind(this) }>Confirmer</button>
              <button class="button-cancel" onClick={ this.triggerHideSupprimer.bind(this) }>Annuler</button>
            </div>
          </div>
        }
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
        {this.state.showModifier &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Modification de { this.state.selected.intitule }</h3>
              <FormCreneau cours={this.state.cours} creneau={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
              <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
            </div>
          </div>
        }
      </div>)
    }
  }
}
