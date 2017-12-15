import React, { Component } from 'react'
import ReactAutocomplete from 'react-autocomplete'
// var EnglishPokemonList = require('./EnglishPokemonList').EnglishPokemonList
import { EnglishPokemonList } from './EnglishPokemonList'

class Search extends Component {
  state = {
    value: '',
    pokemonList: EnglishPokemonList
  }

  componentWillMount() {
    var pokemonNameArray = this.state.pokemonList.map(function(item, index) {
      index = index + 1
      return { id: index, label: index + '. ' + item }
    })
    this.setState({ pokemonList: pokemonNameArray })
  }

  render() {
    return (
      <div>
        <ReactAutocomplete
          items={this.state.pokemonList}
          shouldItemRender={(item, value) =>
            item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          getItemValue={item => item.label}
          renderItem={(item, highlighted) => (
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
            >
              {item.label}
            </div>
          )}
          value={this.props.value}
          onChange={this.props.onChange}
          onSelect={this.props.onSelect}
          onKeyPress={this.props.onKeyPress}
        />

        <button type="submit" onClick={this.props.onClick}>
          Search
        </button>
      </div>
    )
  }
}

export default Search
