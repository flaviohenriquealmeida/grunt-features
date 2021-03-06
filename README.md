#Grunt Features

A sample project that use many hot Grunt plugins! The guests are:

- [grunt-browser-sync](https://github.com/shakyshane/grunt-browser-sync):  livereloading and js injection of livereload script in your pages.
- [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean): easy folder cleanup 
- [grunt-contrib-coffee](https://github.com/gruntjs/grunt-contrib-coffee): compile you .coffee automatically after save
- [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat): used by [grunt-usemin](https://github.com/yeoman/grunt-usemin) to concatenate you css and js files.
- [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy): automated tasks can't exist without copying! 
- [grunt-contrib-csslint](https://github.com/gruntjs/grunt-contrib-csslint): live linting only saved css files that is not generated by preprocessors.
- [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin): css minification
- [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin): image minification
- [grunt-contrib-jasmine](https://github.com/gruntjs/grunt-contrib-jasmine): run your jasmine automated tests
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint): live linting only saved js files that is not generated by preprocessors.
- [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less): live compiling of saved less files.
- [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass): live compiling of saved sass files.
- [grunt-contrib-stylus](https://github.com/gruntjs/grunt-contrib-stylus): live compiling of styl files.
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch): core of livereloading and file change event's.
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify): minify your js's in your distribution folder.
- [grunt-htmlcompressor](https://github.com/jney/grunt-htmlcompressor): how about compress your static pages
- [grunt-notify](https://github.com/dylang/grunt-notify): show grunt notification out-of the console.
- [grunt-open](https://github.com/jsoverson/grunt-open): automatically open your browser after liveload server started.
- [grunt-template-jasmine-istanbul](https://github.com/maenu/grunt-template-jasmine-istanbul): test cover report is welcome.
- [grunt-rev](https://github.com/cbas/grunt-rev): versioning your css, js and image files!
- [grunt-traceur](https://github.com/aaronfrost/grunt-traceur): compile ES6 to ES5.
- [grunt-usemin](https://github.com/yeoman/grunt-usemin): the glue to minification, versioning, concatenation and more.
- [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks): no more bloated Gruntfile.js


## More glue

Grunt plugins area amazing, but sometimes you need to do some glue to make then achieve desired result. One example is only liting css and js files that are not generated by preprocessors. Don't be afraid, Grunt has many functions that can help you to create your outstanding Gruntfile.js.

## How to run

Grunt tasks baby! They are:

 `grunt dist`: create a 'dist' folder with all files processed ready for distribution, leaving original files intact. The 'dist' will only be created if there aren't any liting in your JS and CSS files and you have at least 80% of your JavaScript code covered by tests.

 `grunt server`: start a live reloading server, using connect/watch, then automatically open your default browser.

 `grunt server-all`: the same as 'grunt server', but open all your available browsers at once. 