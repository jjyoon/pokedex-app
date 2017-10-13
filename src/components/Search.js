import React, { Component } from 'react'

class Search extends Component {
  render() {
    return (
      <div>
        <input
          placeholder="Pokemon Name or Number"
          value={this.props.value}
          onChange={this.props.onChange}
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
