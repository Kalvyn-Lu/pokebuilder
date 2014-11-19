/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/pokemonQueryer.js',
'build/js/components/pokemonInfo.js'],

function ($, React, reactBootstrap, api, PokemonQueryer, PokemonInfo) {

	var PokemonEditor = React.createClass({displayName: 'PokemonEditor',
		getInitialState: function () {
			return {
				displayIndex: this.props.data === null ? 0 : 1
			};
		},
		componentWillReceiveProps: function (next) {
			if (next.index !== this.props.index) {
				var display = next.data === null ? 0 : 1;
				
				this.setState({ displayIndex: display });
			}
		},
		render: function () {
			var margin = -1200 * this.state.displayIndex;
			var buttons = [];
			if (this.state.displayIndex === 0 && this.props.data === null) {

			}

			return (
				React.DOM.div( {className:"sliding-viewport"}, 
					React.DOM.div( {className:"sliding-container", style:{'margin-left': margin + 'px'}}, 
						React.DOM.div( {className:"sliding-child"}, 
							PokemonQueryer( {data:this.props.data, index:this.props.index, setTeamMember:this.setTeamMember, onSelect:this.props.onSelect} )
						),
						React.DOM.div( {className:"sliding-child"}, 
							PokemonInfo( {data:this.props.data, index:this.props.index, setTeamMember:this.setTeamMember, onSelect:this.props.onSelect} )
						)
					)
				)
			);
		},

		setDisplayIndex: function (index) {
			return function () {
				this.setState({ displayIndex: index });
			}.bind(this);
		},

		setTeamMember: function (member, index) {
			this.props.setTeamMember(member, index);
			this.setState({ displayIndex: 1 });
		}
	});

	return PokemonEditor;
});