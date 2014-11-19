/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js'],

function ($, React, reactBootstrap, api) {

	var PokemonInfo = React.createClass({
		render: function () {
			if (this.props.data === null) {
				return (
					<div className="selected-container flexContainer">
						<div className="img-container" />
						<div className="info-container flexNone" />
						<div className="ability-container flexNone" />
						<div className="stat-container form-horizontal flexNone" />
					</div>
				);
			}

			var image = '';//'http://www.pkparaiso.com/imagenes/xy/sprites/animados'+(this.props.data.shiny?'-shiny/':'/')+this.props.data.pokemon.name.toLowerCase()+'.gif';

			return (
				<div className="selected-container flexContainer">
					<div className="img-container">
						<img src={image} className="center-img" alt="Pokemon Sprite" />
					</div>
					<div className="info-container form-horizontal flexNone">
						{ this.renderLabeledInput('Name', 'nick') }
						{ this.renderLabeledInput('Level', 'level') }
						{ this.renderLabeledInput('Shiny', 'shiny', 'checkbox') }
						<input type="radio" name="gender" value="m" />
						<input type="radio" name="gender" value="f" checked="checked" />
						{ this.renderLabeledInput('Nature', 'nature', 'button') }
					</div>
					<div className="ability-container form-horizontal flexNone">
						{ this.renderLabeledInput('Item', 'item', 'button') }
						{ this.renderLabeledInput('Ability', 'ability', 'button') }
						{ this.renderLabeledInput('', 'move1', 'button') }
						{ this.renderLabeledInput('', 'move2', 'button') }
						{ this.renderLabeledInput('', 'move3', 'button') }
						{ this.renderLabeledInput('', 'move4', 'button') }
					</div>
					<div className="stat-container form-horizontal flexNone">
						<div className="col-sm-6">
							{ this.renderLabeledInput('IV HP:', 'hpiv') }
							{ this.renderLabeledInput('IV Atk:', 'atkiv') }
							{ this.renderLabeledInput('IV Def:', 'defiv') }
							{ this.renderLabeledInput('IV SpAtk:', 'satkiv') }
							{ this.renderLabeledInput('IV SpDef:', 'sdefiv') }
							{ this.renderLabeledInput('IV Speed:', 'spdiv') }
						</div>
						<div className="col-sm-6">
							{ this.renderLabeledInput('EV HP:', 'hpev') }
							{ this.renderLabeledInput('EV Atk:', 'atkev') }
							{ this.renderLabeledInput('EV Def:', 'defev') }
							{ this.renderLabeledInput('EV SpAtk:', 'satkev') }
							{ this.renderLabeledInput('EV SpDef:', 'sdefev') }
							{ this.renderLabeledInput('EV Speed:', 'spdev') }
						</div>
					</div>
				</div>
			);
		},

		renderLabeledInput: function (label, key, type) {
			if (label !== '') {
				return (
					<div className="form-group">
						<label for={key} className="col-sm-6 control-label">{label}</label>
						<div className="col-sm-6">
							<input type={type || "text"} className="form-control" id={key} onChange={this.onChange(key, type)} value={this.props.data[key]} />
						</div>
					</div>
				);
			} else {
				return (
					<div className="form-group">
						<div className="col-sm-12">
							<input type={type || "text"} className="form-control" id={key} onChange={this.onChange(key, type)} value={this.props.data[key]} />
						</div>
					</div>
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