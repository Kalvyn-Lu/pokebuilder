/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/stores/store.js',
'build/js/components/sortedTableMixin.js',
'build/js/utility/types.js'],

function ($, React, reactBootstrap, api, ruleStore, sortedTableMixin, TYPES) {
	var Panel = reactBootstrap.Panel;

	var PokemonInfo = React.createClass({
		mixins: [ruleStore.mixin, sortedTableMixin],
		getInitialState: function () {
			return {
				moves: [],
				items: [],
				natures: [],
				abilities: [],

				focusKey: '',
				focusType: ''
			}
		},
		componentDidMount: function () {
			this.updateIndendentFields(this.state.ruleset);
		},
		componentWillReceiveProps: function (next) {
			if ((next.data && !this.props.data) || (next.data && this.props.data.pokemon.id !== next.data.pokemon.id && next.data.pokemon.id !== null)) {
				this.updateDependantFields(this.state.ruleset, next.data.pokemon.id);
			}
		},
		onRuleChangeHook: function (ruleset) {
			this.updateIndendentFields(ruleset);

			if (this.props.data) {
				this.updateDependantFields(ruleset, this.props.data.pokemon.id);	
			}
		},
		updateIndendentFields: function (ruleset) {
			api.getItems(ruleset, function (resp) {
				this.setState({ items: resp });
			}.bind(this));
			api.getNatures(ruleset, function (resp) {
				this.setState({ natures: resp });
			}.bind(this));
		},
		updateDependantFields: function (ruleset, id) {
			api.getAbilities(ruleset, id, function (resp) {
				this.setState({ abilities: resp });
			}.bind(this));
			api.getMoves(ruleset, id, function (resp) {
				this.setState({ moves: resp });
			}.bind(this));
		},
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

			var image = 'http://www.pkparaiso.com/imagenes/xy/sprites/animados'+(this.props.data.shiny?'-shiny/':'/')+this.props.data.pokemon.name.toLowerCase()+'.gif';

			var focused = this.state.focusKey !== '' ? this.state[this.state.focusType] : [];
			var data = focused.slice(0).sort(this.sortData);
			var headers = Object.keys(focused[0] || {});
			var sortIcon = this.renderSortIcon();

			return (
				<div>
					<div className="selected-container flexContainer">
						<div className="img-container">
							<img src={image} className="center-img" alt="Pokemon Sprite" />
						</div>
						<div className="info-container form-horizontal flexNone">
							{ this.renderLabeledInput('Name', 'nick') }
							{ this.renderLabeledInput('Level', 'level') }
							{ this.renderLabeledInput('Shiny', 'shiny', 'checkbox') }
							{ this.renderFocuser('Nature', 'nature', 'natures') }
						</div>
						<div className="ability-container form-horizontal flexNone">
							{ this.renderFocuser('Item', 'item', 'items') }
							{ this.renderFocuser('Ability', 'ability', 'abilities') }
							{ this.renderFocuser('Move 1', 'move1', 'moves') }
							{ this.renderFocuser('Move 2', 'move2', 'moves') }
							{ this.renderFocuser('Move 3', 'move3', 'moves') }
							{ this.renderFocuser('Move 4', 'move4', 'moves') }
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
					<Panel header={this.state.focusType} key={2} style={{'margin-top':'10px', 'display':(focused.length === 0 ? 'none':'')}}>
						<table className="table table-striped result-table">
							<thead>
								<tr>
								{
									headers.map(function (a) {
										return (
											<th onClick={this.onSortColumn(a)} className="relative">
												{a}
												{ this.state.sortKey === a ? sortIcon : null }
											</th>
										);
									}.bind(this))
								}
								</tr>
							</thead>
							<tbody>
							{
								data.map(function (a) {
									return (
										<tr onClick={this.onSelectOption(a)} style={{'cursor':'pointer'}}>
										{
											headers.map(function (key) {
												var text = a[key];
												if (key.indexOf('type') !== -1) {
													text = TYPES[a[key]];
												}

												return <td>{text}</td>;
											})
										}
										</tr>
									);
								}.bind(this))
							}
							</tbody>
						</table>
					</Panel>
				</div>
			);
		},

		renderLabeledInput: function (label, key, type) {
			if (label !== '') {
				return (
					<div className="form-group">
						<label for={key} className="col-sm-5 control-label">{label}</label>
						<div className="col-sm-7">
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

		renderFocuser: function (label, key, type) {
			return (
				<div className="form-group">
					<label for={key} className="col-sm-5 control-label">{label}</label>
					<div className="col-sm-7">
						<button type="button" className="btn form-control" onClick={this.onFocusType(key, type)}>{this.props.data[key] || '-'}</button>
					</div>
				</div>
				
			);
		},

		onFocusType: function (key, type) {
			return function () {
				this.setState({ focusKey: key, focusType: type });
			}.bind(this);
		},

		onChange: function (key, type) {
			return function (e) {
				var state = $.extend(true, {}, this.props.data);
				state[key] = type === 'checkbox' ? e.target.checked : e.target.value;

				this.props.setTeamMember(state, this.props.index);
			}.bind(this);
		},

		onSelectOption: function (a) {
			return function () {
				var state = $.extend(true, {}, this.props.data);
				state[this.state.focusKey] = a.name;

				this.props.setTeamMember(state, this.props.index);
				this.setState({ focusKey: '', focusType: '' });
			}.bind(this);
		}
	});

	return PokemonInfo;
});