import React, { Component } from 'react'

export default class RowTableUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      triggerModifier: props.triggerModifier,
      triggerSupprimer: props.triggerSupprimer,
    }
  }

  handleModifierClicked(event) {
    event.preventDefault()
    this.state.triggerModifier(this.state.user)
  }
  
  handleSupprimerClicked(event) {
    event.preventDefault()
    this.state.triggerSupprimer(this.state.user)
  }

  render() {
    return <tr>
        <td>{ this.state.user.login }</td>
        <td>{ this.state.user.nom }</td>
        <td>{ this.state.user.prenom }</td>
        <td>{ this.state.user.mail }</td>
        <td>{ this.state.user.password }</td>
        <td><button onClick={ this.handleSupprimerClicked.bind(this) }>supprimer</button></td>
        <td><button onClick={ this.handleModifierClicked.bind(this) }>modifier</button></td>
      </tr>
  }
}

