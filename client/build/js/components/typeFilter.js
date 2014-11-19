/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/sortedTableMixin.js'],

function ($, React, reactBootstrap, api, sortedTableMixin) {

	var MoveFilter = React.createClass({displayName: 'MoveFilter',
		mixins: [sortedTableMixin],
		getInitialState: function () {
			return {
				moves: [],
				moveFilterText: ''
			}
		},

		componentDidMount: function () {
			
		},
		
		render: function () {
			var headers = Object.keys(this.state.moves[0] || {}).filter(function(a){ return a !== 'isChecked' });
			var data = this.state.moves.filter(this.moveFilter).sort(this.sortData);
			var sortIcon = this.renderSortIcon();

			return (
				React.DOM.div(null, 
					" types "
				)
			);
		},

		onMoveSelectedChange: function (move) {
			return function (e) {
				console.log('fired');
				move = $.extend(true, {}, move);
				move.isChecked = e.target.checked;
				moves = this.state.moves.map(function (a) {
					if (a.id === move.id) {
						return move;
					} else {
						return a;
					}
				});

				this.setState({ moves: moves });
			}.bind(this);
		},

		onMoveFilterTextChange: function (e) {
			this.setState({ moveFilterText: e.target.value });
		},

		moveFilter: function (move) {
			return this.state.moveFilterText === '' || move.name.indexOf(this.state.moveFilterText) !== -1;
		}
	});

	return MoveFilter;
});