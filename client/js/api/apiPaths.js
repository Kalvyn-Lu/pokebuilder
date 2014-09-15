define([], function () {
	$.ajaxSetup({
		success: function (resp) {
			console.log(resp);
		}
	});

	return {
		
	};
})