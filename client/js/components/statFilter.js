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
			
			return (
				<div>
					{ this.renderInput('Min HP', 'hp')}
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