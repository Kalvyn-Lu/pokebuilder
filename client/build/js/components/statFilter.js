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
				stats: {}
			}
		},
		
		render: function () {
			
			return (
				React.DOM.div(null, 
					 this.renderInput('Min HP', 'hp'),
					" hp\tatk\tdef\tsatk\tsdef\tspd "+
					"stats "
				)
			);
		},

		renderInput: function (label, key) {

		}
	});

	return MoveFilter;
});