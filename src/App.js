import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import Search from './components/Search'

class App extends Component {
  state = {
    pokemonIdName: 'bulbasaur',
    pokemonData: [],
    pokemonName: '',
    pokemonImg: '',
    pokemonDescription: '',
    loading: true
  }

  componentDidMount() {
    this.fetchPokemonData()
  }

  fetchPokemonData = async () => {
    try {
      const { data } = await axios.get(
        `https://cors.now.sh/https://pokeapi.co/api/v2/pokemon/${this.state
          .pokemonIdName}`
      )
      this.setState({ pokemonData: data })
      this.setState({ pokemonImg: data.sprites.front_default })
      this.setState({ pokemonName: this.capitalize(data.name) })
      console.log(this.state.pokemonData.sprites.front_default)

      const data2 = await axios.get(
        `https://cors.now.sh/https://pokeapi.co/api/v2/pokemon-species/${this
          .state.pokemonIdName}`
      )
      this.setState({
        pokemonDescription: data2.data.flavor_text_entries[1].flavor_text
      })
    } catch (e) {
      console.log('the error was', e)
    }
  }

  capitalize = str =>
    str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : ''

  handleSearchChange = event => {
    console.log(this.state.pokemonIdName)
    this.setState({ pokemonIdName: event.target.value })
  }

  handleSearch = () => {
    this.fetchPokemonData()
  }

  handleEnterPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch()
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Search
          value={this.state.pokemonIdName}
          onChange={this.handleSearchChange}
          onClick={this.handleSearch}
          onKeyPress={this.handleEnterPress}
        />
        <div className="Pokemon-content">
          <p>{this.state.pokemonData.id}</p>
          <p>{this.state.pokemonName}</p>
          <p>{this.state.pokemonDescription}</p>
          <img src={this.state.pokemonImg} alt={this.state.pokemonName} />
        </div>
      </div>
    )
  }
}

export default App
