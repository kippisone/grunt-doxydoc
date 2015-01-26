/*
 * grunt-doxit
 * https://github.com/AndiOxidant/grunt-doxit
 *
 * Copyright (c) 2014 Andi Heinkelein <andi.oxidant@noname-media.com>
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    pkg = require(path.join(process.cwd(), 'package.json'));

var Doxit = require('doxit');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('doxit', 'Create sourcecode documentation json files for DoxIt', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            name: pkg.name,
            version: pkg.version,
            templateFile: undefined
        });

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var files = f.src,
                dest = f.dest;

            //Remove dirs
            files = files.filter(function(file) {
                return grunt.file.isFile(file);
            });

            var doxit = new Doxit();
            var result = doxit.readFiles(files);
            
            if (path.extname(dest) === '.json') {
                grunt.file.write(dest, doxit.parse('json', files));
                grunt.log.ok('Doxit file created', dest);
            }
            else {
                if (options.template) {
                    if (!grunt.file.exists(options.template)) {
                        grunt.log.error('Template file not found!');
                    }
                    doxit.templateFile = options.template;
                }

                var filename = 'index.html';
                if (grunt.file.isFile(dest)) {
                    filename = path.basename(dest);
                    dest = path.dirname(dest);
                }

                grunt.file.write(path.join(dest, filename), doxit.parse('html', files));
                grunt.file.copy(path.join(path.dirname(doxit.templateFile), 'main.css'), path.join(dest, 'main.css'));
                grunt.log.ok('Doxit file created', dest);
            }
        }.bind(this));
    });

};
