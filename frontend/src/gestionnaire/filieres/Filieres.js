import React, { Component } from 'react'
import TableFilieres from './TableFilieres'
import FormFiliere from './FormFiliere'

const filieres = [
  { code: "INFO", nom: "Informatique" },
  { code: "GMP", nom: "Geologie Maths Physique" },
  { code: "ELEC", nom: "Electronique" },
]

function ajouter(filiere) {}
function modifier(filiereNew, filiereOld) {}
function supprimer(filiere) {}

export default class Filieres extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filieres: filieres,
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
  triggerShowModifier(filiere) {
    this.setState((state) => {
      return {...this.state, showModifier: true, selected: filiere}
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
  triggerShowSupprimer(filiere) {
    this.setState((state) => {
      return {...this.state, showSupprimer: true, selected: filiere}
    })
  }
  triggerHideSupprimer() {
    this.setState((state) => {
      return {...this.state, showSupprimer: false}
    })
  }
  render() {
    return <div>
      <h3>Liste des filieres</h3>
      <button onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
      <TableFilieres 
        filieres={ this.state.filieres }
        triggerModifier={ this.triggerShowModifier.bind(this) }
        triggerSupprimer={ this.triggerShowSupprimer.bind(this) }
      />
      {this.state.showAjouter &&
        <div>
          <span>Ajouter une filiere</span>
          <FormFiliere trigger={  this.triggerAjouter.bind(this) }/>
          <button onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
        </div>
      }
      {this.state.showSupprimer &&
        <div>
          <span>Confirmer la suppression de { this.state.selected.code }</span>
          <button onClick={ this.triggerSupprimer.bind(this) }>Confirmer</button>
          <button onClick={ this.triggerHideSupprimer.bind(this) }>Annuler</button>
        </div>
      }
      {this.state.showModifier &&
        <div>
          <span>Modification de { this.state.selected.code }</span>
          <FormFiliere filiere={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
          <button onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
        </div>
      }
    </div>
  }
}
