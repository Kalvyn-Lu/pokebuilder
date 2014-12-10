/** @jsx React.DOM */
define(['react','./chosenSingleSelect','./chosenMultiSelect'], function (React, ChosenSingleSelect, ChosenMultiSelect) {
	var Chosen = React.createClass({
		render: function () {
			var control = this.props.multiple ? <ChosenMultiSelect /> : <ChosenSingleSelect />;

			return this.transferPropsTo(control);
		}
	});

	return Chosen;
})