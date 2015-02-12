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
            template: undefined
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
            var templateDir = path.join(__dirname, '../node_modules/doxydoc/templates/lagoon/');
            
            if (options.template) {
                doxydoc.templateFile = options.template;
                doxydoc.templateDir = path.dirname(options.template);
            }

            var outDir = path.dirname(dest);

            var copy = function(abspath, rootdir, subdir, file) {
                var src, dest;

                if (arguments.length === 2) {
                    src = abspath;
                    dest = rootdir;
                }
                else {
                    if (!subdir || !/^js|lib\//.test(subdir)) {
                        return;
                    }

                    src = abspath;
                    dest = path.join(outDir, subdir, file);
                }

                grunt.log.ok(' ... copy', src.replace(path.join(__dirname, '..') + '/', ''));
                grunt.file.copy(src, dest);
            };
            
            grunt.log.ok('Copy docu to:', outDir);
            grunt.file.write(dest, doxydoc.parse('html', files));
            copy(path.join(templateDir, 'main.css'), path.join(outDir, 'main.css'));
            grunt.file.recurse(templateDir, copy);
            grunt.log.ok('DoxyDoc copied to:', dest);
        }.bind(this));
    });

};
