import React, { Component } from 'react'
import TableFilieres from './TableFilieres'
import FormFiliere from './FormFiliere'
import Service from '../../services/gestionnaire.service'


async function getComposantes() {
  return Service.getComposante().then(data => data.data)
}
async function modifier(itemNew, itemOld) {
  return Service.updateFiliere(itemNew).then(data => data.data)
}
async function supprimer(item) {
  return Service.deleteFiliere({id: item.idFiliereLangue}).then(data => data.data)
}
async function ajouter(item) {
  return Service.createFiliere(item).then(data => data.data)
}
async function updateView() {
  return Service.getFilieres().then(data => data.data)
}

export default class Filieres extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filieres: null,
      showAjouter: false,
      showSupprimer: false,
      showModifier: false,
      actionAjouter: ajouter,
      actionSupprimer: supprimer,
      actionModifier: modifier,
      ready: false,
      composantes: [],
      selected: {},
    }
  }
  componentDidMount() {
    this._asyncRequestFilieres = updateView().then(
      liste => {
        this._asyncRequestFilieres = null
        this.setState((state) => {
          return {...state, filieres: liste}
        })
      }
    )
    this._asyncRequestComposantes = getComposantes().then(
      liste => {
        this._asyncRequestComposantes = null
        this.setState((state) => {
          return {...state, composantes: liste, ready: true}
        })
      }
    )
  }
  async triggerAjouter(filiere) {
    this.state.actionAjouter(filiere)
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
  triggerModifier(filiere) {
    this.state.actionModifier(filiere, this.state.selected)
    window.location.reload(false)
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
    //window.location.reload(false)
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
      if (!this.state.ready || !this.state.filieres) {
        return (<div>
          <h3>Liste des filieres</h3>
          Loading ...
        </div>)
      } else {
      return (<div>
        <h3>Liste des filières</h3>
        <button class="button-confirm" onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
        <TableFilieres
          filieres={ this.state.filieres }
          composantes={ this.state.composantes }
          triggerModifier={ this.triggerShowModifier.bind(this) }
          triggerSupprimer={ this.triggerShowSupprimer.bind(this) }
        />
        {this.state.showAjouter &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Ajouter une filiere</h3>
              <FormFiliere composantes={ this.state.composantes } trigger={  this.triggerAjouter.bind(this) }/>
              <button class="button-cancel" onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
            </div>
          </div>
        }
        {this.state.showSupprimer &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Confirmer la suppression de { this.state.selected.codeFiliereLangue }</h3>
              <button class="button-confirm" onClick={ this.triggerSupprimer.bind(this) }>Confirmer</button>
              <button class="button-cancel" onClick={ this.triggerHideSupprimer.bind(this) }>Annuler</button>
            </div>
          </div>
        }
        {this.state.showModifier &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Modification de { this.state.selected.codeFiliereLangue }</h3>
              <FormFiliere composantes={ this.state.composantes } filiere={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
              <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
            </div>
          </div>
        }
      </div>)
    }
  }
}
