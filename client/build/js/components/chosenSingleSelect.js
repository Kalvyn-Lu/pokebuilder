/** @jsx React.DOM */
define(['jquery','react', './chosenMixin'], function ($, React, chosenMixin) {
	var ChosenSingleSelect = React.createClass({displayName: 'ChosenSingleSelect',
		mixins: [chosenMixin],
		render: function (argument) {
			var parentClass = "chosen-container chosen-container-single" + (this.state.isExpanded ? ' chosen-with-drop chosen-container-active' : '');

			var options = this.props.options.filter(function (a) { return a.indexOf(this.state.searchText) !== -1; }.bind(this));
			if (this.props.options.length === 0) {
				options = [{
					isFlagText: true,
					text: this.props.noOptionsText || 'Oops! There are no options to select from'
				}];
			} else if (options.length === 0) {
				options = [{
					isFlagText: true,
					text: (this.props.noResultsText || 'Oops! Couldn\'t find anything matching') + '"'+this.state.searchText+'"'
				}];
			}

			return this.transferPropsTo(
				React.DOM.div( {className:parentClass} , 
					React.DOM.a( {className:"chosen-single", onClick:this.openDropdown}, 
						React.DOM.span(null, this.props.selected || this.props.placeholder),
						React.DOM.div(null, 
							React.DOM.b(null
							)
						)
					),
					React.DOM.div( {className:"chosen-drop"}, 
						React.DOM.div( {className:"chosen-search"}, 
							React.DOM.input( {type:"text", value:this.state.searchText, onChange:this.onFilterChange, onKeyDown:this.onKeyDown, onClick:this.openDropdown} )
						),
						React.DOM.ul( {ref:"results", className:"chosen-results"}, 
						
							options.map(function (a,i) {
								var className = this.props.selected === a || a.isFlagText ? 'result-selected group-option' : 'active-result group-option';
								className += i === this.state.selectedIndex ? ' selected' : '';

								var text = a.text || a;
								if (this.state.searchText !== '') {
									text = text.split(this.state.searchText).reduce(function (a,b,i,c) {
										if (i !== c.length - 1) {
											return a.concat([b,React.DOM.span( {className:"underlined"}, this.state.searchText)]);
										}

										return a.concat(b);
									}.bind(this), []);
								}

								return React.DOM.li( {className:className, onClick:this.onItemSelected(a), onMouseOver:this.onMouseEnter(i)}, text);
							}.bind(this))
						
						)
					)
				)
	        );
		}
	});

	return ChosenSingleSelect;
});