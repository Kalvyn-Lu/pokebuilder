define(['jquery',
'/js/dispatcher.js',
'/js/utility/cookies.js'],

function ($, dispatcher, cookies) {
	var data = null;
	var isFetching = {};
	var changeListeners = [];

	var accountStore = {
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
		}
	}

	//Register this store to react appropriately to UI events
	dispatcher.register(function (action) {
		switch(action.type) {
			default:
				break;
		}
	});

	return accountStore;
});