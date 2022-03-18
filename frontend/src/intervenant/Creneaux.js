import React, { Component } from 'react'
import TableCreneaux from './TableCreneaux'
import FormCreneau from './FormCreneau'
import Service from '../services/seance.service'


async function modifier(itemNew, itemOld) {
  Service.getSeance(itemNew).then(data => data.data)
}
async function ajouter(item) {
  Service.getSeance(item).then(data => data.data)
}
async function updateView() {
  return Service.getSeancesIntervenants().then(data => data.data)
}

export default class Cours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneaux: null,
      showAjouter: false,
      showModifier: false,
      showInformation: false,
      actionAjouter: ajouter,
      actionModifier: modifier,
      selected: {},
    }
  }
  componentDidMount() {
    this._asyncRequest = updateView().then(
      liste => {
        this._asyncRequest = null
        this.setState((state) => {
          return {...state, creneaux: liste}
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
    if (!this.state.creneaux || this.state.creneaux === null) {
      return (<div>
        <h3>Liste des séances</h3>
        Loading ...
      </div>)
    } else {
      return (<div>
        <h3>Liste des séances</h3>
        <button class="button-confirm" onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
        <TableCreneaux
          creneaux={ this.state.creneaux }
          triggerInformation={ this.triggerShowInformation.bind(this) }
          triggerModifier={ this.triggerShowModifier.bind(this) }
        />
        {this.state.showAjouter &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Ajouter un creneau</h3>
              <FormCreneau trigger={  this.triggerAjouter.bind(this) }/>
              <button class="button-cancel" onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
            </div>
          </div>
        }
        {this.state.showInformation &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Infomation sur { this.state.selected.intitule }</h3>
              <div>
                <span>realiser par : {this.state.selected.nomUsuel}</span>
              </div>
              <div>
                <span>commentaires</span>
                <p>
                  {this.state.selected.commentaire}
                </p>
              </div>
              <button class="button-cancel" onClick={ this.triggerHideInformation.bind(this) }>Fermer</button>
            </div>
          </div>
        }
        {this.state.showModifier &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Modification de { this.state.selected.intitule }</h3>
              <FormCreneau creneau={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
              <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
            </div>
          </div>
        }
      </div>)
    }
  }
}
