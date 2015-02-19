/*
 * grunt-doxydoc
 * https://github.com/AndiOxidant/grunt-doxydoc
 *
 * Copyright (c) 2014 Andi Oxidant
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        doxydoc: {
            default_options: {
                options: {
                    beautifyCode: true
                },
                files: {
                    'tmp/': ['test/src/**']
                }
            }
        },

        // Unit tests.
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.spec.js']
            }
        },

        release: {
            options: {
                npm: true, //default: true
                npmtag: true, //default: no tag
                indentation: '    ', //default: '  ' (two spaces)
                tagName: 'v<%= version %>', //default: '<%= version %>'
                commitMessage: 'Release v<%= version %>', //default: 'release <%= version %>'
                tagMessage: 'Tagging release v<%= version %>', //default: 'Version <%= version %>',
                beforeRelease: ['jshint'],
                // github: {
                //     repo: 'AndiOxidant/grunt-doxydoc', //put your user/repo here
                //     usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains Github username
                //     passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains Github password
                // }
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-release');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'doxydoc', 'mochaTest']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
