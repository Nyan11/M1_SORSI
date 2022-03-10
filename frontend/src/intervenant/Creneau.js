import React, { Component } from 'react';

export default class Creneau extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      creneau: props.creneau,
    }
  }

  showDialog() {
    this.setState((state) => {
      return {...state, show: true}
    })
  }
  hideDialog() {
    this.setState((state) => {
      return {...state, show: false}
    })
  }

  render() {
    return (
      <div>
        <div
          onClick={ this.showDialog.bind(this) }
          class={((this.state.creneau.validation === 0) ? "creneau creneau-afaire" : (this.state.creneau.validation === 1) ? "creneau creneau-fait" : "creneau creneau-annule")}
        >
          <div class="creneau-date">{this.state.creneau.date}</div>
          <div class="creneau-intitule">{this.state.creneau.intitule}</div>
          <div class="creneau-type">{this.state.creneau.type}</div>
          <div class="creneau-salle">{this.state.creneau.salle}</div>
          <div class="creneau-time-1">{this.state.creneau.heureDebut}</div>
          <div class="creneau-time-2">{this.state.creneau.heureFin}</div>
        </div>
        {this.state.show &&
          <div class="dialog-overlay">
            <div
              class={((this.state.creneau.validation === 0) ? "dialog creneau-afaire" : (this.state.creneau.validation === 1) ? "dialog creneau-fait" : "dialog creneau-annule")}
            >
              <h3>{this.state.creneau.date + " - " + this.state.creneau.intitule}</h3>
              <p>{"de " + this.state.creneau.heureDebut + " à " + this.state.creneau.heureFin}</p>
              <button class="button-cancel" onClick={ this.hideDialog.bind(this) }>Hide</button>
            </div>
          </div>
        }
      </div>
  )}
}
