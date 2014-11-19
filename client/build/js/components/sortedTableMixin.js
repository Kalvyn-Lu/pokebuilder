/** @jsx React.DOM */
define(['react'], function (React) {
	return {
		getInitialState: function () {
			return {
				sortKey: 'name',
				sortAsc: true,
			}
		},
		onSortColumn: function (a) {
			return function () {
				var asc = this.state.sortKey === a ? !this.state.sortAsc : this.state.sortAsc;

				this.setState({ sortKey: a, sortAsc: asc });
			}.bind(this);
		},
		sortData: function (a,b) {
			var asc = this.state.sortAsc ? 1 : -1;
			var first = Number(a[this.state.sortKey]) || a[this.state.sortKey];
			var second = Number(b[this.state.sortKey]) || b[this.state.sortKey];

			return (first > second ? 1 : -1) * asc;
		},
		renderSortIcon: function () {
			return React.DOM.i( {className:'glyphicon ' + (this.state.sortAsc ? 'glyphicon-chevron-down' : 'glyphicon-chevron-up'), style:{'right':'10px','top':'12px','position':'absolute'}} );
		}
	};
})

