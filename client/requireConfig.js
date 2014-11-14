module.exports = {
    baseUrl: './temp',
    name: './js/app.js',
    out: './build/js/app.js',
    optimize: 'uglify',
    paths: {
    	//REQUIRE LIBRARIES
        'jquery': './js/bower_components/jquery/dist/jquery.min',
        'react': './js/bower_components/react/react.min',
        'history': './js/bower_components/history.js/scripts/bundled/html5/native.history'
    }
};