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
			//<button type="button" className="btn btn-primary" onClick={this.translateToDownload}>Export Team</button>

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
		},

		translateToDownload: function () {
			var onInitFs = function(fs) {

				fs.root.getFile('team.txt', {create: true}, function(fileEntry) {

				    // Create a FileWriter object for our FileEntry (log.txt).
				    fileEntry.createWriter(function(fileWriter) {

				    	fileWriter.onwriteend = function(e) {
				    		console.log('Write completed.');
				    	};

				    	fileWriter.onerror = function(e) {
				    		console.log('Write failed: ' + e.toString());
				    	};

				      // Create a new Blob and write it to log.txt.

				      var text = this.state.team.map(this.translateHelper).join('\n\n');
				      console.log(text);
				      var blob = new Blob([text], {type: 'text/plain'});

				      fileWriter.write(blob);

				  }.bind(this), errorHandler);

				}.bind(this), errorHandler);

			}.bind(this);

			var errorHandler = function () {};
			window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
			window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
		},
		translateHelper: function (member) {
			if (member === null) {
				return '';
			}

			return (
				member.pokemon.name+' ('+member.gender+') @ '+member.item+'\n'+
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