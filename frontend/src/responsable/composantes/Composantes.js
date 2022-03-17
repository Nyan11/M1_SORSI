import React, { Component } from 'react'
import TableComposantes from './TableComposantes'
import Service from '../../services/gestionnaire.service'


async function updateView() {
  return Service.getComposante().then(data => data.data)
}

export default class Composantes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composantes: null,
    }
  }
  componentDidMount() {
    this._asyncRequest = updateView().then(
      liste => {
        this._asyncRequest = null
        this.setState((state) => {
          return {...state, composantes: liste}
        })
      }
    )
  }
  render() {
    if (this.state.composantes === null) {
      return (<div>
        <h3>Liste des composantes</h3>
        Loading ...
      </div>)
    } else {
      return <div>
        <h3>Liste des composantes</h3>
        <TableComposantes
          composantes={ this.state.composantes }
        />
      </div>
    }
  }
}
