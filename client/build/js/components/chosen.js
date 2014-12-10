/** @jsx React.DOM */
define(['react','./chosenSingleSelect','./chosenMultiSelect'], function (React, ChosenSingleSelect, ChosenMultiSelect) {
	var Chosen = React.createClass({displayName: 'Chosen',
		render: function () {
			var control = this.props.multiple ? ChosenMultiSelect(null ) : ChosenSingleSelect(null );

			return this.transferPropsTo(control);
		}
	});

	return Chosen;
})