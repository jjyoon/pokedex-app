import React, { Component } from 'react'
import ReactAutocomplete from 'react-autocomplete'
// var EnglishPokemonList = require('./EnglishPokemonList').EnglishPokemonList
import { EnglishPokemonList } from './EnglishPokemonList'
import styled from 'styled-components'

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
      <SearchBarContainer>
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

        <SearchButton type="submit" onClick={this.props.onClick} className="c-search__button">
          Go
        </SearchButton>
      </SearchBarContainer>
    )
  }
}

const SearchButton = styled.button`
  background: green;
  color: #fff;
  border-radius: 10px;
  margin-left: -40px;
  overflow: hidden;
`

const SearchBarContainer = styled.div`
  color: black;
  overflow: hidden;
  border-radius: 10px;
`

export default Search
