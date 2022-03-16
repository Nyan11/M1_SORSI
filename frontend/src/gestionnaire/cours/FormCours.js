import React, { Component } from 'react';

export default class FormCours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cours: {},
      submitValue: "Ajouter",
      trigger: () => {},
      filieres: props.filieres,
      intervenants: props.intervenants,
      checkboxFilieres: [],
      checkboxIntervenants: [],
    }
    if (props.cours) {
      this.state.cours = {
        id: props.cours.id,
        intitule: props.cours.intitule,
      }
      this.state.checkboxFilieres = props.cours.filiereLangue.reduce((acc, item) => {
        acc.push(item.idFiliereLangue)
        return acc
      }, [])
      this.state.checkboxIntervenants = props.cours.intervenants.reduce((acc, item) => {
        acc.push(item.idIntervenant)
        return acc
      }, [])
    }
    if (props.submitValue) {
      this.state.submitValue = props.submitValue
    }
    if (props.trigger) {
      this.state.trigger = props.trigger
    }
  }

  handleInputChanged(event) {
    const oldItem = this.state.cours
    const newItem = { ...oldItem, [event.target.id]: event.target.value }
    this.setState({
      ...this.state,
      cours: newItem
    });
  }
  handleSubmitClicked(event) {
    var cours = this.state.cours
    var concerne = this.state.checkboxFilieres
    var participe = this.state.checkboxIntervenants
    event.preventDefault()
    this.state.trigger({cours: cours, concerne: concerne, participe: participe})
  }
  updateArrayFilieres(id) {
    var exist = this.state.checkboxFilieres.find(item => item === id)
    if (exist) {
      this.state.checkboxFilieres = this.state.checkboxFilieres.filter(item => item !== id)
    } else {
      this.state.checkboxFilieres.push(id)
    }
  }
  updateArrayIntervenants(id) {
    var exist = this.state.checkboxIntervenants.find(item => item === id)
    if (exist) {
      this.state.checkboxIntervenants = this.state.checkboxIntervenants.filter(item => item !== id)
    } else {
      this.state.checkboxIntervenants.push(id)
    }
  }

  render() {
    return (
    <form onSubmit={this.handleSubmitClicked.bind(this)}>
      <div>
        <label for="intitule">intitule : </label>
        <input
          type="text"
          name="intitule"
          id="intitule"
          value={this.state.cours.intitule || ""}
          onChange={this.handleInputChanged.bind(this)}
          required
        />
      </div>
      <h4>filieres</h4>
      <div class="checkboxes">
        {this.state.filieres.map((filiere, index) =>
          <CheckCours
            label={filiere.codeFiliereLangue}
            value={filiere.idFiliereLangue}
            selected={this.state.checkboxFilieres}
            key={index}
            updateArray={this.updateArrayFilieres.bind(this)}
          />
        )}
      </div>
      <h4>intervenants</h4>
      <div class="checkboxes">
        {this.state.intervenants.map((intervenant, index) =>
          <CheckCours
            label={intervenant.nomUsuel + " " + intervenant.prenom}
            value={intervenant.id}
            selected={this.state.checkboxIntervenants}
            key={index}
            updateArray={this.updateArrayIntervenants.bind(this)}
          />
        )}
      </div>
      <div>
        <input type="submit" value={ this.state.submitValue }/>
      </div>
    </form>
  )}
}

class CheckCours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: props.label,
      value: props.value,
      isChecked: (props.selected.find(id => id === props.value) ? true : false),
      updateArray: props.updateArray,
    }
  }
  handleCheckbox(event) {
    this.setState({isChecked: !this.state.isChecked})
    this.state.updateArray(this.state.value)
  }
  render() {
    return <label class="checkbox">{this.state.label}
      <input
        checked={this.state.isChecked ? "checked" : ""}
        type="checkbox"
        value={this.state.value}
        onChange={this.handleCheckbox.bind(this)}
      />
      <span class="checkmark"></span>
    </label>
  }
}
