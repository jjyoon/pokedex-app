import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import 'normalize.css'
import axios from 'axios'
import Search from './components/Search'

class App extends Component {
  state = {
    pokemonData: [],
    pokemonId: parseInt(window.location.pathname.slice(1)) || 150,
    pokemonName: '',
    pokemonIdAndName: '',
    pokemonImg: '',
    pokemonDescription: '',
    loading: true
  }

  componentDidMount() {
    if (this.state.pokemonId) {
      this.fetchPokemonData()
    }
  }

  fetchPokemonData = async () => {
    try {
      this.setState({ loading: true })
      const pokemon = localStorage.getItem(`${this.state.pokemonId}`)
      if (pokemon) {
        var data = JSON.parse(pokemon)
      } else {
        var { data } = await axios.get(
          `https://cors.now.sh/https://pokeapi.co/api/v2/pokemon-species/${
            this.state.pokemonId
          }`
        )
        localStorage.setItem(`${this.state.pokemonId}`, JSON.stringify(data))
      }

      await this.setState({ pokemonData: data })
      // console.log(this.state.pokemonData);
      await this.findEnglishVersion()

      await this.setState({
        pokemonIdAndName: data.id + '. ' + this.state.pokemonName,
        pokemonId: data.id
      })

      await window.history.pushState(null, null, this.state.pokemonId)

      await this.setState({ loading: false })
    } catch (e) {
      console.log('the error was', e)
    }
  }

  findEnglishVersion = () => {
    const dataArray = this.state.pokemonData

    const englishName = dataArray.names.find(function(item, index) {
      return item.language.name === 'en'
    })
    this.setState({ pokemonName: englishName.name })

    const englishDescription = dataArray.flavor_text_entries.find(function(
      item,
      index
    ) {
      return item.language.name === 'en'
    })
    this.setState({ pokemonDescription: englishDescription.flavor_text })
  }

  handleSearchChange = event => {
    console.log(this.state.pokemonIdAndName)
    this.setState({ pokemonIdAndName: event.target.value })
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
    // await this.setState({ loading: true })
    await this.setState({ pokemonIdAndName: data.label })
    await this.setState({ pokemonId: data.id })
    this.fetchPokemonData()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pokedex</h1>
          <Search
            value={this.state.pokemonIdAndName}
            onChange={this.handleSearchChange}
            onClick={this.handleSearch}
            onKeyPress={this.handleEnterPress}
            onSelect={this.handleSelect}
          />
        </header>
        <div
          className="c-pokemon-content-container"
          loading={this.state.loading}
        >
          {this.state.loading ? (
            <h1>Loading!</h1>
          ) : (
            <div className="pokemon-content">
              <figure className="pokemon-image-container">
                <img
                  className="pokemon-image"
                  src={`/assets/sprites/${this.state.pokemonData.id}.png`}
                  alt={this.state.pokemonName}
                />
              </figure>
              <div className="pokemon-content__text-description">
                <p>{this.state.pokemonId}</p>
                <p>{this.state.pokemonName}</p>
                <p>{this.state.pokemonDescription}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}


export default App
