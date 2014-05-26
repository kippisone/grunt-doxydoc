/**
 * Module I
 */
module.exports = function() {
    'use strict';

    /**
     * Module II constructor
     * @method Module2
     * @constructor
     */
    var Module2 = function() {

    };

    /**
     * Foo function
     * @method foo
     * @param {Object} arg1 First argument
     * @returns {String} Returns "foo"
     */
    Module2.prototype.foo = function(arg1) {
        return 'foo';
    };

    /**
     * Bar function (Private)
     * @method bar
     * @private
     * @param {Object} arg1 First argument
     * @returns {String} Returns "bar"
     */
    Module2.prototype.bar = function(arg1) {
        return 'bar';
    };

    /**
     * Baz function (Protected)
     * @method baz
     * @protected
     * @param {Object} arg1 First argument
     * @returns {String} Returns "baz"
     */
    Module2.prototype.baz = function(arg1) {
        return 'baz';
    };
    
};