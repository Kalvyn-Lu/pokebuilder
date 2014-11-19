/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/sortedTableMixin.js'],

function ($, React, reactBootstrap, api, sortedTableMixin) {

	var MoveFilter = React.createClass({
		mixins: [sortedTableMixin],
		getInitialState: function () {
			return {
				stats: {}
			}
		},
		
		render: function () {
			var headers = Object.keys(this.state.moves[0] || {}).filter(function(a){ return a !== 'isChecked' });
			var data = this.state.moves.filter(this.moveFilter).sort(this.sortData);
			var sortIcon = this.renderSortIcon();

			return (
				<div>
					hp	atk	def	satk	sdef	spd
					stats
				</div>
			);
		},

		renderInput: function (label, key) {
			
		}
	});

	return MoveFilter;
});