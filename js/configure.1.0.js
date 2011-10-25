/*
Configure: a library for pulling config data out of HTML elements.
Author: Jeff Wyonch
Version: 1.0
Date: October 18, 2011
License: MIT
Notes: For browsers that don't support document.querySelectorAll(), this library assumes jQuery will be used instead.
*/

var configure = configure || {};

configure = ( function() {

// private properties
var database = '',
	 comments = /(<!-{2,})|(-{2,}>)/g, // strip HTML comments
	 tags = /<\/?[^>]+>/gi, // strip HTML tags
	 space = /[\s]+/g, // normalize whitespace
	 trim = /^\s+|\s+$/g; // trim leading/trailing space;

	// begin private methods

	clean = function( value ) {
		value = value.toLowerCase().replace( comments, ' ' ).replace( tags, ' ' );
		value = value.replace( space, ' ' ).replace( trim, '' );
		return value;
	};

	construct = function( query ) {
		// wrapper for query selector
		try {
			return document.querySelectorAll( query );
		} catch( e ) {
			// use jQuery instead
			return $( query );
		}
	};

	// begin public methods

	init = function() {
		// initialize object
		var config = '',
			 classNodes = construct( '.dataconfig' ),
			 nodes,
			 i,
			 loop = classNodes.length;

		if ( classNodes == '' ) {
			return;
		}

		// set all .config elements to display: none;
		// and construct temp string
		for ( i = 0; i < loop; i++ ) {
			classNodes[i].style.display = "none";
			nodes = classNodes[i].innerHTML;
			config += nodes + ' ';
		}

		config = clean( config );

		// publish temp string to the 'database'
		database = config;
	};

	get = function( value ) {
		// if value is in database, return true
		var condition = database.indexOf( value ) == -1 ? false : true;
		return condition;
	};

	inject = function( value ) {
		value = clean( value );
		database = database + ' ' + value;
	};

	data = function() {
		return database;
	};

	execute = function() {
		// empty placeholder to attach functions to
	};

	// run init() immediately
	init();

	// public interface
	return {
		init : init,
		get : get,
		data : data,
		inject : inject,
		execute : execute,
		exe : execute
	};

// end module
}() );
