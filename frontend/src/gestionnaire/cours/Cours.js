import React, { Component } from 'react'
import TableCours from './TableCours'
import FormCours from './FormCours'
import Service from '../../services/gestionnaire.service'
import Admin from '../../services/administration.service'


async function getFilieres() {
  return Service.getFilieres().then(data => data.data)
}
async function getIntervenants() {
  return Admin.getIntervenants().then(data => data.data)
}
async function modifier(itemNew, itemOld) {
  Service.updateCours(itemNew.cours, itemNew.concerne, itemNew.participe)
}
async function supprimer(item) {
  Service.deleteCours(item)
}
async function ajouter(item) {

  Service.createCours(item.cours.intitule, item.concerne, item.participe)
}
async function updateView() {
  return Service.getCours().then(res => {
    var data = res.data
    return data.reduce((previousValue, currentValue) => {
      var value = previousValue.find((item) => {return item.id === currentValue.id})
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
        previousValue.push({id: currentValue.id, intitule: currentValue.intitule, filiereLangue:[filiere], intervenants: [intervenant]})
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
      showAjouter: false,
      showSupprimer: false,
      showModifier: false,
      actionAjouter: ajouter,
      actionSupprimer: supprimer,
      actionModifier: modifier,
      selected: {},
      filieres: [],
      intervenants: [],
      ready: 0,
    }
  }
  componentDidMount() {
    this._asyncRequestCours = updateView().then(
      liste => {
        this._asyncRequestCours = null
        this.setState((state) => {
          return {...state, cours: liste, ready: this.state.ready + 1}
        })
      }
    )
    this._asyncRequestFilieres = getFilieres().then(
      liste => {
        this._asyncRequestFiieres = null
        this.setState((state) => {
          return {...state, filieres: liste, ready: this.state.ready + 1}
        })
      }
    )
    this._asyncRequestIntervenants = getIntervenants().then(
      liste => {
        this._asyncRequestIntervenants = null
        this.setState((state) => {
          return {...state, intervenants: liste, ready: this.state.ready + 1}
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
  triggerModifier(cours) {
    this.state.actionModifier(cours, this.state.selected)
    window.location.reload(false)
  }
  triggerShowModifier(cours) {
    this.setState((state) => {
      return {...this.state, showModifier: true, selected: cours}
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
  triggerShowSupprimer(cours) {
    this.setState((state) => {
      return {...this.state, showSupprimer: true, selected: cours}
    })
  }
  triggerHideSupprimer() {
    this.setState((state) => {
      return {...this.state, showSupprimer: false}
    })
  }
  render() {
    if (this.state.ready !== 3 || !this.state.filieres || !this.state.intervenants) {
      return (<div>
        <h3>Liste des cours</h3>
        Loading ...
      </div>)
    } else {
      return (<div>
        <h3>Liste des cours</h3>
        <button class="button-confirm" onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
        <TableCours
          cours={ this.state.cours }
          triggerModifier={ this.triggerShowModifier.bind(this) }
          triggerSupprimer={ this.triggerShowSupprimer.bind(this) }
        />
        {this.state.showAjouter &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Ajouter un cours</h3>
              <FormCours trigger={this.triggerAjouter.bind(this)} filieres={this.state.filieres} intervenants={this.state.intervenants} />
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
        {this.state.showModifier &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Modification de { this.state.selected.intitule }</h3>
              <FormCours cours={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"  filieres={ this.state.filieres } intervenants={this.state.intervenants} />
              <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
            </div>
          </div>
        }
      </div>)
    }
  }
}
