function Users(props) {
  const users = props.users;
  return(
    users.map((user) =>
      <tr>
        <td>{user.login}</td>
        <td>{user.nom}</td>
        <td>{user.prenom}</td>
        <td>{user.mail}</td>
        <td>{user.password}</td>
        <td><button>supprimer</button></td>
        <td><button>modifier</button></td>
      </tr>
    )
  )
}

function UsersTable(props) {
  const users = props.users;
  return (
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
        <Users users={users} />
      </tbody>
    </table>
  )
}

export { Users, UsersTable };
