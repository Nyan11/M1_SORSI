import React, { Component } from 'react'
import TableFilieres from './TableFilieres'
import Service from '../../services/gestionnaire.service'


async function getComposantes() {
  return Service.getComposante().then(data => data.data)
}

async function updateView() {
  return Service.getFilieres().then(data => data.data)
}

export default class Filieres extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filieres: null,
      ready: false,
      composantes: [],
    }
  }
  componentDidMount() {
    this._asyncRequestFilieres = updateView().then(
      liste => {
        this._asyncRequestFilieres = null
        this.setState((state) => {
          return {...state, filieres: liste}
        })
      }
    )
    this._asyncRequestComposantes = getComposantes().then(
      liste => {
        this._asyncRequestComposantes = null
        this.setState((state) => {
          return {...state, composantes: liste, ready: true}
        })
      }
    )
  }
  render() {
      if (!this.state.ready || !this.state.filieres) {
        return (<div>
          <h3>Liste des filieres</h3>
          Loading ...
        </div>)
      } else {
      return (<div>
        <h3>Liste des filières</h3>
        <TableFilieres
          filieres={ this.state.filieres }
          composantes={ this.state.composantes }
        />
      </div>)
    }
  }
}
