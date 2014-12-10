/** @jsx React.DOM */
define(['jquery','react', './chosenMixin'], function ($, React, chosenMixin) {
	var ChosenSingleSelect = React.createClass({
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
				<div className={parentClass} >
					<a className="chosen-single" onClick={this.openDropdown}>
						<span>{this.props.selected || this.props.placeholder}</span>
						<div>
							<b>
							</b>
						</div>
					</a>
					<div className="chosen-drop">
						<div className="chosen-search">
							<input type="text" value={this.state.searchText} onChange={this.onFilterChange} onKeyDown={this.onKeyDown} onClick={this.openDropdown} />
						</div>
						<ul ref="results" className="chosen-results">
						{
							options.map(function (a,i) {
								var className = this.props.selected === a || a.isFlagText ? 'result-selected group-option' : 'active-result group-option';
								className += i === this.state.selectedIndex ? ' selected' : '';

								var text = a.text || a;
								if (this.state.searchText !== '') {
									text = text.split(this.state.searchText).reduce(function (a,b,i,c) {
										if (i !== c.length - 1) {
											return a.concat([b,<span className="underlined">{this.state.searchText}</span>]);
										}

										return a.concat(b);
									}.bind(this), []);
								}

								return <li className={className} onClick={this.onItemSelected(a)} onMouseOver={this.onMouseEnter(i)}>{text}</li>;
							}.bind(this))
						}
						</ul>
					</div>
				</div>
	        );
		}
	});

	return ChosenSingleSelect;
});