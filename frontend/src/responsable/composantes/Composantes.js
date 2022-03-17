import React, { Component } from 'react'
import TableComposantes from './TableComposantes'
import Service from '../../services/gestionnaire.service'
import Admin from '../../services/administration.service'

async function getResponsables() {
  return Admin.getResponsables().then(data => data.data)
}
async function updateView() {
  return Service.getComposante().then(data => data.data)
}

export default class Composantes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composantes: null,
      responsables: [],
      ready: false,
    }
  }
  componentDidMount() {
    this._asyncRequestComposantes = updateView().then(
      liste => {
        this._asyncRequestComposantes = null
        this.setState((state) => {
          return {...state, composantes: liste}
        })
      }
    )
    this._asyncRequestResponsables = getResponsables().then(
      liste => {
        this._asyncRequestResponsables = null
        this.setState((state) => {
          return {...state, responsables: liste, ready: true}
        })
      }
    )
  }
  render() {
    if (!this.state.ready || this.state.composantes === null) {
      return (<div>
        <h3>Liste des composantes</h3>
        Loading ...
      </div>)
    } else {
      return <div>
        <h3>Liste des composantes</h3>
        <TableComposantes
          composantes={ this.state.composantes }
          responsables={this.state.responsables}
        />
      </div>
    }
  }
}
