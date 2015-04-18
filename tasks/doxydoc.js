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

var DoxyDocPage = require('doxydoc').DoxyDocPage;

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('doxydoc', 'Create source code documentation using DoxyDoc', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            name: pkg.name,
            version: pkg.version,
            template: null,
            locals: null,
            docuFilename: null
        });

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var files = f.src,
                dest = f.dest;

            //Remove dirs
            files = files.filter(function(file) {
                return grunt.file.isFile(file);
            });

            if (files) {
                var doxydocPage = new DoxyDocPage({
                    templateDir: options.template,
                    output: dest,
                    docuFilename: options.docuFilename,
                    doxydocFile: options.doxydocFile,
                    locals: options.locals
                });

                doxydocPage.verbose = true;
                doxydocPage.files = files;
                doxydocPage.createPages();
            }
        }.bind(this));
    });
};
