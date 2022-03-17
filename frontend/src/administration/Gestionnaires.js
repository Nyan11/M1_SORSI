import React, { Component } from 'react'
import TableUsers from './TableUsers'
import FormUser from './FormUser'
import AdministrationService from '../services/administration.service'


async function modifier(userNew, userOld) {
  AdministrationService.updateGestionnaire(userNew).then(data => data.data)
}
async function supprimer(user) {
  AdministrationService.deleteGestionnaire(user).then(data => data.data)
}
async function ajouter(user) {
  AdministrationService.createGestionnaire(user).then(data => data.data)
}
async function updateView() {
  return AdministrationService.getGestionnaires().then(data => data.data)
}

export default class Gestionnaires extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categorie: props.categorie,
      users: null,
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
      users => {
        this._asyncRequest = null;
        this.setState({users: users});
      }
    );
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
  triggerModifier(user) {
    this.state.actionModifier(user, this.state.selected)
    window.location.reload(false)
  }
  triggerShowModifier(user) {
    this.setState((state) => {
      return {...this.state, showModifier: true, selected: user}
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
  triggerShowSupprimer(user) {
    this.setState((state) => {
      return {...this.state, showSupprimer: true, selected: user}
    })
  }
  triggerHideSupprimer() {
    this.setState((state) => {
      return {...this.state, showSupprimer: false}
    })
  }
  render() {
    if (this.state.users === null) {
      return <div>
        <h3>Liste des gestionnaires</h3>
        Loading ...
      </div>;
    } else {
      return <div>
        <h3>Liste des gestionnaires</h3>
        <button class="button-confirm" onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
        <TableUsers
          users={ this.state.users }
          triggerModifier={ this.triggerShowModifier.bind(this) }
          triggerSupprimer={ this.triggerShowSupprimer.bind(this) }
        />
        {this.state.showAjouter &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Ajouter un { this.state.categorie }</h3>
              <FormUser trigger={  this.triggerAjouter.bind(this) }/>
              <button class="button-cancel" onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
            </div>
          </div>
        }
        {this.state.showSupprimer &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Confirmer la suppression de { this.state.selected.login }</h3>
              <button class="button-confirm" onClick={ this.triggerSupprimer.bind(this) }>Confirmer</button>
              <button class="button-cancel" onClick={ this.triggerHideSupprimer.bind(this) }>Annuler</button>
            </div>
          </div>
        }
        {this.state.showModifier &&
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Modification de { this.state.selected.login }</h3>
              <FormUser user={ this.state.selected } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
              <button class="button-cancel" onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
            </div>
          </div>
        }
      </div>
    }
  }
}
