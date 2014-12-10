define(['jquery',
'build/js/dispatcher.js',
'build/js/api/api.js'],

function ($, dispatcher, api) {
	var selectedId = 0;
	var options = [];
	var changeListeners = [];

	var store = {
		addChangeListener: function (callback) {
			changeListeners.push(callback);
		},

		removeChangeListener: function (callback) {
			changeListeners = changeListeners.filter(function (a) {
				return a !== callback;
			});
		},

		notifyListeners: function () {
			changeListeners.forEach(function (a) {
				a(selectedId, options);
			});
		},
		getRules: function () {
			return options;
		},
		getRule: function () {
			return selectedId;
		},
		setRule: function (rule) {
			selectedId = rule.id;

			store.notifyListeners();
		}
	}

	api.getRulesets(function (resp) {
		options = resp;

		store.notifyListeners();
	});

	//Register this store to react appropriately to UI events
	dispatcher.register(function (action) {
		switch(action.type) {
			default:
				break;
		}
	});

	return {
		store: store,
		mixin: {
			getInitialState: function () {
				return {
					ruleset: store.getRule(),
					ruleOptions: store.getRules()
				}
			},
			componentDidMount: function () {
				store.addChangeListener(this.onRuleChange);
			},
			componentWillUnmount: function () {
				store.removeChangeListener(this.onRuleChange);
			},
			onRuleChange: function (selectedId, options) {
				this.setState({ ruleset: selectedId, ruleOptions: options });

				if (this.onRuleChangeHook) {
					this.onRuleChangeHook(selectedId, options);
				}
			}
		}
	};
});