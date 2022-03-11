import React, { Component } from 'react'
import TableFilieres from './TableFilieres'
import FormFiliere from './FormFiliere'
import Service from '../../services/gestionnaire.service'

const filieres = [
  { code: "INFO", nom: "Informatique" },
  { code: "GMP", nom: "Geologie Maths Physique" },
  { code: "ELEC", nom: "Electronique" },
]

function ajouter(item) {
  Service.createFiliere(item)
}
function modifier(itemNew, itemOld) {
  Service.updateFiliere(itemNew)
}
function supprimer(item) {
  Service.deleteFiliere(item)
}
function updateView() {
  Service.getFiliere()
}

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
  triggerModifier(cours) {
    this.state.actionModifier(cours, this.state.selected)
    updateView()
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
    updateView()
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
      <button class="button-confirm" onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
      <TableFilieres
        filieres={ this.state.filieres }
        triggerModifier={ this.triggerShowModifier.bind(this) }
        triggerSupprimer={ this.triggerShowSupprimer.bind(this) }
      />
      {this.state.showAjouter &&
        <div class="dialog-overlay">
          <div class="dialog">
            <h3>Ajouter une filiere</h3>
            <FormFiliere trigger={  this.triggerAjouter.bind(this) }/>
            <button class="button-cancel" onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
          </div>
        </div>
      }
      {this.state.showSupprimer &&
        <div class="dialog-overlay">
          <div class="dialog">
            <h3>Confirmer la suppression de { this.state.selected.code }</h3>
            <button class="button-confirm" onClick={ this.triggerSupprimer.bind(this) }>Confirmer</button>
            <button class="button-cancel" onClick={ this.triggerHideSupprimer.bind(this) }>Annuler</button>
          </div>
        </div>
      }
      {this.state.showModifier &&
        <div class="dialog-overlay">
          <div class="dialog">
            <h3>Modification de { this.state.selected.code }</h3>
            <FormFiliere filiere={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
            <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
          </div>
        </div>
      }
    </div>
  }
}
