/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js'],

function ($, React, reactBootstrap, api) {
	var generateClassName = function (obj) {
		var str = '';
		for (key in obj) {
			if (obj[key]) {
				str += key + " ";
			}
		}

		return str;
	};

	var PokemonFrame = React.createClass({
		render: function () {
			var content = null;
			if (this.props.data !== null) {
				var image = 'http://www.pkparaiso.com/imagenes/xy/sprites/animados'+(this.props.data.shiny?'-shiny/':'/')+this.props.data.pokemon.name.toLowerCase()+'.gif';
				content = [
					<h5>{this.props.data.nick}</h5>,
					<img src={image} alt="Pokemon Sprite" />
				];
			}

			className = generateClassName({
				"portrait": true,
				"selected": this.props.index === this.props.selectedIndex
			});

			return (
				<div className={className} onClick={this.onSelect}>
					{content}
				</div>
			);
		},

		onSelect: function () {
			this.props.onSelect(this.props.data, this.props.index);
		}
	});

	return PokemonFrame;
});