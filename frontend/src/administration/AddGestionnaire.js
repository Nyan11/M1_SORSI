import React, { Component } from 'react';

class AddGestionnaire extends Component {
  render() {
    return <div>
      <h3>Ajout d'un gestionnaire</h3>
      <form action="" method="get">
        <div>
          <label for="login">login : </label>
          <input type="text" name="login" id="login" required />
        </div>
        <div>
          <label for="nom">nom : </label>
          <input type="text" name="nom" id="nom" required />
        </div>
        <div>
          <label for="prenom">prénom : </label>
          <input type="text" name="prenom" id="prenom" required />
        </div>
        <div>
          <label for="mail">mail : </label>
          <input type="email" name="mail" id="mail" required />
        </div>
        <div>
          <label for="password">mot de passe : </label>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>;
  }
}

export default AddGestionnaire;
