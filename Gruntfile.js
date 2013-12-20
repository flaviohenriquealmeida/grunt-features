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

		copy: {
    		project: {
    			expand: true,
				cwd: 'public',
				src: ['**'],
				dest: 'dist'
    		}
    	},

    	clean: {
    		build: {
    			src: ['dist']
    		}, 
    		/* apaga tudo diferente de min.css ou min.js!*/
    		buildDevelopment : {
    			src: ['dist/coffee', 'dist/less', 'dist/scss', 'dist/styl', 'dist/js/**/*.js', '!dist/js/**/*.min.js', 'dist/css/**/*.css', '!dist/css/*.min.css']
    		}
    	},
    	

		rev: {
		    options: {
		      encoding: 'utf8',
		      algorithm: 'md5',
		      length: 8
		    },

		    assets: {
		      files: [{
		      	src: ['dist/img/**/*.{jpg,jpeg,gif,png}']
		      }]
		  	},

		  	 minified: {
		      files: [{
		      	src: ['dist/js/**/*min.js', 'dist/css/**/*.min.css']
		      }]
		  	}
		},

    	useminPrepare: {
            html: ['dist/**/*.html']
        },

        usemin: {
            html: ['dist/**/*.html']
        },

 		imagemin: {
 			options: {
 				// padrao é 7. vai de 0 a 7
 				optimizationLevel: 7 
 			}, 

 			project: {
 				expand: true,                  
		        cwd: 'dist/img',                   
		        src: ['**/*.{png,jpg,gif}'],   
		        dest: 'dist/img/'         
		    }
  		},

  		htmlcompressor: {
		    comprimir: {
		    	expand: true,
		    	cwd: 'dist/',
		    	src: ['**/*.html'],
		    	dest: 'dist/'
		    },
		    options: {
		    	type: 'html',
		    	preserveServerScript: true
		    }
		},

		express: {
			all: {
				options: {
					port: 9000,
					hostname: "0.0.0.0",
					bases: 'public',
					livereload: true
				}
			}
		},
		
		// grunt-open will open your browser at the project's URL
	    open: {
	    	padrao: {
	    		path: 'http://localhost:<%= express.all.options.port %>',
	    	}, 

	    	firefox: {
	    		// Gets the port from the connect configuration
	    		path: 'http://localhost:<%= express.all.options.port %>',
	    		app: 'Firefox'
	    	}, 
	    	chrome: {
	    		// Gets the port from the connect configuration
	    		path: 'http://localhost:<%= express.all.options.port %>',
	    		app: 'Google Chrome'
	    	}, 
	    	safari: {
	    		// Gets the port from the connect configuration
	    		path: 'http://localhost:<%= express.all.options.port %>',
	    		app: 'Safari'
	    	}
		},

		less: {
			compilar: {
				expand: true,
				cwd: 'public/less',
				src: ['**/*.less'],
				dest: 'public/css',
				ext: '.css'
			}
		},

		coffee: {
			compilar: { 
				expand: true,
				cwd: 'public/coffee', 
				src: ['**/*.coffee'], 
				dest: 'public/js', 
				ext: '.js'
				
			} 
		},

		sass: {
			compilar: {
				expand: true,
				cwd: 'public/scss',
				src: ['**/*.scss'],
				dest: 'public/css',
				ext: '.css'
			}
		},

		stylus: {
			options: {
				compress: false
			},

			compilar: {
				expand: true,
				cwd: 'public/styl',
				src: ['**/*.styl'],
				dest: 'public/css',
				ext: '.css'
			}
		},

		watch: {
			coffee: {
				files: 'public/coffee/**/*.coffee',
				options: {
					event: ['added', 'changed']
				}, 
				tasks : 'coffee:compilar'
			},
			
			js: {
				files: 'public/js/**/*.js',
				options: {
					spawn: false, 
					event: ['added', 'changed']
				},
			},

			css: {
				files: 'public/css/**/*.css',
				options: {
					spawn: false, 
					event: ['added', 'changed']
				},
			},

			less: {
				files: 'public/less/**/*.less',
				options: {
					event: ['added', 'changed']
				}, 
				tasks : 'less:compilar'
			},
			// precisa de ruby 1.8.7 e sass-3.2.10 
			// sudo gem install sass
			sass: { 
				files: 'public/sass/**/*.scss',
				options: {
					event: ['added', 'changed']
				}, 
				tasks : 'sass:compilar'
			}, 

			stylus: { 
				files: 'public/styl/**/*.styl',
				options: {
					event: ['added', 'changed']
				}, 
				tasks : 'stylus:compilar'
			}
		}, 

  		jshint: {
    		file: []
 		}, 
 		/* não fazer de arquivos gerados com pré-processadores */
 		csslint: {
		  strict: {
		    options: {
		      import: 2
		    },
		    src: []
		  }
		},

  		jasmine: {
            projeto: {
              src: 'public/js/model/*.js',
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

        notify_hooks: {
        	options: {
        		enabled: true,
        		max_jshint_notifications: 5
    		}
  		}
	});

	grunt.event.on('watch', function(action, filepath, target) {
		//grunt.log.writeln('Target ' + target + '/' + action);
		if(action === "deleted") {
			
			deletarArquivo(filepath, "coffee", "js");
			deletarArquivo(filepath, "less", "css");
			deletarArquivo(filepath, "scss", "css");
			deletarArquivo(filepath, "styl", "css");

		} else {
			
			// não deve fazer liting de CSS e JS criados a partir de less, coffee e sass.
			if(target === 'js') {
				// livereload também dispara o watch, por isso o if
				var coffeeFilepath = filepath.replace('/js/', '/coffee/' ).replace('.js','.coffee');
				// passa arquivo específico
				if(!grunt.file.exists(coffeeFilepath)){
					grunt.log.writeln('Liting ' + filepath);
					grunt.config(['jshint', 'file'], filepath);
					grunt.task.run('jshint:file');
				}
			}

			if(target === 'css') {
				var preProcessedFiles = [];

				preProcessedFiles.push(filepath.replace('/css/', '/less/' ).replace('.css','.less'));
				preProcessedFiles.push(filepath.replace('/css/', '/scss/' ).replace('.css','.scss'));
				preProcessedFiles.push(filepath.replace('/css/', '/styl/' ).replace('.css','.styl'));
				
				var lintFile = true;

				preProcessedFiles.forEach(function(preProcessedFile) {
					
					if(grunt.file.exists(preProcessedFile)){
						lintFile = false;
						return false;
					}
				});

				if(lintFile) {
					grunt.log.writeln('Liting ' + filepath);
					grunt.config(['csslint', 'src'], filepath);
					grunt.task.run('csslint');
				} else {
					grunt.log.writeln('Ignored csslint on file ' + filepath + ' (genarated by preProcessor)'); 
				}
				
			}
		}  	
	});

	grunt.registerTask('minify', ['rev:assets','useminPrepare', 'usemin', 'concat', 'uglify', 'cssmin', 'rev:minified', 'usemin', 'imagemin', 'htmlcompressor']);
	grunt.registerTask('dist', ['clean', 'jshint-all', 'jasmine', 'copy', 'minify', 'clean:buildDevelopment']);

	grunt.registerTask('server', ['express','open:padrao', 'watch']);
	grunt.registerTask('server-all', ['express','open:chrome','open:firefox', 'open:safari', 'watch']);

	grunt.registerTask('jshint-all', function() {
		lintNotPreprocessedScriptsOnly();
    });

	grunt.task.run('notify_hooks');
	
	function deletarArquivo(arquivoDeletado, extensao, extensaoFinal) {

		var pattern = new RegExp(extensao, "gi");

		if(arquivoDeletado.search(pattern) != -1) {
			
			var arquivoApagar = arquivoDeletado.replace(pattern, extensaoFinal);
			grunt.file.delete(arquivoApagar);
			grunt.log.writeln(arquivoApagar + ' deleted');

		}
	}

	function lintNotPreprocessedScriptsOnly() {
		var arquivos = grunt.file.expand({filter: 'isFile'}, ['public/js/**']);

        arquivos.forEach(function(filepath) {
        	var coffeeFilepath = filepath.replace('/js/', '/coffee/' ).replace('.js','.coffee');
				// passa arquivo específico
				var arquivosParaLinting = []
				if(!grunt.file.exists(coffeeFilepath)) {
					grunt.log.ok(filepath + ' added to lint list');
					arquivosParaLinting.push(filepath);
				} else {
					grunt.log.writeln('   ' + filepath + ' ignored (Coffe file)');
				}

				if(arquivosParaLinting.length) {
					grunt.config(['jshint', 'file'], arquivosParaLinting);
					grunt.task.run('jshint:file');
				}
        });
	}
};
