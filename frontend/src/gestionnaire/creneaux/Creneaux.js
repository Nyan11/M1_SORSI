import React, { Component } from 'react'
import TableCreneaux from './TableCreneaux'
import FormCreneau from './FormCreneau'
import Service from '../../services/gestionnaire.service'


const creneaux = [
  {
    intitule: "Conseil de département Salle TPI pôle numérique",
    date: "10/03/22",
    heureDebut: "12h45",
    heureFin: "14h45",
    type: "CM",
    salle: "Micro 2.6",
    validation: 2,
    commentaire: "Bonjour, commentaire 1.",
  },
  {
    intitule: "Algorithmique et programmation",
    date: "10/03/22",
    heureDebut: "12h45",
    heureFin: "14h45",
    type: "CM",
    salle: "Micro 2.6",
    validation: 1,
    commentaire: "Bonjour, commentaire 2.",
  },
  {
    intitule: "Algorithmique et programmation",
    date: "10/03/22",
    heureDebut: "12h45",
    heureFin: "14h45",
    type: "CM",
    salle: "Micro 2.6",
    validation: 0,
    commentaire: "Bonjour, commentaire 3.",
  }
]

async function modifier(itemNew, itemOld) {
  Service.updateCours(itemNew).then(data => data.data)
}
async function supprimer(item) {
  Service.deleteCours(item).then(data => data.data)
}
async function ajouter(item) {
  Service.createCours(item).then(data => data.data)
}
async function updateView() {
  return Service.createCours(null).then(data => data.data)
}

export default class Cours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creneaux: creneaux,
      showAjouter: false,
      showSupprimer: false,
      showModifier: false,
      actionAjouter: ajouter,
      actionSupprimer: supprimer,
      actionModifier: modifier,
      selected: {},
    }
  }
  /*
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
  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  */
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
  triggerSupprimer() {
    this.state.actionSupprimer(this.state.selected)
    window.location.reload(false)
  }
  triggerShowSupprimer(creneau) {
    this.setState((state) => {
      return {...this.state, showSupprimer: true, selected: creneau}
    })
  }
  triggerHideSupprimer() {
    this.setState((state) => {
      return {...this.state, showSupprimer: false}
    })
  }
  render() {
    if (this.state.creneaux === null) {
      return (<div>
        <h3>Liste des creneaux</h3>
        Loading ...
      </div>)
    } else {
      return (<div>
        <h3>Liste des creneaux</h3>
        <button class="button-confirm" onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
        <TableCreneaux
          creneaux={ this.state.creneaux }
          triggerModifier={ this.triggerShowModifier.bind(this) }
          triggerSupprimer={ this.triggerShowSupprimer.bind(this) }
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
              <FormCreneau creneau={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
              <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
            </div>
          </div>
        }
      </div>)
    }
  }
}
