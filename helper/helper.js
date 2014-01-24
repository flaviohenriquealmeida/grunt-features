exports.isPreprocessor = isPreprocessor;
exports.createCompiledFilepathFrom = createCompiledFilepathFrom;

var PREPROCESSOR_EXTENSION_PATTERN = RegExp('[.]coffee|[.]less|[.]scss|[.]styl', 'i');

function isPreprocessor(filepath) {
	return PREPROCESSOR_EXTENSION_PATTERN.test(filepath);
}

function createCompiledFilepathFrom(preprocessorFilepath) {
	
	var preprocessorExtension = preprocessorFilepath.match(PREPROCESSOR_EXTENSION_PATTERN)[0].replace('.','');
	var extension;
	
	if(preprocessorExtension === 'coffee') {
		extension = 'js';
	} else {
		extension = 'css';
	}

	var folderPattern = new RegExp('\/' + preprocessorExtension + '\/', "gi");

	return preprocessorFilepath.replace(folderPattern, '/' + extension + '/').replace('.'+ preprocessorExtension, '.' + extension);
}