/** @jsx React.DOM */
define(['react','jquery','./chosenMixin'], function (React, $, chosenMixin) {
	var ChosenMultiSelect = React.createClass({
		mixins: [chosenMixin],
		render: function() {
			var placeholder = !this.state.isExpanded && this.props.selected.length === 0 ? this.props.placeholder : '';
			var parentClass = "chosen-container chosen-container-multi" + (this.state.isExpanded ? ' chosen-with-drop chosen-container-active' : '');
			var width = 25 + (this.props.selected.length? this.state.searchText.length : this.props.placeholder.length) * 8 + 'px';

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
				<div className={parentClass}>
					<div className="chosen-choices" onClick={this.openDropdown}>
						{
							this.props.selected.map( function (a) {
								return (
									<li className="search-choice">
										{a}
										<i className="glyphicon glyphicon-remove" style={{'left':'auto','top':'2px','right':'1px','position':'absolute'}} onClick={this.onItemRemoved(a)}></i>
									</li>
								);
							}.bind(this))
						}
						<li className="search-field">
							<input type="text" value={this.state.searchText} onChange={this.onFilterChange} onKeyDown={this.onKeyDown} placeholder={placeholder} onClick={this.openDropdown} style={{'width':width,'max-width':'95%'}} />
						</li>
					</div>
					<div className="chosen-drop">
						<ul ref="results" className="chosen-results" >
						{	
							options.map(function (a,i) {
								var className = this.props.selected === a || this.props.selected.indexOf(a) !== -1 ? 'result-selected group-option' : 'active-result group-option';
								className += i === this.state.selectedIndex ? ' selected' : '';
								className = a.isFlagText ? 'no-results': className;

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

	return ChosenMultiSelect;
});