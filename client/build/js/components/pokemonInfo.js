/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js'],

function ($, React, reactBootstrap, api) {

	var PokemonInfo = React.createClass({displayName: 'PokemonInfo',
		render: function () {
			if (this.props.data === null) {
				return (
					React.DOM.div( {className:"selected-container flexContainer"}, 
						React.DOM.div( {className:"img-container"} ),
						React.DOM.div( {className:"info-container flexNone"} ),
						React.DOM.div( {className:"ability-container flexNone"} ),
						React.DOM.div( {className:"stat-container form-horizontal flexNone"} )
					)
				);
			}

			var image = '';//'http://www.pkparaiso.com/imagenes/xy/sprites/animados'+(this.props.data.shiny?'-shiny/':'/')+this.props.data.pokemon.name.toLowerCase()+'.gif';

			return (
				React.DOM.div( {className:"selected-container flexContainer"}, 
					React.DOM.div( {className:"img-container"}, 
						React.DOM.img( {src:image, className:"center-img", alt:"Pokemon Sprite"} )
					),
					React.DOM.div( {className:"info-container form-horizontal flexNone"}, 
						 this.renderLabeledInput('Name', 'nick'), 
						 this.renderLabeledInput('Level', 'level'), 
						 this.renderLabeledInput('Shiny', 'shiny', 'checkbox'), 
						React.DOM.input( {type:"radio", name:"gender", value:"m"} ),
						React.DOM.input( {type:"radio", name:"gender", value:"f", checked:"checked"} ),
						 this.renderLabeledInput('Nature', 'nature', 'button') 
					),
					React.DOM.div( {className:"ability-container form-horizontal flexNone"}, 
						 this.renderLabeledInput('Item', 'item', 'button'), 
						 this.renderLabeledInput('Ability', 'ability', 'button'), 
						 this.renderLabeledInput('', 'move1', 'button'), 
						 this.renderLabeledInput('', 'move2', 'button'), 
						 this.renderLabeledInput('', 'move3', 'button'), 
						 this.renderLabeledInput('', 'move4', 'button') 
					),
					React.DOM.div( {className:"stat-container form-horizontal flexNone"}, 
						React.DOM.div( {className:"col-sm-6"}, 
							 this.renderLabeledInput('IV HP:', 'hpiv'), 
							 this.renderLabeledInput('IV Atk:', 'atkiv'), 
							 this.renderLabeledInput('IV Def:', 'defiv'), 
							 this.renderLabeledInput('IV SpAtk:', 'satkiv'), 
							 this.renderLabeledInput('IV SpDef:', 'sdefiv'), 
							 this.renderLabeledInput('IV Speed:', 'spdiv') 
						),
						React.DOM.div( {className:"col-sm-6"}, 
							 this.renderLabeledInput('EV HP:', 'hpev'), 
							 this.renderLabeledInput('EV Atk:', 'atkev'), 
							 this.renderLabeledInput('EV Def:', 'defev'), 
							 this.renderLabeledInput('EV SpAtk:', 'satkev'), 
							 this.renderLabeledInput('EV SpDef:', 'sdefev'), 
							 this.renderLabeledInput('EV Speed:', 'spdev') 
						)
					)
				)
			);
		},

		renderLabeledInput: function (label, key, type) {
			if (label !== '') {
				return (
					React.DOM.div( {className:"form-group"}, 
						React.DOM.label( {for:key, className:"col-sm-6 control-label"}, label),
						React.DOM.div( {className:"col-sm-6"}, 
							React.DOM.input( {type:type || "text", className:"form-control", id:key, onChange:this.onChange(key, type), value:this.props.data[key]} )
						)
					)
				);
			} else {
				return (
					React.DOM.div( {className:"form-group"}, 
						React.DOM.div( {className:"col-sm-12"}, 
							React.DOM.input( {type:type || "text", className:"form-control", id:key, onChange:this.onChange(key, type), value:this.props.data[key]} )
						)
					)
				);
			}
			
		},

		renderRadioGroup: function (label, key, values) {

		},

		onChange: function (key, type) {
			return function (e) {
				var state = $.extend(true, {}, this.props.data);
				state[key] = type === 'checkbox' ? e.target.checked : e.target.value;

				this.props.setTeamMember(state, this.props.index);
			}.bind(this);
		}
	});

	return PokemonInfo;
});