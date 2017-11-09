import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import Search from './components/Search'

class App extends Component {
  state = {
    pokemonIdName: 'Mewtwo',
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
        `https://pokeapi.co/api/v2/pokemon-species/${this
          .state.pokemonIdName}`
      )
      this.setState({ pokemonData: data })
      console.log(this.state.pokemonData)
      this.setState({ pokemonName: data.names[2].name }) // find array for name using english
      this.setState({
        pokemonDescription: data.flavor_text_entries[1].flavor_text
      })
    } catch (e) {
      console.log('the error was', e)
    }
  }

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

  handleSelect = async (event, data) => {
    console.log(data.id)
    await this.setState({ pokemonIdName: data.id })
    // this.fetchPokemonData()
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
          onSelect={this.handleSelect}
        />
        <div className="Pokemon-content">
          <p>{this.state.pokemonData.id}</p>
          <p>{this.state.pokemonName}</p>
          <p>{this.state.pokemonDescription}</p>
          <img
            src={`/assets/sprites/${this.state.pokemonData.id}.png`}
            alt={this.state.pokemonName}
          />
        </div>
      </div>
    )
  }
}

export default App
