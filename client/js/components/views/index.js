/** @jsx React.DOM */
define([
'jquery',
'react',
'history'], 

function ($, React, _h) {
	
	var IndexView = React.createClass({
		ACTIVE_VIEW: {
			ROOT: '/'
		},

		getInitialState : function () {
			return {
				activeView: this.ACTIVE_VIEW.ROOT
			};
		},

		componentDidMount: function () {
			this.navigateURL();
			window.addEventListener('popstate', function(event) {
				this.navigateURL ();
			}.bind(this));

			History.replaceState({}, 'Pokebuilder', window.location.pathname);
		},

		navigateURL: function () {
			var tokens = window.location.pathname.split('/');

			switch(tokens[1]) {
				default:
					this.setState({ activeView : this.ACTIVE_VIEW.ROOT });
					break;
			}
		},

		render: function () {
			var content;
			switch(this.state.activeView) {
				case this.ACTIVE_VIEW.ROOT:
					content = <div>Main</div>;
					break;
			}

			return <div className="flexContainer flexColumn">
						<h3>PokeBuilder</h3>
						{content}
					</div>
		},

		changeView: function (index) {
			return $.proxy(function () {
				History.pushState({}, 'PokeBuilder', index);	
				this.setState({ activeView : index });

				if(index === this.ACTIVE_VIEW.ROOT) {
					this.setState(this.getInitialState());
				}
			}, this);
		}
	});

	function init() {
		React.renderComponent(<IndexView />, $('#container')[0]);
	}


	return init;
})