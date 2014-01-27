var helper = require('../../helper.js');

describe("helper", function() {
	
	var CSS_PREPROCESSOR_FILES = [
	'public/less/test.less',
	'public/styl/test.styl',
	'public/scss/test.scss'
	];

	var JS_PREPROCESSOR_FILES = [
	'public/coffee/test.coffee'
	];

	it("Should return true for known css and js preprocessor file", function() {
		CSS_PREPROCESSOR_FILES.forEach(function(preprocessorFile) {
			expect(helper.isPreprocessor(preprocessorFile)).toEqual(true);
		});

		JS_PREPROCESSOR_FILES.forEach(function(preprocessorFile) {
			expect(helper.isPreprocessor(preprocessorFile)).toEqual(true);
		});

	});

	it("Should return false if is not from css or js preprocessor file", function() {
		expect(helper.isPreprocessor('public/css/test.css')).toEqual(false);
		expect(helper.isPreprocessor('public/js/test.js')).toEqual(false);	
		
	});

	it("Should create compiled filepath from css and js preprocessor file", function() {
		CSS_PREPROCESSOR_FILES.forEach(function(preprocessorFile) {
			expect(helper.createCompiledFilepathFrom(preprocessorFile)).toEqual('public/css/test.css');
		});

		JS_PREPROCESSOR_FILES.forEach(function(preprocessorFile) {
			expect(helper.createCompiledFilepathFrom(preprocessorFile)).toEqual('public/js/test.js');
		});
	});	

	it("Should create preprocessed filepath from css and js file", function() {
		
		var css_filepath = 'public/css/test.css';
		expect(helper.createPreprocessedFilepathFrom(css_filepath, 'less')).toEqual('public/less/test.less');
		expect(helper.createPreprocessedFilepathFrom(css_filepath, 'scss')).toEqual('public/scss/test.scss');
		expect(helper.createPreprocessedFilepathFrom(css_filepath, 'styl')).toEqual('public/styl/test.styl');

		var js_filepath = 'public/js/test.js';
		expect(helper.createPreprocessedFilepathFrom(js_filepath, 'coffee')).toEqual('public/coffee/test.coffee');

	});	
});

