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
	
	var IndexView = React.createClass({displayName: 'IndexView',
		mixins: [ruleStore.mixin],
		getInitialState: function () {
			return {
				team: [null,null,null,null,null,null],
				index: 0
			}
		},
		render: function () {
			var team = this.state.team.map(function (member, i) {
				return PokemonFrame( {data:member, selectedIndex:this.state.index, index:i, onSelect:this.onSelect} );
			}.bind(this));

			var selected = PokemonEditor( {data:this.state.team[this.state.index], index:this.state.index, setTeamMember:this.setTeamMember, onSelect:this.onSelect} );

			return React.DOM.div( {className:"flexContainer flexColumn siteContent"}, 
						React.DOM.h5(null, "Rule Set"),
						ButtonGroup(null, 
							Button( {onClick:this.setRuleSet('vgc'), className:(this.state.ruleset === 'vgc'?'btn-primary':'')}, "VGC"),
							Button( {onClick:this.setRuleSet('smogon'), className:(this.state.ruleset === 'smogon'?'btn-primary':'')}, "SMOGON"),
							Button( {onClick:this.setRuleSet('po'), className:(this.state.ruleset === 'po'?'btn-primary':'')}, "PO")
						),
						React.DOM.div( {className:"team-container"},  team ),
						 selected 
					)
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
		React.renderComponent(IndexView(null ), $('#main')[0]);
	}

	return init;
});