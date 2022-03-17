import React, { Component } from 'react'

export default class UsersTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: props.users,
      triggerModifier: props.triggerModifier,
      triggerSupprimer: props.triggerSupprimer,
    }
  }

  render() {
    return(
      <table>
        <thead>
          <tr>
            <td>login</td>
            <td>nom usuel</td>
            <td>prenom</td>
            <td>mail</td>
            <td>mot de passe</td>
            <td>supprimer</td>
            <td>modifier</td>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user, index) =>
            <RowTableUser
              key={ index }
              user={ user }
              triggerModifier={ this.state.triggerModifier }
              triggerSupprimer={ this.state.triggerSupprimer }
            />
          )}
        </tbody>
      </table>
    )
  }
}

class RowTableUser extends Component {
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
        <td>{ this.state.user.nomUsuel }</td>
        <td>{ this.state.user.prenom }</td>
        <td>{ this.state.user.mail }</td>
        <td>{ this.state.user.motDePasse }</td>
        <td><button onClick={ this.handleSupprimerClicked.bind(this) }>supprimer</button></td>
        <td><button onClick={ this.handleModifierClicked.bind(this) }>modifier</button></td>
      </tr>
  }
}
