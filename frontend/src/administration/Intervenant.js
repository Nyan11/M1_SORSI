import React, { Component } from 'react';
import ListUsers from './ListUsers/ListUsers'

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
  console.log(userNew)
  console.log(userOld)
}
function supprimer(user) {
  console.log(user)
}
function ajouter(user) {
  console.log(user)
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
