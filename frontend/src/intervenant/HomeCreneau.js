import React, { Component } from 'react';
import Creneau from './Creneau'

const creneaux = [
  {
    intitule: "Conseil de département Salle TPI pôle numérique",
    date: "10/03/22",
    heureDebut: "12h45",
    heureFin: "14h45",
    type: "CM",
    salle: "Micro 2.6",
    validation: 2,
    commentaire: "Bonjour, commentaire 1.",
  },
  {
    intitule: "Algorithmique et programmation",
    date: "10/03/22",
    heureDebut: "12h45",
    heureFin: "14h45",
    type: "CM",
    salle: "Micro 2.6",
    validation: 1,
    commentaire: "Bonjour, commentaire 2.",
  },
  {
    intitule: "Algorithmique et programmation",
    date: "10/03/22",
    heureDebut: "12h45",
    heureFin: "14h45",
    type: "CM",
    salle: "Micro 2.6",
    validation: 0,
    commentaire: "Bonjour, commentaire 3.",
  }
]

export default class HomeCreneaux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      composante: {},
      submitValue: "Ajouter",
      trigger: () => {}
    }
    if (props.composante) {
      this.state.composante = props.composante
    }
    if (props.submitValue) {
      this.state.submitValue = props.submitValue
    }
    if (props.trigger) {
      this.state.trigger = props.trigger
    }
  }

  handleInputChanged(event) {
    const oldItem = this.state.composante
    const newItem = { ...oldItem, [event.target.id]: event.target.value }
    this.setState({
      ...this.state,
      composante: newItem
    });
  }

  handleSubmitClicked(event) {
    var item = this.state.composante
    event.preventDefault()
    this.state.trigger(item)
    console.log('debug')
  }

  render() {
    return (
    <div>
      {creneaux.map((item, index) =>
        <Creneau creneau={item} key={index}/>
      )}
    </div>
  )}
}
