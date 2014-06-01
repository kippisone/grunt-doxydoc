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

var dox = require('dox'),
    extend = require('node.extend'),
    beautifyCode = require('js-beautify').js_beautify;


module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('doxit', 'Create sourcecode documentation json files for DoxIt', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            raw: true,
            name: pkg.name,
            version: pkg.version,
            beautifyCode: false,
        });

        var doxitFile = {
            project: {
                name: options.name,
                version: options.version,
                type: 'js'
            },
            modules: []
        };

        var addClass = function(obj, file, block) {
            // grunt.log.writeln('Add class:', JSON.stringify(block, true, 2));
            var name = block.name || block.ctx.name;


            block = extend({
                name: name,
                type: 'class',
                file: file,
                description: {
                    full: 'Not documented yet!',
                    summary: 'Not documented yet!',
                    body: ''
                },
                isPrivate: false,
                ignore: false,
                code: '',
                tags: {},
                ctx: {},
                tagsAll: [],
                items: []
            }, block, {

            });

            //Modify output
            block.tagsAll = block.tags;
            block.tags = parseTags(block.tags);
            block.code = parseCode(block.code);

            var index = obj.classes.length;
            obj.classes.push(block);
            return index;
        };

        var addItem = function(obj, file, block) {
            var name = block.name || block.ctx.name,
                index;

            // grunt.log.writeln('Add item:' + name, JSON.stringify(block, true, 2));

            block = extend({
                name: name,
                type: block.ctx ? block.ctx.type : 'unknow',
                file: file,
                description: {
                    full: 'Not documented yet!',
                    summary: 'Not documented yet!',
                    body: ''
                },
                isPrivate: false,
                ignore: false,
                code: '',
                tags: {},
                ctx: {},
                tagsAll: []
            }, block);

            //Modify output
            block.tagsAll = block.tags;
            block.tags = parseTags(block.tags);
            block.code = parseCode(block.code);

            for (var i = 0, len = obj.classes.length; i < len; i++) {
                if (obj.classes[i].name === block.ctx.cons) {
                    index = obj.classes[i].items.length;
                    obj.classes[i].items.push(block);
                    return index;
                }
            }

            //Parent doesn't exists
            index = addClass(obj, file, {
                name: block.ctx.cons
            });

            obj.classes[index].items.push(block);
        };

        var isModule = function(tag) {
            return (tag.type === 'module');
        };

        var parseTags = function(tags) {
            var newTag = {};

            if (tags && Array.isArray(tags)) {
                tags.forEach(function(tag) {
                    tag = extend(true, {}, tag);
                    if (tag.type) {
                        if (tag.type === 'param') {
                            if (!newTag.params) {
                                newTag.params = [];
                            }

                            tag.type = tag.types.join(', ');
                            newTag.params.push(tag);
                        }
                        else {
                            newTag[tag.type] = tag.string === '' ? true : tag.string;
                        }
                    }
                });
            }

            return newTag;
        };

        var parseParams = function() {

        };
        
        var parseCode = function(code) {
            if (!options.beautifyCode) {
                return code;
            }

            return beautifyCode(code, {
                 indent_size: 4
            });
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
            doxitFile.modules = files.map(function(file) {
                grunt.log.writeln('Read file', file);
                var source = grunt.file.read(file);
                var data = dox.parseComments(source, {raw: options.raw});

                var doxit = {
                    classes: [],
                    warnings: []
                };

                data.forEach(function(block) {
                    var name,
                        parent;

                    // grunt.log.writeln('Parse block:', JSON.stringify(block, true, 2));

                    if (block.ctx && block.ctx.type === 'function') {
                        addClass(doxit, file, block);
                        return;
                    }

                    if (block.ctx && (block.ctx.type === 'method' || block.ctx.type === 'property') && block.ctx.cons) {
                        name = block.ctx.name;
                        addItem(doxit, file, block);
                        return;
                    }

                    if (block.tags && block.tags.some(isModule)) {
                        var tag = parseTags(block.tags);
                        doxit.moduleName = tag.module;

                        doxit.description = block.description || {
                            full: 'Not documented yet!',
                            summary: 'Not documented yet!',
                            body: ''
                        };

                        doxit.isPrivate = block.isPrivate || false;
                        doxit.file = file;
                        return;
                    }

                    doxit.warnings.push(block);
                });

                return doxit;

            }.bind(this));

            //Write doxit.json
            var outFile = path.join(dest, 'doxit-v' + pkg.version.replace(/-\d+$/, '') + '.json');
            grunt.file.write(outFile, JSON.stringify(doxitFile, null, 4));

            //Create symlink
            var symlink = path.join(path.dirname(outFile), 'doxit-latest.json');
            if (fs.existsSync(symlink)) {
                fs.unlinkSync(symlink);
            }

            fs.symlinkSync(path.resolve(outFile), symlink);
        }.bind(this));
    });

};
