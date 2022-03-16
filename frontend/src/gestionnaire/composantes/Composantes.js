import React, { Component } from 'react'
import TableComposantes from './TableComposantes'
import FormComposante from './FormComposante'
import Service from '../../services/gestionnaire.service'


async function modifier(itemNew, itemOld) {
  Service.updateComposante(itemNew).then(data => data.data)
}
async function supprimer(item) {
  Service.deleteComposante(item).then(data => data.data)
}
async function ajouter(item) {
  Service.createComposante({...item, idGestionnaire: 10}).then(data => data.data)
}
async function updateView() {
  return Service.getComposante().then(data => data.data)
}

export default class Composantes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composantes: null,
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
          return {...state, composantes: liste}
        })
      }
    )
  }
  triggerAjouter(user) {
    this.state.actionAjouter(user)
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
  triggerModifier(composante) {
    this.state.actionModifier(composante, this.state.selected)
    window.location.reload(false)
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
    window.location.reload(false)
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
    if (this.state.composantes === null) {
      return (<div>
        <h3>Liste des composantes</h3>
        Loading ...
      </div>)
    } else {
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
              <h3>Confirmer la suppression de { this.state.selected.nomComposante }</h3>
              <button class="button-confirm" onClick={ this.triggerSupprimer.bind(this) }>Confirmer</button>
              <button class="button-cancel" onClick={ this.triggerHideSupprimer.bind(this) }>Annuler</button>
            </div>
          </div>
        }
        {this.state.showModifier &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Modification de { this.state.selected.nomComposante }</h3>
              <FormComposante composante={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
              <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
            </div>
          </div>
        }
      </div>
    }
  }
}
