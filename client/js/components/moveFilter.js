/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/sortedTableMixin.js',
'build/js/stores/store.js'],

function ($, React, reactBootstrap, api, sortedTableMixin, ruleStore) {

	var MoveFilter = React.createClass({
		mixins: [sortedTableMixin, ruleStore.mixin],
		getInitialState: function () {
			return {
				moves: [],
				moveFilterText: '',
			}
		},

		componentDidMount: function () {
			api.getMoves(this.state.ruleset, null, function (resp) {
				this.setState({ moves: resp });
			}.bind(this));
		},
		onRuleChangeHook: function (data) {
			api.getMoves(this.state.ruleset, null, function (resp) {
				this.setState({ moves: resp });
			}.bind(this));
		},

		render: function () {
			var headers = Object.keys(this.state.moves[0] || {}).filter(function(a){ return a !== 'isChecked' });
			var data = this.state.moves.filter(this.moveFilter).sort(this.sortData);
			var sortIcon = this.renderSortIcon();

			return (
				<div>
					<div>
						<input className="form-control" placeholder="filter..." value={this.state.moveFilterText} onChange={this.onMoveFilterTextChange} />
					</div>
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
							data.map(function (move) {
								return (
									<tr key={move.name} onClick={this.onMoveSelectedChange(move)} className="pointer">
										<td><input type="checkbox" checked={move.isChecked} /></td>
										{	
											headers.map(function (a) {
												return <td>{move[a]}</td>;
											})
										}
									</tr>
								);
							}.bind(this))
						}
						</tbody>
					</table>
				</div>
			);
		},

		onMoveSelectedChange: function (move) {
			return function (e) {
				move = $.extend(true, {}, move);
				move.isChecked = !move.isChecked;
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