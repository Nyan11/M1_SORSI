import React, { Component } from 'react'
import TableCours from './TableCours'
import FormCours from './FormCours'
import Service from '../../services/gestionnaire.service'

const cours = [
  { intitule: "L1" },
  { intitule: "M1" },
  { intitule: "M2" },
]


async function modifier(itemNew, itemOld) {
  return await Service.updateCours(itemNew).then(data => data.data)
}
async function supprimer(item) {
  return await Service.deleteCours(item).then(data => data.data)
}
async function ajouter(item) {
  return await Service.createCours(item).then(data => data.data)
}
async function updateView() {
  return await Service.getCours().then(data => data.data)
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
    }
  }
  componentDidMount() {
    this._asyncRequest = updateView().then(
      liste => {
        this._asyncRequest = null
        this.setState((state) => {
          return {...state, cours: liste}
        })
      }
    )
  }
  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
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
    if (this.state.cours === null) {
      return (<div>
        <h3>Liste des cours</h3>
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
              <FormCours trigger={  this.triggerAjouter.bind(this) }/>
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
              <FormCours cours={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
              <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
            </div>
          </div>
        }
      </div>)
    }
  }
}
