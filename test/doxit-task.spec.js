'use strict';

var grunt = require('grunt'),
    pkg = require('../package.json'),
    expect = require('expect.js');

describe('grunt-doxit', function() {
    var actual = JSON.parse(grunt.file.read('tmp/doxit-v' + pkg.version + '.json'));
    var expected = JSON.parse(grunt.file.read('test/expected/doxit-latest.json'));
    
    it('Should create a doxit.json file', function() {
        expect(actual).to.be.an('object');
    });

    it('Should have a project block', function() {
        expect(actual.project).to.be.an('object');
        expect(actual.project).to.eql({
            name: pkg.name,
            version: pkg.version,
            type: 'js'
        });
    });

    it('Should have a modules block', function() {
        expect(actual.modules).to.be.an('array');
    });
    
    it('Should have a modules[n].moduleName property', function() {
        expect(actual.modules[0].moduleName).to.be.a('string');
        expect(actual.modules[0].moduleName).to.eql('Module I');
        expect(actual.modules[1].moduleName).to.be(undefined);
    });

    it('Should have a modules[n].classes block', function() {
        expect(actual.modules[0].classes).to.be.an('array');
    });

    it('Should have a modules[n].warnings block', function() {
        expect(actual.modules[0].warnings).to.be.an('array');
    });

    it('Should have 3 modules', function() {
        expect(actual.modules).to.have.length(3);
    });

    it('First module should have 1 class', function() {
        expect(actual.modules[0].classes).to.have.length(1);
    });

    it('First module should have 0 warnings', function() {
        expect(actual.modules[0].warnings).to.have.length(0);
    });

    it('Second module should have 1 class', function() {
        expect(actual.modules[1].classes).to.have.length(1);
    });

    it('Second module should have 1 warnings', function() {
        expect(actual.modules[1].warnings).to.have.length(1);
    });

    it('Should test module structures', function() {
        expect(actual.modules[0].classes).to.eql(expected.modules[0].classes);
    });
});