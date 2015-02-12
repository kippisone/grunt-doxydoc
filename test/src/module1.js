/**
 * Module I
 * @module Module I
 */
module.exports = function() {
	'use strict';

	/**
	 * Module I constructor
	 * @method Module1
	 * @constructor
	 */
	var Module1 = function() {

	};

	/**
	 * My flag description
	 * @type {Boolean}
	 * @default true
	 */
	Module1.prototype.myFlag = true;

	/**
	 * Foo function
	 * @method foo
	 * @param {Object} arg1 First argument
	 * @returns {String} Returns "foo"
	 */
	Module1.prototype.foo = function(arg1) {
		return 'foo';
	};

	/**
	 * Bar function (Private)
	 * @method bar
	 * @private
	 * @param {Object} arg1 First argument
	 * @returns {String} Returns "bar"
	 */
	Module1.prototype.bar = function(arg1) {
		return 'bar';
	};

	/**
	 * Baz function (Protected)
	 * @method baz
	 * @protected
	 * @param {Object} arg1 First argument
	 * @returns {String} Returns "baz"
	 */
	Module1.prototype.baz = function(arg1) {
		return 'baz';
	};

	/**
	 */
	Module1.prototype.badly = function(arg1, arg2) {
		return 'bääh';
	};
	
};