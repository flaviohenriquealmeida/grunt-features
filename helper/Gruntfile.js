module.exports = function(grunt) {

	// não deve carregar templates, por isso o ignore no grunt-template-jasmine-istanbul
	require('load-grunt-tasks')(
		grunt, 
		{
			scope: 'devDependencies', 
			pattern : "grunt-!(template)*"
		}
	);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

  		jasmine: {
            projeto: {
              src: 'helper.js',
              options: {
                template: require('grunt-template-jasmine-istanbul'),
                specs: 'test/spec/*Spec.js',
                templateOptions: {
                    coverage: 'bin/coverage/coverage.json',
                    report: [
                        {type: 'html', options: {dir: 'output/coverage'}},
                        {type: 'cobertura', options: {dir: 'output/coverage/cobertura'}},
                        {type: 'text-summary'}
                     ],
                    thresholds: {
                        lines: 75,
                        statements: 75,
                        branches: 75,
                        functions: 90
                    }
                }
              }
            }           
        },

        jasmine_node: {
        specNameMatcher: 'spec', 
        projectRoot: ".",
        requirejs: false,
        forceExit: true,
        jUnit: {
          report: false,
          savePath : "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
  }
	});

	grunt.registerTask('default', ['jasmine_node']);
};
