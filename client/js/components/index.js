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
			//

			return <div className="flexContainer flexColumn siteContent">
						<h5>Rule Set</h5>
						<div>
							<ButtonGroup className="left">
							{
								this.state.ruleOptions.map(function (a) {
									return <Button onClick={this.setRuleSet(a)} className={(this.state.ruleset === a.id?'btn-primary':'')}>{a.name}</Button>		
								}.bind(this))
							}
							</ButtonGroup>
							<button type="button" className="btn btn-primary right" onClick={this.translateToDownload}>Export Team</button>
						</div>
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
		},

		translateToDownload: function () {
			var text = this.state.team.map(this.translateHelper).join('\n\n');
			document.location = 'data:Application/octet-stream,' +
                         encodeURIComponent(text);
		},
		translateHelper: function (member) {
			if (member === null) {
				return '';
			}

			return (
				(member.pokemon.name !== member.nick ? (member.nick + ' ('+member.pokemon.name+')') : member.pokemon.name)+' ('+member.gender+') @ '+member.item+'\n'+
				(member.shiny? 'Shiny: Yes\n':'')+
				'Trait: '+member.ability+'\n'+
				'EVs: '+this.EVHelper(member)+'\n'+
				member.nature+' Nature'+'\n'+
				'- '+member.move1+'\n'+
				'- '+member.move2+'\n'+
				'- '+member.move3+'\n'+
				'- '+member.move4
			);
		},

		EVHelper: function (member) {
			var str = [];
			if (member.hpev > 0) {
				str.push(member.hpev + ' HP');
			}
			if (member.atkev > 0) {
				str.push(member.atkev + ' Atk');
			}
			if (member.defev > 0) {
				str.push(member.defev + ' Def');
			}
			if (member.satkev > 0) {
				str.push(member.satkev + ' SAtk');
			}
			if (member.sdefev > 0) {
				str.push(member.sdefev + ' SDef');
			}
			if (member.spdev > 0) {
				str.push(member.spdev + ' Spd');
			}

			return str.join(' / ');
		}
	});

	function init() {
		React.renderComponent(<IndexView />, $('#main')[0]);
	}

	return init;
});