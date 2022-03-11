import React, { Component } from 'react'
import ListUsers from './ListUsers/ListUsers'
import AdministrationService from '../services/administration.service'


async function modifier(userNew, userOld) {
  return await AdministrationService.updateIntervenant(userNew).then(data => data.data)
}
async function supprimer(user) {
  return await AdministrationService.deleteIntervenant(user).then(data => data.data)
}
async function ajouter(user) {
  return await AdministrationService.createIntervenant(user).then(data => data.data)
}
async function updateView() {
  return await AdministrationService.getIntervenants().then(data => data.data)
}

class Intervenant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liste: null,
    }
  }
  componentDidMount() {
    this._asyncRequest = updateView().then(
      users => {
        this._asyncRequest = null;
        this.setState({liste: users});
      }
    );
  }
  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  render() {
    if (this.state.liste === null) {
      return <div>
        <h3>Liste des intervenants</h3>
        Loading
      </div>;
    } else {
      return <div>
        <h3>Liste des intervenants</h3>
        <ListUsers
          users={this.state.liste}
          modifier={ modifier }
          supprimer={ supprimer }
          ajouter={ ajouter }
          update={ updateView }
          categorie="gestionnaire"
        />
      </div>;
    }
  }
}

export default Intervenant;
