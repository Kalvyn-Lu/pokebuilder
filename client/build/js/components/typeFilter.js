/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/sortedTableMixin.js',
'build/js/utility/types.js'],

function ($, React, reactBootstrap, api, sortedTableMixin, TYPES) {

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
				
					Object.keys(TYPES).map(function (a) {
						return (
							React.DOM.div( {className:"checkbox"}, 
								React.DOM.label(null, 
									React.DOM.input( {type:"checkbox", id:"types", checked:this.state.types.indexOf(a) !== -1, onChange:this.onChange(a), style:{'margin-right':'8px'}} ),
									 TYPES[a] 
								)
							)
						);
					}.bind(this))
				
				)
			);
		},

		onChange: function(a) {
			return function (e) {
				var types;
				if (e.target.checked) {
					types = this.state.types.concat(a);
				} else {
					types = this.state.types.filter(function (mem) {
						return mem !== a;
					});
				}
				

				this.setState({ types: types });
				this.props.onFilterChange(types);
			}.bind(this);
		},
	});

	return MoveFilter;
});