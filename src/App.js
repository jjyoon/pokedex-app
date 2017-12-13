import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import Search from './components/Search'

class App extends Component {
  state = {
    pokemonData: [],
    pokemonId: 150,
    pokemonName: '',
    pokemonIdAndName: '',
    pokemonImg: '',
    pokemonDescription: '',
    loading: true
  }

  componentDidMount() {
    this.fetchPokemonData()
  }

  fetchPokemonData = async () => {
    try {

      this.setState({ loading: true })

      const { data } = await axios.get(
        `https://cors.now.sh/https://pokeapi.co/api/v2/pokemon-species/${this
          .state.pokemonId}`
      )
      await this.setState({ pokemonData: data })
      // console.log(this.state.pokemonData);
      await this.findEnglishVersion()

      await this.setState({
        pokemonIdAndName: data.id + '. ' + this.state.pokemonName,
        pokemonId: data.id,
      })

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

    const englishDescription = dataArray.flavor_text_entries.find(function(item,index) {
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
    await this.setState({ pokemonIdAndName: data.label })
    await this.setState({ pokemonId: data.id })
    this.fetchPokemonData()
  }

  render() {

    const isLoading = this.state.loading

    let PokemonContent = null
    if (isLoading) {
      PokemonContent = <h1>loading!</h1>
    } else {
      PokemonContent = (
        <div>
        <p>{this.state.pokemonId}</p>
        <p>{this.state.pokemonName}</p>
        <p>{this.state.pokemonDescription}</p>
        <img
          src={`/assets/sprites/${this.state.pokemonData.id}.png`}
          alt={this.state.pokemonName}
        />
        </div>
      )
    }

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
          value={this.state.pokemonIdAndName}
          onChange={this.handleSearchChange}
          onClick={this.handleSearch}
          onKeyPress={this.handleEnterPress}
          onSelect={this.handleSelect}
        />
        <div className="Pokemon-content" loading={this.state.loading}>
          {PokemonContent}
        </div>
      </div>
    )
  }
}

export default App
