/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/pokemonFrame.js',
'build/js/components/pokemonEditor.js',
'build/js/stores/store.js'],

function ($, React, reactBootstrap, api, PokemonFrame, PokemonEditor, ruleStore) {
	var ButtonGroup = reactBootstrap.ButtonGroup;
	var Button = reactBootstrap.Button;
	
	var IndexView = React.createClass({
		mixins: [ruleStore.mixin],
		getInitialState: function () {
			return {
				team: [null,null,null,null,null,null],
				index: 0
			}
		},
		render: function () {
			var team = this.state.team.map(function (member, i) {
				return <PokemonFrame data={member} selectedIndex={this.state.index} index={i} onSelect={this.onSelect} />;
			}.bind(this));

			var selected = <PokemonEditor data={this.state.team[this.state.index]} index={this.state.index} setTeamMember={this.setTeamMember} onSelect={this.onSelect} />;

			return <div className="flexContainer flexColumn siteContent">
						<h5>Rule Set</h5>
						<ButtonGroup>
							<Button onClick={this.setRuleSet('vgc')} className={(this.state.ruleset === 'vgc'?'btn-primary':'')}>VGC</Button>
							<Button onClick={this.setRuleSet('smogon')} className={(this.state.ruleset === 'smogon'?'btn-primary':'')}>SMOGON</Button>
							<Button onClick={this.setRuleSet('po')} className={(this.state.ruleset === 'po'?'btn-primary':'')}>PO</Button>
						</ButtonGroup>
						<div className="team-container">{ team }</div>
						{ selected }
					</div>
		},

		onSelect: function (selected, index) {
			this.setState({ index: index });
		},

		setTeamMember: function (member, index) {
			var team = $.extend(true, [], this.state.team);
			team[index] = member;

			this.setState({ team: team });
		},

		setRuleSet: function (rule) {
			return function () {
				ruleStore.store.setRule(rule);
			}.bind(this);
		}
	});

	function init() {
		React.renderComponent(<IndexView />, $('#main')[0]);
	}

	return init;
});