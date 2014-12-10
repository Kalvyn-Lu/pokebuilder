define(['react','jquery'], function (React, $) {
    return {
        propTypes: {
            options:        React.PropTypes.array.isRequired,
            selected:       React.PropTypes.any,

            onSelected:     React.PropTypes.func.isRequired,
            onRemove:       React.PropTypes.func.isRequired,

            multiple:       React.PropTypes.any,
            placeholder:    React.PropTypes.string,
            noResultsText:  React.PropTypes.string,
            noOptionsText:  React.PropTypes.string,
        },
        getInitialState: function () {
            return {
                isExpanded: false,
                searchText: '',
                selectedIndex: 0
            };
        },
        componentDidMount: function () {
            $(document).bind('click', this.tryCloseDropdown);
        },
        componentWillUnmount: function () {
            $(document).unbind('click', this.tryCloseDropdown);
        },
        componentDidUpdate: function () {
            
        },
        stopPropagation: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        tryCloseDropdown: function (e) {
            var $target = $(e.target);
            var closest = $target.closest(this.getDOMNode());

            if (closest.length === 0) {
                this.setState({ isExpanded: false, searchText: '' });
            }
        },
        openDropdown: function (e) {
            this.setState({ isExpanded: true });

            $('input', $(this.getDOMNode())).focus();

            this.stopPropagation(e);
        },
        onItemSelected: function (a) {
            return function () {
                this.props.onSelected(a);

                this.setState({ isExpanded: false, searchText: '', selectedIndex: 0 });
            }.bind(this);
        },
        onItemRemoved: function (a) {
            return function (e) {
                this.props.onRemove(a);

                this.stopPropagation(e);
            }.bind(this);
        },
        onFilterChange: function (e) {
            this.setState({ searchText: e.target.value, selectedIndex: 0, isExpanded: true });
        },
        onMouseEnter: function (i) {
            return function (e) {
                this.setState({ selectedIndex: i });
            }.bind(this);
        },
        onKeyDown: function (e) {
            var filtOptions = this.props.options.filter(function (a) { return a.indexOf(this.state.searchText) !== -1; }.bind(this));
            var selected = filtOptions[this.state.selectedIndex];
            var wasArrow = e.keyCode === 40 || e.keyCode === 38;
            var adjust;

            switch (e.keyCode) {
                case 13:
                    this.onItemSelected(selected)();
                    break;
                case 40: //Down arrow
                    adjust = this.state.selectedIndex + 1;
                    if (this.state.selectedIndex == 0 && !this.state.isExpanded) {
                        adjust = 0;
                    }
                    
                    while (filtOptions[adjust] && this.props.selected.indexOf(filtOptions[adjust]) !== -1) {
                        adjust++;
                    }

                    this.setState({ selectedIndex: Math.min(filtOptions.length - 1, adjust), isExpanded: true });
                    break;
                case 38: //Up arrow
                    adjust = this.state.selectedIndex - 1;
                    while (filtOptions[adjust] && this.props.selected.indexOf(filtOptions[adjust]) !== -1) {
                        adjust--;
                    }

                    this.setState({ selectedIndex: Math.max(0, adjust), isExpanded: (adjust !== -1) });
                    break;
                case 27: //Escape key
                    this.setState({ selectedIndex: 0, isExpanded: false });
                    $(this.getDOMNode()).find('input').blur();
                    break;
                default:
                    break;
            }

            if (wasArrow && adjust !== -1 && adjust !== filtOptions.length) {
                var resultsPanel = $(this.refs['results'].getDOMNode());
                var selectedChild = resultsPanel.children()[adjust];

                var value = resultsPanel.scrollTop();
                if (selectedChild.offsetTop > resultsPanel.scrollTop() + resultsPanel[0].clientHeight - selectedChild.clientHeight * 2 - 1) {
                    value = selectedChild.offsetTop - resultsPanel[0].clientHeight + selectedChild.clientHeight * 2;
                }
                if (selectedChild.offsetTop < resultsPanel.scrollTop() + 1) {
                    value = selectedChild.offsetTop - selectedChild.clientHeight;
                }
                
                resultsPanel.scrollTop(value);
            }
        },

        highlightEntry: function (i) {
            this.setState({ selectedIndex: i });
        }
    };
});