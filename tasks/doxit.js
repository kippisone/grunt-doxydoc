/*
 * grunt-doxydoc
 * https://github.com/AndiOxidant/grunt-doxydoc
 *
 * Copyright (c) 2014 Andi Heinkelein <andi.oxidant@noname-media.com>
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    pkg = require(path.join(process.cwd(), 'package.json'));

var DoxyDoc = require('doxydoc');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('doxydoc', 'Create source code documentation using DoxyDoc', function() {

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

            var doxydoc = new DoxyDoc();
            var result = doxydoc.readFiles(files);
            
            if (path.extname(dest) === '.json') {
                grunt.file.write(dest, doxydoc.parse('json', files));
                grunt.log.ok('DoxyDoc file created', dest);
            }
            else {
                if (options.template) {
                    if (!grunt.file.exists(options.template)) {
                        grunt.log.error('Template file not found!');
                    }
                    doxydoc.templateFile = options.template;
                }

                var filename = 'index.html';
                if (grunt.file.isFile(dest)) {
                    filename = path.basename(dest);
                    dest = path.dirname(dest);
                }

                grunt.file.write(path.join(dest, filename), doxydoc.parse('html', files));
                grunt.file.copy(path.join(path.dirname(doxydoc.templateFile), 'main.css'), path.join(dest, 'main.css'));
                grunt.log.ok('DoxyDoc file created', dest);
            }
        }.bind(this));
    });

};
