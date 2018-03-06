import React, { Component } from "react";
import ReactAutocomplete from "react-autocomplete";
// var EnglishPokemonList = require('./EnglishPokemonList').EnglishPokemonList
import { EnglishPokemonList } from "./EnglishPokemonList";
import styled from "styled-components";

class Search extends Component {
	state = {
		value: "",
		pokemonList: EnglishPokemonList
	};

	componentWillMount() {
		var pokemonNameArray = this.state.pokemonList
			.slice(0, 151) // only up to first 150 pokemon
			.map(function(item, index) {
				index = index + 1;
				return { id: index, label: index + ". " + item };
			});
		this.setState({ pokemonList: pokemonNameArray });
	}

	render() {
		return (
			<div className="c-search">
				<ReactAutocomplete
					items={this.state.pokemonList}
					shouldItemRender={(item, value) =>
						item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
					}
					getItemValue={item => item.label}
					renderItem={(item, highlighted) => (
						<div
							key={item.id}
							style={{
								padding: "5px",
								backgroundColor: highlighted ? "#ccc" : "transparent"
							}}
							onMouseEnter={() => {
								console.log("hi");
							}}
						>
							{item.label}
						</div>
					)}
					value={this.props.value}
					onChange={this.props.onChange}
					onSelect={this.props.onSelect}
					onKeyPress={this.props.onKeyPress}
					menuStyle={{
						color: "#000",
						borderRadius: "3px",
						boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
						background: "rgba(255, 255, 255, 0.9)",
						fontSize: "90%",
						top: "auto",
						left: "auto",
						marginTop: "5px",
						textAlign: "left",
						position: "fixed",
						overflow: "auto",
						maxHeight: "300px" // TODO: don't cheat, let it flow to the bottom
					}}
					inputProps={{
						placeholder: "Pokemon Name/Number"
					}}
				/>

				<button
					type="submit"
					onClick={this.props.onClick}
					className="c-search__button"
				>
					Go
				</button>
			</div>
		);
	}
}

// const SearchButton = styled.button`
// 	position: absolute;
// 	top: 50%;
// 	transform: translateY(-50%);
// 	right: 5px;
// 	height: 40px;
// 	width: 70px;
// 	background: #21d37a;
// 	color: #fff;
// 	border: none;
// 	border-radius: 20px;
// 	font-family: "Nunito", sans-serif;
// 	text-transform: uppercase;
// `;

// const SearchBarContainer = styled.div`
// 	position: relative;
// 	color: black;
// 	overflow: hidden;
// 	text-align: left;
//
// 	input {
// 		position: relative;
// 		height: 50px;
// 		width: 275px;
// 		padding-left: 20px;
// 		border: none;
// 		border-radius: 25px;
// 		font-family: "Nunito", sans-serif;
// 	}
// `;

export default Search;
