/**
 * Muhon
 *
 * Licensed under the GPLv2
 */

'use strict';

exports.description = 'Create a WordPress theme Megumi starter theme.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after the question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

var execSync = require('child_process').execSync;

// The actual init template
exports.template = function( grunt, init, done ) {
    init.process( {}, [
        // Prompt for these values.
        init.prompt( 'title', 'Muhon' ),
        {
            name   : 'prefix',
            message: 'PHP function prefix',
            default: 'muhon'
        },
        init.prompt( 'description', 'Muhon base theme' ),
        init.prompt( 'homepage', 'https://www.digitalcube.jp/' ),
        init.prompt( 'author_name', 'DigitalCube Co., Ltd' ),
        init.prompt( 'author_url', 'https://www.digitalcube.jp/' ),
        init.prompt( 'version', '0.1.0' ),
        {
            name   : 'task_runner_type',
            message: 'Task Runner: Will you use "Grunt", "gulp" for Task Runner with this project?',
            default: 'Grunt'
        },
    ], function( err, props ) {
        props.keywords = [];
        if ( props.task_runner_type === 'gulp' ) {
            props.devDependencies = {
                "gulp": "^3.8.8",
                "gulp-compass": "^1.3.1",
                "gulp-concat": "^2.4.1",
                "gulp-concat-util": "^0.4.0",
                "gulp-cssbeautify": "^0.1.3",
                "gulp-csscomb": "^3.0.2",
                "gulp-image": "^0.4.7",
                "gulp-jshint": "^1.8.4",
                "gulp-load-plugins": "^0.6.0",
                "gulp-minify-css": "^0.3.10",
                "gulp-rename": "^1.2.0",
                "gulp-replace": "^0.4.0",
                "gulp-uglify": "^1.0.1"
            };
        } else {
            props.devDependencies = {
                "grunt": "^0.4.5",
                "grunt-contrib-compass": "^1.0.1",
                "grunt-contrib-cssmin": "^0.10.0",
                "grunt-contrib-jshint": "^0.10.0",
                "grunt-contrib-uglify": "^0.6.0",
                "grunt-contrib-watch": "^0.6.1",
                "grunt-csscomb": "^3.0.0",
                "grunt-image": "^0.8.4",
                "grunt-text-replace": "^0.3.12",
                "grunt-wp-css": "^0.1.0",
                "load-grunt-tasks": "^0.6.0"
            };
        }

        // Sanitize names where we need to for PHP/JS
        props.name = props.title.replace( /\s+/g, '-' ).toLowerCase();

        // Development prefix (i.e. to prefix PHP function names, variables)
        props.prefix = props.prefix.replace('/[^a-z_]/i', '').toLowerCase();
        //props.prefix = props.prefix.replace(/-/g, '_').toLowerCase();

        // Development prefix in all caps (e.g. for constants)
        props.prefix_caps = props.prefix.toUpperCase();

        // An additional value, safe to use as a JavaScript identifier.
        props.js_safe_name = props.name.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
        props.file_name = props.js_safe_name.replace(/_/g, '-');

        // An additional value that won't conflict with NodeUnit unit tests.
        props.js_test_safe_name = props.js_safe_name === 'test' ? 'myTest' : props.js_safe_name;
        props.js_safe_name_caps = props.js_safe_name.toUpperCase();

        // Files to copy and process
        var files = init.filesToCopy( props );

        // Actually copy and process files
        init.copyAndProcess( files, props );

        // Generate package.json file
        init.writePackageJSON( 'package.json', props );

        var path = require('path');
        var fs = require('fs');

        fs.stat(path.resolve('images'), function(err, stats){
            if (err) {
                fs.mkdir(path.resolve('images'));
            }
        });

        if ( props.task_runner_type === 'gulp' ) {
            fs.stat(path.resolve('Gruntfile.js'), function(err, stats){
                if (!err) {
                   fs.unlinkSync('Gruntfile.js')
                }
            });
        } else {
            fs.stat(path.resolve('gulpfile.js'), function(err, stats){
                if (!err) {
                    fs.unlinkSync('gulpfile.js')
                }
            });
        }

        done();

    });
};
