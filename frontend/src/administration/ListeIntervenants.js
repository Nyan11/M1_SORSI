import React, { Component } from 'react';
import { UsersTable } from './Users'

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

class ListeIntervenants extends Component {
  render() {
    return <div>
      <h3>Liste des intervenants</h3>
      <UsersTable users={liste} />
    </div>;
  }
}

export default ListeIntervenants;
