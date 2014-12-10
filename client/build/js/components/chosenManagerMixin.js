define([], function () {
	return {
		getInitialState: function () {
			return {
				selected: []
			};
		},
		onItemAdded: function (a) {
			this.setState({ selected: this.state.selected.concat(a) });
		},
		onItemRemoved: function (a) {
			this.setState({ selected: this.state.selected.filter(function (b) { return a !== b; }) });
		}
	};
});