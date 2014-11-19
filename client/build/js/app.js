require.config({
    baseUrl: '',
    paths: {
		//REQUIRE LIBRARIES
        'jquery': 'build/js/bower_components/jquery/dist/jquery.min',
        'react': 'build/js/bower_components/react/react',
        'react-bootstrap': 'build/js/bower_components/react-bootstrap/react-bootstrap',
        'history': 'build/js/bower_components/history.js/scripts/bundled/html5/native.history'
    },
});

require(['build/js/components/index.js', 'build/js/utility/polyfills.js'], function (index, polyfills) {
	$(document).ready(function () { index(); });
});