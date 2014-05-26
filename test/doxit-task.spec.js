'use strict';

var grunt = require('grunt'),
    pkg = require('../package.json'),
    expect = require('expect.js');

describe('grunt-doxit', function() {
    it('Should create a doxit.json file', function() {
        var actual = JSON.parse(grunt.file.read('tmp/doxit-v' + pkg.version + '.json'));
        var expected = JSON.parse(grunt.file.read('test/expected/doxit-latest.json'));
        expect(actual).to.eql(expected);
    });
});