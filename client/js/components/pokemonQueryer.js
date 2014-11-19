/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/pokemonFilterer.js',
'build/js/components/sortedTableMixin.js',
'build/js/stores/store.js'],

function ($, React, reactBootstrap, api, PokemonFilterer, sortedTableMixin, ruleStore) {
	var Panel = reactBootstrap.Panel;
	var PanelGroup = reactBootstrap.PanelGroup;

	var PokemonQueryer = React.createClass({
		mixins: [sortedTableMixin, ruleStore.mixin],
		getInitialState: function () {
			return {
				results: [],

				filters: {},

				isDirty: false,
			}
		},
		componentDidMount: function () {
			this.queryPokemon();
		},
		componentDidUpdate: function () {
			if (this.state.isDirty) {
				this.queryPokemon();
			}

			this.state.isDirty = false;
		},
		onRuleChangeHook: function (rule) {
			this.setState({ isDirty: true });
		},
		queryPokemon: function () {
			api.getPokemon(this.state.ruleset, {}, function(results) {
				this.setState({ results: results });
			}.bind(this));
		},
		render: function () {
			var headers = ['name','type1','type2','hp','atk','def','satk','sdef','spd'];
			var sortIcon = this.renderSortIcon();

			var asc = this.state.sortAsc ? 1 : -1;
			var data = this.state.results.slice(0).sort(this.sortData);

			return (
				<div className="query-container">
					<PokemonFilterer onFilterChange={this.onFilterChange} />
					<Panel header="Results" key={2}>
						<table className="table table-striped result-table">
							<thead>
								<tr>
									<th></th>
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
									var imgSrc = "http://www.pkparaiso.com/imagenes/xy/sprites/animados/"+a.name.toLowerCase()+".gif";

									return (
										<tr key={a.name} onClick={this.setTeamMember(a)}>
											<td className="relative"><img src={imgSrc} className="center-img" /></td>
											<td>{a.name}</td>
											<td>{a.type1}</td>
											<td>{a.type2}</td>
											<td>{a.hp}</td>
											<td>{a.atk}</td>
											<td>{a.def}</td>
											<td>{a.satk}</td>
											<td>{a.sdef}</td>
											<td>{a.spd}</td>
										</tr>
									);
								}.bind(this))
							}
							</tbody>
						</table>
					</Panel>
				</div>
			)
		},

		setTeamMember: function (pokemon) {
			return function () {
				var model = this.modelFromPokemon(pokemon);

				this.props.setTeamMember(model, this.props.index);
				this.props.onSelect(model, this.props.index);
			}.bind(this);
		},

		modelFromPokemon: function (pokemon) {
			return {
				pokemon: pokemon,
				nick: pokemon.name,
				level: 100,
				shiny: false,
				nature: '',
				item: '',
				ability: '',
				move1: '',
				move2: '',
				move3: '',
				move4: '',
				hpiv: 31,
				hpev: 0,
				atkiv: 31,
				atkev: 0,
				defiv: 31,
				defev: 0,
				satkiv: 31,
				satkev: 0,
				sdefiv: 31,
				sdefev: 0,
				spdiv: 31,
				spdev: 0
			};
		},

		onFilterChange: function (filters) {
			this.setState({ filters: filters, isDirty: true });
		}
	});

	return PokemonQueryer;
});


