import React, { Component } from 'react'
import TableComposantes from './TableComposantes'
import FormComposante from './FormComposante'

const composantes = [
  { nom: "ANGLAIS" },
  { nom: "ALLEMAND" },
  { nom: "ESPAGNOLE" },
]

function ajouter(composante) {}
function modifier(composanteNew, composanteOld) {}
function supprimer(composante) {}

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
      <button onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
      <TableComposantes 
        composantes={ this.state.composantes }
        triggerModifier={ this.triggerShowModifier.bind(this) }
        triggerSupprimer={ this.triggerShowSupprimer.bind(this) }
      />
      {this.state.showAjouter &&
        <div>
          <span>Ajouter une composante</span>
          <FormComposante trigger={  this.triggerAjouter.bind(this) }/>
          <button onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
        </div>
      }
      {this.state.showSupprimer &&
        <div>
          <span>Confirmer la suppression de { this.state.selected.nom }</span>
          <button onClick={ this.triggerSupprimer.bind(this) }>Confirmer</button>
          <button onClick={ this.triggerHideSupprimer.bind(this) }>Annuler</button>
        </div>
      }
      {this.state.showModifier &&
        <div>
          <span>Modification de { this.state.selected.nom }</span>
          <FormComposante composante={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
          <button onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
        </div>
      }
    </div>
  }
}
