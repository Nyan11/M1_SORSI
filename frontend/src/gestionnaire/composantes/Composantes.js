import React, { Component } from 'react'
import TableComposantes from './TableComposantes'
import FormComposante from './FormComposante'
import Service from '../../services/gestionnaire.service'

const composantes = [
  { nom: "ANGLAIS" },
  { nom: "ALLEMAND" },
  { nom: "ESPAGNOLE" },
]

function ajouter(item) {
  Service.createComposante(item)
}
function modifier(itemNew, itemOld) {
  Service.updateComposante(itemNew)
}
function supprimer(item) {
  Service.deleteComposante(item)
}
function updateView() {
  Service.getComposante()
}

export default class Composantes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composantes: composantes,
      showAjouter: false,
      showSupprimer: false,
      showModifier: false,
      actionAjouter: ajouter,
      actionSupprimer: supprimer,
      actionModifier: modifier,
      selected: {},
    }
  }
  triggerAjouter(user) {
    this.state.actionAjouter(user)
    updateView()
    this.setState((state) => {
      return {...this.state, showAjouter: false}
    })
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
  triggerModifier(composante) {
    this.state.actionModifier(composante, this.state.selected)
    updateView()
    this.setState((state) => {
      return {...this.state, showModifier: false}
    })
  }
  triggerShowModifier(composante) {
    this.setState((state) => {
      return {...this.state, showModifier: true, selected: composante}
    })
  }
  triggerHideModifier() {
    this.setState((state) => {
      return {...this.state, showModifier: false}
    })
  }
  triggerSupprimer() {
    this.state.actionSupprimer(this.state.selected)
    updateView()
    this.setState((state) => {
      return {...this.state, showSupprimer: false}
    })
  }
  triggerShowSupprimer(composante) {
    this.setState((state) => {
      return {...this.state, showSupprimer: true, selected: composante}
    })
  }
  triggerHideSupprimer() {
    this.setState((state) => {
      return {...this.state, showSupprimer: false}
    })
  }
  render() {
    return <div>
      <h3>Liste des composantes</h3>
      <button class="button-confirm" onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
      <TableComposantes
        composantes={ this.state.composantes }
        triggerModifier={ this.triggerShowModifier.bind(this) }
        triggerSupprimer={ this.triggerShowSupprimer.bind(this) }
      />
      {this.state.showAjouter &&
        <div class="dialog-overlay">
          <div class="dialog">
            <h3>Ajouter une composante</h3>
            <FormComposante trigger={  this.triggerAjouter.bind(this) }/>
            <button class="button-cancel" onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
          </div>
        </div>
      }
      {this.state.showSupprimer &&
        <div class="dialog-overlay">
          <div class="dialog">
            <h3>Confirmer la suppression de { this.state.selected.nom }</h3>
            <button class="button-confirm" onClick={ this.triggerSupprimer.bind(this) }>Confirmer</button>
            <button class="button-cancel" onClick={ this.triggerHideSupprimer.bind(this) }>Annuler</button>
          </div>
        </div>
      }
      {this.state.showModifier &&
        <div class="dialog-overlay">
          <div class="dialog">
            <h3>Modification de { this.state.selected.nom }</h3>
            <FormComposante composante={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
            <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
          </div>
        </div>
      }
    </div>
  }
}
