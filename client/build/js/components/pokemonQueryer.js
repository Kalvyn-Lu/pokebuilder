/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/pokemonFilterer.js',
'build/js/components/sortedTableMixin.js',
'build/js/stores/store.js',
'build/js/utility/types.js'],

function ($, React, reactBootstrap, api, PokemonFilterer, sortedTableMixin, ruleStore, TYPES) {
	var Panel = reactBootstrap.Panel;
	var PanelGroup = reactBootstrap.PanelGroup;

	var PokemonQueryer = React.createClass({displayName: 'PokemonQueryer',
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
			var data = this.state.results.slice(0).sort(this.sortData);

			return (
				React.DOM.div( {className:"query-container"}, 
					PokemonFilterer( {onFilterChange:this.onFilterChange} ),
					Panel( {header:"Results", key:2}, 
						React.DOM.table( {className:"table table-striped result-table"}, 
							React.DOM.thead(null, 
								React.DOM.tr(null, 
									React.DOM.th(null),
									
										headers.map(function (a) {
											return (
												React.DOM.th( {onClick:this.onSortColumn(a), className:"relative"}, 
													a,
													 this.state.sortKey === a ? sortIcon : null 
												)
											);
										}.bind(this))
									
								)
							),
							React.DOM.tbody(null, 
							
								data.map(function (a) {
									var imgSrc = "http://www.serebii.net/pokedex-xy/icon/"+a.id+".png";

									return (
										React.DOM.tr( {key:a.name, onClick:this.setTeamMember(a)}, 
											React.DOM.td( {className:"relative"}, React.DOM.img( {src:imgSrc, className:"center-img"} )),
											React.DOM.td(null, a.name),
											React.DOM.td(null, TYPES[a.type1]),
											React.DOM.td(null, TYPES[a.type2]),
											React.DOM.td(null, a.hp),
											React.DOM.td(null, a.atk),
											React.DOM.td(null, a.def),
											React.DOM.td(null, a.satk),
											React.DOM.td(null, a.sdef),
											React.DOM.td(null, a.spd)
										)
									);
								}.bind(this))
							
							)
						)
					)
				)
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


