import React, { Component } from 'react'
import TableUsers from './TableUsers'
import FormUser from '../FormUser'

export default class ListUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categorie: props.categorie,
      users: props.users,
      showAjouter: false,
      actionAjouter: props.ajouter,
      showSupprimer: false,
      idSupprimer: "",
      actionSupprimer: props.supprimer,
      showModifier: false,
      currentUser: {},
      actionModifier: props.modifier,
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
  triggerModifier(user) {
    this.state.actionModifier(user)
    this.setState((state) => {
      return {...this.state, showModifier: false}
    })
  }
  triggerShowModifier(user) {
    this.setState((state) => {
      return {...this.state, showModifier: true, currentUser: user}
    })
  }
  triggerHideModifier() {
    this.setState((state) => {
      return {...this.state, showModifier: false}
    })
  }
  triggerSupprimer() {
    this.state.actionSupprimer(this.state.idSupprimer)
    this.setState((state) => {
      return {...this.state, showSupprimer: false}
    })
  }
  triggerShowSupprimer(user) {
    this.setState((state) => {
      return {...this.state, showSupprimer: true, idSupprimer: user.login}
    })
  }
  triggerHideSupprimer() {
    this.setState((state) => {
      return {...this.state, showSupprimer: false}
    })
  }
  render() {
    return <div>
      <button onClick={ this.triggerShowAjouter.bind(this) }>Ajouter</button>
      <TableUsers 
        users={ this.state.users }
        triggerModifier={ this.triggerShowModifier.bind(this) }
        triggerSupprimer={ this.triggerShowSupprimer.bind(this) }
      />
      {this.state.showAjouter &&
        <div>
          <span>Ajouter un { this.state.categorie }</span>
          <FormUser trigger={  this.triggerAjouter.bind(this) }/>
          <button onClick={ this.triggerHideAjouter.bind(this) }>Annuler</button>
        </div>
      }
      {this.state.showSupprimer &&
        <div>
          <span>Confirmer la suppression de { this.state.idSupprimer }</span>
          <button onClick={ this.triggerSupprimer.bind(this) }>Confirmer</button>
          <button onClick={ this.triggerHideSupprimer.bind(this) }>Annuler</button>
        </div>
      }
      {this.state.showModifier &&
        <div>
          <span>Modification de { this.state.currentUser.login }</span>
          <FormUser user={ this.state.currentUser } trigger={  this.triggerModifier.bind(this) } submitValue="modifier"/>
          <button onClick={ this.triggerHideModifier.bind(this) }>Annuler</button>
        </div>
      }
    </div>
  }
}

