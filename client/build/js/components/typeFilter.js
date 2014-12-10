/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/sortedTableMixin.js',
'build/js/utility/types.js',
'build/js/components/chosen.js'],

function ($, React, reactBootstrap, api, sortedTableMixin, TYPES, Chosen) {

	var MoveFilter = React.createClass({displayName: 'MoveFilter',
		mixins: [sortedTableMixin],
		getInitialState: function () {
			return {
				types: []
			}
		},

		render: function () {

			return (
				React.DOM.div(null, 
					Chosen( {multiple:true, options:TYPES, selected:this.state.types, onSelected:this.onSelect, onRemove:this.onRemove, placeholder:"Select a type..."} )
				)
			);
		},
		onSelect: function (type) {
			var types = this.state.types.concat(type);
			
			this.setState({ types: types });
			this.props.onFilterChange(types);
		},
		onRemove: function (type) {
			var types = this.state.types.filter(function (a) {
				return a !== type;
			});

			this.setState({ types: types });
			this.props.onFilterChange(types);
		}
	});

	return MoveFilter;
});