/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/moveFilter.js',
'build/js/components/statFilter.js',
'build/js/components/typeFilter.js',
'build/js/utility/types.js'],

function ($, React, reactBootstrap, api, MoveFilter, StatFilter, TypeFilter, TYPES) {
	var Panel = reactBootstrap.Panel;
	var PanelGroup = reactBootstrap.PanelGroup;

	var findTypeId = function (type) {
		var index = -1;
		for (var key in TYPES) {
			if (type === TYPES[key]) {
				return key;
			}
		}
	};

	var PokemonFilterer = React.createClass({
		getInitialState: function () {
			return {
				moves: {},
				stats: {},
				types: {}
			}
		},
		render: function () {
			return (
				<div>
					<PanelGroup accordion>
                        <Panel header="Filter By Move" key={1}>
                        	<MoveFilter onFilterChange={this.onMoveFilterChange} />
                        </Panel>
					</PanelGroup>
					<PanelGroup accordion>
                        <Panel header="Filter By Stat" key={2}>
                        	<StatFilter onFilterChange={this.onStatFilterChange} />
                        </Panel>
					</PanelGroup>
					<PanelGroup accordion>
                        <Panel header="Filter By Type" key={3}>
                        	<TypeFilter onFilterChange={this.onTypeFilterChange} />
                        </Panel>
					</PanelGroup>
				</div>
			);
		},
		onMoveFilterChange: function (filter) {
			var state = $.extend(false, {}, this.state);
			var transform = filter.filter(function (a) {
				return a.isChecked;
			}).reduce(function (a,b,i) {
				a['move' + (i+1)] = b;
				return a;
			});
			state.moves = transform;

			this.setState(state);
			this.props.onFilterChange(state);
		},
		onStatFilterChange: function (filter) {
			this.setState({ stats: filter });
			this.props.onFilterChange(this.state);
		},
		onTypeFilterChange: function (filter) {
			var state = $.extend(false, {}, this.state);
			var transform = filter.slice(0,2).reduce(function (a,b,i) {
				a['type' + (i+1)] = findTypeId(b);

				return a;
			}, {});
			state.types = transform;

			this.setState(state);
			this.props.onFilterChange(state);
		}
	});

	return PokemonFilterer;
});




// { this.renderLabeledInput('IV HP:', 'hpiv') }
// 							{ this.renderLabeledInput('IV Atk:', 'atkiv') }
// 							{ this.renderLabeledInput('IV Def:', 'defiv') }
// 							{ this.renderLabeledInput('IV SpAtk:', 'satkiv') }
// 							{ this.renderLabeledInput('IV SpDef:', 'sdefiv') }
// 							{ this.renderLabeledInput('IV Speed:', 'spdiv') }