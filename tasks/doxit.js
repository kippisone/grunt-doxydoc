/*
 * grunt-doxit
 * https://github.com/AndiOxidant/grunt-doxit
 *
 * Copyright (c) 2014 Andi Heinkelein <andi.oxidant@noname-media.com>
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    fs = require('fs'),
    pkg = require(path.join(process.cwd(), 'package.json'));

var dox = require('dox');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('doxit', 'Create sourcecode documentation json files for DoxIt', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            raw: true,
            name: pkg.name,
            version: pkg.version
        });

        var doxitFile = {
            project: {
                name: options.name,
                version: options.version
            },
            modules: []
        };

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var files = f.src,
                dest = f.dest;

            files = grunt.file.expand(files);

            //Remove dirs
            files = files.filter(function(file) {
                return grunt.file.isFile(file);
            });

            //Create callbacks
            var json = files.map(function(file) {
                grunt.log.writeln('Read file', file);
                var source = grunt.file.read(file);
                return {
                    file: file,
                    data: dox.parseComments(source, {raw: options.raw})
                };

            }.bind(this));

            //Write doxit.json
            var outFile = path.join(dest, 'doxit-v' + pkg.version + '.json');
            grunt.log.writeln('Write doxed file to', outFile);
            grunt.file.write(outFile, JSON.stringify(json, null, 4));

            //Create symlink
            var symlink = path.join(path.dirname(outFile), 'doxit-latest.json');
            if (fs.existsSync(symlink)) {
                fs.unlinkSync(symlink);
            }

            fs.symlinkSync(path.resolve(outFile), symlink);
        }.bind(this));
    });

};
