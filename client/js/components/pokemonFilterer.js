/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/moveFilter.js',
'build/js/components/statFilter.js',
'build/js/components/typeFilter.js'],

function ($, React, reactBootstrap, api, MoveFilter, StatFilter, TypeFilter) {
	var Panel = reactBootstrap.Panel;
	var PanelGroup = reactBootstrap.PanelGroup;

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
			this.setState({ moves: filter });
			this.props.onFilterChange(this.state);
		},
		onStatFilterChange: function (filter) {
			this.setState({ stats: filter });
			this.props.onFilterChange(this.state);
		},
		onTypeFilterChange: function (filter) {
			this.setState({ types: filter });
			this.props.onFilterChange(this.state);
		},
	});

	return PokemonFilterer;
});




// { this.renderLabeledInput('IV HP:', 'hpiv') }
// 							{ this.renderLabeledInput('IV Atk:', 'atkiv') }
// 							{ this.renderLabeledInput('IV Def:', 'defiv') }
// 							{ this.renderLabeledInput('IV SpAtk:', 'satkiv') }
// 							{ this.renderLabeledInput('IV SpDef:', 'sdefiv') }
// 							{ this.renderLabeledInput('IV Speed:', 'spdiv') }