import React, { Component } from 'react'
import RowTableUser from './RowTableUser'

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
            <td>nom</td>
            <td>prenom</td>
            <td>mail</td>
            <td>password</td>
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

