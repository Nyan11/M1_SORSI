import React, { Component } from 'react';
import ListUsers from './ListUsers/ListUsers'
import AdministrationService from '../services/administration.service'

const liste = [
  {
    login: "e2001",
    nom: "AMIENS",
    prenom: "Alice",
    mail: "alice707@hotmail.com",
    password: "aaa",
  },
  {
    login: "e2002",
    nom: "BREST",
    prenom: "Bernard",
    mail: "bernard2brest@gmail.com",
    password: "bbb",
  },
  {
    login: "e2003",
    nom: "CAEN",
    prenom: "chloe",
    mail: "chloe@orange.fr",
    password: "ccc",
  },
]
function modifier(userNew, userOld) {
  AdministrationService.updateIntervenant(userNew)
}
function supprimer(user) {
  AdministrationService.deleteIntervenant(user)
}
function ajouter(user) {
  AdministrationService.createIntervenant(user)
}
function updateView() {
  AdministrationService.getIntervenants()
}

class Intervenant extends Component {
  render() {
    return <div>
      <h3>Liste des intervenants</h3>
      <ListUsers
        users={liste}
        modifier={ modifier }
        supprimer={ supprimer }
        ajouter={ ajouter }
        categorie="intervenant"
      />
    </div>;
  }
}

export default Intervenant;
