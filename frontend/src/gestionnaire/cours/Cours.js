import React, { Component } from 'react'
import TableCours from './TableCours'
import FormCours from './FormCours'

const cours = [
  { intitule: "L1" },
  { intitule: "M1" },
  { intitule: "M2" },
]

function ajouter(cours) {}
function modifier(coursNew, coursOld) {}
function supprimer(cours) {}

export default class Cours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cours: cours,
      showAjouter: false,
      showSupprimer: false,
      showModifier: false,
      actionAjouter: ajouter,
      actionSupprimer: supprimer,
      actionModifier: modifier,
      selected: {},
    }
  }
  triggerAjouter(cours) {
    this.state.actionAjouter(cours)
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
  triggerModifier(cours) {
    this.state.actionModifier(cours, this.state.selected)
    this.setState((state) => {
      return {...this.state, showModifier: false}
    })
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
    this.setState((state) => {
      return {...this.state, showSupprimer: false}
    })
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
    return <div>
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
            <span>Ajouter un cours</span>
            <FormCours trigger={  this.triggerAjouter.bind(this) }/>
            <button class="button-cancel" onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
          </div>
        </div>
      }
      {this.state.showSupprimer &&
        <div class="dialog-overlay">
          <div class="dialog">
            <span>Confirmer la suppression de { this.state.selected.intitule }</span>
            <button class="button-confirm" onClick={ this.triggerSupprimer.bind(this) }>Confirmer</button>
            <button class="button-cancel" onClick={ this.triggerHideSupprimer.bind(this) }>Annuler</button>
          </div>
        </div>
      }
      {this.state.showModifier &&
        <div class="dialog-overlay">
          <div class="dialog">
            <span>Modification de { this.state.selected.intitule }</span>
            <FormCours cours={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
            <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
          </div>
        </div>
      }
    </div>
  }
}
