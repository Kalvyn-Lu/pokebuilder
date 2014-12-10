/** @jsx React.DOM */
define([
'jquery',
'react',
'react-bootstrap',
'build/js/api/api.js',
'build/js/components/sortedTableMixin.js'],

function ($, React, reactBootstrap, api, sortedTableMixin) {

	var MoveFilter = React.createClass({
		mixins: [sortedTableMixin],
		getInitialState: function () {
			return {
				stats: {
					minhp: 		'',
					minatk: 	'',
					mindef: 	'',
					minsatk: 	'',
					minsdef: 	'',
					minspd: 	'',
					maxhp: 		'',
					maxatk: 	'',
					maxdef: 	'',
					maxsatk: 	'',
					maxsdef: 	'',
					maxspd: 	'',
				}
			}
		},
		
		render: function () {
			return (
				<div>
					<div className="flexContainer">
						{ this.renderInputGroup('min') }
						{ this.renderInputGroup('max') }
					</div>
					<button type="button" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
				</div>
			);
		},

		renderInputGroup: function (group) {
			var keys = Object.keys(this.state.stats).filter(function (a) {
				return a.slice(0,3) === group;
			});

			return this.transferPropsTo(
				<div className="flex1">
				{
					keys.map(function (key) {
						return (
							<div className="form-group">
								<label for={key} className="col-sm-5 control-label">{key.slice(0,3)+' '+key.slice(3)}</label>
								<div className="col-sm-7">
									<input type="text" className="form-control" id={key} onChange={this.onChange(key)} value={this.state.stats[key]} />
								</div>
							</div>
						);
					}.bind(this))
				}
				</div>
			)
		},
		onChange: function (key) {
			return function (e) {
				var state = $.extend(true, {}, this.state.stats);
				state[key] = e.target.value;

				this.setState({ stats: state });
			}.bind(this);
		},
		onSubmit: function () {
			this.props.onFilterChange(this.state.stats);
		}
	});

	return MoveFilter;
});