define(['jquery',
'build/js/dispatcher.js',
'build/js/utility/cookies.js'],

function ($, dispatcher, cookies) {
	var data = 'vgc';
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
				a(data);
			});
		},
		getRule: function () {
			return data;
		},
		setRule: function (rule) {
			data = rule;

			store.notifyListeners();
		}
	}

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
					ruleset: store.getRule()
				}
			},
			componentDidMount: function () {
				store.addChangeListener(this.onRuleChange);
			},
			componentWillUnmount: function () {
				store.removeChangeListener(this.onRuleChange);
			},
			onRuleChange: function (data) {
				this.setState({ ruleset: data });

				if (this.onRuleChangeHook) {
					this.onRuleChangeHook(data);
				}
			}
		}
	};
});