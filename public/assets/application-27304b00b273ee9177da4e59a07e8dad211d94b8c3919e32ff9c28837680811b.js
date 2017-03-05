/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {


}).call(this);
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
window.tinymce = window.tinymce || {
  base:   '/assets/tinymce',
  suffix: ''
};

if (typeof Turbolinks != 'undefined' && Turbolinks.supported) {
  document.addEventListener('turbolinks:before-render', function() {
    tinymce.remove();
  });
}
;
// 4.5.4 (2017-02-23)
!function(e,t){"use strict";function n(e,t){for(var n,r=[],i=0;i<e.length;++i){if(n=s[e[i]]||o(e[i]),!n)throw"module definition dependecy not found: "+e[i];r.push(n)}t.apply(null,r)}function r(e,r,i){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(r===t)throw"invalid module definition, dependencies must be specified";if(i===t)throw"invalid module definition, definition function must be specified";n(r,function(){s[e]=i.apply(null,arguments)})}function i(e){return!!s[e]}function o(t){for(var n=e,r=t.split(/[.\/]/),i=0;i<r.length;++i){if(!n[r[i]])return;n=n[r[i]]}return n}function a(n){var r,i,o,a,l;for(r=0;r<n.length;r++){i=e,o=n[r],a=o.split(/[.\/]/);for(var u=0;u<a.length-1;++u)i[a[u]]===t&&(i[a[u]]={}),i=i[a[u]];i[a[a.length-1]]=s[o]}if(e.AMDLC_TESTS){l=e.privateModules||{};for(o in s)l[o]=s[o];for(r=0;r<n.length;r++)delete l[n[r]];e.privateModules=l}}var s={},l="tinymce/geom/Rect",u="tinymce/util/Promise",c="tinymce/util/Delay",d="tinymce/Env",f="tinymce/dom/EventUtils",p="tinymce/dom/Sizzle",h="tinymce/util/Arr",m="tinymce/util/Tools",g="tinymce/dom/DomQuery",v="tinymce/html/Styles",y="tinymce/dom/TreeWalker",b="tinymce/dom/Range",C="tinymce/html/Entities",x="tinymce/dom/StyleSheetLoader",w="tinymce/dom/DOMUtils",E="tinymce/dom/ScriptLoader",N="tinymce/AddOnManager",_="tinymce/dom/NodeType",S="tinymce/text/Zwsp",k="tinymce/caret/CaretContainer",T="tinymce/dom/RangeUtils",R="tinymce/NodeChange",A="tinymce/html/Node",B="tinymce/html/Schema",D="tinymce/html/SaxParser",L="tinymce/html/DomParser",M="tinymce/html/Writer",P="tinymce/html/Serializer",O="tinymce/dom/Serializer",H="tinymce/dom/TridentSelection",I="tinymce/util/VK",F="tinymce/dom/ControlSelection",z="tinymce/util/Fun",U="tinymce/caret/CaretCandidate",W="tinymce/geom/ClientRect",V="tinymce/text/ExtendingChar",$="tinymce/caret/CaretPosition",q="tinymce/caret/CaretBookmark",j="tinymce/dom/BookmarkManager",Y="tinymce/dom/Selection",X="tinymce/dom/ElementUtils",K="tinymce/fmt/Preview",G="tinymce/fmt/Hooks",J="tinymce/Formatter",Q="tinymce/undo/Diff",Z="tinymce/undo/Fragments",ee="tinymce/undo/Levels",te="tinymce/UndoManager",ne="tinymce/EnterKey",re="tinymce/ForceBlocks",ie="tinymce/caret/CaretUtils",oe="tinymce/caret/CaretWalker",ae="tinymce/InsertList",se="tinymce/InsertContent",le="tinymce/EditorCommands",ue="tinymce/util/URI",ce="tinymce/util/Class",de="tinymce/util/EventDispatcher",fe="tinymce/data/Binding",pe="tinymce/util/Observable",he="tinymce/data/ObservableObject",me="tinymce/ui/Selector",ge="tinymce/ui/Collection",ve="tinymce/ui/DomUtils",ye="tinymce/ui/BoxUtils",be="tinymce/ui/ClassList",Ce="tinymce/ui/ReflowQueue",xe="tinymce/ui/Control",we="tinymce/ui/Factory",Ee="tinymce/ui/KeyboardNavigation",Ne="tinymce/ui/Container",_e="tinymce/ui/DragHelper",Se="tinymce/ui/Scrollable",ke="tinymce/ui/Panel",Te="tinymce/ui/Movable",Re="tinymce/ui/Resizable",Ae="tinymce/ui/FloatPanel",Be="tinymce/ui/Window",De="tinymce/ui/MessageBox",Le="tinymce/WindowManager",Me="tinymce/ui/Tooltip",Pe="tinymce/ui/Widget",Oe="tinymce/ui/Progress",He="tinymce/ui/Notification",Ie="tinymce/NotificationManager",Fe="tinymce/dom/NodePath",ze="tinymce/util/Quirks",Ue="tinymce/EditorObservable",We="tinymce/Mode",Ve="tinymce/Shortcuts",$e="tinymce/file/Uploader",qe="tinymce/file/Conversions",je="tinymce/file/ImageScanner",Ye="tinymce/file/BlobCache",Xe="tinymce/file/UploadStatus",Ke="tinymce/ErrorReporter",Ge="tinymce/EditorUpload",Je="tinymce/caret/FakeCaret",Qe="tinymce/dom/Dimensions",Ze="tinymce/caret/LineWalker",et="tinymce/caret/LineUtils",tt="tinymce/dom/MousePosition",nt="tinymce/DragDropOverrides",rt="tinymce/SelectionOverrides",it="tinymce/util/Uuid",ot="tinymce/ui/Sidebar",at="tinymce/Editor",st="tinymce/util/I18n",lt="tinymce/FocusManager",ut="tinymce/EditorManager",ct="tinymce/LegacyInput",dt="tinymce/util/XHR",ft="tinymce/util/JSON",pt="tinymce/util/JSONRequest",ht="tinymce/util/JSONP",mt="tinymce/util/LocalStorage",gt="tinymce/Compat",vt="tinymce/ui/Layout",yt="tinymce/ui/AbsoluteLayout",bt="tinymce/ui/Button",Ct="tinymce/ui/ButtonGroup",xt="tinymce/ui/Checkbox",wt="tinymce/ui/ComboBox",Et="tinymce/ui/ColorBox",Nt="tinymce/ui/PanelButton",_t="tinymce/ui/ColorButton",St="tinymce/util/Color",kt="tinymce/ui/ColorPicker",Tt="tinymce/ui/Path",Rt="tinymce/ui/ElementPath",At="tinymce/ui/FormItem",Bt="tinymce/ui/Form",Dt="tinymce/ui/FieldSet",Lt="tinymce/content/LinkTargets",Mt="tinymce/ui/FilePicker",Pt="tinymce/ui/FitLayout",Ot="tinymce/ui/FlexLayout",Ht="tinymce/ui/FlowLayout",It="tinymce/fmt/FontInfo",Ft="tinymce/ui/FormatControls",zt="tinymce/ui/GridLayout",Ut="tinymce/ui/Iframe",Wt="tinymce/ui/InfoBox",Vt="tinymce/ui/Label",$t="tinymce/ui/Toolbar",qt="tinymce/ui/MenuBar",jt="tinymce/ui/MenuButton",Yt="tinymce/ui/MenuItem",Xt="tinymce/ui/Throbber",Kt="tinymce/ui/Menu",Gt="tinymce/ui/ListBox",Jt="tinymce/ui/Radio",Qt="tinymce/ui/ResizeHandle",Zt="tinymce/ui/SelectBox",en="tinymce/ui/Slider",tn="tinymce/ui/Spacer",nn="tinymce/ui/SplitButton",rn="tinymce/ui/StackLayout",on="tinymce/ui/TabPanel",an="tinymce/ui/TextBox",sn="tinymce/Register";r(l,[],function(){function e(e,t,n){var r,i,a,s,l,c;return r=t.x,i=t.y,a=e.w,s=e.h,l=t.w,c=t.h,n=(n||"").split(""),"b"===n[0]&&(i+=c),"r"===n[1]&&(r+=l),"c"===n[0]&&(i+=u(c/2)),"c"===n[1]&&(r+=u(l/2)),"b"===n[3]&&(i-=s),"r"===n[4]&&(r-=a),"c"===n[3]&&(i-=u(s/2)),"c"===n[4]&&(r-=u(a/2)),o(r,i,a,s)}function t(t,n,r,i){var o,a;for(a=0;a<i.length;a++)if(o=e(t,n,i[a]),o.x>=r.x&&o.x+o.w<=r.w+r.x&&o.y>=r.y&&o.y+o.h<=r.h+r.y)return i[a];return null}function n(e,t,n){return o(e.x-t,e.y-n,e.w+2*t,e.h+2*n)}function r(e,t){var n,r,i,a;return n=l(e.x,t.x),r=l(e.y,t.y),i=s(e.x+e.w,t.x+t.w),a=s(e.y+e.h,t.y+t.h),i-n<0||a-r<0?null:o(n,r,i-n,a-r)}function i(e,t,n){var r,i,a,s,u,c,d,f,p,h;return u=e.x,c=e.y,d=e.x+e.w,f=e.y+e.h,p=t.x+t.w,h=t.y+t.h,r=l(0,t.x-u),i=l(0,t.y-c),a=l(0,d-p),s=l(0,f-h),u+=r,c+=i,n&&(d+=r,f+=i,u-=a,c-=s),d-=a,f-=s,o(u,c,d-u,f-c)}function o(e,t,n,r){return{x:e,y:t,w:n,h:r}}function a(e){return o(e.left,e.top,e.width,e.height)}var s=Math.min,l=Math.max,u=Math.round;return{inflate:n,relativePosition:e,findBestRelativePosition:t,intersect:r,clamp:i,create:o,fromClientRect:a}}),r(u,[],function(){function e(e,t){return function(){e.apply(t,arguments)}}function t(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],s(t,e(r,this),e(i,this))}function n(e){var t=this;return null===this._state?void this._deferreds.push(e):void l(function(){var n=t._state?e.onFulfilled:e.onRejected;if(null===n)return void(t._state?e.resolve:e.reject)(t._value);var r;try{r=n(t._value)}catch(i){return void e.reject(i)}e.resolve(r)})}function r(t){try{if(t===this)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if("function"==typeof n)return void s(e(n,t),e(r,this),e(i,this))}this._state=!0,this._value=t,o.call(this)}catch(a){i.call(this,a)}}function i(e){this._state=!1,this._value=e,o.call(this)}function o(){for(var e=0,t=this._deferreds.length;e<t;e++)n.call(this,this._deferreds[e]);this._deferreds=null}function a(e,t,n,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=r}function s(e,t,n){var r=!1;try{e(function(e){r||(r=!0,t(e))},function(e){r||(r=!0,n(e))})}catch(i){if(r)return;r=!0,n(i)}}if(window.Promise)return window.Promise;var l=t.immediateFn||"function"==typeof setImmediate&&setImmediate||function(e){setTimeout(e,1)},u=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};return t.prototype["catch"]=function(e){return this.then(null,e)},t.prototype.then=function(e,r){var i=this;return new t(function(t,o){n.call(i,new a(e,r,t,o))})},t.all=function(){var e=Array.prototype.slice.call(1===arguments.length&&u(arguments[0])?arguments[0]:arguments);return new t(function(t,n){function r(o,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(e){r(o,e)},n)}e[o]=a,0===--i&&t(e)}catch(l){n(l)}}if(0===e.length)return t([]);for(var i=e.length,o=0;o<e.length;o++)r(o,e[o])})},t.resolve=function(e){return e&&"object"==typeof e&&e.constructor===t?e:new t(function(t){t(e)})},t.reject=function(e){return new t(function(t,n){n(e)})},t.race=function(e){return new t(function(t,n){for(var r=0,i=e.length;r<i;r++)e[r].then(t,n)})},t}),r(c,[u],function(e){function t(e,t){function n(e){window.setTimeout(e,0)}var r,i=window.requestAnimationFrame,o=["ms","moz","webkit"];for(r=0;r<o.length&&!i;r++)i=window[o[r]+"RequestAnimationFrame"];i||(i=n),i(e,t)}function n(e,t){return"number"!=typeof t&&(t=0),setTimeout(e,t)}function r(e,t){return"number"!=typeof t&&(t=1),setInterval(e,t)}function i(e){return clearTimeout(e)}function o(e){return clearInterval(e)}function a(e,t){var r,i;return i=function(){var i=arguments;clearTimeout(r),r=n(function(){e.apply(this,i)},t)},i.stop=function(){clearTimeout(r)},i}var s;return{requestAnimationFrame:function(n,r){return s?void s.then(n):void(s=new e(function(e){r||(r=document.body),t(e,r)}).then(n))},setTimeout:n,setInterval:r,setEditorTimeout:function(e,t,r){return n(function(){e.removed||t()},r)},setEditorInterval:function(e,t,n){var i;return i=r(function(){e.removed?clearInterval(i):t()},n)},debounce:a,throttle:a,clearInterval:o,clearTimeout:i}}),r(d,[],function(){function e(e){return"matchMedia"in window&&matchMedia(e).matches}var t=navigator,n=t.userAgent,r,i,o,a,s,l,u,c,d,f,p,h,m;r=window.opera&&window.opera.buildNumber,d=/Android/.test(n),i=/WebKit/.test(n),o=!i&&!r&&/MSIE/gi.test(n)&&/Explorer/gi.test(t.appName),o=o&&/MSIE (\w+)\./.exec(n)[1],a=n.indexOf("Trident/")!=-1&&(n.indexOf("rv:")!=-1||t.appName.indexOf("Netscape")!=-1)&&11,s=n.indexOf("Edge/")!=-1&&!o&&!a&&12,o=o||a||s,l=!i&&!a&&/Gecko/.test(n),u=n.indexOf("Mac")!=-1,c=/(iPad|iPhone)/.test(n),f="FormData"in window&&"FileReader"in window&&"URL"in window&&!!URL.createObjectURL,p=e("only screen and (max-device-width: 480px)")&&(d||c),h=e("only screen and (min-width: 800px)")&&(d||c),m=n.indexOf("Windows Phone")!=-1,s&&(i=!1);var g=!c||f||n.match(/AppleWebKit\/(\d*)/)[1]>=534;return{opera:r,webkit:i,ie:o,gecko:l,mac:u,iOS:c,android:d,contentEditable:g,transparentSrc:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",caretAfter:8!=o,range:window.getSelection&&"Range"in window,documentMode:o&&!s?document.documentMode||7:10,fileApi:f,ceFalse:o===!1||o>8,canHaveCSP:o===!1||o>11,desktop:!p&&!h,windowsPhone:m}}),r(f,[c,d],function(e,t){function n(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)}function r(e,t,n,r){e.removeEventListener?e.removeEventListener(t,n,r||!1):e.detachEvent&&e.detachEvent("on"+t,n)}function i(e,t){var n,r=t;return n=e.path,n&&n.length>0&&(r=n[0]),e.deepPath&&(n=e.deepPath(),n&&n.length>0&&(r=n[0])),r}function o(e,n){function r(){return!1}function o(){return!0}var a,s=n||{},l;for(a in e)c[a]||(s[a]=e[a]);if(s.target||(s.target=s.srcElement||document),t.experimentalShadowDom&&(s.target=i(e,s.target)),e&&u.test(e.type)&&e.pageX===l&&e.clientX!==l){var d=s.target.ownerDocument||document,f=d.documentElement,p=d.body;s.pageX=e.clientX+(f&&f.scrollLeft||p&&p.scrollLeft||0)-(f&&f.clientLeft||p&&p.clientLeft||0),s.pageY=e.clientY+(f&&f.scrollTop||p&&p.scrollTop||0)-(f&&f.clientTop||p&&p.clientTop||0)}return s.preventDefault=function(){s.isDefaultPrevented=o,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},s.stopPropagation=function(){s.isPropagationStopped=o,e&&(e.stopPropagation?e.stopPropagation():e.cancelBubble=!0)},s.stopImmediatePropagation=function(){s.isImmediatePropagationStopped=o,s.stopPropagation()},s.isDefaultPrevented||(s.isDefaultPrevented=r,s.isPropagationStopped=r,s.isImmediatePropagationStopped=r),"undefined"==typeof s.metaKey&&(s.metaKey=!1),s}function a(t,i,o){function a(){o.domLoaded||(o.domLoaded=!0,i(c))}function s(){("complete"===u.readyState||"interactive"===u.readyState&&u.body)&&(r(u,"readystatechange",s),a())}function l(){try{u.documentElement.doScroll("left")}catch(t){return void e.setTimeout(l)}a()}var u=t.document,c={type:"ready"};return o.domLoaded?void i(c):(u.addEventListener?"complete"===u.readyState?a():n(t,"DOMContentLoaded",a):(n(u,"readystatechange",s),u.documentElement.doScroll&&t.self===t.top&&l()),void n(t,"load",a))}function s(){function e(e,t){var n,r,o,a,s=i[t];if(n=s&&s[e.type])for(r=0,o=n.length;r<o;r++)if(a=n[r],a&&a.func.call(a.scope,e)===!1&&e.preventDefault(),e.isImmediatePropagationStopped())return}var t=this,i={},s,u,c,d,f;u=l+(+new Date).toString(32),d="onmouseenter"in document.documentElement,c="onfocusin"in document.documentElement,f={mouseenter:"mouseover",mouseleave:"mouseout"},s=1,t.domLoaded=!1,t.events=i,t.bind=function(r,l,p,h){function m(t){e(o(t||E.event),g)}var g,v,y,b,C,x,w,E=window;if(r&&3!==r.nodeType&&8!==r.nodeType){for(r[u]?g=r[u]:(g=s++,r[u]=g,i[g]={}),h=h||r,l=l.split(" "),y=l.length;y--;)b=l[y],x=m,C=w=!1,"DOMContentLoaded"===b&&(b="ready"),t.domLoaded&&"ready"===b&&"complete"==r.readyState?p.call(h,o({type:b})):(d||(C=f[b],C&&(x=function(t){var n,r;if(n=t.currentTarget,r=t.relatedTarget,r&&n.contains)r=n.contains(r);else for(;r&&r!==n;)r=r.parentNode;r||(t=o(t||E.event),t.type="mouseout"===t.type?"mouseleave":"mouseenter",t.target=n,e(t,g))})),c||"focusin"!==b&&"focusout"!==b||(w=!0,C="focusin"===b?"focus":"blur",x=function(t){t=o(t||E.event),t.type="focus"===t.type?"focusin":"focusout",e(t,g)}),v=i[g][b],v?"ready"===b&&t.domLoaded?p({type:b}):v.push({func:p,scope:h}):(i[g][b]=v=[{func:p,scope:h}],v.fakeName=C,v.capture=w,v.nativeHandler=x,"ready"===b?a(r,x,t):n(r,C||b,x,w)));return r=v=0,p}},t.unbind=function(e,n,o){var a,s,l,c,d,f;if(!e||3===e.nodeType||8===e.nodeType)return t;if(a=e[u]){if(f=i[a],n){for(n=n.split(" "),l=n.length;l--;)if(d=n[l],s=f[d]){if(o)for(c=s.length;c--;)if(s[c].func===o){var p=s.nativeHandler,h=s.fakeName,m=s.capture;s=s.slice(0,c).concat(s.slice(c+1)),s.nativeHandler=p,s.fakeName=h,s.capture=m,f[d]=s}o&&0!==s.length||(delete f[d],r(e,s.fakeName||d,s.nativeHandler,s.capture))}}else{for(d in f)s=f[d],r(e,s.fakeName||d,s.nativeHandler,s.capture);f={}}for(d in f)return t;delete i[a];try{delete e[u]}catch(g){e[u]=null}}return t},t.fire=function(n,r,i){var a;if(!n||3===n.nodeType||8===n.nodeType)return t;i=o(null,i),i.type=r,i.target=n;do a=n[u],a&&e(i,a),n=n.parentNode||n.ownerDocument||n.defaultView||n.parentWindow;while(n&&!i.isPropagationStopped());return t},t.clean=function(e){var n,r,i=t.unbind;if(!e||3===e.nodeType||8===e.nodeType)return t;if(e[u]&&i(e),e.getElementsByTagName||(e=e.document),e&&e.getElementsByTagName)for(i(e),r=e.getElementsByTagName("*"),n=r.length;n--;)e=r[n],e[u]&&i(e);return t},t.destroy=function(){i={}},t.cancel=function(e){return e&&(e.preventDefault(),e.stopImmediatePropagation()),!1}}var l="mce-data-",u=/^(?:mouse|contextmenu)|click/,c={keyLocation:1,layerX:1,layerY:1,returnValue:1,webkitMovementX:1,webkitMovementY:1,keyIdentifier:1};return s.Event=new s,s.Event.bind(window,"ready",function(){}),s}),r(p,[],function(){function e(e,t,n,r){var i,o,a,s,l,u,d,p,h,m;if((t?t.ownerDocument||t:z)!==D&&B(t),t=t||D,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(M&&!r){if(i=ve.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&I(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return Z.apply(n,t.getElementsByTagName(e)),n;if((a=i[3])&&x.getElementsByClassName)return Z.apply(n,t.getElementsByClassName(a)),n}if(x.qsa&&(!P||!P.test(e))){if(p=d=F,h=t,m=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(u=_(e),(d=t.getAttribute("id"))?p=d.replace(be,"\\$&"):t.setAttribute("id",p),p="[id='"+p+"'] ",l=u.length;l--;)u[l]=p+f(u[l]);h=ye.test(e)&&c(t.parentNode)||t,m=u.join(",")}if(m)try{return Z.apply(n,h.querySelectorAll(m)),n}catch(g){}finally{d||t.removeAttribute("id")}}}return k(e.replace(se,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>w.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[F]=!0,e}function i(e){var t=D.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=e.length;r--;)w.attrHandle[n[r]]=t}function a(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||X)-(~e.sourceIndex||X);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function s(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function u(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function c(e){return e&&typeof e.getElementsByTagName!==Y&&e}function d(){}function f(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function p(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=W++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,a){var s,l,u=[U,o];if(a){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(l=t[F]||(t[F]={}),(s=l[r])&&s[0]===U&&s[1]===o)return u[2]=s[2];if(l[r]=u,u[2]=e(t,n,a))return!0}}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function m(t,n,r){for(var i=0,o=n.length;i<o;i++)e(t,n[i],r);return r}function g(e,t,n,r,i){for(var o,a=[],s=0,l=e.length,u=null!=t;s<l;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),u&&t.push(s)));return a}function v(e,t,n,i,o,a){return i&&!i[F]&&(i=v(i)),o&&!o[F]&&(o=v(o,a)),r(function(r,a,s,l){var u,c,d,f=[],p=[],h=a.length,v=r||m(t||"*",s.nodeType?[s]:s,[]),y=!e||!r&&t?v:g(v,f,e,s,l),b=n?o||(r?e:h||i)?[]:a:y;if(n&&n(y,b,s,l),i)for(u=g(b,p),i(u,[],s,l),c=u.length;c--;)(d=u[c])&&(b[p[c]]=!(y[p[c]]=d));if(r){if(o||e){if(o){for(u=[],c=b.length;c--;)(d=b[c])&&u.push(y[c]=d);o(null,b=[],u,l)}for(c=b.length;c--;)(d=b[c])&&(u=o?te.call(r,d):f[c])>-1&&(r[u]=!(a[u]=d))}}else b=g(b===a?b.splice(h,b.length):b),o?o(null,a,b,l):Z.apply(a,b)})}function y(e){for(var t,n,r,i=e.length,o=w.relative[e[0].type],a=o||w.relative[" "],s=o?1:0,l=p(function(e){return e===t},a,!0),u=p(function(e){return te.call(t,e)>-1},a,!0),c=[function(e,n,r){return!o&&(r||n!==T)||((t=n).nodeType?l(e,n,r):u(e,n,r))}];s<i;s++)if(n=w.relative[e[s].type])c=[p(h(c),n)];else{if(n=w.filter[e[s].type].apply(null,e[s].matches),n[F]){for(r=++s;r<i&&!w.relative[e[r].type];r++);return v(s>1&&h(c),s>1&&f(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(se,"$1"),n,s<r&&y(e.slice(s,r)),r<i&&y(e=e.slice(r)),r<i&&f(e))}c.push(n)}return h(c)}function b(t,n){var i=n.length>0,o=t.length>0,a=function(r,a,s,l,u){var c,d,f,p=0,h="0",m=r&&[],v=[],y=T,b=r||o&&w.find.TAG("*",u),C=U+=null==y?1:Math.random()||.1,x=b.length;for(u&&(T=a!==D&&a);h!==x&&null!=(c=b[h]);h++){if(o&&c){for(d=0;f=t[d++];)if(f(c,a,s)){l.push(c);break}u&&(U=C)}i&&((c=!f&&c)&&p--,r&&m.push(c))}if(p+=h,i&&h!==p){for(d=0;f=n[d++];)f(m,v,a,s);if(r){if(p>0)for(;h--;)m[h]||v[h]||(v[h]=J.call(l));v=g(v)}Z.apply(l,v),u&&!r&&v.length>0&&p+n.length>1&&e.uniqueSort(l)}return u&&(U=C,T=y),m};return i?r(a):a}var C,x,w,E,N,_,S,k,T,R,A,B,D,L,M,P,O,H,I,F="sizzle"+-new Date,z=window.document,U=0,W=0,V=n(),$=n(),q=n(),j=function(e,t){return e===t&&(A=!0),0},Y=typeof t,X=1<<31,K={}.hasOwnProperty,G=[],J=G.pop,Q=G.push,Z=G.push,ee=G.slice,te=G.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(this[t]===e)return t;return-1},ne="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",re="[\\x20\\t\\r\\n\\f]",ie="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",oe="\\["+re+"*("+ie+")(?:"+re+"*([*^$|!~]?=)"+re+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ie+"))|)"+re+"*\\]",ae=":("+ie+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+oe+")*)|.*)\\)|)",se=new RegExp("^"+re+"+|((?:^|[^\\\\])(?:\\\\.)*)"+re+"+$","g"),le=new RegExp("^"+re+"*,"+re+"*"),ue=new RegExp("^"+re+"*([>+~]|"+re+")"+re+"*"),ce=new RegExp("="+re+"*([^\\]'\"]*?)"+re+"*\\]","g"),de=new RegExp(ae),fe=new RegExp("^"+ie+"$"),pe={ID:new RegExp("^#("+ie+")"),CLASS:new RegExp("^\\.("+ie+")"),TAG:new RegExp("^("+ie+"|[*])"),ATTR:new RegExp("^"+oe),PSEUDO:new RegExp("^"+ae),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+re+"*(even|odd|(([+-]|)(\\d*)n|)"+re+"*(?:([+-]|)"+re+"*(\\d+)|))"+re+"*\\)|)","i"),bool:new RegExp("^(?:"+ne+")$","i"),needsContext:new RegExp("^"+re+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+re+"*((?:-\\d)?\\d*)"+re+"*\\)|)(?=[^-]|$)","i")},he=/^(?:input|select|textarea|button)$/i,me=/^h\d$/i,ge=/^[^{]+\{\s*\[native \w/,ve=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ye=/[+~]/,be=/'|\\/g,Ce=new RegExp("\\\\([\\da-f]{1,6}"+re+"?|("+re+")|.)","ig"),xe=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)};try{Z.apply(G=ee.call(z.childNodes),z.childNodes),G[z.childNodes.length].nodeType}catch(we){Z={apply:G.length?function(e,t){Q.apply(e,ee.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}x=e.support={},N=e.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},B=e.setDocument=function(e){function t(e){try{return e.top}catch(t){}return null}var n,r=e?e.ownerDocument||e:z,o=r.defaultView;return r!==D&&9===r.nodeType&&r.documentElement?(D=r,L=r.documentElement,M=!N(r),o&&o!==t(o)&&(o.addEventListener?o.addEventListener("unload",function(){B()},!1):o.attachEvent&&o.attachEvent("onunload",function(){B()})),x.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),x.getElementsByTagName=i(function(e){return e.appendChild(r.createComment("")),!e.getElementsByTagName("*").length}),x.getElementsByClassName=ge.test(r.getElementsByClassName),x.getById=i(function(e){return L.appendChild(e).id=F,!r.getElementsByName||!r.getElementsByName(F).length}),x.getById?(w.find.ID=function(e,t){if(typeof t.getElementById!==Y&&M){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},w.filter.ID=function(e){var t=e.replace(Ce,xe);return function(e){return e.getAttribute("id")===t}}):(delete w.find.ID,w.filter.ID=function(e){var t=e.replace(Ce,xe);return function(e){var n=typeof e.getAttributeNode!==Y&&e.getAttributeNode("id");return n&&n.value===t}}),w.find.TAG=x.getElementsByTagName?function(e,t){if(typeof t.getElementsByTagName!==Y)return t.getElementsByTagName(e)}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},w.find.CLASS=x.getElementsByClassName&&function(e,t){if(M)return t.getElementsByClassName(e)},O=[],P=[],(x.qsa=ge.test(r.querySelectorAll))&&(i(function(e){e.innerHTML="<select msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&P.push("[*^$]="+re+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||P.push("\\["+re+"*(?:value|"+ne+")"),e.querySelectorAll(":checked").length||P.push(":checked")}),i(function(e){var t=r.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&P.push("name"+re+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||P.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),P.push(",.*:")})),(x.matchesSelector=ge.test(H=L.matches||L.webkitMatchesSelector||L.mozMatchesSelector||L.oMatchesSelector||L.msMatchesSelector))&&i(function(e){x.disconnectedMatch=H.call(e,"div"),H.call(e,"[s!='']:x"),O.push("!=",ae)}),P=P.length&&new RegExp(P.join("|")),O=O.length&&new RegExp(O.join("|")),n=ge.test(L.compareDocumentPosition),I=n||ge.test(L.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},j=n?function(e,t){if(e===t)return A=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!x.sortDetached&&t.compareDocumentPosition(e)===n?e===r||e.ownerDocument===z&&I(z,e)?-1:t===r||t.ownerDocument===z&&I(z,t)?1:R?te.call(R,e)-te.call(R,t):0:4&n?-1:1)}:function(e,t){if(e===t)return A=!0,0;var n,i=0,o=e.parentNode,s=t.parentNode,l=[e],u=[t];if(!o||!s)return e===r?-1:t===r?1:o?-1:s?1:R?te.call(R,e)-te.call(R,t):0;if(o===s)return a(e,t);for(n=e;n=n.parentNode;)l.unshift(n);for(n=t;n=n.parentNode;)u.unshift(n);for(;l[i]===u[i];)i++;return i?a(l[i],u[i]):l[i]===z?-1:u[i]===z?1:0},r):D},e.matches=function(t,n){return e(t,null,null,n)},e.matchesSelector=function(t,n){if((t.ownerDocument||t)!==D&&B(t),n=n.replace(ce,"='$1']"),x.matchesSelector&&M&&(!O||!O.test(n))&&(!P||!P.test(n)))try{var r=H.call(t,n);if(r||x.disconnectedMatch||t.document&&11!==t.document.nodeType)return r}catch(i){}return e(n,D,null,[t]).length>0},e.contains=function(e,t){return(e.ownerDocument||e)!==D&&B(e),I(e,t)},e.attr=function(e,n){(e.ownerDocument||e)!==D&&B(e);var r=w.attrHandle[n.toLowerCase()],i=r&&K.call(w.attrHandle,n.toLowerCase())?r(e,n,!M):t;return i!==t?i:x.attributes||!M?e.getAttribute(n):(i=e.getAttributeNode(n))&&i.specified?i.value:null},e.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},e.uniqueSort=function(e){var t,n=[],r=0,i=0;if(A=!x.detectDuplicates,R=!x.sortStable&&e.slice(0),e.sort(j),A){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return R=null,e},E=e.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=E(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=E(t);return n},w=e.selectors={cacheLength:50,createPseudo:r,match:pe,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Ce,xe),e[3]=(e[3]||e[4]||e[5]||"").replace(Ce,xe),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(e){var t,n=!e[6]&&e[2];return pe.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&de.test(n)&&(t=_(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Ce,xe).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=V[e+" "];return t||(t=new RegExp("(^|"+re+")"+e+"("+re+"|$)"))&&V(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==Y&&e.getAttribute("class")||"")})},ATTR:function(t,n,r){return function(i){var o=e.attr(i,t);return null==o?"!="===n:!n||(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o+" ").indexOf(r)>-1:"|="===n&&(o===r||o.slice(0,r.length+1)===r+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,d,f,p,h,m=o!==a?"nextSibling":"previousSibling",g=t.parentNode,v=s&&t.nodeName.toLowerCase(),y=!l&&!s;if(g){if(o){for(;m;){for(d=t;d=d[m];)if(s?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;h=m="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?g.firstChild:g.lastChild],a&&y){for(c=g[F]||(g[F]={}),u=c[e]||[],p=u[0]===U&&u[1],f=u[0]===U&&u[2],d=p&&g.childNodes[p];d=++p&&d&&d[m]||(f=p=0)||h.pop();)if(1===d.nodeType&&++f&&d===t){c[e]=[U,p,f];break}}else if(y&&(u=(t[F]||(t[F]={}))[e])&&u[0]===U)f=u[1];else for(;(d=++p&&d&&d[m]||(f=p=0)||h.pop())&&((s?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++f||(y&&((d[F]||(d[F]={}))[e]=[U,f]),d!==t)););return f-=i,f===r||f%r===0&&f/r>=0}}},PSEUDO:function(t,n){var i,o=w.pseudos[t]||w.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return o[F]?o(n):o.length>1?(i=[t,t,"",n],w.setFilters.hasOwnProperty(t.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),a=i.length;a--;)r=te.call(e,i[a]),e[r]=!(t[r]=i[a])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=S(e.replace(se,"$1"));return i[F]?r(function(e,t,n,r){for(var o,a=i(e,null,r,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),!n.pop()}}),has:r(function(t){return function(n){return e(t,n).length>0}}),contains:r(function(e){return e=e.replace(Ce,xe),function(t){return(t.textContent||t.innerText||E(t)).indexOf(e)>-1}}),lang:r(function(t){return fe.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(Ce,xe).toLowerCase(),function(e){var n;do if(n=M?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return n=n.toLowerCase(),n===t||0===n.indexOf(t+"-");while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=window.location&&window.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===L},focus:function(e){return e===D.activeElement&&(!D.hasFocus||D.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!w.pseudos.empty(e)},header:function(e){return me.test(e.nodeName)},input:function(e){return he.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:u(function(){return[0]}),last:u(function(e,t){return[t-1]}),eq:u(function(e,t,n){return[n<0?n+t:n]}),even:u(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:u(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:u(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:u(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},w.pseudos.nth=w.pseudos.eq;for(C in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})w.pseudos[C]=s(C);for(C in{submit:!0,reset:!0})w.pseudos[C]=l(C);return d.prototype=w.filters=w.pseudos,w.setFilters=new d,_=e.tokenize=function(t,n){var r,i,o,a,s,l,u,c=$[t+" "];if(c)return n?0:c.slice(0);for(s=t,l=[],u=w.preFilter;s;){r&&!(i=le.exec(s))||(i&&(s=s.slice(i[0].length)||s),l.push(o=[])),r=!1,(i=ue.exec(s))&&(r=i.shift(),o.push({value:r,type:i[0].replace(se," ")}),s=s.slice(r.length));for(a in w.filter)!(i=pe[a].exec(s))||u[a]&&!(i=u[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));if(!r)break}return n?s.length:s?e.error(t):$(t,l).slice(0)},S=e.compile=function(e,t){var n,r=[],i=[],o=q[e+" "];if(!o){for(t||(t=_(e)),n=t.length;n--;)o=y(t[n]),o[F]?r.push(o):i.push(o);o=q(e,b(i,r)),o.selector=e}return o},k=e.select=function(e,t,n,r){var i,o,a,s,l,u="function"==typeof e&&e,d=!r&&_(e=u.selector||e);
if(n=n||[],1===d.length){if(o=d[0]=d[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&x.getById&&9===t.nodeType&&M&&w.relative[o[1].type]){if(t=(w.find.ID(a.matches[0].replace(Ce,xe),t)||[])[0],!t)return n;u&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=pe.needsContext.test(e)?0:o.length;i--&&(a=o[i],!w.relative[s=a.type]);)if((l=w.find[s])&&(r=l(a.matches[0].replace(Ce,xe),ye.test(o[0].type)&&c(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&f(o),!e)return Z.apply(n,r),n;break}}return(u||S(e,d))(r,t,!M,n,ye.test(e)&&c(t.parentNode)||t),n},x.sortStable=F.split("").sort(j).join("")===F,x.detectDuplicates=!!A,B(),x.sortDetached=i(function(e){return 1&e.compareDocumentPosition(D.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),x.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(ne,function(e,t,n){var r;if(!n)return e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),e}),r(h,[],function(){function e(e){var t=e,n,r;if(!c(e))for(t=[],n=0,r=e.length;n<r;n++)t[n]=e[n];return t}function n(e,n,r){var i,o;if(!e)return 0;if(r=r||e,e.length!==t){for(i=0,o=e.length;i<o;i++)if(n.call(r,e[i],i,e)===!1)return 0}else for(i in e)if(e.hasOwnProperty(i)&&n.call(r,e[i],i,e)===!1)return 0;return 1}function r(e,t){var r=[];return n(e,function(n,i){r.push(t(n,i,e))}),r}function i(e,t){var r=[];return n(e,function(n,i){t&&!t(n,i,e)||r.push(n)}),r}function o(e,t){var n,r;if(e)for(n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}function a(e,t,n,r){var i=0;for(arguments.length<3&&(n=e[0]);i<e.length;i++)n=t.call(r,n,e[i],i);return n}function s(e,t,n){var r,i;for(r=0,i=e.length;r<i;r++)if(t.call(n,e[r],r,e))return r;return-1}function l(e,n,r){var i=s(e,n,r);return i!==-1?e[i]:t}function u(e){return e[e.length-1]}var c=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};return{isArray:c,toArray:e,each:n,map:r,filter:i,indexOf:o,reduce:a,findIndex:s,find:l,last:u}}),r(m,[d,h],function(e,n){function r(e){return null===e||e===t?"":(""+e).replace(h,"")}function i(e,r){return r?!("array"!=r||!n.isArray(e))||typeof e==r:e!==t}function o(e,t,n){var r;for(e=e||[],t=t||",","string"==typeof e&&(e=e.split(t)),n=n||{},r=e.length;r--;)n[e[r]]={};return n}function a(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function s(e,t,n){var r=this,i,o,a,s,l,u=0;if(e=/^((static) )?([\w.]+)(:([\w.]+))?/.exec(e),a=e[3].match(/(^|\.)(\w+)$/i)[2],o=r.createNS(e[3].replace(/\.\w+$/,""),n),!o[a]){if("static"==e[2])return o[a]=t,void(this.onCreate&&this.onCreate(e[2],e[3],o[a]));t[a]||(t[a]=function(){},u=1),o[a]=t[a],r.extend(o[a].prototype,t),e[5]&&(i=r.resolve(e[5]).prototype,s=e[5].match(/\.(\w+)$/i)[1],l=o[a],u?o[a]=function(){return i[s].apply(this,arguments)}:o[a]=function(){return this.parent=i[s],l.apply(this,arguments)},o[a].prototype[a]=o[a],r.each(i,function(e,t){o[a].prototype[t]=i[t]}),r.each(t,function(e,t){i[t]?o[a].prototype[t]=function(){return this.parent=i[t],e.apply(this,arguments)}:t!=a&&(o[a].prototype[t]=e)})),r.each(t["static"],function(e,t){o[a][t]=e})}}function l(e,n){var r,i,o,a=arguments,s;for(r=1,i=a.length;r<i;r++){n=a[r];for(o in n)n.hasOwnProperty(o)&&(s=n[o],s!==t&&(e[o]=s))}return e}function u(e,t,r,i){i=i||this,e&&(r&&(e=e[r]),n.each(e,function(e,n){return t.call(i,e,n,r)!==!1&&void u(e,t,r,i)}))}function c(e,t){var n,r;for(t=t||window,e=e.split("."),n=0;n<e.length;n++)r=e[n],t[r]||(t[r]={}),t=t[r];return t}function d(e,t){var n,r;for(t=t||window,e=e.split("."),n=0,r=e.length;n<r&&(t=t[e[n]],t);n++);return t}function f(e,t){return!e||i(e,"array")?e:n.map(e.split(t||","),r)}function p(t){var n=e.cacheSuffix;return n&&(t+=(t.indexOf("?")===-1?"?":"&")+n),t}var h=/^\s*|\s*$/g;return{trim:r,isArray:n.isArray,is:i,toArray:n.toArray,makeMap:o,each:n.each,map:n.map,grep:n.filter,inArray:n.indexOf,hasOwn:a,extend:l,create:s,walk:u,createNS:c,resolve:d,explode:f,_addCacheSuffix:p}}),r(g,[f,p,m,d],function(e,n,r,i){function o(e){return"undefined"!=typeof e}function a(e){return"string"==typeof e}function s(e){return e&&e==e.window}function l(e,t){var n,r,i;for(t=t||w,i=t.createElement("div"),n=t.createDocumentFragment(),i.innerHTML=e;r=i.firstChild;)n.appendChild(r);return n}function u(e,t,n,r){var i;if(a(t))t=l(t,v(e[0]));else if(t.length&&!t.nodeType){if(t=f.makeArray(t),r)for(i=t.length-1;i>=0;i--)u(e,t[i],n,r);else for(i=0;i<t.length;i++)u(e,t[i],n,r);return e}if(t.nodeType)for(i=e.length;i--;)n.call(e[i],t);return e}function c(e,t){return e&&t&&(" "+e.className+" ").indexOf(" "+t+" ")!==-1}function d(e,t,n){var r,i;return t=f(t)[0],e.each(function(){var e=this;n&&r==e.parentNode?i.appendChild(e):(r=e.parentNode,i=t.cloneNode(!1),e.parentNode.insertBefore(i,e),i.appendChild(e))}),e}function f(e,t){return new f.fn.init(e,t)}function p(e,t){var n;if(t.indexOf)return t.indexOf(e);for(n=t.length;n--;)if(t[n]===e)return n;return-1}function h(e){return null===e||e===k?"":(""+e).replace(P,"")}function m(e,t){var n,r,i,o,a;if(e)if(n=e.length,n===o){for(r in e)if(e.hasOwnProperty(r)&&(a=e[r],t.call(a,r,a)===!1))break}else for(i=0;i<n&&(a=e[i],t.call(a,i,a)!==!1);i++);return e}function g(e,t){var n=[];return m(e,function(e,r){t(r,e)&&n.push(r)}),n}function v(e){return e?9==e.nodeType?e:e.ownerDocument:w}function y(e,n,r){var i=[],o=e[n];for("string"!=typeof r&&r instanceof f&&(r=r[0]);o&&9!==o.nodeType;){if(r!==t){if(o===r)break;if("string"==typeof r&&f(o).is(r))break}1===o.nodeType&&i.push(o),o=o[n]}return i}function b(e,n,r,i){var o=[];for(i instanceof f&&(i=i[0]);e;e=e[n])if(!r||e.nodeType===r){if(i!==t){if(e===i)break;if("string"==typeof i&&f(e).is(i))break}o.push(e)}return o}function C(e,t,n){for(e=e[t];e;e=e[t])if(e.nodeType==n)return e;return null}function x(e,t,n){m(n,function(n,r){e[n]=e[n]||{},e[n][t]=r})}var w=document,E=Array.prototype.push,N=Array.prototype.slice,_=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,S=e.Event,k,T=r.makeMap("children,contents,next,prev"),R=r.makeMap("fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom"," "),A=r.makeMap("checked compact declare defer disabled ismap multiple nohref noshade nowrap readonly selected"," "),B={"for":"htmlFor","class":"className",readonly:"readOnly"},D={"float":"cssFloat"},L={},M={},P=/^\s*|\s*$/g;return f.fn=f.prototype={constructor:f,selector:"",context:null,length:0,init:function(e,t){var n=this,r,i;if(!e)return n;if(e.nodeType)return n.context=n[0]=e,n.length=1,n;if(t&&t.nodeType)n.context=t;else{if(t)return f(e).attr(t);n.context=t=document}if(a(e)){if(n.selector=e,r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:_.exec(e),!r)return f(t).find(e);if(r[1])for(i=l(e,v(t)).firstChild;i;)E.call(n,i),i=i.nextSibling;else{if(i=v(t).getElementById(r[2]),!i)return n;if(i.id!==r[2])return n.find(e);n.length=1,n[0]=i}}else this.add(e,!1);return n},toArray:function(){return r.toArray(this)},add:function(e,t){var n=this,r,i;if(a(e))return n.add(f(e));if(t!==!1)for(r=f.unique(n.toArray().concat(f.makeArray(e))),n.length=r.length,i=0;i<r.length;i++)n[i]=r[i];else E.apply(n,f.makeArray(e));return n},attr:function(e,t){var n=this,r;if("object"==typeof e)m(e,function(e,t){n.attr(e,t)});else{if(!o(t)){if(n[0]&&1===n[0].nodeType){if(r=L[e],r&&r.get)return r.get(n[0],e);if(A[e])return n.prop(e)?e:k;t=n[0].getAttribute(e,2),null===t&&(t=k)}return t}this.each(function(){var n;if(1===this.nodeType){if(n=L[e],n&&n.set)return void n.set(this,t);null===t?this.removeAttribute(e,2):this.setAttribute(e,t,2)}})}return n},removeAttr:function(e){return this.attr(e,null)},prop:function(e,t){var n=this;if(e=B[e]||e,"object"==typeof e)m(e,function(e,t){n.prop(e,t)});else{if(!o(t))return n[0]&&n[0].nodeType&&e in n[0]?n[0][e]:t;this.each(function(){1==this.nodeType&&(this[e]=t)})}return n},css:function(e,t){function n(e){return e.replace(/-(\D)/g,function(e,t){return t.toUpperCase()})}function r(e){return e.replace(/[A-Z]/g,function(e){return"-"+e})}var i=this,a,s;if("object"==typeof e)m(e,function(e,t){i.css(e,t)});else if(o(t))e=n(e),"number"!=typeof t||R[e]||(t+="px"),i.each(function(){var n=this.style;if(s=M[e],s&&s.set)return void s.set(this,t);try{this.style[D[e]||e]=t}catch(i){}null!==t&&""!==t||(n.removeProperty?n.removeProperty(r(e)):n.removeAttribute(e))});else{if(a=i[0],s=M[e],s&&s.get)return s.get(a);if(a.ownerDocument.defaultView)try{return a.ownerDocument.defaultView.getComputedStyle(a,null).getPropertyValue(r(e))}catch(l){return k}else if(a.currentStyle)return a.currentStyle[n(e)]}return i},remove:function(){for(var e=this,t,n=this.length;n--;)t=e[n],S.clean(t),t.parentNode&&t.parentNode.removeChild(t);return this},empty:function(){for(var e=this,t,n=this.length;n--;)for(t=e[n];t.firstChild;)t.removeChild(t.firstChild);return this},html:function(e){var t=this,n;if(o(e)){n=t.length;try{for(;n--;)t[n].innerHTML=e}catch(r){f(t[n]).empty().append(e)}return t}return t[0]?t[0].innerHTML:""},text:function(e){var t=this,n;if(o(e)){for(n=t.length;n--;)"innerText"in t[n]?t[n].innerText=e:t[0].textContent=e;return t}return t[0]?t[0].innerText||t[0].textContent:""},append:function(){return u(this,arguments,function(e){(1===this.nodeType||this.host&&1===this.host.nodeType)&&this.appendChild(e)})},prepend:function(){return u(this,arguments,function(e){(1===this.nodeType||this.host&&1===this.host.nodeType)&&this.insertBefore(e,this.firstChild)},!0)},before:function(){var e=this;return e[0]&&e[0].parentNode?u(e,arguments,function(e){this.parentNode.insertBefore(e,this)}):e},after:function(){var e=this;return e[0]&&e[0].parentNode?u(e,arguments,function(e){this.parentNode.insertBefore(e,this.nextSibling)},!0):e},appendTo:function(e){return f(e).append(this),this},prependTo:function(e){return f(e).prepend(this),this},replaceWith:function(e){return this.before(e).remove()},wrap:function(e){return d(this,e)},wrapAll:function(e){return d(this,e,!0)},wrapInner:function(e){return this.each(function(){f(this).contents().wrapAll(e)}),this},unwrap:function(){return this.parent().each(function(){f(this).replaceWith(this.childNodes)})},clone:function(){var e=[];return this.each(function(){e.push(this.cloneNode(!0))}),f(e)},addClass:function(e){return this.toggleClass(e,!0)},removeClass:function(e){return this.toggleClass(e,!1)},toggleClass:function(e,t){var n=this;return"string"!=typeof e?n:(e.indexOf(" ")!==-1?m(e.split(" "),function(){n.toggleClass(this,t)}):n.each(function(n,r){var i,o;o=c(r,e),o!==t&&(i=r.className,o?r.className=h((" "+i+" ").replace(" "+e+" "," ")):r.className+=i?" "+e:e)}),n)},hasClass:function(e){return c(this[0],e)},each:function(e){return m(this,e)},on:function(e,t){return this.each(function(){S.bind(this,e,t)})},off:function(e,t){return this.each(function(){S.unbind(this,e,t)})},trigger:function(e){return this.each(function(){"object"==typeof e?S.fire(this,e.type,e):S.fire(this,e)})},show:function(){return this.css("display","")},hide:function(){return this.css("display","none")},slice:function(){return new f(N.apply(this,arguments))},eq:function(e){return e===-1?this.slice(e):this.slice(e,+e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},find:function(e){var t,n,r=[];for(t=0,n=this.length;t<n;t++)f.find(e,this[t],r);return f(r)},filter:function(e){return f("function"==typeof e?g(this.toArray(),function(t,n){return e(n,t)}):f.filter(e,this.toArray()))},closest:function(e){var t=[];return e instanceof f&&(e=e[0]),this.each(function(n,r){for(;r;){if("string"==typeof e&&f(r).is(e)){t.push(r);break}if(r==e){t.push(r);break}r=r.parentNode}}),f(t)},offset:function(e){var t,n,r,i=0,o=0,a;return e?this.css(e):(t=this[0],t&&(n=t.ownerDocument,r=n.documentElement,t.getBoundingClientRect&&(a=t.getBoundingClientRect(),i=a.left+(r.scrollLeft||n.body.scrollLeft)-r.clientLeft,o=a.top+(r.scrollTop||n.body.scrollTop)-r.clientTop)),{left:i,top:o})},push:E,sort:[].sort,splice:[].splice},r.extend(f,{extend:r.extend,makeArray:function(e){return s(e)||e.nodeType?[e]:r.toArray(e)},inArray:p,isArray:r.isArray,each:m,trim:h,grep:g,find:n,expr:n.selectors,unique:n.uniqueSort,text:n.getText,contains:n.contains,filter:function(e,t,n){var r=t.length;for(n&&(e=":not("+e+")");r--;)1!=t[r].nodeType&&t.splice(r,1);return t=1===t.length?f.find.matchesSelector(t[0],e)?[t[0]]:[]:f.find.matches(e,t)}}),m({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return y(e,"parentNode")},next:function(e){return C(e,"nextSibling",1)},prev:function(e){return C(e,"previousSibling",1)},children:function(e){return b(e.firstChild,"nextSibling",1)},contents:function(e){return r.toArray(("iframe"===e.nodeName?e.contentDocument||e.contentWindow.document:e).childNodes)}},function(e,t){f.fn[e]=function(n){var r=this,i=[];return r.each(function(){var e=t.call(i,this,n,i);e&&(f.isArray(e)?i.push.apply(i,e):i.push(e))}),this.length>1&&(T[e]||(i=f.unique(i)),0===e.indexOf("parents")&&(i=i.reverse())),i=f(i),n?i.filter(n):i}}),m({parentsUntil:function(e,t){return y(e,"parentNode",t)},nextUntil:function(e,t){return b(e,"nextSibling",1,t).slice(1)},prevUntil:function(e,t){return b(e,"previousSibling",1,t).slice(1)}},function(e,t){f.fn[e]=function(n,r){var i=this,o=[];return i.each(function(){var e=t.call(o,this,n,o);e&&(f.isArray(e)?o.push.apply(o,e):o.push(e))}),this.length>1&&(o=f.unique(o),0!==e.indexOf("parents")&&"prevUntil"!==e||(o=o.reverse())),o=f(o),r?o.filter(r):o}}),f.fn.is=function(e){return!!e&&this.filter(e).length>0},f.fn.init.prototype=f.fn,f.overrideDefaults=function(e){function t(r,i){return n=n||e(),0===arguments.length&&(r=n.element),i||(i=n.context),new t.fn.init(r,i)}var n;return f.extend(t,this),t},i.ie&&i.ie<8&&(x(L,"get",{maxlength:function(e){var t=e.maxLength;return 2147483647===t?k:t},size:function(e){var t=e.size;return 20===t?k:t},"class":function(e){return e.className},style:function(e){var t=e.style.cssText;return 0===t.length?k:t}}),x(L,"set",{"class":function(e,t){e.className=t},style:function(e,t){e.style.cssText=t}})),i.ie&&i.ie<9&&(D["float"]="styleFloat",x(M,"set",{opacity:function(e,t){var n=e.style;null===t||""===t?n.removeAttribute("filter"):(n.zoom=1,n.filter="alpha(opacity="+100*t+")")}})),f.attrHooks=L,f.cssHooks=M,f}),r(v,[],function(){return function(e,t){function n(e,t,n,r){function i(e){return e=parseInt(e,10).toString(16),e.length>1?e:"0"+e}return"#"+i(t)+i(n)+i(r)}var r=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,i=/(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,o=/\s*([^:]+):\s*([^;]+);?/g,a=/\s+$/,s,l={},u,c,d,f="\ufeff";for(e=e||{},t&&(c=t.getValidStyles(),d=t.getInvalidStyles()),u=("\\\" \\' \\; \\: ; : "+f).split(" "),s=0;s<u.length;s++)l[u[s]]=f+s,l[f+s]=u[s];return{toHex:function(e){return e.replace(r,n)},parse:function(t){function u(e,t,n){var r,i,o,a;if(r=y[e+"-top"+t],r&&(i=y[e+"-right"+t],i&&(o=y[e+"-bottom"+t],o&&(a=y[e+"-left"+t])))){var l=[r,i,o,a];for(s=l.length-1;s--&&l[s]===l[s+1];);s>-1&&n||(y[e+t]=s==-1?l[0]:l.join(" "),delete y[e+"-top"+t],delete y[e+"-right"+t],delete y[e+"-bottom"+t],delete y[e+"-left"+t])}}function c(e){var t=y[e],n;if(t){for(t=t.split(" "),n=t.length;n--;)if(t[n]!==t[0])return!1;return y[e]=t[0],!0}}function d(e,t,n,r){c(t)&&c(n)&&c(r)&&(y[e]=y[t]+" "+y[n]+" "+y[r],delete y[t],delete y[n],delete y[r])}function p(e){return w=!0,l[e]}function h(e,t){return w&&(e=e.replace(/\uFEFF[0-9]/g,function(e){return l[e]})),t||(e=e.replace(/\\([\'\";:])/g,"$1")),e}function m(e){return String.fromCharCode(parseInt(e.slice(1),16))}function g(e){return e.replace(/\\[0-9a-f]+/gi,m)}function v(t,n,r,i,o,a){if(o=o||a)return o=h(o),"'"+o.replace(/\'/g,"\\'")+"'";if(n=h(n||r||i),!e.allow_script_urls){var s=n.replace(/[\s\r\n]+/g,"");if(/(java|vb)script:/i.test(s))return"";if(!e.allow_svg_data_urls&&/^data:image\/svg/i.test(s))return""}return E&&(n=E.call(N,n,"style")),"url('"+n.replace(/\'/g,"\\'")+"')"}var y={},b,C,x,w,E=e.url_converter,N=e.url_converter_scope||this;if(t){for(t=t.replace(/[\u0000-\u001F]/g,""),t=t.replace(/\\[\"\';:\uFEFF]/g,p).replace(/\"[^\"]+\"|\'[^\']+\'/g,function(e){return e.replace(/[;:]/g,p)});b=o.exec(t);)if(o.lastIndex=b.index+b[0].length,C=b[1].replace(a,"").toLowerCase(),x=b[2].replace(a,""),C&&x){if(C=g(C),x=g(x),C.indexOf(f)!==-1||C.indexOf('"')!==-1)continue;if(!e.allow_script_urls&&("behavior"==C||/expression\s*\(|\/\*|\*\//.test(x)))continue;"font-weight"===C&&"700"===x?x="bold":"color"!==C&&"background-color"!==C||(x=x.toLowerCase()),x=x.replace(r,n),x=x.replace(i,v),y[C]=w?h(x,!0):x}u("border","",!0),u("border","-width"),u("border","-color"),u("border","-style"),u("padding",""),u("margin",""),d("border","border-width","border-style","border-color"),"medium none"===y.border&&delete y.border,"none"===y["border-image"]&&delete y["border-image"]}return y},serialize:function(e,t){function n(t){var n,r,o,a;if(n=c[t])for(r=0,o=n.length;r<o;r++)t=n[r],a=e[t],a&&(i+=(i.length>0?" ":"")+t+": "+a+";")}function r(e,t){var n;return n=d["*"],(!n||!n[e])&&(n=d[t],!n||!n[e])}var i="",o,a;if(t&&c)n("*"),n(t);else for(o in e)a=e[o],!a||d&&!r(o,t)||(i+=(i.length>0?" ":"")+o+": "+a+";");return i}}}}),r(y,[],function(){return function(e,t){function n(e,n,r,i){var o,a;if(e){if(!i&&e[n])return e[n];if(e!=t){if(o=e[r])return o;for(a=e.parentNode;a&&a!=t;a=a.parentNode)if(o=a[r])return o}}}function r(e,n,r,i){var o,a,s;if(e){if(o=e[r],t&&o===t)return;if(o){if(!i)for(s=o[n];s;s=s[n])if(!s[n])return s;return o}if(a=e.parentNode,a&&a!==t)return a}}var i=e;this.current=function(){return i},this.next=function(e){return i=n(i,"firstChild","nextSibling",e)},this.prev=function(e){return i=n(i,"lastChild","previousSibling",e)},this.prev2=function(e){return i=r(i,"lastChild","previousSibling",e)}}}),r(b,[m],function(e){function t(n){function r(){return P.createDocumentFragment()}function i(e,t){E(F,e,t)}function o(e,t){E(z,e,t)}function a(e){i(e.parentNode,j(e))}function s(e){i(e.parentNode,j(e)+1)}function l(e){o(e.parentNode,j(e))}function u(e){o(e.parentNode,j(e)+1)}function c(e){e?(M[V]=M[W],M[$]=M[U]):(M[W]=M[V],M[U]=M[$]),M.collapsed=F}function d(e){a(e),u(e)}function f(e){i(e,0),o(e,1===e.nodeType?e.childNodes.length:e.nodeValue.length)}function p(e,t){var n=M[W],r=M[U],i=M[V],o=M[$],a=t.startContainer,s=t.startOffset,l=t.endContainer,u=t.endOffset;return 0===e?w(n,r,a,s):1===e?w(i,o,a,s):2===e?w(i,o,l,u):3===e?w(n,r,l,u):void 0}function h(){N(I)}function m(){return N(O)}function g(){return N(H)}function v(e){var t=this[W],r=this[U],i,o;3!==t.nodeType&&4!==t.nodeType||!t.nodeValue?(t.childNodes.length>0&&(o=t.childNodes[r]),o?t.insertBefore(e,o):3==t.nodeType?n.insertAfter(e,t):t.appendChild(e)):r?r>=t.nodeValue.length?n.insertAfter(e,t):(i=t.splitText(r),t.parentNode.insertBefore(e,i)):t.parentNode.insertBefore(e,t)}function y(e){var t=M.extractContents();M.insertNode(e),e.appendChild(t),M.selectNode(e)}function b(){return q(new t(n),{startContainer:M[W],startOffset:M[U],endContainer:M[V],endOffset:M[$],collapsed:M.collapsed,commonAncestorContainer:M.commonAncestorContainer})}function C(e,t){var n;if(3==e.nodeType)return e;if(t<0)return e;for(n=e.firstChild;n&&t>0;)--t,n=n.nextSibling;return n?n:e}function x(){return M[W]==M[V]&&M[U]==M[$]}function w(e,t,r,i){var o,a,s,l,u,c;if(e==r)return t==i?0:t<i?-1:1;for(o=r;o&&o.parentNode!=e;)o=o.parentNode;if(o){for(a=0,s=e.firstChild;s!=o&&a<t;)a++,s=s.nextSibling;return t<=a?-1:1}for(o=e;o&&o.parentNode!=r;)o=o.parentNode;if(o){for(a=0,s=r.firstChild;s!=o&&a<i;)a++,s=s.nextSibling;return a<i?-1:1}for(l=n.findCommonAncestor(e,r),u=e;u&&u.parentNode!=l;)u=u.parentNode;for(u||(u=l),c=r;c&&c.parentNode!=l;)c=c.parentNode;if(c||(c=l),u==c)return 0;for(s=l.firstChild;s;){if(s==u)return-1;if(s==c)return 1;s=s.nextSibling}}function E(e,t,r){var i,o;for(e?(M[W]=t,M[U]=r):(M[V]=t,M[$]=r),i=M[V];i.parentNode;)i=i.parentNode;for(o=M[W];o.parentNode;)o=o.parentNode;o==i?w(M[W],M[U],M[V],M[$])>0&&M.collapse(e):M.collapse(e),M.collapsed=x(),M.commonAncestorContainer=n.findCommonAncestor(M[W],M[V])}function N(e){var t,n=0,r=0,i,o,a,s,l,u;if(M[W]==M[V])return _(e);for(t=M[V],i=t.parentNode;i;t=i,i=i.parentNode){if(i==M[W])return S(t,e);++n}for(t=M[W],i=t.parentNode;i;t=i,i=i.parentNode){if(i==M[V])return k(t,e);++r}for(o=r-n,a=M[W];o>0;)a=a.parentNode,o--;for(s=M[V];o<0;)s=s.parentNode,o++;for(l=a.parentNode,u=s.parentNode;l!=u;l=l.parentNode,u=u.parentNode)a=l,s=u;return T(a,s,e)}function _(e){var t,n,i,o,a,s,l,u,c;if(e!=I&&(t=r()),M[U]==M[$])return t;if(3==M[W].nodeType){if(n=M[W].nodeValue,i=n.substring(M[U],M[$]),e!=H&&(o=M[W],u=M[U],c=M[$]-M[U],0===u&&c>=o.nodeValue.length-1?o.parentNode.removeChild(o):o.deleteData(u,c),M.collapse(F)),e==I)return;return i.length>0&&t.appendChild(P.createTextNode(i)),t}for(o=C(M[W],M[U]),a=M[$]-M[U];o&&a>0;)s=o.nextSibling,l=D(o,e),t&&t.appendChild(l),--a,o=s;return e!=H&&M.collapse(F),t}function S(e,t){var n,i,o,a,s,l;if(t!=I&&(n=r()),i=R(e,t),n&&n.appendChild(i),o=j(e),a=o-M[U],a<=0)return t!=H&&(M.setEndBefore(e),M.collapse(z)),n;for(i=e.previousSibling;a>0;)s=i.previousSibling,l=D(i,t),n&&n.insertBefore(l,n.firstChild),--a,i=s;return t!=H&&(M.setEndBefore(e),M.collapse(z)),n}function k(e,t){var n,i,o,a,s,l;for(t!=I&&(n=r()),o=A(e,t),n&&n.appendChild(o),i=j(e),++i,a=M[$]-i,o=e.nextSibling;o&&a>0;)s=o.nextSibling,l=D(o,t),n&&n.appendChild(l),--a,o=s;return t!=H&&(M.setStartAfter(e),M.collapse(F)),n}function T(e,t,n){var i,o,a,s,l,u,c;for(n!=I&&(o=r()),i=A(e,n),o&&o.appendChild(i),a=j(e),s=j(t),++a,l=s-a,u=e.nextSibling;l>0;)c=u.nextSibling,i=D(u,n),o&&o.appendChild(i),u=c,--l;return i=R(t,n),o&&o.appendChild(i),n!=H&&(M.setStartAfter(e),M.collapse(F)),o}function R(e,t){var n=C(M[V],M[$]-1),r,i,o,a,s,l=n!=M[V];if(n==e)return B(n,l,z,t);for(r=n.parentNode,i=B(r,z,z,t);r;){for(;n;)o=n.previousSibling,a=B(n,l,z,t),t!=I&&i.insertBefore(a,i.firstChild),l=F,n=o;if(r==e)return i;n=r.previousSibling,r=r.parentNode,s=B(r,z,z,t),t!=I&&s.appendChild(i),i=s}}function A(e,t){var n=C(M[W],M[U]),r=n!=M[W],i,o,a,s,l;if(n==e)return B(n,r,F,t);for(i=n.parentNode,o=B(i,z,F,t);i;){for(;n;)a=n.nextSibling,s=B(n,r,F,t),t!=I&&o.appendChild(s),r=F,n=a;if(i==e)return o;n=i.nextSibling,i=i.parentNode,l=B(i,z,F,t),t!=I&&l.appendChild(o),o=l}}function B(e,t,r,i){var o,a,s,l,u;if(t)return D(e,i);if(3==e.nodeType){if(o=e.nodeValue,r?(l=M[U],a=o.substring(l),s=o.substring(0,l)):(l=M[$],a=o.substring(0,l),s=o.substring(l)),i!=H&&(e.nodeValue=s),i==I)return;return u=n.clone(e,z),u.nodeValue=a,u}if(i!=I)return n.clone(e,z)}function D(e,t){return t!=I?t==H?n.clone(e,F):e:void e.parentNode.removeChild(e)}function L(){return n.create("body",null,g()).outerText}var M=this,P=n.doc,O=0,H=1,I=2,F=!0,z=!1,U="startOffset",W="startContainer",V="endContainer",$="endOffset",q=e.extend,j=n.nodeIndex;return q(M,{startContainer:P,startOffset:0,endContainer:P,endOffset:0,collapsed:F,commonAncestorContainer:P,START_TO_START:0,START_TO_END:1,END_TO_END:2,END_TO_START:3,setStart:i,setEnd:o,setStartBefore:a,setStartAfter:s,setEndBefore:l,setEndAfter:u,collapse:c,selectNode:d,selectNodeContents:f,compareBoundaryPoints:p,deleteContents:h,extractContents:m,cloneContents:g,insertNode:v,surroundContents:y,cloneRange:b,toStringIE:L}),M}return t.prototype.toString=function(){return this.toStringIE()},t}),r(C,[m],function(e){function t(e){var t;return t=document.createElement("div"),t.innerHTML=e,t.textContent||t.innerText||e}function n(e,t){var n,r,i,a={};if(e){for(e=e.split(","),t=t||10,n=0;n<e.length;n+=2)r=String.fromCharCode(parseInt(e[n],t)),o[r]||(i="&"+e[n+1]+";",a[r]=i,a[i]=r);return a}}var r=e.makeMap,i,o,a,s=/[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,l=/[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,u=/[<>&\"\']/g,c=/&#([a-z0-9]+);?|&([a-z0-9]+);/gi,d={128:"\u20ac",130:"\u201a",131:"\u0192",132:"\u201e",133:"\u2026",134:"\u2020",135:"\u2021",136:"\u02c6",137:"\u2030",138:"\u0160",139:"\u2039",140:"\u0152",142:"\u017d",145:"\u2018",146:"\u2019",147:"\u201c",148:"\u201d",149:"\u2022",150:"\u2013",151:"\u2014",152:"\u02dc",153:"\u2122",154:"\u0161",155:"\u203a",156:"\u0153",158:"\u017e",159:"\u0178"};o={'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;","&":"&amp;","`":"&#96;"},a={"&lt;":"<","&gt;":">","&amp;":"&","&quot;":'"',"&apos;":"'"},i=n("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32);var f={encodeRaw:function(e,t){return e.replace(t?s:l,function(e){return o[e]||e})},encodeAllRaw:function(e){return(""+e).replace(u,function(e){return o[e]||e})},encodeNumeric:function(e,t){return e.replace(t?s:l,function(e){return e.length>1?"&#"+(1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320)+65536)+";":o[e]||"&#"+e.charCodeAt(0)+";"})},encodeNamed:function(e,t,n){return n=n||i,e.replace(t?s:l,function(e){return o[e]||n[e]||e})},getEncodeFunc:function(e,t){function a(e,n){return e.replace(n?s:l,function(e){return o[e]||t[e]||"&#"+e.charCodeAt(0)+";"||e})}function u(e,n){return f.encodeNamed(e,n,t)}return t=n(t)||i,e=r(e.replace(/\+/g,",")),e.named&&e.numeric?a:e.named?t?u:f.encodeNamed:e.numeric?f.encodeNumeric:f.encodeRaw},decode:function(e){return e.replace(c,function(e,n){return n?(n="x"===n.charAt(0).toLowerCase()?parseInt(n.substr(1),16):parseInt(n,10),n>65535?(n-=65536,String.fromCharCode(55296+(n>>10),56320+(1023&n))):d[n]||String.fromCharCode(n)):a[e]||i[e]||t(e)})}};return f}),r(x,[m,c],function(e,t){return function(n,r){function i(e){n.getElementsByTagName("head")[0].appendChild(e)}function o(r,o,u){function c(){for(var e=b.passed,t=e.length;t--;)e[t]();b.status=2,b.passed=[],b.failed=[]}function d(){for(var e=b.failed,t=e.length;t--;)e[t]();b.status=3,b.passed=[],b.failed=[]}function f(){var e=navigator.userAgent.match(/WebKit\/(\d*)/);return!!(e&&e[1]<536)}function p(e,n){e()||((new Date).getTime()-y<l?t.setTimeout(n):d())}function h(){p(function(){for(var e=n.styleSheets,t,r=e.length,i;r--;)if(t=e[r],i=t.ownerNode?t.ownerNode:t.owningElement,i&&i.id===g.id)return c(),!0},h)}function m(){p(function(){try{var e=v.sheet.cssRules;return c(),!!e}catch(t){}},m)}var g,v,y,b;if(r=e._addCacheSuffix(r),s[r]?b=s[r]:(b={passed:[],failed:[]},s[r]=b),o&&b.passed.push(o),u&&b.failed.push(u),1!=b.status){if(2==b.status)return void c();if(3==b.status)return void d();if(b.status=1,g=n.createElement("link"),g.rel="stylesheet",g.type="text/css",g.id="u"+a++,g.async=!1,g.defer=!1,y=(new Date).getTime(),"onload"in g&&!f())g.onload=h,g.onerror=d;else{if(navigator.userAgent.indexOf("Firefox")>0)return v=n.createElement("style"),v.textContent='@import "'+r+'"',m(),void i(v);h()}i(g),g.href=r}}var a=0,s={},l;r=r||{},l=r.maxLoadTime||5e3,this.load=o}}),r(w,[p,g,v,f,y,b,C,d,m,x],function(e,n,r,i,o,a,s,l,u,c){function d(e,t){var n={},r=t.keep_values,i;return i={set:function(n,r,i){t.url_converter&&(r=t.url_converter.call(t.url_converter_scope||e,r,i,n[0])),n.attr("data-mce-"+i,r).attr(i,r)},get:function(e,t){return e.attr("data-mce-"+t)||e.attr(t)}},n={style:{set:function(e,t){return null!==t&&"object"==typeof t?void e.css(t):(r&&e.attr("data-mce-style",t),void e.attr("style",t))},get:function(t){var n=t.attr("data-mce-style")||t.attr("style");return n=e.serializeStyle(e.parseStyle(n),t[0].nodeName)}}},r&&(n.href=n.src=i),n}function f(e,t){var n=t.attr("style");n=e.serializeStyle(e.parseStyle(n),t[0].nodeName),n||(n=null),t.attr("data-mce-style",n)}function p(e,t){var n=0,r,i;if(e)for(r=e.nodeType,e=e.previousSibling;e;e=e.previousSibling)i=e.nodeType,(!t||3!=i||i!=r&&e.nodeValue.length)&&(n++,r=i);return n}function h(e,t){var o=this,a;o.doc=e,o.win=window,o.files={},o.counter=0,o.stdMode=!b||e.documentMode>=8,o.boxModel=!b||"CSS1Compat"==e.compatMode||o.stdMode,o.styleSheetLoader=new c(e),o.boundEvents=[],o.settings=t=t||{},o.schema=t.schema,o.styles=new r({url_converter:t.url_converter,url_converter_scope:t.url_converter_scope},t.schema),o.fixDoc(e),o.events=t.ownEvents?new i(t.proxy):i.Event,o.attrHooks=d(o,t),a=t.schema?t.schema.getBlockElements():{},o.$=n.overrideDefaults(function(){return{context:e,element:o.getRoot()}}),o.isBlock=function(e){if(!e)return!1;var t=e.nodeType;return t?!(1!==t||!a[e.nodeName]):!!a[e]}}var m=u.each,g=u.is,v=u.grep,y=u.trim,b=l.ie,C=/^([a-z0-9],?)+$/i,x=/^[ \t\r\n]*$/;return h.prototype={$$:function(e){return"string"==typeof e&&(e=this.get(e)),this.$(e)},root:null,fixDoc:function(e){var t=this.settings,n;if(b&&t.schema){"abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video".replace(/\w+/g,function(t){e.createElement(t)});for(n in t.schema.getCustomElements())e.createElement(n)}},clone:function(e,t){var n=this,r,i;return!b||1!==e.nodeType||t?e.cloneNode(t):(i=n.doc,t?r.firstChild:(r=i.createElement(e.nodeName),m(n.getAttribs(e),function(t){n.setAttrib(r,t.nodeName,n.getAttrib(e,t.nodeName))}),r))},getRoot:function(){var e=this;return e.settings.root_element||e.doc.body},getViewPort:function(e){var t,n;return e=e?e:this.win,t=e.document,n=this.boxModel?t.documentElement:t.body,{x:e.pageXOffset||n.scrollLeft,y:e.pageYOffset||n.scrollTop,w:e.innerWidth||n.clientWidth,h:e.innerHeight||n.clientHeight}},getRect:function(e){var t=this,n,r;return e=t.get(e),n=t.getPos(e),r=t.getSize(e),{x:n.x,y:n.y,w:r.w,h:r.h}},getSize:function(e){var t=this,n,r;return e=t.get(e),n=t.getStyle(e,"width"),r=t.getStyle(e,"height"),n.indexOf("px")===-1&&(n=0),r.indexOf("px")===-1&&(r=0),
{w:parseInt(n,10)||e.offsetWidth||e.clientWidth,h:parseInt(r,10)||e.offsetHeight||e.clientHeight}},getParent:function(e,t,n){return this.getParents(e,t,n,!1)},getParents:function(e,n,r,i){var o=this,a,s=[];for(e=o.get(e),i=i===t,r=r||("BODY"!=o.getRoot().nodeName?o.getRoot().parentNode:null),g(n,"string")&&(a=n,n="*"===n?function(e){return 1==e.nodeType}:function(e){return o.is(e,a)});e&&e!=r&&e.nodeType&&9!==e.nodeType;){if(!n||n(e)){if(!i)return e;s.push(e)}e=e.parentNode}return i?s:null},get:function(e){var t;return e&&this.doc&&"string"==typeof e&&(t=e,e=this.doc.getElementById(e),e&&e.id!==t)?this.doc.getElementsByName(t)[1]:e},getNext:function(e,t){return this._findSib(e,t,"nextSibling")},getPrev:function(e,t){return this._findSib(e,t,"previousSibling")},select:function(t,n){var r=this;return e(t,r.get(n)||r.settings.root_element||r.doc,[])},is:function(n,r){var i;if(n.length===t){if("*"===r)return 1==n.nodeType;if(C.test(r)){for(r=r.toLowerCase().split(/,/),n=n.nodeName.toLowerCase(),i=r.length-1;i>=0;i--)if(r[i]==n)return!0;return!1}}if(n.nodeType&&1!=n.nodeType)return!1;var o=n.nodeType?[n]:n;return e(r,o[0].ownerDocument||o[0],null,o).length>0},add:function(e,t,n,r,i){var o=this;return this.run(e,function(e){var a;return a=g(t,"string")?o.doc.createElement(t):t,o.setAttribs(a,n),r&&(r.nodeType?a.appendChild(r):o.setHTML(a,r)),i?a:e.appendChild(a)})},create:function(e,t,n){return this.add(this.doc.createElement(e),e,t,n,1)},createHTML:function(e,t,n){var r="",i;r+="<"+e;for(i in t)t.hasOwnProperty(i)&&null!==t[i]&&"undefined"!=typeof t[i]&&(r+=" "+i+'="'+this.encode(t[i])+'"');return"undefined"!=typeof n?r+">"+n+"</"+e+">":r+" />"},createFragment:function(e){var t,n,r=this.doc,i;for(i=r.createElement("div"),t=r.createDocumentFragment(),e&&(i.innerHTML=e);n=i.firstChild;)t.appendChild(n);return t},remove:function(e,t){return e=this.$$(e),t?e.each(function(){for(var e;e=this.firstChild;)3==e.nodeType&&0===e.data.length?this.removeChild(e):this.parentNode.insertBefore(e,this)}).remove():e.remove(),e.length>1?e.toArray():e[0]},setStyle:function(e,t,n){e=this.$$(e).css(t,n),this.settings.update_styles&&f(this,e)},getStyle:function(e,n,r){return e=this.$$(e),r?e.css(n):(n=n.replace(/-(\D)/g,function(e,t){return t.toUpperCase()}),"float"==n&&(n=l.ie&&l.ie<12?"styleFloat":"cssFloat"),e[0]&&e[0].style?e[0].style[n]:t)},setStyles:function(e,t){e=this.$$(e).css(t),this.settings.update_styles&&f(this,e)},removeAllAttribs:function(e){return this.run(e,function(e){var t,n=e.attributes;for(t=n.length-1;t>=0;t--)e.removeAttributeNode(n.item(t))})},setAttrib:function(e,t,n){var r=this,i,o,a=r.settings;""===n&&(n=null),e=r.$$(e),i=e.attr(t),e.length&&(o=r.attrHooks[t],o&&o.set?o.set(e,n,t):e.attr(t,n),i!=n&&a.onSetAttrib&&a.onSetAttrib({attrElm:e,attrName:t,attrValue:n}))},setAttribs:function(e,t){var n=this;n.$$(e).each(function(e,r){m(t,function(e,t){n.setAttrib(r,t,e)})})},getAttrib:function(e,t,n){var r=this,i,o;return e=r.$$(e),e.length&&(i=r.attrHooks[t],o=i&&i.get?i.get(e,t):e.attr(t)),"undefined"==typeof o&&(o=n||""),o},getPos:function(e,t){var r=this,i=0,o=0,a,s=r.doc,l=s.body,u;if(e=r.get(e),t=t||l,e){if(t===l&&e.getBoundingClientRect&&"static"===n(l).css("position"))return u=e.getBoundingClientRect(),t=r.boxModel?s.documentElement:l,i=u.left+(s.documentElement.scrollLeft||l.scrollLeft)-t.clientLeft,o=u.top+(s.documentElement.scrollTop||l.scrollTop)-t.clientTop,{x:i,y:o};for(a=e;a&&a!=t&&a.nodeType;)i+=a.offsetLeft||0,o+=a.offsetTop||0,a=a.offsetParent;for(a=e.parentNode;a&&a!=t&&a.nodeType;)i-=a.scrollLeft||0,o-=a.scrollTop||0,a=a.parentNode}return{x:i,y:o}},parseStyle:function(e){return this.styles.parse(e)},serializeStyle:function(e,t){return this.styles.serialize(e,t)},addStyle:function(e){var t=this,n=t.doc,r,i;if(t!==h.DOM&&n===document){var o=h.DOM.addedStyles;if(o=o||[],o[e])return;o[e]=!0,h.DOM.addedStyles=o}i=n.getElementById("mceDefaultStyles"),i||(i=n.createElement("style"),i.id="mceDefaultStyles",i.type="text/css",r=n.getElementsByTagName("head")[0],r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i)),i.styleSheet?i.styleSheet.cssText+=e:i.appendChild(n.createTextNode(e))},loadCSS:function(e){var t=this,n=t.doc,r;return t!==h.DOM&&n===document?void h.DOM.loadCSS(e):(e||(e=""),r=n.getElementsByTagName("head")[0],void m(e.split(","),function(e){var i;e=u._addCacheSuffix(e),t.files[e]||(t.files[e]=!0,i=t.create("link",{rel:"stylesheet",href:e}),b&&n.documentMode&&n.recalc&&(i.onload=function(){n.recalc&&n.recalc(),i.onload=null}),r.appendChild(i))}))},addClass:function(e,t){this.$$(e).addClass(t)},removeClass:function(e,t){this.toggleClass(e,t,!1)},hasClass:function(e,t){return this.$$(e).hasClass(t)},toggleClass:function(e,t,r){this.$$(e).toggleClass(t,r).each(function(){""===this.className&&n(this).attr("class",null)})},show:function(e){this.$$(e).show()},hide:function(e){this.$$(e).hide()},isHidden:function(e){return"none"==this.$$(e).css("display")},uniqueId:function(e){return(e?e:"mce_")+this.counter++},setHTML:function(e,t){e=this.$$(e),b?e.each(function(e,r){if(r.canHaveHTML!==!1){for(;r.firstChild;)r.removeChild(r.firstChild);try{r.innerHTML="<br>"+t,r.removeChild(r.firstChild)}catch(i){n("<div></div>").html("<br>"+t).contents().slice(1).appendTo(r)}return t}}):e.html(t)},getOuterHTML:function(e){return e=this.get(e),1==e.nodeType&&"outerHTML"in e?e.outerHTML:n("<div></div>").append(n(e).clone()).html()},setOuterHTML:function(e,t){var r=this;r.$$(e).each(function(){try{if("outerHTML"in this)return void(this.outerHTML=t)}catch(e){}r.remove(n(this).html(t),!0)})},decode:s.decode,encode:s.encodeAllRaw,insertAfter:function(e,t){return t=this.get(t),this.run(e,function(e){var n,r;return n=t.parentNode,r=t.nextSibling,r?n.insertBefore(e,r):n.appendChild(e),e})},replace:function(e,t,n){var r=this;return r.run(t,function(t){return g(t,"array")&&(e=e.cloneNode(!0)),n&&m(v(t.childNodes),function(t){e.appendChild(t)}),t.parentNode.replaceChild(e,t)})},rename:function(e,t){var n=this,r;return e.nodeName!=t.toUpperCase()&&(r=n.create(t),m(n.getAttribs(e),function(t){n.setAttrib(r,t.nodeName,n.getAttrib(e,t.nodeName))}),n.replace(r,e,1)),r||e},findCommonAncestor:function(e,t){for(var n=e,r;n;){for(r=t;r&&n!=r;)r=r.parentNode;if(n==r)break;n=n.parentNode}return!n&&e.ownerDocument?e.ownerDocument.documentElement:n},toHex:function(e){return this.styles.toHex(u.trim(e))},run:function(e,t,n){var r=this,i;return"string"==typeof e&&(e=r.get(e)),!!e&&(n=n||this,e.nodeType||!e.length&&0!==e.length?t.call(n,e):(i=[],m(e,function(e,o){e&&("string"==typeof e&&(e=r.get(e)),i.push(t.call(n,e,o)))}),i))},getAttribs:function(e){var t;if(e=this.get(e),!e)return[];if(b){if(t=[],"OBJECT"==e.nodeName)return e.attributes;"OPTION"===e.nodeName&&this.getAttrib(e,"selected")&&t.push({specified:1,nodeName:"selected"});var n=/<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi;return e.cloneNode(!1).outerHTML.replace(n,"").replace(/[\w:\-]+/gi,function(e){t.push({specified:1,nodeName:e})}),t}return e.attributes},isEmpty:function(e,t){var n=this,r,i,a,s,l,u,c=0;if(e=e.firstChild){l=new o(e,e.parentNode),t=t||(n.schema?n.schema.getNonEmptyElements():null),s=n.schema?n.schema.getWhiteSpaceElements():{};do{if(a=e.nodeType,1===a){var d=e.getAttribute("data-mce-bogus");if(d){e=l.next("all"===d);continue}if(u=e.nodeName.toLowerCase(),t&&t[u]){if("br"===u){c++,e=l.next();continue}return!1}for(i=n.getAttribs(e),r=i.length;r--;)if(u=i[r].nodeName,"name"===u||"data-mce-bookmark"===u)return!1}if(8==a)return!1;if(3===a&&!x.test(e.nodeValue))return!1;if(3===a&&e.parentNode&&s[e.parentNode.nodeName]&&x.test(e.nodeValue))return!1;e=l.next()}while(e)}return c<=1},createRng:function(){var e=this.doc;return e.createRange?e.createRange():new a(this)},nodeIndex:p,split:function(e,t,n){function r(e){function t(e){var t=e.previousSibling&&"SPAN"==e.previousSibling.nodeName,n=e.nextSibling&&"SPAN"==e.nextSibling.nodeName;return t&&n}var n,o=e.childNodes,a=e.nodeType;if(1!=a||"bookmark"!=e.getAttribute("data-mce-type")){for(n=o.length-1;n>=0;n--)r(o[n]);if(9!=a){if(3==a&&e.nodeValue.length>0){var s=y(e.nodeValue).length;if(!i.isBlock(e.parentNode)||s>0||0===s&&t(e))return}else if(1==a&&(o=e.childNodes,1==o.length&&o[0]&&1==o[0].nodeType&&"bookmark"==o[0].getAttribute("data-mce-type")&&e.parentNode.insertBefore(o[0],e),o.length||/^(br|hr|input|img)$/i.test(e.nodeName)))return;i.remove(e)}return e}}var i=this,o=i.createRng(),a,s,l;if(e&&t)return o.setStart(e.parentNode,i.nodeIndex(e)),o.setEnd(t.parentNode,i.nodeIndex(t)),a=o.extractContents(),o=i.createRng(),o.setStart(t.parentNode,i.nodeIndex(t)+1),o.setEnd(e.parentNode,i.nodeIndex(e)+1),s=o.extractContents(),l=e.parentNode,l.insertBefore(r(a),e),n?l.insertBefore(n,e):l.insertBefore(t,e),l.insertBefore(r(s),e),i.remove(e),n||t},bind:function(e,t,n,r){var i=this;if(u.isArray(e)){for(var o=e.length;o--;)e[o]=i.bind(e[o],t,n,r);return e}return!i.settings.collect||e!==i.doc&&e!==i.win||i.boundEvents.push([e,t,n,r]),i.events.bind(e,t,n,r||i)},unbind:function(e,t,n){var r=this,i;if(u.isArray(e)){for(i=e.length;i--;)e[i]=r.unbind(e[i],t,n);return e}if(r.boundEvents&&(e===r.doc||e===r.win))for(i=r.boundEvents.length;i--;){var o=r.boundEvents[i];e!=o[0]||t&&t!=o[1]||n&&n!=o[2]||this.events.unbind(o[0],o[1],o[2])}return this.events.unbind(e,t,n)},fire:function(e,t,n){return this.events.fire(e,t,n)},getContentEditable:function(e){var t;return e&&1==e.nodeType?(t=e.getAttribute("data-mce-contenteditable"),t&&"inherit"!==t?t:"inherit"!==e.contentEditable?e.contentEditable:null):null},getContentEditableParent:function(e){for(var t=this.getRoot(),n=null;e&&e!==t&&(n=this.getContentEditable(e),null===n);e=e.parentNode);return n},destroy:function(){var t=this;if(t.boundEvents){for(var n=t.boundEvents.length;n--;){var r=t.boundEvents[n];this.events.unbind(r[0],r[1],r[2])}t.boundEvents=null}e.setDocument&&e.setDocument(),t.win=t.doc=t.root=t.events=t.frag=null},isChildOf:function(e,t){for(;e;){if(t===e)return!0;e=e.parentNode}return!1},dumpRng:function(e){return"startContainer: "+e.startContainer.nodeName+", startOffset: "+e.startOffset+", endContainer: "+e.endContainer.nodeName+", endOffset: "+e.endOffset},_findSib:function(e,t,n){var r=this,i=t;if(e)for("string"==typeof i&&(i=function(e){return r.is(e,t)}),e=e[n];e;e=e[n])if(i(e))return e;return null}},h.DOM=new h(document),h.nodeIndex=p,h}),r(E,[w,m],function(e,t){function n(){function e(e,n,i){function o(){l.remove(c),u&&(u.onreadystatechange=u.onload=u=null),n()}function s(){a(i)?i():"undefined"!=typeof console&&console.log&&console.log("Failed to load script: "+e)}var l=r,u,c;c=l.uniqueId(),u=document.createElement("script"),u.id=c,u.type="text/javascript",u.src=t._addCacheSuffix(e),"onreadystatechange"in u?u.onreadystatechange=function(){/loaded|complete/.test(u.readyState)&&o()}:u.onload=o,u.onerror=s,(document.getElementsByTagName("head")[0]||document.body).appendChild(u)}var n=0,s=1,l=2,u=3,c={},d=[],f={},p=[],h=0,m;this.isDone=function(e){return c[e]==l},this.markDone=function(e){c[e]=l},this.add=this.load=function(e,t,r,i){var o=c[e];o==m&&(d.push(e),c[e]=n),t&&(f[e]||(f[e]=[]),f[e].push({success:t,failure:i,scope:r||this}))},this.remove=function(e){delete c[e],delete f[e]},this.loadQueue=function(e,t,n){this.loadScripts(d,e,t,n)},this.loadScripts=function(t,n,r,d){function g(e,t){i(f[t],function(t){a(t[e])&&t[e].call(t.scope)}),f[t]=m}var v,y=[];p.push({success:n,failure:d,scope:r||this}),(v=function(){var n=o(t);t.length=0,i(n,function(t){return c[t]===l?void g("success",t):c[t]===u?void g("failure",t):void(c[t]!==s&&(c[t]=s,h++,e(t,function(){c[t]=l,h--,g("success",t),v()},function(){c[t]=u,h--,y.push(t),g("failure",t),v()})))}),h||(i(p,function(e){0===y.length?a(e.success)&&e.success.call(e.scope):a(e.failure)&&e.failure.call(e.scope,y)}),p.length=0)})()}}var r=e.DOM,i=t.each,o=t.grep,a=function(e){return"function"==typeof e};return n.ScriptLoader=new n,n}),r(N,[E,m],function(e,n){function r(){var e=this;e.items=[],e.urls={},e.lookup={}}var i=n.each;return r.prototype={get:function(e){return this.lookup[e]?this.lookup[e].instance:t},dependencies:function(e){var t;return this.lookup[e]&&(t=this.lookup[e].dependencies),t||[]},requireLangPack:function(t,n){var i=r.language;if(i&&r.languageLoad!==!1){if(n)if(n=","+n+",",n.indexOf(","+i.substr(0,2)+",")!=-1)i=i.substr(0,2);else if(n.indexOf(","+i+",")==-1)return;e.ScriptLoader.add(this.urls[t]+"/langs/"+i+".js")}},add:function(e,t,n){return this.items.push(t),this.lookup[e]={instance:t,dependencies:n},t},remove:function(e){delete this.urls[e],delete this.lookup[e]},createUrl:function(e,t){return"object"==typeof t?t:{prefix:e.prefix,resource:t,suffix:e.suffix}},addComponents:function(t,n){var r=this.urls[t];i(n,function(t){e.ScriptLoader.add(r+"/"+t)})},load:function(n,o,a,s,l){function u(){var r=c.dependencies(n);i(r,function(e){var n=c.createUrl(o,e);c.load(n.resource,n,t,t)}),a&&(s?a.call(s):a.call(e))}var c=this,d=o;c.urls[n]||("object"==typeof o&&(d=o.prefix+o.resource+o.suffix),0!==d.indexOf("/")&&d.indexOf("://")==-1&&(d=r.baseURL+"/"+d),c.urls[n]=d.substring(0,d.lastIndexOf("/")),c.lookup[n]?u():e.ScriptLoader.add(d,u,s,l))}},r.PluginManager=new r,r.ThemeManager=new r,r}),r(_,[],function(){function e(e){return function(t){return!!t&&t.nodeType==e}}function t(e){return e=e.toLowerCase().split(" "),function(t){var n,r;if(t&&t.nodeType)for(r=t.nodeName.toLowerCase(),n=0;n<e.length;n++)if(r===e[n])return!0;return!1}}function n(e,t){return t=t.toLowerCase().split(" "),function(n){var r,i;if(s(n))for(r=0;r<t.length;r++)if(i=getComputedStyle(n,null).getPropertyValue(e),i===t[r])return!0;return!1}}function r(e,t){return function(n){return s(n)&&n[e]===t}}function i(e,t){return function(n){return s(n)&&n.getAttribute(e)===t}}function o(e){return s(e)&&e.hasAttribute("data-mce-bogus")}function a(e){return function(t){if(s(t)){if(t.contentEditable===e)return!0;if(t.getAttribute("data-mce-contenteditable")===e)return!0}return!1}}var s=e(1);return{isText:e(3),isElement:s,isComment:e(8),isBr:t("br"),isContentEditableTrue:a("true"),isContentEditableFalse:a("false"),matchNodeNames:t,hasPropValue:r,hasAttributeValue:i,matchStyleValues:n,isBogus:o}}),r(S,[],function(){function e(e){return e==n}function t(e){return e.replace(new RegExp(n,"g"),"")}var n="\ufeff";return{isZwsp:e,ZWSP:n,trim:t}}),r(k,[_,S],function(e,t){function n(e){return y(e)&&(e=e.parentNode),v(e)&&e.hasAttribute("data-mce-caret")}function r(e){return y(e)&&t.isZwsp(e.data)}function i(e){return n(e)||r(e)}function o(e){var t=e.parentNode;t&&t.removeChild(e)}function a(e){try{return e.nodeValue}catch(t){return""}}function s(e,t){0===t.length?o(e):e.nodeValue=t}function l(e,n){var r,o,a,s;if(r=e.ownerDocument,a=r.createTextNode(t.ZWSP),s=e.parentNode,n){if(o=e.previousSibling,y(o)){if(i(o))return o;if(h(o))return o.splitText(o.data.length-1)}s.insertBefore(a,e)}else{if(o=e.nextSibling,y(o)){if(i(o))return o;if(p(o))return o.splitText(1),o}e.nextSibling?s.insertBefore(a,e.nextSibling):s.appendChild(a)}return a}function u(){var e=document.createElement("br");return e.setAttribute("data-mce-bogus","1"),e}function c(e,t,n){var r,i,o;return r=t.ownerDocument,i=r.createElement(e),i.setAttribute("data-mce-caret",n?"before":"after"),i.setAttribute("data-mce-bogus","all"),i.appendChild(u()),o=t.parentNode,n?o.insertBefore(i,t):t.nextSibling?o.insertBefore(i,t.nextSibling):o.appendChild(i),i}function d(t){return t.firstChild!==t.lastChild||!e.isBr(t.firstChild)}function f(e){if(v(e)&&i(e)&&(d(e)?e.removeAttribute("data-mce-caret"):o(e)),y(e)){var n=t.trim(a(e));s(e,n)}}function p(e){return y(e)&&e.data[0]==t.ZWSP}function h(e){return y(e)&&e.data[e.data.length-1]==t.ZWSP}function m(t){var n=t.getElementsByTagName("br"),r=n[n.length-1];e.isBogus(r)&&r.parentNode.removeChild(r)}function g(e){return e&&e.hasAttribute("data-mce-caret")?(m(e),e.removeAttribute("data-mce-caret"),e.removeAttribute("data-mce-bogus"),e.removeAttribute("style"),e.removeAttribute("_moz_abspos"),e):null}var v=e.isElement,y=e.isText;return{isCaretContainer:i,isCaretContainerBlock:n,isCaretContainerInline:r,showCaretContainerBlock:g,insertInline:l,insertBlock:c,hasContent:d,remove:f,startsWithCaretContainer:p,endsWithCaretContainer:h}}),r(T,[m,y,_,b,k],function(e,t,n,r,i){function o(e){return m(e)||g(e)}function a(e,t){var n=e.childNodes;return t--,t>n.length-1?t=n.length-1:t<0&&(t=0),n[t]||e}function s(e,t,n){for(;e&&e!==t;){if(n(e))return e;e=e.parentNode}return null}function l(e,t,n){return null!==s(e,t,n)}function u(e){return"_mce_caret"===e.id}function c(e,t){return v(e)&&l(e,t,u)===!1}function d(e){this.walk=function(t,n){function r(e){var t;return t=e[0],3===t.nodeType&&t===l&&u>=t.nodeValue.length&&e.splice(0,1),t=e[e.length-1],0===d&&e.length>0&&t===c&&3===t.nodeType&&e.splice(e.length-1,1),e}function i(e,t,n){for(var r=[];e&&e!=n;e=e[t])r.push(e);return r}function o(e,t){do{if(e.parentNode==t)return e;e=e.parentNode}while(e)}function s(e,t,o){var a=o?"nextSibling":"previousSibling";for(g=e,v=g.parentNode;g&&g!=t;g=v)v=g.parentNode,y=i(g==e?g:g[a],a),y.length&&(o||y.reverse(),n(r(y)))}var l=t.startContainer,u=t.startOffset,c=t.endContainer,d=t.endOffset,f,p,m,g,v,y,b;if(b=e.select("td[data-mce-selected],th[data-mce-selected]"),b.length>0)return void h(b,function(e){n([e])});if(1==l.nodeType&&l.hasChildNodes()&&(l=l.childNodes[u]),1==c.nodeType&&c.hasChildNodes()&&(c=a(c,d)),l==c)return n(r([l]));for(f=e.findCommonAncestor(l,c),g=l;g;g=g.parentNode){if(g===c)return s(l,f,!0);if(g===f)break}for(g=c;g;g=g.parentNode){if(g===l)return s(c,f);if(g===f)break}p=o(l,f)||l,m=o(c,f)||c,s(l,p,!0),y=i(p==l?p:p.nextSibling,"nextSibling",m==c?m.nextSibling:m),y.length&&n(r(y)),s(c,m)},this.split=function(e){function t(e,t){return e.splitText(t)}var n=e.startContainer,r=e.startOffset,i=e.endContainer,o=e.endOffset;return n==i&&3==n.nodeType?r>0&&r<n.nodeValue.length&&(i=t(n,r),n=i.previousSibling,o>r?(o-=r,n=i=t(i,o).previousSibling,o=i.nodeValue.length,r=0):o=0):(3==n.nodeType&&r>0&&r<n.nodeValue.length&&(n=t(n,r),r=0),3==i.nodeType&&o>0&&o<i.nodeValue.length&&(i=t(i,o).previousSibling,o=i.nodeValue.length)),{startContainer:n,startOffset:r,endContainer:i,endOffset:o}},this.normalize=function(n){function r(r){function a(e){return e&&/^(TD|TH|CAPTION)$/.test(e.nodeName)}function s(n,r){for(var i=new t(n,e.getParent(n.parentNode,e.isBlock)||m);n=i[r?"prev":"next"]();)if("BR"===n.nodeName)return!0}function l(e){for(;e&&e!=m;){if(g(e))return!0;e=e.parentNode}return!1}function u(e,t){return e.previousSibling&&e.previousSibling.nodeName==t}function d(n,r){var a,s,l;if(r=r||f,l=e.getParent(r.parentNode,e.isBlock)||m,n&&"BR"==r.nodeName&&x&&e.isEmpty(l))return f=r.parentNode,p=e.nodeIndex(r),void(i=!0);for(a=new t(r,l);y=a[n?"prev":"next"]();){if("false"===e.getContentEditableParent(y)||c(y,e.getRoot()))return;if(3===y.nodeType&&y.nodeValue.length>0)return f=y,p=n?y.nodeValue.length:0,void(i=!0);if(e.isBlock(y)||b[y.nodeName.toLowerCase()])return;s=y}o&&s&&(f=s,i=!0,p=0)}var f,p,h,m=e.getRoot(),y,b,C,x;if(f=n[(r?"start":"end")+"Container"],p=n[(r?"start":"end")+"Offset"],x=1==f.nodeType&&p===f.childNodes.length,b=e.schema.getNonEmptyElements(),C=r,!v(f)){if(1==f.nodeType&&p>f.childNodes.length-1&&(C=!1),9===f.nodeType&&(f=e.getRoot(),p=0),f===m){if(C&&(y=f.childNodes[p>0?p-1:0])){if(v(y))return;if(b[y.nodeName]||"TABLE"==y.nodeName)return}if(f.hasChildNodes()){if(p=Math.min(!C&&p>0?p-1:p,f.childNodes.length-1),f=f.childNodes[p],p=0,!o&&f===m.lastChild&&"TABLE"===f.nodeName)return;if(l(f)||v(f))return;if(f.hasChildNodes()&&!/TABLE/.test(f.nodeName)){y=f,h=new t(f,m);do{if(g(y)||v(y)){i=!1;break}if(3===y.nodeType&&y.nodeValue.length>0){p=C?0:y.nodeValue.length,f=y,i=!0;break}if(b[y.nodeName.toLowerCase()]&&!a(y)){p=e.nodeIndex(y),f=y.parentNode,"IMG"!=y.nodeName||C||p++,i=!0;break}}while(y=C?h.next():h.prev())}}}o&&(3===f.nodeType&&0===p&&d(!0),1===f.nodeType&&(y=f.childNodes[p],y||(y=f.childNodes[p-1]),!y||"BR"!==y.nodeName||u(y,"A")||s(y)||s(y,!0)||d(!0,y))),C&&!o&&3===f.nodeType&&p===f.nodeValue.length&&d(!1),i&&n["set"+(r?"Start":"End")](f,p)}}var i,o;return o=n.collapsed,r(!0),o||r(),i&&o&&n.collapse(!0),i}}function f(t,n,r){var i,o,a;if(i=r.elementFromPoint(t,n),o=r.body.createTextRange(),i&&"HTML"!=i.tagName||(i=r.body),o.moveToElementText(i),a=e.toArray(o.getClientRects()),a=a.sort(function(e,t){return e=Math.abs(Math.max(e.top-n,e.bottom-n)),t=Math.abs(Math.max(t.top-n,t.bottom-n)),e-t}),a.length>0){n=(a[0].bottom+a[0].top)/2;try{return o.moveToPoint(t,n),o.collapse(!0),o}catch(s){}}return null}function p(e,t){var n=e&&e.parentElement?e.parentElement():null;return g(s(n,t,o))?null:e}var h=e.each,m=n.isContentEditableTrue,g=n.isContentEditableFalse,v=i.isCaretContainer;return d.compareRanges=function(e,t){if(e&&t){if(!e.item&&!e.duplicate)return e.startContainer==t.startContainer&&e.startOffset==t.startOffset;if(e.item&&t.item&&e.item(0)===t.item(0))return!0;if(e.isEqual&&t.isEqual&&t.isEqual(e))return!0}return!1},d.getCaretRangeFromPoint=function(e,t,n){var r,i;if(n.caretPositionFromPoint)i=n.caretPositionFromPoint(e,t),r=n.createRange(),r.setStart(i.offsetNode,i.offset),r.collapse(!0);else if(n.caretRangeFromPoint)r=n.caretRangeFromPoint(e,t);else if(n.body.createTextRange){r=n.body.createTextRange();try{r.moveToPoint(e,t),r.collapse(!0)}catch(o){r=f(e,t,n)}return p(r,n.body)}return r},d.getSelectedNode=function(e){var t=e.startContainer,n=e.startOffset;return t.hasChildNodes()&&e.endOffset==n+1?t.childNodes[n]:null},d.getNode=function(e,t){return 1==e.nodeType&&e.hasChildNodes()&&(t>=e.childNodes.length&&(t=e.childNodes.length-1),e=e.childNodes[t]),e},d}),r(R,[T,d,c],function(e,t,n){return function(r){function i(e){var t,n;if(n=r.$(e).parentsUntil(r.getBody()).add(e),n.length===a.length){for(t=n.length;t>=0&&n[t]===a[t];t--);if(t===-1)return a=n,!0}return a=n,!1}var o,a=[];"onselectionchange"in r.getDoc()||r.on("NodeChange Click MouseUp KeyUp Focus",function(t){var n,i;n=r.selection.getRng(),i={startContainer:n.startContainer,startOffset:n.startOffset,endContainer:n.endContainer,endOffset:n.endOffset},"nodechange"!=t.type&&e.compareRanges(i,o)||r.fire("SelectionChange"),o=i}),r.on("contextmenu",function(){r.fire("SelectionChange")}),r.on("SelectionChange",function(){var e=r.selection.getStart(!0);!t.range&&r.selection.isCollapsed()||!i(e)&&r.dom.isChildOf(e,r.getBody())&&r.nodeChanged({selectionChange:!0})}),r.on("MouseUp",function(e){e.isDefaultPrevented()||("IMG"==r.selection.getNode().nodeName?n.setEditorTimeout(r,function(){r.nodeChanged()}):r.nodeChanged())}),this.nodeChanged=function(e){var t=r.selection,n,i,o;r.initialized&&t&&!r.settings.disable_nodechange&&!r.readonly&&(o=r.getBody(),n=t.getStart()||o,n.ownerDocument==r.getDoc()&&r.dom.isChildOf(n,o)||(n=o),"IMG"==n.nodeName&&t.isCollapsed()&&(n=n.parentNode),i=[],r.dom.getParent(n,function(e){return e===o||void i.push(e)}),e=e||{},e.element=n,e.parents=i,r.fire("NodeChange",e))}}}),r(A,[],function(){function e(e,t,n){var r,i,o=n?"lastChild":"firstChild",a=n?"prev":"next";if(e[o])return e[o];if(e!==t){if(r=e[a])return r;for(i=e.parent;i&&i!==t;i=i.parent)if(r=i[a])return r}}function t(e,t){this.name=e,this.type=t,1===t&&(this.attributes=[],this.attributes.map={})}var n=/^[ \t\r\n]*$/,r={"#text":3,"#comment":8,"#cdata":4,"#pi":7,"#doctype":10,"#document-fragment":11};return t.prototype={replace:function(e){var t=this;return e.parent&&e.remove(),t.insert(e,t),t.remove(),t},attr:function(e,t){var n=this,r,i,o;if("string"!=typeof e){for(i in e)n.attr(i,e[i]);return n}if(r=n.attributes){if(t!==o){if(null===t){if(e in r.map)for(delete r.map[e],i=r.length;i--;)if(r[i].name===e)return r=r.splice(i,1),n;return n}if(e in r.map){for(i=r.length;i--;)if(r[i].name===e){r[i].value=t;break}}else r.push({name:e,value:t});return r.map[e]=t,n}return r.map[e]}},clone:function(){var e=this,n=new t(e.name,e.type),r,i,o,a,s;if(o=e.attributes){for(s=[],s.map={},r=0,i=o.length;r<i;r++)a=o[r],"id"!==a.name&&(s[s.length]={name:a.name,value:a.value},s.map[a.name]=a.value);n.attributes=s}return n.value=e.value,n.shortEnded=e.shortEnded,n},wrap:function(e){var t=this;return t.parent.insert(e,t),e.append(t),t},unwrap:function(){var e=this,t,n;for(t=e.firstChild;t;)n=t.next,e.insert(t,e,!0),t=n;e.remove()},remove:function(){var e=this,t=e.parent,n=e.next,r=e.prev;return t&&(t.firstChild===e?(t.firstChild=n,n&&(n.prev=null)):r.next=n,t.lastChild===e?(t.lastChild=r,r&&(r.next=null)):n.prev=r,e.parent=e.next=e.prev=null),e},append:function(e){var t=this,n;return e.parent&&e.remove(),n=t.lastChild,n?(n.next=e,e.prev=n,t.lastChild=e):t.lastChild=t.firstChild=e,e.parent=t,e},insert:function(e,t,n){var r;return e.parent&&e.remove(),r=t.parent||this,n?(t===r.firstChild?r.firstChild=e:t.prev.next=e,e.prev=t.prev,e.next=t,t.prev=e):(t===r.lastChild?r.lastChild=e:t.next.prev=e,e.next=t.next,e.prev=t,t.next=e),e.parent=r,e},getAll:function(t){var n=this,r,i=[];for(r=n.firstChild;r;r=e(r,n))r.name===t&&i.push(r);return i},empty:function(){var t=this,n,r,i;if(t.firstChild){for(n=[],i=t.firstChild;i;i=e(i,t))n.push(i);for(r=n.length;r--;)i=n[r],i.parent=i.firstChild=i.lastChild=i.next=i.prev=null}return t.firstChild=t.lastChild=null,t},isEmpty:function(t,r){var i=this,o=i.firstChild,a,s;if(r=r||{},o)do{if(1===o.type){if(o.attributes.map["data-mce-bogus"])continue;if(t[o.name])return!1;for(a=o.attributes.length;a--;)if(s=o.attributes[a].name,"name"===s||0===s.indexOf("data-mce-bookmark"))return!1}if(8===o.type)return!1;if(3===o.type&&!n.test(o.value))return!1;if(3===o.type&&o.parent&&r[o.parent.name]&&n.test(o.value))return!1}while(o=e(o,i));return!0},walk:function(t){return e(this,null,t)}},t.create=function(e,n){var i,o;if(i=new t(e,r[e]||1),n)for(o in n)i.attr(o,n[o]);return i},t}),r(B,[m],function(e){function t(t,n){return t=e.trim(t),t?t.split(n||" "):[]}function n(e){function n(e,n,r){function i(e,t){var n={},r,i;for(r=0,i=e.length;r<i;r++)n[e[r]]=t||{};return n}var s,u,c;for(r=r||[],n=n||"","string"==typeof r&&(r=t(r)),e=t(e),s=e.length;s--;)u=t([l,n].join(" ")),c={attributes:i(u),attributesOrder:u,children:i(r,o)},a[e[s]]=c}function r(e,n){var r,i,o,s;for(e=t(e),r=e.length,n=t(n);r--;)for(i=a[e[r]],o=0,s=n.length;o<s;o++)i.attributes[n[o]]={},i.attributesOrder.push(n[o])}var a={},l,u,c,d,f,p;return i[e]?i[e]:(l="id accesskey class dir lang style tabindex title",u="address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul",c="a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment","html4"!=e&&(l+=" contenteditable contextmenu draggable dropzone hidden spellcheck translate",u+=" article aside details dialog figure header footer hgroup section nav",c+=" audio canvas command datalist mark meter output picture progress time wbr video ruby bdi keygen"),"html5-strict"!=e&&(l+=" xml:lang",p="acronym applet basefont big font strike tt",c=[c,p].join(" "),s(t(p),function(e){n(e,"",c)}),f="center dir isindex noframes",u=[u,f].join(" "),d=[u,c].join(" "),s(t(f),function(e){n(e,"",d)})),d=d||[u,c].join(" "),n("html","manifest","head body"),n("head","","base command link meta noscript script style title"),n("title hr noscript br"),n("base","href target"),n("link","href rel media hreflang type sizes hreflang"),n("meta","name http-equiv content charset"),n("style","media type scoped"),n("script","src async defer type charset"),n("body","onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload",d),n("address dt dd div caption","",d),n("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn","",c),n("blockquote","cite",d),n("ol","reversed start type","li"),n("ul","","li"),n("li","value",d),n("dl","","dt dd"),n("a","href target rel media hreflang type",c),n("q","cite",c),n("ins del","cite datetime",d),n("img","src sizes srcset alt usemap ismap width height"),n("iframe","src name width height",d),n("embed","src type width height"),n("object","data type typemustmatch name usemap form width height",[d,"param"].join(" ")),n("param","name value"),n("map","name",[d,"area"].join(" ")),n("area","alt coords shape href target rel media hreflang type"),n("table","border","caption colgroup thead tfoot tbody tr"+("html4"==e?" col":"")),n("colgroup","span","col"),n("col","span"),n("tbody thead tfoot","","tr"),n("tr","","td th"),n("td","colspan rowspan headers",d),n("th","colspan rowspan headers scope abbr",d),n("form","accept-charset action autocomplete enctype method name novalidate target",d),n("fieldset","disabled form name",[d,"legend"].join(" ")),n("label","form for",c),n("input","accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"),n("button","disabled form formaction formenctype formmethod formnovalidate formtarget name type value","html4"==e?d:c),n("select","disabled form multiple name required size","option optgroup"),n("optgroup","disabled label","option"),n("option","disabled label selected value"),n("textarea","cols dirname disabled form maxlength name readonly required rows wrap"),n("menu","type label",[d,"li"].join(" ")),n("noscript","",d),"html4"!=e&&(n("wbr"),n("ruby","",[c,"rt rp"].join(" ")),n("figcaption","",d),n("mark rt rp summary bdi","",c),n("canvas","width height",d),n("video","src crossorigin poster preload autoplay mediagroup loop muted controls width height buffered",[d,"track source"].join(" ")),n("audio","src crossorigin preload autoplay mediagroup loop muted controls buffered volume",[d,"track source"].join(" ")),n("picture","","img source"),n("source","src srcset type media sizes"),n("track","kind src srclang label default"),n("datalist","",[c,"option"].join(" ")),n("article section nav aside header footer","",d),n("hgroup","","h1 h2 h3 h4 h5 h6"),n("figure","",[d,"figcaption"].join(" ")),n("time","datetime",c),n("dialog","open",d),n("command","type label icon disabled checked radiogroup command"),n("output","for form name",c),n("progress","value max",c),n("meter","value min max low high optimum",c),n("details","open",[d,"summary"].join(" ")),n("keygen","autofocus challenge disabled form keytype name")),"html5-strict"!=e&&(r("script","language xml:space"),r("style","xml:space"),r("object","declare classid code codebase codetype archive standby align border hspace vspace"),r("embed","align name hspace vspace"),r("param","valuetype type"),r("a","charset name rev shape coords"),r("br","clear"),r("applet","codebase archive code object alt name width height align hspace vspace"),r("img","name longdesc align border hspace vspace"),r("iframe","longdesc frameborder marginwidth marginheight scrolling align"),r("font basefont","size color face"),r("input","usemap align"),r("select","onchange"),r("textarea"),r("h1 h2 h3 h4 h5 h6 div p legend caption","align"),r("ul","type compact"),r("li","type"),r("ol dl menu dir","compact"),r("pre","width xml:space"),r("hr","align noshade size width"),r("isindex","prompt"),r("table","summary width frame rules cellspacing cellpadding align bgcolor"),r("col","width align char charoff valign"),r("colgroup","width align char charoff valign"),r("thead","align char charoff valign"),r("tr","align char charoff valign bgcolor"),r("th","axis align char charoff valign nowrap bgcolor width height"),r("form","accept"),r("td","abbr axis scope align char charoff valign nowrap bgcolor width height"),r("tfoot","align char charoff valign"),r("tbody","align char charoff valign"),r("area","nohref"),r("body","background bgcolor text link vlink alink")),"html4"!=e&&(r("input button select textarea","autofocus"),r("input textarea","placeholder"),r("a","download"),
r("link script img","crossorigin"),r("iframe","sandbox seamless allowfullscreen")),s(t("a form meter progress dfn"),function(e){a[e]&&delete a[e].children[e]}),delete a.caption.children.table,delete a.script,i[e]=a,a)}function r(e,t){var n;return e&&(n={},"string"==typeof e&&(e={"*":e}),s(e,function(e,r){n[r]=n[r.toUpperCase()]="map"==t?a(e,/[, ]/):u(e,/[, ]/)})),n}var i={},o={},a=e.makeMap,s=e.each,l=e.extend,u=e.explode,c=e.inArray;return function(e){function o(t,n,r){var o=e[t];return o?o=a(o,/[, ]/,a(o.toUpperCase(),/[, ]/)):(o=i[t],o||(o=a(n," ",a(n.toUpperCase()," ")),o=l(o,r),i[t]=o)),o}function d(e){return new RegExp("^"+e.replace(/([?+*])/g,".$1")+"$")}function f(e){var n,r,i,o,s,l,u,f,p,h,m,g,v,b,x,w,E,N,_,S=/^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)\])?$/,k=/^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/,T=/[*?+]/;if(e)for(e=t(e,","),y["@"]&&(w=y["@"].attributes,E=y["@"].attributesOrder),n=0,r=e.length;n<r;n++)if(s=S.exec(e[n])){if(b=s[1],p=s[2],x=s[3],f=s[5],g={},v=[],l={attributes:g,attributesOrder:v},"#"===b&&(l.paddEmpty=!0),"-"===b&&(l.removeEmpty=!0),"!"===s[4]&&(l.removeEmptyAttrs=!0),w){for(N in w)g[N]=w[N];v.push.apply(v,E)}if(f)for(f=t(f,"|"),i=0,o=f.length;i<o;i++)if(s=k.exec(f[i])){if(u={},m=s[1],h=s[2].replace(/::/g,":"),b=s[3],_=s[4],"!"===m&&(l.attributesRequired=l.attributesRequired||[],l.attributesRequired.push(h),u.required=!0),"-"===m){delete g[h],v.splice(c(v,h),1);continue}b&&("="===b&&(l.attributesDefault=l.attributesDefault||[],l.attributesDefault.push({name:h,value:_}),u.defaultValue=_),":"===b&&(l.attributesForced=l.attributesForced||[],l.attributesForced.push({name:h,value:_}),u.forcedValue=_),"<"===b&&(u.validValues=a(_,"?"))),T.test(h)?(l.attributePatterns=l.attributePatterns||[],u.pattern=d(h),l.attributePatterns.push(u)):(g[h]||v.push(h),g[h]=u)}w||"@"!=p||(w=g,E=v),x&&(l.outputName=p,y[x]=l),T.test(p)?(l.pattern=d(p),C.push(l)):y[p]=l}}function p(e){y={},C=[],f(e),s(E,function(e,t){b[t]=e.children})}function h(e){var n=/^(~)?(.+)$/;e&&(i.text_block_elements=i.block_elements=null,s(t(e,","),function(e){var t=n.exec(e),r="~"===t[1],i=r?"span":"div",o=t[2];if(b[o]=b[i],M[o]=i,r||(R[o.toUpperCase()]={},R[o]={}),!y[o]){var a=y[i];a=l({},a),delete a.removeEmptyAttrs,delete a.removeEmpty,y[o]=a}s(b,function(e,t){e[i]&&(b[t]=e=l({},b[t]),e[o]=e[i])})}))}function m(n){var r=/^([+\-]?)(\w+)\[([^\]]+)\]$/;i[e.schema]=null,n&&s(t(n,","),function(e){var n=r.exec(e),i,o;n&&(o=n[1],i=o?b[n[2]]:b[n[2]]={"#comment":{}},i=b[n[2]],s(t(n[3],"|"),function(e){"-"===o?delete i[e]:i[e]={}}))})}function g(e){var t=y[e],n;if(t)return t;for(n=C.length;n--;)if(t=C[n],t.pattern.test(e))return t}var v=this,y={},b={},C=[],x,w,E,N,_,S,k,T,R,A,B,D,L,M={},P={};e=e||{},E=n(e.schema),e.verify_html===!1&&(e.valid_elements="*[*]"),x=r(e.valid_styles),w=r(e.invalid_styles,"map"),T=r(e.valid_classes,"map"),N=o("whitespace_elements","pre script noscript style textarea video audio iframe object code"),_=o("self_closing_elements","colgroup dd dt li option p td tfoot th thead tr"),S=o("short_ended_elements","area base basefont br col frame hr img input isindex link meta param embed source wbr track"),k=o("boolean_attributes","checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls"),A=o("non_empty_elements","td th iframe video audio object script pre code",S),B=o("move_caret_before_on_enter_elements","table",A),D=o("text_block_elements","h1 h2 h3 h4 h5 h6 p div address pre form blockquote center dir fieldset header footer article section hgroup aside nav figure"),R=o("block_elements","hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex option datalist select optgroup figcaption",D),L=o("text_inline_elements","span strong b em i font strike u var cite dfn code mark q sup sub samp"),s((e.special||"script noscript style textarea").split(" "),function(e){P[e]=new RegExp("</"+e+"[^>]*>","gi")}),e.valid_elements?p(e.valid_elements):(s(E,function(e,t){y[t]={attributes:e.attributes,attributesOrder:e.attributesOrder},b[t]=e.children}),"html5"!=e.schema&&s(t("strong/b em/i"),function(e){e=t(e,"/"),y[e[1]].outputName=e[0]}),s(t("ol ul sub sup blockquote span font a table tbody tr strong em b i"),function(e){y[e]&&(y[e].removeEmpty=!0)}),s(t("p h1 h2 h3 h4 h5 h6 th td pre div address caption"),function(e){y[e].paddEmpty=!0}),s(t("span"),function(e){y[e].removeEmptyAttrs=!0})),h(e.custom_elements),m(e.valid_children),f(e.extended_valid_elements),m("+ol[ul|ol],+ul[ul|ol]"),s({dd:"dl",dt:"dl",li:"ul ol",td:"tr",th:"tr",tr:"tbody thead tfoot",tbody:"table",thead:"table",tfoot:"table",legend:"fieldset",area:"map",param:"video audio object"},function(e,n){y[n]&&(y[n].parentsRequired=t(e))}),e.invalid_elements&&s(u(e.invalid_elements),function(e){y[e]&&delete y[e]}),g("span")||f("span[!data-mce-type|*]"),v.children=b,v.getValidStyles=function(){return x},v.getInvalidStyles=function(){return w},v.getValidClasses=function(){return T},v.getBoolAttrs=function(){return k},v.getBlockElements=function(){return R},v.getTextBlockElements=function(){return D},v.getTextInlineElements=function(){return L},v.getShortEndedElements=function(){return S},v.getSelfClosingElements=function(){return _},v.getNonEmptyElements=function(){return A},v.getMoveCaretBeforeOnEnterElements=function(){return B},v.getWhiteSpaceElements=function(){return N},v.getSpecialElements=function(){return P},v.isValidChild=function(e,t){var n=b[e];return!(!n||!n[t])},v.isValid=function(e,t){var n,r,i=g(e);if(i){if(!t)return!0;if(i.attributes[t])return!0;if(n=i.attributePatterns)for(r=n.length;r--;)if(n[r].pattern.test(e))return!0}return!1},v.getElementRule=g,v.getCustomElements=function(){return M},v.addValidElements=f,v.setValidElements=p,v.addCustomElements=h,v.addValidChildren=m,v.elements=y}}),r(D,[B,C,m],function(e,t,n){function r(e,t,n){var r=1,i,o,a,s;for(s=e.getShortEndedElements(),a=/<([!?\/])?([A-Za-z0-9\-_\:\.]+)((?:\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\/|\s+)>/g,a.lastIndex=i=n;o=a.exec(t);){if(i=a.lastIndex,"/"===o[1])r--;else if(!o[1]){if(o[2]in s)continue;r++}if(0===r)break}return i}function i(i,a){function s(){}var l=this;i=i||{},l.schema=a=a||new e,i.fix_self_closing!==!1&&(i.fix_self_closing=!0),o("comment cdata text start end pi doctype".split(" "),function(e){e&&(l[e]=i[e]||s)}),l.parse=function(e){function o(e){var t,n;for(t=p.length;t--&&p[t].name!==e;);if(t>=0){for(n=p.length-1;n>=t;n--)e=p[n],e.valid&&l.end(e.name);p.length=t}}function s(e,t,n,r,o){var a,s,l=/[\s\u0000-\u001F]+/g;if(t=t.toLowerCase(),n=t in x?t:z(n||r||o||""),E&&!y&&0!==t.indexOf("data-")){if(a=T[t],!a&&R){for(s=R.length;s--&&(a=R[s],!a.pattern.test(t)););s===-1&&(a=null)}if(!a)return;if(a.validValues&&!(n in a.validValues))return}if(W[t]&&!i.allow_script_urls){var u=n.replace(l,"");try{u=decodeURIComponent(u)}catch(c){u=unescape(u)}if(V.test(u))return;if(!i.allow_html_data_urls&&$.test(u)&&!/^data:image\//i.test(u))return}h.map[t]=n,h.push({name:t,value:n})}var l=this,u,c=0,d,f,p=[],h,m,g,v,y,b,C,x,w,E,N,_,S,k,T,R,A,B,D,L,M,P,O,H,I,F=0,z=t.decode,U,W=n.makeMap("src,href,data,background,formaction,poster"),V=/((java|vb)script|mhtml):/i,$=/^data:/i;for(P=new RegExp("<(?:(?:!--([\\w\\W]*?)-->)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:!DOCTYPE([\\w\\W]*?)>)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([^>]+)>)|(?:([A-Za-z0-9\\-_\\:\\.]+)((?:\\s+[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*|\\/|\\s+)>))","g"),O=/([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g,C=a.getShortEndedElements(),M=i.self_closing_elements||a.getSelfClosingElements(),x=a.getBoolAttrs(),E=i.validate,b=i.remove_internals,U=i.fix_self_closing,H=a.getSpecialElements();u=P.exec(e);){if(c<u.index&&l.text(z(e.substr(c,u.index-c))),d=u[6])d=d.toLowerCase(),":"===d.charAt(0)&&(d=d.substr(1)),o(d);else if(d=u[7]){if(d=d.toLowerCase(),":"===d.charAt(0)&&(d=d.substr(1)),w=d in C,U&&M[d]&&p.length>0&&p[p.length-1].name===d&&o(d),!E||(N=a.getElementRule(d))){if(_=!0,E&&(T=N.attributes,R=N.attributePatterns),(k=u[8])?(y=k.indexOf("data-mce-type")!==-1,y&&b&&(_=!1),h=[],h.map={},k.replace(O,s)):(h=[],h.map={}),E&&!y){if(A=N.attributesRequired,B=N.attributesDefault,D=N.attributesForced,L=N.removeEmptyAttrs,L&&!h.length&&(_=!1),D)for(m=D.length;m--;)S=D[m],v=S.name,I=S.value,"{$uid}"===I&&(I="mce_"+F++),h.map[v]=I,h.push({name:v,value:I});if(B)for(m=B.length;m--;)S=B[m],v=S.name,v in h.map||(I=S.value,"{$uid}"===I&&(I="mce_"+F++),h.map[v]=I,h.push({name:v,value:I}));if(A){for(m=A.length;m--&&!(A[m]in h.map););m===-1&&(_=!1)}if(S=h.map["data-mce-bogus"]){if("all"===S){c=r(a,e,P.lastIndex),P.lastIndex=c;continue}_=!1}}_&&l.start(d,h,w)}else _=!1;if(f=H[d]){f.lastIndex=c=u.index+u[0].length,(u=f.exec(e))?(_&&(g=e.substr(c,u.index-c)),c=u.index+u[0].length):(g=e.substr(c),c=e.length),_&&(g.length>0&&l.text(g,!0),l.end(d)),P.lastIndex=c;continue}w||(k&&k.indexOf("/")==k.length-1?_&&l.end(d):p.push({name:d,valid:_}))}else(d=u[1])?(">"===d.charAt(0)&&(d=" "+d),i.allow_conditional_comments||"[if"!==d.substr(0,3).toLowerCase()||(d=" "+d),l.comment(d)):(d=u[2])?l.cdata(d):(d=u[3])?l.doctype(d):(d=u[4])&&l.pi(d,u[5]);c=u.index+u[0].length}for(c<e.length&&l.text(z(e.substr(c))),m=p.length-1;m>=0;m--)d=p[m],d.valid&&l.end(d.name)}}var o=n.each;return i.findEndTag=r,i}),r(L,[A,B,D,m],function(e,t,n,r){var i=r.makeMap,o=r.each,a=r.explode,s=r.extend,l=function(t,n){t.padd_empty_with_br?n.empty().append(new e("br","1")).shortEnded=!0:n.empty().append(new e("#text","3")).value="\xa0"},u=function(e,t){return e&&e.firstChild===e.lastChild&&e.firstChild.name===t};return function(c,d){function f(t){var n,r,o,a,s,l,c,f,h,m,g,v,y,b,C,x;for(v=i("tr,td,th,tbody,thead,tfoot,table"),m=d.getNonEmptyElements(),g=d.getWhiteSpaceElements(),y=d.getTextBlockElements(),b=d.getSpecialElements(),n=0;n<t.length;n++)if(r=t[n],r.parent&&!r.fixed)if(y[r.name]&&"li"==r.parent.name){for(C=r.next;C&&y[C.name];)C.name="li",C.fixed=!0,r.parent.insert(C,r.parent),C=C.next;r.unwrap(r)}else{for(a=[r],o=r.parent;o&&!d.isValidChild(o.name,r.name)&&!v[o.name];o=o.parent)a.push(o);if(o&&a.length>1){for(a.reverse(),s=l=p.filterNode(a[0].clone()),h=0;h<a.length-1;h++){for(d.isValidChild(l.name,a[h].name)?(c=p.filterNode(a[h].clone()),l.append(c)):c=l,f=a[h].firstChild;f&&f!=a[h+1];)x=f.next,c.append(f),f=x;l=c}s.isEmpty(m,g)?o.insert(r,a[0],!0):(o.insert(s,a[0],!0),o.insert(r,s)),o=a[0],(o.isEmpty(m,g)||u(o,"br"))&&o.empty().remove()}else if(r.parent){if("li"===r.name){if(C=r.prev,C&&("ul"===C.name||"ul"===C.name)){C.append(r);continue}if(C=r.next,C&&("ul"===C.name||"ul"===C.name)){C.insert(r,C.firstChild,!0);continue}r.wrap(p.filterNode(new e("ul",1)));continue}d.isValidChild(r.parent.name,"div")&&d.isValidChild("div",r.name)?r.wrap(p.filterNode(new e("div",1))):b[r.name]?r.empty().remove():r.unwrap()}}}var p=this,h={},m=[],g={},v={};c=c||{},c.validate=!("validate"in c)||c.validate,c.root_name=c.root_name||"body",p.schema=d=d||new t,p.filterNode=function(e){var t,n,r;n in h&&(r=g[n],r?r.push(e):g[n]=[e]),t=m.length;for(;t--;)n=m[t].name,n in e.attributes.map&&(r=v[n],r?r.push(e):v[n]=[e]);return e},p.addNodeFilter=function(e,t){o(a(e),function(e){var n=h[e];n||(h[e]=n=[]),n.push(t)})},p.addAttributeFilter=function(e,t){o(a(e),function(e){var n;for(n=0;n<m.length;n++)if(m[n].name===e)return void m[n].callbacks.push(t);m.push({name:e,callbacks:[t]})})},p.parse=function(t,r){function o(){function e(e){e&&(t=e.firstChild,t&&3==t.type&&(t.value=t.value.replace(A,"")),t=e.lastChild,t&&3==t.type&&(t.value=t.value.replace(L,"")))}var t=b.firstChild,n,r;if(d.isValidChild(b.name,F.toLowerCase())){for(;t;)n=t.next,3==t.type||1==t.type&&"p"!==t.name&&!R[t.name]&&!t.attr("data-mce-type")?r?r.append(t):(r=a(F,1),r.attr(c.forced_root_block_attrs),b.insert(r,t),r.append(t)):(e(r),r=null),t=n;e(r)}}function a(t,n){var r=new e(t,n),i;return t in h&&(i=g[t],i?i.push(r):g[t]=[r]),r}function u(e){var t,n,r,i,o=d.getBlockElements();for(t=e.prev;t&&3===t.type;){if(r=t.value.replace(L,""),r.length>0)return void(t.value=r);if(n=t.next){if(3==n.type&&n.value.length){t=t.prev;continue}if(!o[n.name]&&"script"!=n.name&&"style"!=n.name){t=t.prev;continue}}i=t.prev,t.remove(),t=i}}function p(e){var t,n={};for(t in e)"li"!==t&&"p"!=t&&(n[t]=e[t]);return n}var y,b,C,x,w,E,N,_,S,k,T,R,A,B=[],D,L,M,P,O,H,I,F;if(r=r||{},g={},v={},R=s(i("script,style,head,html,body,title,meta,param"),d.getBlockElements()),I=d.getNonEmptyElements(),H=d.children,T=c.validate,F="forced_root_block"in r?r.forced_root_block:c.forced_root_block,O=d.getWhiteSpaceElements(),A=/^[ \t\r\n]+/,L=/[ \t\r\n]+$/,M=/[ \t\r\n]+/g,P=/^[ \t\r\n]+$/,y=new n({validate:T,allow_script_urls:c.allow_script_urls,allow_conditional_comments:c.allow_conditional_comments,self_closing_elements:p(d.getSelfClosingElements()),cdata:function(e){C.append(a("#cdata",4)).value=e},text:function(e,t){var n;D||(e=e.replace(M," "),C.lastChild&&R[C.lastChild.name]&&(e=e.replace(A,""))),0!==e.length&&(n=a("#text",3),n.raw=!!t,C.append(n).value=e)},comment:function(e){C.append(a("#comment",8)).value=e},pi:function(e,t){C.append(a(e,7)).value=t,u(C)},doctype:function(e){var t;t=C.append(a("#doctype",10)),t.value=e,u(C)},start:function(e,t,n){var r,i,o,s,l;if(o=T?d.getElementRule(e):{}){for(r=a(o.outputName||e,1),r.attributes=t,r.shortEnded=n,C.append(r),l=H[C.name],l&&H[r.name]&&!l[r.name]&&B.push(r),i=m.length;i--;)s=m[i].name,s in t.map&&(S=v[s],S?S.push(r):v[s]=[r]);R[e]&&u(r),n||(C=r),!D&&O[e]&&(D=!0)}},end:function(e){var t,n,r,i,o;if(n=T?d.getElementRule(e):{}){if(R[e]&&!D){if(t=C.firstChild,t&&3===t.type)if(r=t.value.replace(A,""),r.length>0)t.value=r,t=t.next;else for(i=t.next,t.remove(),t=i;t&&3===t.type;)r=t.value,i=t.next,(0===r.length||P.test(r))&&(t.remove(),t=i),t=i;if(t=C.lastChild,t&&3===t.type)if(r=t.value.replace(L,""),r.length>0)t.value=r,t=t.prev;else for(i=t.prev,t.remove(),t=i;t&&3===t.type;)r=t.value,i=t.prev,(0===r.length||P.test(r))&&(t.remove(),t=i),t=i}if(D&&O[e]&&(D=!1),(n.removeEmpty||n.paddEmpty)&&C.isEmpty(I,O))if(n.paddEmpty)l(c,C);else if(!C.attributes.map.name&&!C.attributes.map.id)return o=C.parent,R[C.name]?C.empty().remove():C.unwrap(),void(C=o);C=C.parent}}},d),b=C=new e(r.context||c.root_name,11),y.parse(t),T&&B.length&&(r.context?r.invalid=!0:f(B)),F&&("body"==b.name||r.isRootContent)&&o(),!r.invalid){for(k in g){for(S=h[k],x=g[k],N=x.length;N--;)x[N].parent||x.splice(N,1);for(w=0,E=S.length;w<E;w++)S[w](x,k,r)}for(w=0,E=m.length;w<E;w++)if(S=m[w],S.name in v){for(x=v[S.name],N=x.length;N--;)x[N].parent||x.splice(N,1);for(N=0,_=S.callbacks.length;N<_;N++)S.callbacks[N](x,S.name,r)}}return b},c.remove_trailing_brs&&p.addNodeFilter("br",function(t){var n,r=t.length,i,o=s({},d.getBlockElements()),a=d.getNonEmptyElements(),u,f,p,h,m=d.getNonEmptyElements(),g,v;for(o.body=1,n=0;n<r;n++)if(i=t[n],u=i.parent,o[i.parent.name]&&i===u.lastChild){for(p=i.prev;p;){if(h=p.name,"span"!==h||"bookmark"!==p.attr("data-mce-type")){if("br"!==h)break;if("br"===h){i=null;break}}p=p.prev}i&&(i.remove(),u.isEmpty(a,m)&&(g=d.getElementRule(u.name),g&&(g.removeEmpty?u.remove():g.paddEmpty&&l(c,u))))}else{for(f=i;u&&u.firstChild===f&&u.lastChild===f&&(f=u,!o[u.name]);)u=u.parent;f===u&&c.padd_empty_with_br!==!0&&(v=new e("#text",3),v.value="\xa0",i.replace(v))}}),c.allow_unsafe_link_target||p.addAttributeFilter("href",function(e){function t(e){return e=n(e),e?[e,l].join(" "):l}function n(e){var t=new RegExp("("+l.replace(" ","|")+")","g");return e&&(e=r.trim(e.replace(t,""))),e?e:null}function i(e,r){return r?t(e):n(e)}for(var o=e.length,a,s,l="noopener noreferrer";o--;)a=e[o],s=a.attr("rel"),"a"===a.name&&a.attr("rel",i(s,"_blank"==a.attr("target")))}),c.allow_html_in_named_anchor||p.addAttributeFilter("id,name",function(e){for(var t=e.length,n,r,i,o;t--;)if(o=e[t],"a"===o.name&&o.firstChild&&!o.attr("href")){i=o.parent,n=o.lastChild;do r=n.prev,i.insert(n,o),n=r;while(n)}}),c.fix_list_elements&&p.addNodeFilter("ul,ol",function(t){for(var n=t.length,r,i;n--;)if(r=t[n],i=r.parent,"ul"===i.name||"ol"===i.name)if(r.prev&&"li"===r.prev.name)r.prev.append(r);else{var o=new e("li",1);o.attr("style","list-style-type: none"),r.wrap(o)}}),c.validate&&d.getValidClasses()&&p.addAttributeFilter("class",function(e){for(var t=e.length,n,r,i,o,a,s=d.getValidClasses(),l,u;t--;){for(n=e[t],r=n.attr("class").split(" "),a="",i=0;i<r.length;i++)o=r[i],u=!1,l=s["*"],l&&l[o]&&(u=!0),l=s[n.name],!u&&l&&l[o]&&(u=!0),u&&(a&&(a+=" "),a+=o);a.length||(a=null),n.attr("class",a)}})}}),r(M,[C,m],function(e,t){var n=t.makeMap;return function(t){var r=[],i,o,a,s,l;return t=t||{},i=t.indent,o=n(t.indent_before||""),a=n(t.indent_after||""),s=e.getEncodeFunc(t.entity_encoding||"raw",t.entities),l="html"==t.element_format,{start:function(e,t,n){var u,c,d,f;if(i&&o[e]&&r.length>0&&(f=r[r.length-1],f.length>0&&"\n"!==f&&r.push("\n")),r.push("<",e),t)for(u=0,c=t.length;u<c;u++)d=t[u],r.push(" ",d.name,'="',s(d.value,!0),'"');!n||l?r[r.length]=">":r[r.length]=" />",n&&i&&a[e]&&r.length>0&&(f=r[r.length-1],f.length>0&&"\n"!==f&&r.push("\n"))},end:function(e){var t;r.push("</",e,">"),i&&a[e]&&r.length>0&&(t=r[r.length-1],t.length>0&&"\n"!==t&&r.push("\n"))},text:function(e,t){e.length>0&&(r[r.length]=t?e:s(e))},cdata:function(e){r.push("<![CDATA[",e,"]]>")},comment:function(e){r.push("<!--",e,"-->")},pi:function(e,t){t?r.push("<?",e," ",s(t),"?>"):r.push("<?",e,"?>"),i&&r.push("\n")},doctype:function(e){r.push("<!DOCTYPE",e,">",i?"\n":"")},reset:function(){r.length=0},getContent:function(){return r.join("").replace(/\n$/,"")}}}}),r(P,[M,B],function(e,t){return function(n,r){var i=this,o=new e(n);n=n||{},n.validate=!("validate"in n)||n.validate,i.schema=r=r||new t,i.writer=o,i.serialize=function(e){function t(e){var n=i[e.type],s,l,u,c,d,f,p,h,m;if(n)n(e);else{if(s=e.name,l=e.shortEnded,u=e.attributes,a&&u&&u.length>1&&(f=[],f.map={},m=r.getElementRule(e.name))){for(p=0,h=m.attributesOrder.length;p<h;p++)c=m.attributesOrder[p],c in u.map&&(d=u.map[c],f.map[c]=d,f.push({name:c,value:d}));for(p=0,h=u.length;p<h;p++)c=u[p].name,c in f.map||(d=u.map[c],f.map[c]=d,f.push({name:c,value:d}));u=f}if(o.start(e.name,u,l),!l){if(e=e.firstChild)do t(e);while(e=e.next);o.end(s)}}}var i,a;return a=n.validate,i={3:function(e){o.text(e.value,e.raw)},8:function(e){o.comment(e.value)},7:function(e){o.pi(e.name,e.value)},10:function(e){o.doctype(e.value)},4:function(e){o.cdata(e.value)},11:function(e){if(e=e.firstChild)do t(e);while(e=e.next)}},o.reset(),1!=e.type||n.inner?i[11](e):t(e),o.getContent()}}}),r(O,[w,L,D,C,P,A,B,d,m,S],function(e,t,n,r,i,o,a,s,l,u){function c(e){function t(e){return e&&"br"===e.name}var n,r;n=e.lastChild,t(n)&&(r=n.prev,t(r)&&(n.remove(),r.remove()))}var d=l.each,f=l.trim,p=e.DOM;return function(e,o){function h(e){var t=new RegExp(["<span[^>]+data-mce-bogus[^>]+>[\u200b\ufeff]+<\\/span>","\\s?("+x.join("|")+')="[^"]+"'].join("|"),"gi");return e=u.trim(e.replace(t,""))}function m(e){var t=e,r=/<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g,i,a,s,l,u,c=o.schema;for(t=h(t),u=c.getShortEndedElements();l=r.exec(t);)a=r.lastIndex,s=l[0].length,i=u[l[1]]?a:n.findEndTag(c,t,a),t=t.substring(0,a-s)+t.substring(i),r.lastIndex=a-s;return t}function g(){return m(o.getBody().innerHTML)}function v(e){l.inArray(x,e)===-1&&(C.addAttributeFilter(e,function(e,t){for(var n=e.length;n--;)e[n].attr(t,null)}),x.push(e))}var y,b,C,x=["data-mce-selected"];return o&&(y=o.dom,b=o.schema),y=y||p,b=b||new a(e),e.entity_encoding=e.entity_encoding||"named",e.remove_trailing_brs=!("remove_trailing_brs"in e)||e.remove_trailing_brs,C=new t(e,b),C.addAttributeFilter("data-mce-tabindex",function(e,t){for(var n=e.length,r;n--;)r=e[n],r.attr("tabindex",r.attributes.map["data-mce-tabindex"]),r.attr(t,null)}),C.addAttributeFilter("src,href,style",function(t,n){for(var r=t.length,i,o,a="data-mce-"+n,s=e.url_converter,l=e.url_converter_scope,u;r--;)i=t[r],o=i.attributes.map[a],o!==u?(i.attr(n,o.length>0?o:null),i.attr(a,null)):(o=i.attributes.map[n],"style"===n?o=y.serializeStyle(y.parseStyle(o),i.name):s&&(o=s.call(l,o,n,i.name)),i.attr(n,o.length>0?o:null))}),C.addAttributeFilter("class",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.attr("class"),r&&(r=n.attr("class").replace(/(?:^|\s)mce-item-\w+(?!\S)/g,""),n.attr("class",r.length>0?r:null))}),C.addAttributeFilter("data-mce-type",function(e,t,n){for(var r=e.length,i;r--;)i=e[r],"bookmark"!==i.attributes.map["data-mce-type"]||n.cleanup||i.remove()}),C.addNodeFilter("noscript",function(e){for(var t=e.length,n;t--;)n=e[t].firstChild,n&&(n.value=r.decode(n.value))}),C.addNodeFilter("script,style",function(e,t){function n(e){return e.replace(/(<!--\[CDATA\[|\]\]-->)/g,"\n").replace(/^[\r\n]*|[\r\n]*$/g,"").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi,"").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g,"")}for(var r=e.length,i,o,a;r--;)i=e[r],o=i.firstChild?i.firstChild.value:"","script"===t?(a=i.attr("type"),a&&i.attr("type","mce-no/type"==a?null:a.replace(/^mce\-/,"")),o.length>0&&(i.firstChild.value="// <![CDATA[\n"+n(o)+"\n// ]]>")):o.length>0&&(i.firstChild.value="<!--\n"+n(o)+"\n-->")}),C.addNodeFilter("#comment",function(e){for(var t=e.length,n;t--;)n=e[t],0===n.value.indexOf("[CDATA[")?(n.name="#cdata",n.type=4,n.value=n.value.replace(/^\[CDATA\[|\]\]$/g,"")):0===n.value.indexOf("mce:protected ")&&(n.name="#text",n.type=3,n.raw=!0,n.value=unescape(n.value).substr(14))}),C.addNodeFilter("xml:namespace,input",function(e,t){for(var n=e.length,r;n--;)r=e[n],7===r.type?r.remove():1===r.type&&("input"!==t||"type"in r.attributes.map||r.attr("type","text"))}),C.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style,data-mce-selected,data-mce-expando,data-mce-type,data-mce-resize",function(e,t){for(var n=e.length;n--;)e[n].attr(t,null)}),{schema:b,addNodeFilter:C.addNodeFilter,addAttributeFilter:C.addAttributeFilter,serialize:function(t,n){var r=this,o,a,l,p,h,m;return s.ie&&y.select("script,style,select,map").length>0?(h=t.innerHTML,t=t.cloneNode(!1),y.setHTML(t,h)):t=t.cloneNode(!0),o=document.implementation,o.createHTMLDocument&&(a=o.createHTMLDocument(""),d("BODY"==t.nodeName?t.childNodes:[t],function(e){a.body.appendChild(a.importNode(e,!0))}),t="BODY"!=t.nodeName?a.body.firstChild:a.body,l=y.doc,y.doc=a),n=n||{},n.format=n.format||"html",n.selection&&(n.forced_root_block=""),n.no_events||(n.node=t,r.onPreProcess(n)),m=C.parse(f(n.getInner?t.innerHTML:y.getOuterHTML(t)),n),c(m),p=new i(e,b),n.content=p.serialize(m),n.cleanup||(n.content=u.trim(n.content),n.content=n.content.replace(/\uFEFF/g,"")),n.no_events||r.onPostProcess(n),l&&(y.doc=l),n.node=null,n.content},addRules:function(e){b.addValidElements(e)},setRules:function(e){b.setValidElements(e)},onPreProcess:function(e){o&&o.fire("PreProcess",e)},onPostProcess:function(e){o&&o.fire("PostProcess",e)},addTempAttr:v,trimHtml:h,getTrimmedContent:g,trimContent:m}}}),r(H,[],function(){function e(e){function t(t,n){var r,i=0,o,a,s,l,u,c,d=-1,f;if(r=t.duplicate(),r.collapse(n),f=r.parentElement(),f.ownerDocument===e.dom.doc){for(;"false"===f.contentEditable;)f=f.parentNode;if(!f.hasChildNodes())return{node:f,inside:1};for(s=f.children,o=s.length-1;i<=o;)if(c=Math.floor((i+o)/2),l=s[c],r.moveToElementText(l),d=r.compareEndPoints(n?"StartToStart":"EndToEnd",t),d>0)o=c-1;else{if(!(d<0))return{node:l};i=c+1}if(d<0)for(l?r.collapse(!1):(r.moveToElementText(f),r.collapse(!0),l=f,a=!0),u=0;0!==r.compareEndPoints(n?"StartToStart":"StartToEnd",t)&&0!==r.move("character",1)&&f==r.parentElement();)u++;else for(r.collapse(!0),u=0;0!==r.compareEndPoints(n?"StartToStart":"StartToEnd",t)&&0!==r.move("character",-1)&&f==r.parentElement();)u++;return{node:l,position:d,offset:u,inside:a}}}function n(){function n(e){var n=t(o,e),r,i,s=0,l,u,c;if(r=n.node,i=n.offset,n.inside&&!r.hasChildNodes())return void a[e?"setStart":"setEnd"](r,0);if(i===u)return void a[e?"setStartBefore":"setEndAfter"](r);if(n.position<0){if(l=n.inside?r.firstChild:r.nextSibling,!l)return void a[e?"setStartAfter":"setEndAfter"](r);if(!i)return void(3==l.nodeType?a[e?"setStart":"setEnd"](l,0):a[e?"setStartBefore":"setEndBefore"](l));for(;l;){if(3==l.nodeType&&(c=l.nodeValue,s+=c.length,s>=i)){r=l,s-=i,s=c.length-s;break}l=l.nextSibling}}else{if(l=r.previousSibling,!l)return a[e?"setStartBefore":"setEndBefore"](r);if(!i)return void(3==r.nodeType?a[e?"setStart":"setEnd"](l,r.nodeValue.length):a[e?"setStartAfter":"setEndAfter"](l));for(;l;){if(3==l.nodeType&&(s+=l.nodeValue.length,s>=i)){r=l,s-=i;break}l=l.previousSibling}}a[e?"setStart":"setEnd"](r,s)}var o=e.getRng(),a=i.createRng(),s,l,u,c,d;if(s=o.item?o.item(0):o.parentElement(),s.ownerDocument!=i.doc)return a;if(l=e.isCollapsed(),o.item)return a.setStart(s.parentNode,i.nodeIndex(s)),a.setEnd(a.startContainer,a.startOffset+1),a;try{n(!0),l||n()}catch(f){if(f.number!=-2147024809)throw f;d=r.getBookmark(2),u=o.duplicate(),u.collapse(!0),s=u.parentElement(),l||(u=o.duplicate(),u.collapse(!1),c=u.parentElement(),c.innerHTML=c.innerHTML),s.innerHTML=s.innerHTML,r.moveToBookmark(d),o=e.getRng(),n(!0),l||n()}return a}var r=this,i=e.dom,o=!1;this.getBookmark=function(n){function r(e){var t,n,r,o,a=[];for(t=e.parentNode,n=i.getRoot().parentNode;t!=n&&9!==t.nodeType;){for(r=t.children,o=r.length;o--;)if(e===r[o]){a.push(o);break}e=t,t=t.parentNode}return a}function o(e){var n;if(n=t(a,e))return{position:n.position,offset:n.offset,indexes:r(n.node),inside:n.inside}}var a=e.getRng(),s={};return 2===n&&(a.item?s.start={ctrl:!0,indexes:r(a.item(0))}:(s.start=o(!0),e.isCollapsed()||(s.end=o()))),s},this.moveToBookmark=function(e){function t(e){var t,n,r,o;for(t=i.getRoot(),n=e.length-1;n>=0;n--)o=t.children,r=e[n],r<=o.length-1&&(t=o[r]);return t}function n(n){var i=e[n?"start":"end"],a,s,l,u;i&&(a=i.position>0,s=o.createTextRange(),s.moveToElementText(t(i.indexes)),u=i.offset,u!==l?(s.collapse(i.inside||a),s.moveStart("character",a?-u:u)):s.collapse(n),r.setEndPoint(n?"StartToStart":"EndToStart",s),n&&r.collapse(!0))}var r,o=i.doc.body;e.start&&(e.start.ctrl?(r=o.createControlRange(),r.addElement(t(e.start.indexes)),r.select()):(r=o.createTextRange(),n(!0),n(),r.select()))},this.addRange=function(t){function n(e){var t,n,a,d,h;a=i.create("a"),t=e?s:u,n=e?l:c,d=r.duplicate(),t!=f&&t!=f.documentElement||(t=p,n=0),3==t.nodeType?(t.parentNode.insertBefore(a,t),d.moveToElementText(a),d.moveStart("character",n),i.remove(a),r.setEndPoint(e?"StartToStart":"EndToEnd",d)):(h=t.childNodes,h.length?(n>=h.length?i.insertAfter(a,h[h.length-1]):t.insertBefore(a,h[n]),d.moveToElementText(a)):t.canHaveHTML&&(t.innerHTML="<span>&#xFEFF;</span>",a=t.firstChild,d.moveToElementText(a),d.collapse(o)),r.setEndPoint(e?"StartToStart":"EndToEnd",d),i.remove(a))}var r,a,s,l,u,c,d,f=e.dom.doc,p=f.body,h,m;if(s=t.startContainer,l=t.startOffset,u=t.endContainer,c=t.endOffset,r=p.createTextRange(),s==u&&1==s.nodeType){if(l==c&&!s.hasChildNodes()){if(s.canHaveHTML)return d=s.previousSibling,d&&!d.hasChildNodes()&&i.isBlock(d)?d.innerHTML="&#xFEFF;":d=null,s.innerHTML="<span>&#xFEFF;</span><span>&#xFEFF;</span>",r.moveToElementText(s.lastChild),r.select(),i.doc.selection.clear(),s.innerHTML="",void(d&&(d.innerHTML=""));l=i.nodeIndex(s),s=s.parentNode}if(l==c-1)try{if(m=s.childNodes[l],a=p.createControlRange(),a.addElement(m),a.select(),h=e.getRng(),h.item&&m===h.item(0))return}catch(g){}}n(!0),n(),r.select()},this.getRangeAt=n}return e}),r(I,[d],function(e){return{BACKSPACE:8,DELETE:46,DOWN:40,ENTER:13,LEFT:37,RIGHT:39,SPACEBAR:32,TAB:9,UP:38,modifierPressed:function(e){return e.shiftKey||e.ctrlKey||e.altKey||this.metaKeyPressed(e)},metaKeyPressed:function(t){return e.mac?t.metaKey:t.ctrlKey&&!t.altKey}}}),r(F,[I,m,c,d,_],function(e,t,n,r,i){function o(e,t){for(;t&&t!=e;){if(s(t)||a(t))return t;t=t.parentNode}return null}var a=i.isContentEditableFalse,s=i.isContentEditableTrue;return function(i,s){function l(e){var t=s.settings.object_resizing;return t!==!1&&!r.iOS&&("string"!=typeof t&&(t="table,img,div"),"false"!==e.getAttribute("data-mce-resize")&&(e!=s.getBody()&&s.dom.is(e,t)))}function u(t){var n,r,i,o,a;n=t.screenX-L,r=t.screenY-M,U=n*B[2]+H,W=r*B[3]+I,U=U<5?5:U,W=W<5?5:W,i="IMG"==k.nodeName&&s.settings.resize_img_proportional!==!1?!e.modifierPressed(t):e.modifierPressed(t)||"IMG"==k.nodeName&&B[2]*B[3]!==0,i&&(j(n)>j(r)?(W=Y(U*F),U=Y(W/F)):(U=Y(W/F),W=Y(U*F))),_.setStyles(T,{width:U,height:W}),o=B.startPos.x+n,a=B.startPos.y+r,o=o>0?o:0,a=a>0?a:0,_.setStyles(R,{left:o,top:a,display:"block"}),R.innerHTML=U+" &times; "+W,B[2]<0&&T.clientWidth<=U&&_.setStyle(T,"left",P+(H-U)),B[3]<0&&T.clientHeight<=W&&_.setStyle(T,"top",O+(I-W)),n=X.scrollWidth-K,r=X.scrollHeight-G,n+r!==0&&_.setStyles(R,{left:o-n,top:a-r}),z||(s.fire("ObjectResizeStart",{target:k,width:H,height:I}),z=!0)}function c(){function e(e,t){t&&(k.style[e]||!s.schema.isValid(k.nodeName.toLowerCase(),e)?_.setStyle(k,e,t):_.setAttrib(k,e,t))}z=!1,e("width",U),e("height",W),_.unbind(V,"mousemove",u),_.unbind(V,"mouseup",c),$!=V&&(_.unbind($,"mousemove",u),_.unbind($,"mouseup",c)),_.remove(T),_.remove(R),q&&"TABLE"!=k.nodeName||d(k),s.fire("ObjectResized",{target:k,width:U,height:W}),_.setAttrib(k,"style",_.getAttrib(k,"style")),s.nodeChanged()}function d(e,t,n){var i,o,a,d,p;f(),x(),i=_.getPos(e,X),P=i.x,O=i.y,p=e.getBoundingClientRect(),o=p.width||p.right-p.left,a=p.height||p.bottom-p.top,k!=e&&(C(),k=e,U=W=0),d=s.fire("ObjectSelected",{target:e}),l(e)&&!d.isDefaultPrevented()?S(A,function(e,i){function s(t){L=t.screenX,M=t.screenY,H=k.clientWidth,I=k.clientHeight,F=I/H,B=e,e.startPos={x:o*e[0]+P,y:a*e[1]+O},K=X.scrollWidth,G=X.scrollHeight,T=k.cloneNode(!0),_.addClass(T,"mce-clonedresizable"),_.setAttrib(T,"data-mce-bogus","all"),T.contentEditable=!1,T.unSelectabe=!0,_.setStyles(T,{left:P,top:O,margin:0}),T.removeAttribute("data-mce-selected"),X.appendChild(T),_.bind(V,"mousemove",u),_.bind(V,"mouseup",c),$!=V&&(_.bind($,"mousemove",u),_.bind($,"mouseup",c)),R=_.add(X,"div",{"class":"mce-resize-helper","data-mce-bogus":"all"},H+" &times; "+I)}var l;return t?void(i==t&&s(n)):(l=_.get("mceResizeHandle"+i),l&&_.remove(l),l=_.add(X,"div",{id:"mceResizeHandle"+i,"data-mce-bogus":"all","class":"mce-resizehandle",unselectable:!0,style:"cursor:"+i+"-resize; margin:0; padding:0"}),r.ie&&(l.contentEditable=!1),_.bind(l,"mousedown",function(e){e.stopImmediatePropagation(),e.preventDefault(),s(e)}),e.elm=l,void _.setStyles(l,{left:o*e[0]+P-l.offsetWidth/2,top:a*e[1]+O-l.offsetHeight/2}))}):f(),k.setAttribute("data-mce-selected","1")}function f(){var e,t;x(),k&&k.removeAttribute("data-mce-selected");for(e in A)t=_.get("mceResizeHandle"+e),t&&(_.unbind(t),_.remove(t))}function p(e){function t(e,t){if(e)do if(e===t)return!0;while(e=e.parentNode)}var n,r;if(!z&&!s.removed)return S(_.select("img[data-mce-selected],hr[data-mce-selected]"),function(e){e.removeAttribute("data-mce-selected")}),r="mousedown"==e.type?e.target:i.getNode(),r=_.$(r).closest(q?"table":"table,img,hr")[0],t(r,X)&&(w(),n=i.getStart(!0),t(n,r)&&t(i.getEnd(!0),r)&&(!q||r!=n&&"IMG"!==n.nodeName))?void d(r):void f()}function h(e,t,n){e&&e.attachEvent&&e.attachEvent("on"+t,n)}function m(e,t,n){e&&e.detachEvent&&e.detachEvent("on"+t,n)}function g(e){var t=e.srcElement,n,r,i,o,a,l,u;n=t.getBoundingClientRect(),l=D.clientX-n.left,u=D.clientY-n.top;for(r in A)if(i=A[r],o=t.offsetWidth*i[0],a=t.offsetHeight*i[1],j(o-l)<8&&j(a-u)<8){B=i;break}z=!0,s.fire("ObjectResizeStart",{target:k,width:k.clientWidth,height:k.clientHeight}),s.getDoc().selection.empty(),d(t,r,D)}function v(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function y(e){return a(o(s.getBody(),e))}function b(e){var t=e.srcElement;if(y(t))return void v(e);if(t!=k){if(s.fire("ObjectSelected",{target:t}),C(),0===t.id.indexOf("mceResizeHandle"))return void(e.returnValue=!1);
"IMG"!=t.nodeName&&"TABLE"!=t.nodeName||(f(),k=t,h(t,"resizestart",g))}}function C(){m(k,"resizestart",g)}function x(){for(var e in A){var t=A[e];t.elm&&(_.unbind(t.elm),delete t.elm)}}function w(){try{s.getDoc().execCommand("enableObjectResizing",!1,!1)}catch(e){}}function E(e){var t;if(q){t=V.body.createControlRange();try{return t.addElement(e),t.select(),!0}catch(n){}}}function N(){k=T=null,q&&(C(),m(X,"controlselect",b))}var _=s.dom,S=t.each,k,T,R,A,B,D,L,M,P,O,H,I,F,z,U,W,V=s.getDoc(),$=document,q=r.ie&&r.ie<11,j=Math.abs,Y=Math.round,X=s.getBody(),K,G;A={nw:[0,0,-1,-1],ne:[1,0,1,-1],se:[1,1,1,1],sw:[0,1,-1,1]};var J=".mce-content-body";return s.contentStyles.push(J+" div.mce-resizehandle {position: absolute;border: 1px solid black;box-sizing: box-sizing;background: #FFF;width: 7px;height: 7px;z-index: 10000}"+J+" .mce-resizehandle:hover {background: #000}"+J+" img[data-mce-selected],"+J+" hr[data-mce-selected] {outline: 1px solid black;resize: none}"+J+" .mce-clonedresizable {position: absolute;"+(r.gecko?"":"outline: 1px dashed black;")+"opacity: .5;filter: alpha(opacity=50);z-index: 10000}"+J+" .mce-resize-helper {background: #555;background: rgba(0,0,0,0.75);border-radius: 3px;border: 1px;color: white;display: none;font-family: sans-serif;font-size: 12px;white-space: nowrap;line-height: 14px;margin: 5px 10px;padding: 5px;position: absolute;z-index: 10001}"),s.on("init",function(){q?(s.on("ObjectResized",function(e){"TABLE"!=e.target.nodeName&&(f(),E(e.target))}),h(X,"controlselect",b),s.on("mousedown",function(e){D=e})):(w(),r.ie>=11&&(s.on("mousedown click",function(e){var t=e.target,n=t.nodeName;z||!/^(TABLE|IMG|HR)$/.test(n)||y(t)||(s.selection.select(t,"TABLE"==n),"mousedown"==e.type&&s.nodeChanged())}),s.dom.bind(X,"mscontrolselect",function(e){function t(e){n.setEditorTimeout(s,function(){s.selection.select(e)})}return y(e.target)?(e.preventDefault(),void t(e.target)):void(/^(TABLE|IMG|HR)$/.test(e.target.nodeName)&&(e.preventDefault(),"IMG"==e.target.tagName&&t(e.target)))})));var e=n.throttle(function(e){s.composing||p(e)});s.on("nodechange ResizeEditor ResizeWindow drop",e),s.on("keyup compositionend",function(t){k&&"TABLE"==k.nodeName&&e(t)}),s.on("hide blur",f)}),s.on("remove",x),{isResizable:l,showResizeRect:d,hideResizeRect:f,updateResizeRect:p,controlSelect:E,destroy:N}}}),r(z,[],function(){function e(e){return function(){return e}}function t(e){return function(t){return!e(t)}}function n(e,t){return function(n){return e(t(n))}}function r(){var e=s.call(arguments);return function(t){for(var n=0;n<e.length;n++)if(e[n](t))return!0;return!1}}function i(){var e=s.call(arguments);return function(t){for(var n=0;n<e.length;n++)if(!e[n](t))return!1;return!0}}function o(e){var t=s.call(arguments);return t.length-1>=e.length?e.apply(this,t.slice(1)):function(){var e=t.concat([].slice.call(arguments));return o.apply(this,e)}}function a(){}var s=[].slice;return{constant:e,negate:t,and:i,or:r,curry:o,compose:n,noop:a}}),r(U,[_,h,k],function(e,t,n){function r(e){return!m(e)&&(d(e)?!f(e.parentNode):p(e)||c(e)||h(e)||u(e))}function i(e,t){for(e=e.parentNode;e&&e!=t;e=e.parentNode){if(u(e))return!1;if(l(e))return!0}return!0}function o(e){return!!u(e)&&t.reduce(e.getElementsByTagName("*"),function(e,t){return e||l(t)},!1)!==!0}function a(e){return p(e)||o(e)}function s(e,t){return r(e)&&i(e,t)}var l=e.isContentEditableTrue,u=e.isContentEditableFalse,c=e.isBr,d=e.isText,f=e.matchNodeNames("script style textarea"),p=e.matchNodeNames("img input textarea hr iframe video audio object"),h=e.matchNodeNames("table"),m=n.isCaretContainer;return{isCaretCandidate:r,isInEditable:i,isAtomic:a,isEditableCaretCandidate:s}}),r(W,[],function(){function e(e){return e?{left:c(e.left),top:c(e.top),bottom:c(e.bottom),right:c(e.right),width:c(e.width),height:c(e.height)}:{left:0,top:0,bottom:0,right:0,width:0,height:0}}function t(t,n){return t=e(t),n?t.right=t.left:(t.left=t.left+t.width,t.right=t.left),t.width=0,t}function n(e,t){return e.left===t.left&&e.top===t.top&&e.bottom===t.bottom&&e.right===t.right}function r(e,t,n){return e>=0&&e<=Math.min(t.height,n.height)/2}function i(e,t){return e.bottom<t.top||!(e.top>t.bottom)&&r(t.top-e.bottom,e,t)}function o(e,t){return e.top>t.bottom||!(e.bottom<t.top)&&r(t.bottom-e.top,e,t)}function a(e,t){return e.left<t.left}function s(e,t){return e.right>t.right}function l(e,t){return i(e,t)?-1:o(e,t)?1:a(e,t)?-1:s(e,t)?1:0}function u(e,t,n){return t>=e.left&&t<=e.right&&n>=e.top&&n<=e.bottom}var c=Math.round;return{clone:e,collapse:t,isEqual:n,isAbove:i,isBelow:o,isLeft:a,isRight:s,compare:l,containsXY:u}}),r(V,[],function(){function e(e){return"string"==typeof e&&e.charCodeAt(0)>=768&&t.test(e)}var t=new RegExp("[\u0300-\u036f\u0483-\u0487\u0488-\u0489\u0591-\u05bd\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962-\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2-\u09e3\u0a01-\u0a02\u0a3c\u0a41-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a51\u0a70-\u0a71\u0a75\u0a81-\u0a82\u0abc\u0ac1-\u0ac5\u0ac7-\u0ac8\u0acd\u0ae2-\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62-\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c00\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62-\u0c63\u0c81\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3\u0d01\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62-\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039-\u103a\u103d-\u103e\u1058-\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17b4-\u17b5\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193b\u1a17-\u1a18\u1a1b\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1ab0-\u1abd\u1abe\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80-\u1b81\u1ba2-\u1ba5\u1ba8-\u1ba9\u1bab-\u1bad\u1be6\u1be8-\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1cf4\u1cf8-\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u200c-\u200d\u20d0-\u20dc\u20dd-\u20e0\u20e1\u20e2-\u20e4\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302d\u302e-\u302f\u3099-\u309a\ua66f\ua670-\ua672\ua674-\ua67d\ua69e-\ua69f\ua6f0-\ua6f1\ua802\ua806\ua80b\ua825-\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\ua9e5\uaa29-\uaa2e\uaa31-\uaa32\uaa35-\uaa36\uaa43\uaa4c\uaa7c\uaab0\uaab2-\uaab4\uaab7-\uaab8\uaabe-\uaabf\uaac1\uaaec-\uaaed\uaaf6\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\uff9e-\uff9f]");return{isExtendingChar:e}}),r($,[z,_,w,T,U,W,V],function(e,t,n,r,i,o,a){function s(e){return"createRange"in e?e.createRange():n.DOM.createRng()}function l(e){return e&&/[\r\n\t ]/.test(e)}function u(e){var t=e.startContainer,n=e.startOffset,r;return!!(l(e.toString())&&v(t.parentNode)&&(r=t.data,l(r[n-1])||l(r[n+1])))}function c(e){function t(e){var t=e.ownerDocument,n=s(t),r=t.createTextNode("\xa0"),i=e.parentNode,a;return i.insertBefore(r,e),n.setStart(r,0),n.setEnd(r,1),a=o.clone(n.getBoundingClientRect()),i.removeChild(r),a}function n(e){var n,r;return r=e.getClientRects(),n=r.length>0?o.clone(r[0]):o.clone(e.getBoundingClientRect()),b(e)&&0===n.left?t(e):n}function r(e,t){return e=o.collapse(e,t),e.width=1,e.right=e.left+1,e}function i(e){0!==e.height&&(c.length>0&&o.isEqual(e,c[c.length-1])||c.push(e))}function l(e,t){var o=s(e.ownerDocument);if(t<e.data.length){if(a.isExtendingChar(e.data[t]))return c;if(a.isExtendingChar(e.data[t-1])&&(o.setStart(e,t),o.setEnd(e,t+1),!u(o)))return i(r(n(o),!1)),c}t>0&&(o.setStart(e,t-1),o.setEnd(e,t),u(o)||i(r(n(o),!1))),t<e.data.length&&(o.setStart(e,t),o.setEnd(e,t+1),u(o)||i(r(n(o),!0)))}var c=[],d,p;if(y(e.container()))return l(e.container(),e.offset()),c;if(f(e.container()))if(e.isAtEnd())p=x(e.container(),e.offset()),y(p)&&l(p,p.data.length),g(p)&&!b(p)&&i(r(n(p),!1));else{if(p=x(e.container(),e.offset()),y(p)&&l(p,0),g(p)&&e.isAtEnd())return i(r(n(p),!1)),c;d=x(e.container(),e.offset()-1),g(d)&&!b(d)&&(h(d)||h(p)||!g(p))&&i(r(n(d),!1)),g(p)&&i(r(n(p),!0))}return c}function d(t,n,r){function i(){return y(t)?0===n:0===n}function o(){return y(t)?n>=t.data.length:n>=t.childNodes.length}function a(){var e;return e=s(t.ownerDocument),e.setStart(t,n),e.setEnd(t,n),e}function l(){return r||(r=c(new d(t,n))),r}function u(){return l().length>0}function f(e){return e&&t===e.container()&&n===e.offset()}function p(e){return x(t,e?n-1:n)}return{container:e.constant(t),offset:e.constant(n),toRange:a,getClientRects:l,isVisible:u,isAtStart:i,isAtEnd:o,isEqual:f,getNode:p}}var f=t.isElement,p=i.isCaretCandidate,h=t.matchStyleValues("display","block table"),m=t.matchStyleValues("float","left right"),g=e.and(f,p,e.negate(m)),v=e.negate(t.matchStyleValues("white-space","pre pre-line pre-wrap")),y=t.isText,b=t.isBr,C=n.nodeIndex,x=r.getNode;return d.fromRangeStart=function(e){return new d(e.startContainer,e.startOffset)},d.fromRangeEnd=function(e){return new d(e.endContainer,e.endOffset)},d.after=function(e){return new d(e.parentNode,C(e)+1)},d.before=function(e){return new d(e.parentNode,C(e))},d}),r(q,[_,w,z,h,$],function(e,t,n,r,i){function o(e){var t=e.parentNode;return v(t)?o(t):t}function a(e){return e?r.reduce(e.childNodes,function(e,t){return v(t)&&"BR"!=t.nodeName?e=e.concat(a(t)):e.push(t),e},[]):[]}function s(e,t){for(;(e=e.previousSibling)&&g(e);)t+=e.data.length;return t}function l(e){return function(t){return e===t}}function u(t){var n,i,s;return n=a(o(t)),i=r.findIndex(n,l(t),t),n=n.slice(0,i+1),s=r.reduce(n,function(e,t,r){return g(t)&&g(n[r-1])&&e++,e},0),n=r.filter(n,e.matchNodeNames(t.nodeName)),i=r.findIndex(n,l(t),t),i-s}function c(e){var t;return t=g(e)?"text()":e.nodeName.toLowerCase(),t+"["+u(e)+"]"}function d(e,t,n){var r=[];for(t=t.parentNode;t!=e&&(!n||!n(t));t=t.parentNode)r.push(t);return r}function f(t,i){var o,a,l=[],u,f,p;return o=i.container(),a=i.offset(),g(o)?u=s(o,a):(f=o.childNodes,a>=f.length?(u="after",a=f.length-1):u="before",o=f[a]),l.push(c(o)),p=d(t,o),p=r.filter(p,n.negate(e.isBogus)),l=l.concat(r.map(p,function(e){return c(e)})),l.reverse().join("/")+","+u}function p(t,n,i){var o=a(t);return o=r.filter(o,function(e,t){return!g(e)||!g(o[t-1])}),o=r.filter(o,e.matchNodeNames(n)),o[i]}function h(e,t){for(var n=e,r=0,o;g(n);){if(o=n.data.length,t>=r&&t<=r+o){e=n,t-=r;break}if(!g(n.nextSibling)){e=n,t=o;break}r+=o,n=n.nextSibling}return t>e.data.length&&(t=e.data.length),new i(e,t)}function m(e,t){var n,o,a;return t?(n=t.split(","),t=n[0].split("/"),a=n.length>1?n[1]:"before",o=r.reduce(t,function(e,t){return(t=/([\w\-\(\)]+)\[([0-9]+)\]/.exec(t))?("text()"===t[1]&&(t[1]="#text"),p(e,t[1],parseInt(t[2],10))):null},e),o?g(o)?h(o,parseInt(a,10)):(a="after"===a?y(o)+1:y(o),new i(o.parentNode,a)):null):null}var g=e.isText,v=e.isBogus,y=t.nodeIndex;return{create:f,resolve:m}}),r(j,[d,m,k,q,$,_,T],function(e,t,n,r,i,o,a){function s(s){var u=s.dom;this.getBookmark=function(e,c){function d(e,n){var r=0;return t.each(u.select(e),function(e){if("all"!==e.getAttribute("data-mce-bogus"))return e!=n&&void r++}),r}function f(e){function t(t){var n,r,i,o=t?"start":"end";n=e[o+"Container"],r=e[o+"Offset"],1==n.nodeType&&"TR"==n.nodeName&&(i=n.childNodes,n=i[Math.min(t?r:r-1,i.length-1)],n&&(r=t?0:n.childNodes.length,e["set"+(t?"Start":"End")](n,r)))}return t(!0),t(),e}function p(e){function t(e,t){var r=e[t?"startContainer":"endContainer"],i=e[t?"startOffset":"endOffset"],o=[],a,s,l=0;if(3==r.nodeType){if(c)for(a=r.previousSibling;a&&3==a.nodeType;a=a.previousSibling)i+=a.nodeValue.length;o.push(i)}else s=r.childNodes,i>=s.length&&s.length&&(l=1,i=Math.max(0,s.length-1)),o.push(u.nodeIndex(s[i],c)+l);for(;r&&r!=n;r=r.parentNode)o.push(u.nodeIndex(r,c));return o}var n=u.getRoot(),r={};return r.start=t(e,!0),s.isCollapsed()||(r.end=t(e)),r}function h(e){function t(e,t){var r;if(o.isElement(e)&&(e=a.getNode(e,t),l(e)))return e;if(n.isCaretContainer(e)){if(o.isText(e)&&n.isCaretContainerBlock(e)&&(e=e.parentNode),r=e.previousSibling,l(r))return r;if(r=e.nextSibling,l(r))return r}}return t(e.startContainer,e.startOffset)||t(e.endContainer,e.endOffset)}var m,g,v,y,b,C,x="&#xFEFF;",w;if(2==e)return C=s.getNode(),b=C?C.nodeName:null,m=s.getRng(),l(C)||"IMG"==b?{name:b,index:d(b,C)}:s.tridentSel?s.tridentSel.getBookmark(e):(C=h(m),C?(b=C.tagName,{name:b,index:d(b,C)}):p(m));if(3==e)return m=s.getRng(),{start:r.create(u.getRoot(),i.fromRangeStart(m)),end:r.create(u.getRoot(),i.fromRangeEnd(m))};if(e)return{rng:s.getRng()};if(m=s.getRng(),v=u.uniqueId(),y=s.isCollapsed(),w="overflow:hidden;line-height:0px",m.duplicate||m.item){if(m.item)return C=m.item(0),b=C.nodeName,{name:b,index:d(b,C)};g=m.duplicate();try{m.collapse(),m.pasteHTML('<span data-mce-type="bookmark" id="'+v+'_start" style="'+w+'">'+x+"</span>"),y||(g.collapse(!1),m.moveToElementText(g.parentElement()),0===m.compareEndPoints("StartToEnd",g)&&g.move("character",-1),g.pasteHTML('<span data-mce-type="bookmark" id="'+v+'_end" style="'+w+'">'+x+"</span>"))}catch(E){return null}}else{if(C=s.getNode(),b=C.nodeName,"IMG"==b)return{name:b,index:d(b,C)};g=f(m.cloneRange()),y||(g.collapse(!1),g.insertNode(u.create("span",{"data-mce-type":"bookmark",id:v+"_end",style:w},x))),m=f(m),m.collapse(!0),m.insertNode(u.create("span",{"data-mce-type":"bookmark",id:v+"_start",style:w},x))}return s.moveToBookmark({id:v,keep:1}),{id:v}},this.moveToBookmark=function(n){function i(e){var t=n[e?"start":"end"],r,i,o,a;if(t){for(o=t[0],i=d,r=t.length-1;r>=1;r--){if(a=i.childNodes,t[r]>a.length-1)return;i=a[t[r]]}3===i.nodeType&&(o=Math.min(t[0],i.nodeValue.length)),1===i.nodeType&&(o=Math.min(t[0],i.childNodes.length)),e?c.setStart(i,o):c.setEnd(i,o)}return!0}function o(r){var i=u.get(n.id+"_"+r),o,a,s,l,c=n.keep;if(i&&(o=i.parentNode,"start"==r?(c?(o=i.firstChild,a=1):a=u.nodeIndex(i),f=p=o,h=m=a):(c?(o=i.firstChild,a=1):a=u.nodeIndex(i),p=o,m=a),!c)){for(l=i.previousSibling,s=i.nextSibling,t.each(t.grep(i.childNodes),function(e){3==e.nodeType&&(e.nodeValue=e.nodeValue.replace(/\uFEFF/g,""))});i=u.get(n.id+"_"+r);)u.remove(i,1);l&&s&&l.nodeType==s.nodeType&&3==l.nodeType&&!e.opera&&(a=l.nodeValue.length,l.appendData(s.nodeValue),u.remove(s),"start"==r?(f=p=l,h=m=a):(p=l,m=a))}}function a(t){return!u.isBlock(t)||t.innerHTML||e.ie||(t.innerHTML='<br data-mce-bogus="1" />'),t}function l(){var e,t;return e=u.createRng(),t=r.resolve(u.getRoot(),n.start),e.setStart(t.container(),t.offset()),t=r.resolve(u.getRoot(),n.end),e.setEnd(t.container(),t.offset()),e}var c,d,f,p,h,m;if(n)if(t.isArray(n.start)){if(c=u.createRng(),d=u.getRoot(),s.tridentSel)return s.tridentSel.moveToBookmark(n);i(!0)&&i()&&s.setRng(c)}else"string"==typeof n.start?s.setRng(l(n)):n.id?(o("start"),o("end"),f&&(c=u.createRng(),c.setStart(a(f),h),c.setEnd(a(p),m),s.setRng(c))):n.name?s.select(u.select(n.name)[n.index]):n.rng&&s.setRng(n.rng)}}var l=o.isContentEditableFalse;return s.isBookmarkNode=function(e){return e&&"SPAN"===e.tagName&&"bookmark"===e.getAttribute("data-mce-type")},s}),r(Y,[y,H,F,T,j,_,d,m,$],function(e,n,r,i,o,a,s,l,u){function c(e,t,i,a){var s=this;s.dom=e,s.win=t,s.serializer=i,s.editor=a,s.bookmarkManager=new o(s),s.controlSelection=new r(s,a),s.win.getSelection||(s.tridentSel=new n(s))}var d=l.each,f=l.trim,p=s.ie;return c.prototype={setCursorLocation:function(e,t){var n=this,r=n.dom.createRng();e?(r.setStart(e,t),r.setEnd(e,t),n.setRng(r),n.collapse(!1)):(n._moveEndPoint(r,n.editor.getBody(),!0),n.setRng(r))},getContent:function(e){var n=this,r=n.getRng(),i=n.dom.create("body"),o=n.getSel(),a,s,l;return e=e||{},a=s="",e.get=!0,e.format=e.format||"html",e.selection=!0,n.editor.fire("BeforeGetContent",e),"text"==e.format?n.isCollapsed()?"":r.text||(o.toString?o.toString():""):(r.cloneContents?(l=r.cloneContents(),l&&i.appendChild(l)):r.item!==t||r.htmlText!==t?(i.innerHTML="<br>"+(r.item?r.item(0).outerHTML:r.htmlText),i.removeChild(i.firstChild)):i.innerHTML=r.toString(),/^\s/.test(i.innerHTML)&&(a=" "),/\s+$/.test(i.innerHTML)&&(s=" "),e.getInner=!0,e.content=n.isCollapsed()?"":a+n.serializer.serialize(i,e)+s,n.editor.fire("GetContent",e),e.content)},setContent:function(e,t){var n=this,r=n.getRng(),i,o=n.win.document,a,s;if(t=t||{format:"html"},t.set=!0,t.selection=!0,t.content=e,t.no_events||n.editor.fire("BeforeSetContent",t),e=t.content,r.insertNode){e+='<span id="__caret">_</span>',r.startContainer==o&&r.endContainer==o?o.body.innerHTML=e:(r.deleteContents(),0===o.body.childNodes.length?o.body.innerHTML=e:r.createContextualFragment?r.insertNode(r.createContextualFragment(e)):(a=o.createDocumentFragment(),s=o.createElement("div"),a.appendChild(s),s.outerHTML=e,r.insertNode(a))),i=n.dom.get("__caret"),r=o.createRange(),r.setStartBefore(i),r.setEndBefore(i),n.setRng(r),n.dom.remove("__caret");try{n.setRng(r)}catch(l){}}else r.item&&(o.execCommand("Delete",!1,null),r=n.getRng()),/^\s+/.test(e)?(r.pasteHTML('<span id="__mce_tmp">_</span>'+e),n.dom.remove("__mce_tmp")):r.pasteHTML(e);t.no_events||n.editor.fire("SetContent",t)},getStart:function(e){var t=this,n=t.getRng(),r,i,o,a;if(n.duplicate||n.item){if(n.item)return n.item(0);for(o=n.duplicate(),o.collapse(1),r=o.parentElement(),r.ownerDocument!==t.dom.doc&&(r=t.dom.getRoot()),i=a=n.parentElement();a=a.parentNode;)if(a==r){r=i;break}return r}return r=n.startContainer,1==r.nodeType&&r.hasChildNodes()&&(e&&n.collapsed||(r=r.childNodes[Math.min(r.childNodes.length-1,n.startOffset)])),r&&3==r.nodeType?r.parentNode:r},getEnd:function(e){var t=this,n=t.getRng(),r,i;return n.duplicate||n.item?n.item?n.item(0):(n=n.duplicate(),n.collapse(0),r=n.parentElement(),r.ownerDocument!==t.dom.doc&&(r=t.dom.getRoot()),r&&"BODY"==r.nodeName?r.lastChild||r:r):(r=n.endContainer,i=n.endOffset,1==r.nodeType&&r.hasChildNodes()&&(e&&n.collapsed||(r=r.childNodes[i>0?i-1:i])),r&&3==r.nodeType?r.parentNode:r)},getBookmark:function(e,t){return this.bookmarkManager.getBookmark(e,t)},moveToBookmark:function(e){return this.bookmarkManager.moveToBookmark(e)},select:function(e,t){var n=this,r=n.dom,i=r.createRng(),o;if(n.lastFocusBookmark=null,e){if(!t&&n.controlSelection.controlSelect(e))return;o=r.nodeIndex(e),i.setStart(e.parentNode,o),i.setEnd(e.parentNode,o+1),t&&(n._moveEndPoint(i,e,!0),n._moveEndPoint(i,e)),n.setRng(i)}return e},isCollapsed:function(){var e=this,t=e.getRng(),n=e.getSel();return!(!t||t.item)&&(t.compareEndPoints?0===t.compareEndPoints("StartToEnd",t):!n||t.collapsed)},collapse:function(e){var t=this,n=t.getRng(),r;n.item&&(r=n.item(0),n=t.win.document.body.createTextRange(),n.moveToElementText(r)),n.collapse(!!e),t.setRng(n)},getSel:function(){var e=this.win;return e.getSelection?e.getSelection():e.document.selection},getRng:function(e){function t(e,t,n){try{return t.compareBoundaryPoints(e,n)}catch(r){return-1}}var n=this,r,i,o,a,s,l;if(!n.win)return null;if(a=n.win.document,"undefined"==typeof a||null===a)return null;if(!e&&n.lastFocusBookmark){var u=n.lastFocusBookmark;return u.startContainer?(i=a.createRange(),i.setStart(u.startContainer,u.startOffset),i.setEnd(u.endContainer,u.endOffset)):i=u,i}if(e&&n.tridentSel)return n.tridentSel.getRangeAt(0);try{(r=n.getSel())&&(i=r.rangeCount>0?r.getRangeAt(0):r.createRange?r.createRange():a.createRange())}catch(c){}if(l=n.editor.fire("GetSelectionRange",{range:i}),l.range!==i)return l.range;if(p&&i&&i.setStart&&a.selection){try{s=a.selection.createRange()}catch(c){}s&&s.item&&(o=s.item(0),i=a.createRange(),i.setStartBefore(o),i.setEndAfter(o))}return i||(i=a.createRange?a.createRange():a.body.createTextRange()),i.setStart&&9===i.startContainer.nodeType&&i.collapsed&&(o=n.dom.getRoot(),i.setStart(o,0),i.setEnd(o,0)),n.selectedRange&&n.explicitRange&&(0===t(i.START_TO_START,i,n.selectedRange)&&0===t(i.END_TO_END,i,n.selectedRange)?i=n.explicitRange:(n.selectedRange=null,n.explicitRange=null)),i},setRng:function(e,t){var n=this,r,i,o;if(e)if(e.select){n.explicitRange=null;try{e.select()}catch(a){}}else if(n.tridentSel){if(e.cloneRange)try{n.tridentSel.addRange(e)}catch(a){}}else{if(r=n.getSel(),o=n.editor.fire("SetSelectionRange",{range:e}),e=o.range,r){n.explicitRange=e;try{r.removeAllRanges(),r.addRange(e)}catch(a){}t===!1&&r.extend&&(r.collapse(e.endContainer,e.endOffset),r.extend(e.startContainer,e.startOffset)),n.selectedRange=r.rangeCount>0?r.getRangeAt(0):null}e.collapsed||e.startContainer!=e.endContainer||!r.setBaseAndExtent||s.ie||e.endOffset-e.startOffset<2&&e.startContainer.hasChildNodes()&&(i=e.startContainer.childNodes[e.startOffset],i&&"IMG"==i.tagName&&(r.setBaseAndExtent(e.startContainer,e.startOffset,e.endContainer,e.endOffset),r.anchorNode!==e.startContainer&&r.setBaseAndExtent(i,0,i,1))),n.editor.fire("AfterSetSelectionRange",{range:e})}},setNode:function(e){var t=this;return t.setContent(t.dom.getOuterHTML(e)),e},getNode:function(){function e(e,t){for(var n=e;e&&3===e.nodeType&&0===e.length;)e=t?e.nextSibling:e.previousSibling;return e||n}var t=this,n=t.getRng(),r,i,o,a,s,l=t.dom.getRoot();return n?(i=n.startContainer,o=n.endContainer,a=n.startOffset,s=n.endOffset,n.setStart?(r=n.commonAncestorContainer,!n.collapsed&&(i==o&&s-a<2&&i.hasChildNodes()&&(r=i.childNodes[a]),3===i.nodeType&&3===o.nodeType&&(i=i.length===a?e(i.nextSibling,!0):i.parentNode,o=0===s?e(o.previousSibling,!1):o.parentNode,i&&i===o))?i:r&&3==r.nodeType?r.parentNode:r):(r=n.item?n.item(0):n.parentElement(),r.ownerDocument!==t.win.document&&(r=l),r)):l},getSelectedBlocks:function(t,n){var r=this,i=r.dom,o,a,s=[];if(a=i.getRoot(),t=i.getParent(t||r.getStart(),i.isBlock),n=i.getParent(n||r.getEnd(),i.isBlock),t&&t!=a&&s.push(t),t&&n&&t!=n){o=t;for(var l=new e(t,a);(o=l.next())&&o!=n;)i.isBlock(o)&&s.push(o)}return n&&t!=n&&n!=a&&s.push(n),s},isForward:function(){var e=this.dom,t=this.getSel(),n,r;return!(t&&t.anchorNode&&t.focusNode)||(n=e.createRng(),n.setStart(t.anchorNode,t.anchorOffset),n.collapse(!0),r=e.createRng(),r.setStart(t.focusNode,t.focusOffset),r.collapse(!0),n.compareBoundaryPoints(n.START_TO_START,r)<=0)},normalize:function(){var e=this,t=e.getRng();return s.range&&new i(e.dom).normalize(t)&&e.setRng(t,e.isForward()),t},selectorChanged:function(e,t){var n=this,r;return n.selectorChangedData||(n.selectorChangedData={},r={},n.editor.on("NodeChange",function(e){var t=e.element,i=n.dom,o=i.getParents(t,null,i.getRoot()),a={};d(n.selectorChangedData,function(e,t){d(o,function(n){if(i.is(n,t))return r[t]||(d(e,function(e){e(!0,{node:n,selector:t,parents:o})}),r[t]=e),a[t]=e,!1})}),d(r,function(e,n){a[n]||(delete r[n],d(e,function(e){e(!1,{node:t,selector:n,parents:o})}))})})),n.selectorChangedData[e]||(n.selectorChangedData[e]=[]),n.selectorChangedData[e].push(t),n},getScrollContainer:function(){for(var e,t=this.dom.getRoot();t&&"BODY"!=t.nodeName;){if(t.scrollHeight>t.clientHeight){e=t;break}t=t.parentNode}return e},scrollIntoView:function(e,t){function n(e){for(var t=0,n=0,r=e;r&&r.nodeType;)t+=r.offsetLeft||0,n+=r.offsetTop||0,r=r.offsetParent;return{x:t,y:n}}var r,i,o=this,s=o.dom,l=s.getRoot(),u,c,d=0;if(a.isElement(e)){if(t===!1&&(d=e.offsetHeight),"BODY"!=l.nodeName){var f=o.getScrollContainer();if(f)return r=n(e).y-n(f).y+d,c=f.clientHeight,u=f.scrollTop,void((r<u||r+25>u+c)&&(f.scrollTop=r<u?r:r-c+25))}i=s.getViewPort(o.editor.getWin()),r=s.getPos(e).y+d,u=i.y,c=i.h,(r<i.y||r+25>u+c)&&o.editor.getWin().scrollTo(0,r<u?r:r-c+25)}},placeCaretAt:function(e,t){this.setRng(i.getCaretRangeFromPoint(e,t,this.editor.getDoc()))},_moveEndPoint:function(t,n,r){var i=n,o=new e(n,i),a=this.dom.schema.getNonEmptyElements();do{if(3==n.nodeType&&0!==f(n.nodeValue).length)return void(r?t.setStart(n,0):t.setEnd(n,n.nodeValue.length));if(a[n.nodeName]&&!/^(TD|TH)$/.test(n.nodeName))return void(r?t.setStartBefore(n):"BR"==n.nodeName?t.setEndBefore(n):t.setEndAfter(n));if(s.ie&&s.ie<11&&this.dom.isBlock(n)&&this.dom.isEmpty(n))return void(r?t.setStart(n,0):t.setEnd(n,0))}while(n=r?o.next():o.prev());"BODY"==i.nodeName&&(r?t.setStart(i,0):t.setEnd(i,i.childNodes.length))},getBoundingClientRect:function(){var e=this.getRng();return e.collapsed?u.fromRangeStart(e).getClientRects()[0]:e.getBoundingClientRect()},destroy:function(){this.win=null,this.controlSelection.destroy()}},c}),r(X,[j,m],function(e,t){function n(t){this.compare=function(n,i){function o(e){var n={};return r(t.getAttribs(e),function(r){var i=r.nodeName.toLowerCase();0!==i.indexOf("_")&&"style"!==i&&0!==i.indexOf("data-")&&(n[i]=t.getAttrib(e,i))}),n}function a(e,t){var n,r;for(r in e)if(e.hasOwnProperty(r)){if(n=t[r],"undefined"==typeof n)return!1;if(e[r]!=n)return!1;delete t[r]}for(r in t)if(t.hasOwnProperty(r))return!1;return!0}return n.nodeName==i.nodeName&&(!!a(o(n),o(i))&&(!!a(t.parseStyle(t.getAttrib(n,"style")),t.parseStyle(t.getAttrib(i,"style")))&&(!e.isBookmarkNode(n)&&!e.isBookmarkNode(i))))}}var r=t.each;return n}),r(K,[w,m,B],function(e,t,n){function r(e,r){function i(e,t){t.classes.length&&u.addClass(e,t.classes.join(" ")),u.setAttribs(e,t.attrs)}function o(e){var t;return c="string"==typeof e?{name:e,classes:[],attrs:{}}:e,t=u.create(c.name),i(t,c),t}function a(e,n){var r="string"!=typeof e?e.nodeName.toLowerCase():e,i=f.getElementRule(r),o=i.parentsRequired;return!(!o||!o.length)&&(n&&t.inArray(o,n)!==-1?n:o[0])}function s(e,n,r){var i,l,c,d=n.length&&n[0],f=d&&d.name;if(c=a(e,f))f==c?(l=n[0],n=n.slice(1)):l=c;else if(d)l=n[0],n=n.slice(1);else if(!r)return e;return l&&(i=o(l),i.appendChild(e)),r&&(i||(i=u.create("div"),i.appendChild(e)),t.each(r,function(t){var n=o(t);i.insertBefore(n,e)})),s(i,n,l&&l.siblings)}var l,c,d,f=r&&r.schema||new n({});return e&&e.length?(c=e[0],l=o(c),d=u.create("div"),d.appendChild(s(l,e.slice(1),c.siblings)),d):""}function i(e,t){return r(a(e),t)}function o(e){var n,r={classes:[],attrs:{}};return e=r.selector=t.trim(e),"*"!==e&&(n=e.replace(/(?:([#\.]|::?)([\w\-]+)|(\[)([^\]]+)\]?)/g,function(e,n,i,o,a){switch(n){case"#":r.attrs.id=i;break;case".":r.classes.push(i);break;case":":t.inArray("checked disabled enabled read-only required".split(" "),i)!==-1&&(r.attrs[i]=i)}if("["==o){var s=a.match(/([\w\-]+)(?:\=\"([^\"]+))?/);s&&(r.attrs[s[1]]=s[2])}return""})),r.name=n||"div",r}function a(e){return e&&"string"==typeof e?(e=e.split(/\s*,\s*/)[0],e=e.replace(/\s*(~\+|~|\+|>)\s*/g,"$1"),t.map(e.split(/(?:>|\s+(?![^\[\]]+\]))/),function(e){var n=t.map(e.split(/(?:~\+|~|\+)/),o),r=n.pop();return n.length&&(r.siblings=n),r}).reverse()):[]}function s(e,t){function n(e){return e.replace(/%(\w+)/g,"")}var i,o,s,c,d="",f,p;if(p=e.settings.preview_styles,p===!1)return"";if("string"!=typeof p&&(p="font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow"),"string"==typeof t){if(t=e.formatter.get(t),!t)return;t=t[0]}return"preview"in t&&(p=t.preview,p===!1)?"":(i=t.block||t.inline||"span",c=a(t.selector),c.length?(c[0].name||(c[0].name=i),i=t.selector,o=r(c,e)):o=r([i],e),s=u.select(i,o)[0]||o.firstChild,l(t.styles,function(e,t){e=n(e),e&&u.setStyle(s,t,e)}),l(t.attributes,function(e,t){e=n(e),e&&u.setAttrib(s,t,e)}),l(t.classes,function(e){e=n(e),u.hasClass(s,e)||u.addClass(s,e)}),e.fire("PreviewFormats"),u.setStyles(o,{position:"absolute",left:-65535}),e.getBody().appendChild(o),f=u.getStyle(e.getBody(),"fontSize",!0),f=/px$/.test(f)?parseInt(f,10):0,l(p.split(" "),function(t){var n=u.getStyle(s,t,!0);if(!("background-color"==t&&/transparent|rgba\s*\([^)]+,\s*0\)/.test(n)&&(n=u.getStyle(e.getBody(),t,!0),"#ffffff"==u.toHex(n).toLowerCase())||"color"==t&&"#000000"==u.toHex(n).toLowerCase())){if("font-size"==t&&/em|%$/.test(n)){if(0===f)return;n=parseFloat(n,10)/(/%$/.test(n)?100:1),n=n*f+"px"}"border"==t&&n&&(d+="padding:0 2px;"),d+=t+":"+n+";"}}),e.fire("AfterPreviewFormats"),u.remove(o),d)}var l=t.each,u=e.DOM;return{getCssText:s,parseSelector:a,selectorToHtml:i}}),r(G,[h,_,g],function(e,t,n){function r(e,t){var n=o[e];n||(o[e]=n=[]),o[e].push(t)}function i(e,t){s(o[e],function(e){e(t)})}var o={},a=e.filter,s=e.each;return r("pre",function(r){function i(t){return u(t.previousSibling)&&e.indexOf(c,t.previousSibling)!=-1}function o(e,t){n(t).remove(),n(e).append("<br><br>").append(t.childNodes)}var l=r.selection.getRng(),u,c;u=t.matchNodeNames("pre"),l.collapsed||(c=r.selection.getSelectedBlocks(),s(a(a(c,u),i),function(e){o(e.previousSibling,e)}))}),{postProcess:i}}),r(J,[y,T,j,X,z,m,K,G],function(e,t,n,r,i,o,a,s){return function(l){function u(e){return e.nodeType&&(e=e.nodeName),!!l.schema.getTextBlockElements()[e.toLowerCase()]}function c(e){return/^(TH|TD)$/.test(e.nodeName)}function d(e){return e&&/^(IMG)$/.test(e.nodeName)}function f(e,t){return Q.getParents(e,t,Q.getRoot())}function p(e){return 1===e.nodeType&&"_mce_caret"===e.id}function h(){v({valigntop:[{selector:"td,th",styles:{verticalAlign:"top"}}],valignmiddle:[{selector:"td,th",styles:{verticalAlign:"middle"}}],valignbottom:[{selector:"td,th",styles:{verticalAlign:"bottom"}}],alignleft:[{selector:"figure.image",collapsed:!1,classes:"align-left",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"left"},inherit:!1,preview:!1,defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"left"},preview:"font-family font-size"}],aligncenter:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"center"},inherit:!1,preview:!1,defaultBlock:"div"},{selector:"figure.image",collapsed:!1,classes:"align-center",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"img",collapsed:!1,styles:{display:"block",marginLeft:"auto",marginRight:"auto"},preview:!1},{selector:"table",collapsed:!1,styles:{marginLeft:"auto",marginRight:"auto"},preview:"font-family font-size"}],alignright:[{selector:"figure.image",collapsed:!1,classes:"align-right",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"right"},inherit:!1,preview:"font-family font-size",defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"right"},preview:"font-family font-size"}],alignjustify:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"justify"},inherit:!1,defaultBlock:"div",preview:"font-family font-size"}],bold:[{inline:"strong",remove:"all"},{inline:"span",styles:{fontWeight:"bold"}},{inline:"b",remove:"all"}],italic:[{inline:"em",remove:"all"},{inline:"span",styles:{fontStyle:"italic"}},{inline:"i",remove:"all"}],underline:[{inline:"span",styles:{textDecoration:"underline"},exact:!0},{inline:"u",remove:"all"}],strikethrough:[{inline:"span",styles:{textDecoration:"line-through"},exact:!0},{inline:"strike",remove:"all"}],forecolor:{inline:"span",styles:{color:"%value"},links:!0,remove_similar:!0},hilitecolor:{inline:"span",styles:{backgroundColor:"%value"},links:!0,remove_similar:!0},fontname:{inline:"span",styles:{fontFamily:"%value"}},fontsize:{inline:"span",styles:{fontSize:"%value"}},fontsize_class:{inline:"span",attributes:{"class":"%value"}},blockquote:{block:"blockquote",wrapper:1,remove:"all"},subscript:{inline:"sub"},superscript:{inline:"sup"},code:{inline:"code"},link:{inline:"a",selector:"a",remove:"all",split:!0,deep:!0,onmatch:function(){return!0},onformat:function(e,t,n){me(n,function(t,n){Q.setAttrib(e,n,t)})}},removeformat:[{selector:"b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins",remove:"all",split:!0,expand:!1,block_expand:!0,deep:!0},{selector:"span",attributes:["style","class"],remove:"empty",split:!0,expand:!1,deep:!0},{selector:"*",attributes:["style","class"],
split:!1,expand:!1,deep:!0}]}),me("p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp".split(/\s/),function(e){v(e,{block:e,remove:"all"})}),v(l.settings.formats)}function m(){l.addShortcut("meta+b","bold_desc","Bold"),l.addShortcut("meta+i","italic_desc","Italic"),l.addShortcut("meta+u","underline_desc","Underline");for(var e=1;e<=6;e++)l.addShortcut("access+"+e,"",["FormatBlock",!1,"h"+e]);l.addShortcut("access+7","",["FormatBlock",!1,"p"]),l.addShortcut("access+8","",["FormatBlock",!1,"div"]),l.addShortcut("access+9","",["FormatBlock",!1,"address"])}function g(e){return e?J[e]:J}function v(e,t){e&&("string"!=typeof e?me(e,function(e,t){v(t,e)}):(t=t.length?t:[t],me(t,function(e){e.deep===ce&&(e.deep=!e.selector),e.split===ce&&(e.split=!e.selector||e.inline),e.remove===ce&&e.selector&&!e.inline&&(e.remove="none"),e.selector&&e.inline&&(e.mixed=!0,e.block_expand=!0),"string"==typeof e.classes&&(e.classes=e.classes.split(/\s+/))}),J[e]=t))}function y(e){return e&&J[e]&&delete J[e],J}function b(e,t){var n=g(t);if(n)for(var r=0;r<n.length;r++)if(n[r].inherit===!1&&Q.is(e,n[r].selector))return!0;return!1}function C(e){var t;return l.dom.getParent(e,function(e){return t=l.dom.getStyle(e,"text-decoration"),t&&"none"!==t}),t}function x(e){var t;1===e.nodeType&&e.parentNode&&1===e.parentNode.nodeType&&(t=C(e.parentNode),l.dom.getStyle(e,"color")&&t?l.dom.setStyle(e,"text-decoration",t):l.dom.getStyle(e,"text-decoration")===t&&l.dom.setStyle(e,"text-decoration",null))}function w(t,n,r){function i(e,t){if(t=t||f,e){if(t.onformat&&t.onformat(e,t,n,r),me(t.styles,function(t,r){Q.setStyle(e,r,F(t,n))}),t.styles){var i=Q.getAttrib(e,"style");i&&e.setAttribute("data-mce-style",i)}me(t.attributes,function(t,r){Q.setAttrib(e,r,F(t,n))}),me(t.classes,function(t){t=F(t,n),Q.hasClass(e,t)||Q.addClass(e,t)})}}function o(e,t){var n=!1;return!!f.selector&&(me(e,function(e){if(!("collapsed"in e&&e.collapsed!==v))return Q.is(t,e.selector)&&!p(t)?(i(t,e),n=!0,!1):void 0}),n)}function a(){function t(t,n){var i=new e(n);for(r=i.prev2();r;r=i.prev2()){if(3==r.nodeType&&r.data.length>0)return r;if(r.childNodes.length>1||r==t||"BR"==r.tagName)return r}}var n=l.selection.getRng(),i=n.startContainer,o=n.endContainer;if(i!=o&&0===n.endOffset){var a=t(i,o),s=3==a.nodeType?a.data.length:a.childNodes.length;n.setEnd(a,s)}return n}function c(e,r,a){var s=[],l,c,h=!0;l=f.inline||f.block,c=Q.create(l),i(c),ee.walk(e,function(e){function r(e){var g,v,y,b;if(b=h,g=e.nodeName.toLowerCase(),v=e.parentNode.nodeName.toLowerCase(),1===e.nodeType&&de(e)&&(b=h,h="true"===de(e),y=!0),D(g,"br"))return m=0,void(f.block&&Q.remove(e));if(f.wrapper&&_(e,t,n))return void(m=0);if(h&&!y&&f.block&&!f.wrapper&&u(g)&&te(v,l))return e=Q.rename(e,l),i(e),s.push(e),void(m=0);if(f.selector){var C=o(d,e);if(!f.inline||C)return void(m=0)}!h||y||!te(l,g)||!te(v,l)||!a&&3===e.nodeType&&1===e.nodeValue.length&&65279===e.nodeValue.charCodeAt(0)||p(e)||f.inline&&ne(e)?(m=0,me(ge(e.childNodes),r),y&&(h=b),m=0):(m||(m=Q.clone(c,se),e.parentNode.insertBefore(m,e),s.push(m)),m.appendChild(e))}var m;me(e,r)}),f.links===!0&&me(s,function(e){function t(e){"A"===e.nodeName&&i(e,f),me(ge(e.childNodes),t)}t(e)}),me(s,function(e){function r(e){var t=0;return me(e.childNodes,function(e){z(e)||he(e)||t++}),t}function o(e){var t=!1;return me(e.childNodes,function(e){if(M(e))return t=e,!1}),t}function a(e,t){do{if(1!==r(e))break;if(e=o(e),!e)break;if(t(e))return e}while(e);return null}function l(e){var t,n;return t=o(e),t&&!he(t)&&B(t,f)&&(n=Q.clone(t,se),i(n),Q.replace(n,e,le),Q.remove(t,1)),n||e}var u;if(u=r(e),(s.length>1||!ne(e))&&0===u)return void Q.remove(e,1);if(!ne(e)&&!H(e,"fontSize")){var c=a(e,P("fontSize"));c&&w("fontsize",{value:H(c,"fontSize")},e)}(f.inline||f.wrapper)&&(f.exact||1!==u||(e=l(e)),me(d,function(t){me(Q.select(t.inline,e),function(e){he(e)||$(t,n,e,t.exact?e:null)})}),_(e.parentNode,t,n)&&$(f,n,e)&&(e=0),f.merge_with_parents&&Q.getParent(e.parentNode,function(r){if(_(r,t,n))return $(f,n,e)&&(e=0),le}),e&&f.merge_siblings!==!1&&(e=Y(j(e),e),e=Y(e,j(e,le))))})}var d=g(t),f=d[0],h,m,v=!r&&Z.isCollapsed();if("false"!==de(Z.getNode())){if(f){if(r)r.nodeType?o(d,r)||(m=Q.createRng(),m.setStartBefore(r),m.setEndAfter(r),c(W(m,d),null,!0)):c(r,null,!0);else if(v&&f.inline&&!Q.select("td[data-mce-selected],th[data-mce-selected]").length)K("apply",t,n);else{var y=l.selection.getNode();re||!d[0].defaultBlock||Q.getParent(y,Q.isBlock)||w(d[0].defaultBlock),l.selection.setRng(a()),h=Z.getBookmark(),c(W(Z.getRng(le),d),h),f.styles&&((f.styles.color||f.styles.textDecoration)&&(ve(y,x,"childNodes"),x(y)),f.styles.backgroundColor&&L(y,P("fontSize"),O("backgroundColor",F(f.styles.backgroundColor,n)))),Z.moveToBookmark(h),G(Z.getRng(le)),l.nodeChanged()}s.postProcess(t,l)}}else{r=Z.getNode();for(var b=0,C=d.length;b<C;b++)if(d[b].ceFalseOverride&&Q.is(r,d[b].selector))return void i(r,d[b])}}function E(e,t,n,r){function i(e){var n,r,o,a,s;if(1===e.nodeType&&de(e)&&(a=y,y="true"===de(e),s=!0),n=ge(e.childNodes),y&&!s)for(r=0,o=p.length;r<o&&!$(p[r],t,e,e);r++);if(h.deep&&n.length){for(r=0,o=n.length;r<o;r++)i(n[r]);s&&(y=a)}}function o(n){var i;return me(f(n.parentNode).reverse(),function(n){var o;i||"_start"==n.id||"_end"==n.id||(o=_(n,e,t,r),o&&o.split!==!1&&(i=n))}),i}function a(e,n,r,i){var o,a,s,l,u,c;if(e){for(c=e.parentNode,o=n.parentNode;o&&o!=c;o=o.parentNode){for(a=Q.clone(o,se),u=0;u<p.length;u++)if($(p[u],t,a,a)){a=0;break}a&&(s&&a.appendChild(s),l||(l=a),s=a)}!i||h.mixed&&ne(e)||(n=Q.split(e,n)),s&&(r.parentNode.insertBefore(s,r),l.appendChild(r))}return n}function s(e){return a(o(e),e,e,!0)}function u(e){var t=Q.get(e?"_start":"_end"),n=t[e?"firstChild":"lastChild"];return he(n)&&(n=n[e?"firstChild":"lastChild"]),3==n.nodeType&&0===n.data.length&&(n=e?t.previousSibling||t.nextSibling:t.nextSibling||t.previousSibling),Q.remove(t,!0),n}function d(e){var t,n,r=e.commonAncestorContainer;if(e=W(e,p,le),h.split){if(t=X(e,le),n=X(e),t!=n){if(/^(TR|TH|TD)$/.test(t.nodeName)&&t.firstChild&&(t="TR"==t.nodeName?t.firstChild.firstChild||t:t.firstChild||t),r&&/^T(HEAD|BODY|FOOT|R)$/.test(r.nodeName)&&c(n)&&n.firstChild&&(n=n.firstChild||n),Q.isChildOf(t,n)&&!ne(n)&&!c(t)&&!c(n))return t=U(t,"span",{id:"_start","data-mce-type":"bookmark"}),s(t),void(t=u(le));t=U(t,"span",{id:"_start","data-mce-type":"bookmark"}),n=U(n,"span",{id:"_end","data-mce-type":"bookmark"}),s(t),s(n),t=u(le),n=u()}else t=n=s(t);e.startContainer=t.parentNode?t.parentNode:t,e.startOffset=ie(t),e.endContainer=n.parentNode?n.parentNode:n,e.endOffset=ie(n)+1}ee.walk(e,function(e){me(e,function(e){i(e),1===e.nodeType&&"underline"===l.dom.getStyle(e,"text-decoration")&&e.parentNode&&"underline"===C(e.parentNode)&&$({deep:!1,exact:!0,inline:"span",styles:{textDecoration:"underline"}},null,e)})})}var p=g(e),h=p[0],m,v,y=!0;if(n)return void(n.nodeType?(v=Q.createRng(),v.setStartBefore(n),v.setEndAfter(n),d(v)):d(n));if("false"!==de(Z.getNode()))Z.isCollapsed()&&h.inline&&!Q.select("td[data-mce-selected],th[data-mce-selected]").length?K("remove",e,t,r):(m=Z.getBookmark(),d(Z.getRng(le)),Z.moveToBookmark(m),h.inline&&S(e,t,Z.getStart())&&G(Z.getRng(!0)),l.nodeChanged());else{n=Z.getNode();for(var b=0,x=p.length;b<x&&(!p[b].ceFalseOverride||!$(p[b],t,n,n));b++);}}function N(e,t,n){var r=g(e);!S(e,t,n)||"toggle"in r[0]&&!r[0].toggle?w(e,t,n):E(e,t,n)}function _(e,t,n,r){function i(e,t,i){var o,a,s=t[i],l;if(t.onmatch)return t.onmatch(e,t,i);if(s)if(s.length===ce){for(o in s)if(s.hasOwnProperty(o)){if(a="attributes"===i?Q.getAttrib(e,o):H(e,o),r&&!a&&!t.exact)return;if((!r||t.exact)&&!D(a,I(F(s[o],n),o)))return}}else for(l=0;l<s.length;l++)if("attributes"===i?Q.getAttrib(e,s[l]):H(e,s[l]))return t;return t}var o=g(t),a,s,l;if(o&&e)for(s=0;s<o.length;s++)if(a=o[s],B(e,a)&&i(e,a,"attributes")&&i(e,a,"styles")){if(l=a.classes)for(s=0;s<l.length;s++)if(!Q.hasClass(e,l[s]))return;return a}}function S(e,t,n){function r(n){var r=Q.getRoot();return n!==r&&(n=Q.getParent(n,function(n){return!!b(n,e)||(n.parentNode===r||!!_(n,e,t,!0))}),_(n,e,t))}var i;return n?r(n):(n=Z.getNode(),r(n)?le:(i=Z.getStart(),i!=n&&r(i)?le:se))}function k(e,t){var n,r=[],i={};return n=Z.getStart(),Q.getParent(n,function(n){var o,a;for(o=0;o<e.length;o++)a=e[o],!i[a]&&_(n,a,t)&&(i[a]=!0,r.push(a))},Q.getRoot()),r}function T(e){var t=g(e),n,r,i,o,a;if(t)for(n=Z.getStart(),r=f(n),o=t.length-1;o>=0;o--){if(a=t[o].selector,!a||t[o].defaultBlock)return le;for(i=r.length-1;i>=0;i--)if(Q.is(r[i],a))return le}return se}function R(e,t,n){var r;return ue||(ue={},r={},l.on("NodeChange",function(e){var t=f(e.element),n={};t=o.grep(t,function(e){return 1==e.nodeType&&!e.getAttribute("data-mce-bogus")}),me(ue,function(e,i){me(t,function(o){return _(o,i,{},e.similar)?(r[i]||(me(e,function(e){e(!0,{node:o,format:i,parents:t})}),r[i]=e),n[i]=e,!1):!b(o,i)&&void 0})}),me(r,function(i,o){n[o]||(delete r[o],me(i,function(n){n(!1,{node:e.element,format:o,parents:t})}))})})),me(e.split(","),function(e){ue[e]||(ue[e]=[],ue[e].similar=n),ue[e].push(t)}),this}function A(e){return a.getCssText(l,e)}function B(e,t){return D(e,t.inline)?le:D(e,t.block)?le:t.selector?1==e.nodeType&&Q.is(e,t.selector):void 0}function D(e,t){return e=e||"",t=t||"",e=""+(e.nodeName||e),t=""+(t.nodeName||t),e.toLowerCase()==t.toLowerCase()}function L(e,t,n){me(e.childNodes,function(e){M(e)&&(t(e)&&n(e),e.hasChildNodes()&&L(e,t,n))})}function M(e){return 1==e.nodeType&&!he(e)&&!z(e)&&!p(e)}function P(e){return i.curry(function(e,t){return!(!t||!H(t,e))},e)}function O(e,t){return i.curry(function(e,t,n){Q.setStyle(n,e,t)},e,t)}function H(e,t){return I(Q.getStyle(e,t),t)}function I(e,t){return"color"!=t&&"backgroundColor"!=t||(e=Q.toHex(e)),"fontWeight"==t&&700==e&&(e="bold"),"fontFamily"==t&&(e=e.replace(/[\'\"]/g,"").replace(/,\s+/g,",")),""+e}function F(e,t){return"string"!=typeof e?e=e(t):t&&(e=e.replace(/%(\w+)/g,function(e,n){return t[n]||e})),e}function z(e){return e&&3===e.nodeType&&/^([\t \r\n]+|)$/.test(e.nodeValue)}function U(e,t,n){var r=Q.create(t,n);return e.parentNode.insertBefore(r,e),r.appendChild(e),r}function W(t,n,r){function i(e){function t(e){return"BR"==e.nodeName&&e.getAttribute("data-mce-bogus")&&!e.nextSibling}var r,i,o,a,s;if(r=i=e?g:y,a=e?"previousSibling":"nextSibling",s=Q.getRoot(),3==r.nodeType&&!z(r)&&(e?v>0:b<r.nodeValue.length))return r;for(;;){if(!n[0].block_expand&&ne(i))return i;for(o=i[a];o;o=o[a])if(!he(o)&&!z(o)&&!t(o))return i;if(i==s||i.parentNode==s){r=i;break}i=i.parentNode}return r}function o(e,t){for(t===ce&&(t=3===e.nodeType?e.length:e.childNodes.length);e&&e.hasChildNodes();)e=e.childNodes[t],e&&(t=3===e.nodeType?e.length:e.childNodes.length);return{node:e,offset:t}}function a(e){for(var t=e;t;){if(1===t.nodeType&&de(t))return"false"===de(t)?t:e;t=t.parentNode}return e}function s(t,n,i){function o(e,t){var n,o,a=e.nodeValue;return"undefined"==typeof t&&(t=i?a.length:0),i?(n=a.lastIndexOf(" ",t),o=a.lastIndexOf("\xa0",t),n=n>o?n:o,n===-1||r||n++):(n=a.indexOf(" ",t),o=a.indexOf("\xa0",t),n=n!==-1&&(o===-1||n<o)?n:o),n}var a,s,u,c;if(3===t.nodeType){if(u=o(t,n),u!==-1)return{container:t,offset:u};c=t}for(a=new e(t,Q.getParent(t,ne)||l.getBody());s=a[i?"prev":"next"]();)if(3===s.nodeType){if(c=s,u=o(s),u!==-1)return{container:s,offset:u}}else if(ne(s))break;if(c)return n=i?0:c.length,{container:c,offset:n}}function c(e,r){var i,o,a,s;for(3==e.nodeType&&0===e.nodeValue.length&&e[r]&&(e=e[r]),i=f(e),o=0;o<i.length;o++)for(a=0;a<n.length;a++)if(s=n[a],!("collapsed"in s&&s.collapsed!==t.collapsed)&&Q.is(i[o],s.selector))return i[o];return e}function d(e,t){var r,i=Q.getRoot();if(n[0].wrapper||(r=Q.getParent(e,n[0].block,i)),r||(r=Q.getParent(3==e.nodeType?e.parentNode:e,function(e){return e!=i&&u(e)})),r&&n[0].wrapper&&(r=f(r,"ul,ol").reverse()[0]||r),!r)for(r=e;r[t]&&!ne(r[t])&&(r=r[t],!D(r,"br")););return r||e}var p,h,m,g=t.startContainer,v=t.startOffset,y=t.endContainer,b=t.endOffset;if(1==g.nodeType&&g.hasChildNodes()&&(p=g.childNodes.length-1,g=g.childNodes[v>p?p:v],3==g.nodeType&&(v=0)),1==y.nodeType&&y.hasChildNodes()&&(p=y.childNodes.length-1,y=y.childNodes[b>p?p:b-1],3==y.nodeType&&(b=y.nodeValue.length)),g=a(g),y=a(y),(he(g.parentNode)||he(g))&&(g=he(g)?g:g.parentNode,g=g.nextSibling||g,3==g.nodeType&&(v=0)),(he(y.parentNode)||he(y))&&(y=he(y)?y:y.parentNode,y=y.previousSibling||y,3==y.nodeType&&(b=y.length)),n[0].inline&&(t.collapsed&&(m=s(g,v,!0),m&&(g=m.container,v=m.offset),m=s(y,b),m&&(y=m.container,b=m.offset)),h=o(y,b),h.node)){for(;h.node&&0===h.offset&&h.node.previousSibling;)h=o(h.node.previousSibling);h.node&&h.offset>0&&3===h.node.nodeType&&" "===h.node.nodeValue.charAt(h.offset-1)&&h.offset>1&&(y=h.node,y.splitText(h.offset-1))}return(n[0].inline||n[0].block_expand)&&(n[0].inline&&3==g.nodeType&&0!==v||(g=i(!0)),n[0].inline&&3==y.nodeType&&b!==y.nodeValue.length||(y=i())),n[0].selector&&n[0].expand!==se&&!n[0].inline&&(g=c(g,"previousSibling"),y=c(y,"nextSibling")),(n[0].block||n[0].selector)&&(g=d(g,"previousSibling"),y=d(y,"nextSibling"),n[0].block&&(ne(g)||(g=i(!0)),ne(y)||(y=i()))),1==g.nodeType&&(v=ie(g),g=g.parentNode),1==y.nodeType&&(b=ie(y)+1,y=y.parentNode),{startContainer:g,startOffset:v,endContainer:y,endOffset:b}}function V(e,t){return t.links&&"A"==e.tagName}function $(e,t,n,r){var i,o,a;if(!B(n,e)&&!V(n,e))return se;if("all"!=e.remove)for(me(e.styles,function(i,o){i=I(F(i,t),o),"number"==typeof o&&(o=i,r=0),(e.remove_similar||!r||D(H(r,o),i))&&Q.setStyle(n,o,""),a=1}),a&&""===Q.getAttrib(n,"style")&&(n.removeAttribute("style"),n.removeAttribute("data-mce-style")),me(e.attributes,function(e,i){var o;if(e=F(e,t),"number"==typeof i&&(i=e,r=0),!r||D(Q.getAttrib(r,i),e)){if("class"==i&&(e=Q.getAttrib(n,i),e&&(o="",me(e.split(/\s+/),function(e){/mce\-\w+/.test(e)&&(o+=(o?" ":"")+e)}),o)))return void Q.setAttrib(n,i,o);"class"==i&&n.removeAttribute("className"),ae.test(i)&&n.removeAttribute("data-mce-"+i),n.removeAttribute(i)}}),me(e.classes,function(e){e=F(e,t),r&&!Q.hasClass(r,e)||Q.removeClass(n,e)}),o=Q.getAttribs(n),i=0;i<o.length;i++){var s=o[i].nodeName;if(0!==s.indexOf("_")&&0!==s.indexOf("data-"))return se}return"none"!=e.remove?(q(n,e),le):void 0}function q(e,t){function n(e,t,n){return e=j(e,t,n),!e||"BR"==e.nodeName||ne(e)}var r=e.parentNode,i;t.block&&(re?r==Q.getRoot()&&(t.list_block&&D(e,t.list_block)||me(ge(e.childNodes),function(e){te(re,e.nodeName.toLowerCase())?i?i.appendChild(e):(i=U(e,re),Q.setAttribs(i,l.settings.forced_root_block_attrs)):i=0})):ne(e)&&!ne(r)&&(n(e,se)||n(e.firstChild,le,1)||e.insertBefore(Q.create("br"),e.firstChild),n(e,le)||n(e.lastChild,se,1)||e.appendChild(Q.create("br")))),t.selector&&t.inline&&!D(t.inline,e)||Q.remove(e,1)}function j(e,t,n){if(e)for(t=t?"nextSibling":"previousSibling",e=n?e:e[t];e;e=e[t])if(1==e.nodeType||!z(e))return e}function Y(e,t){function n(e,t){for(i=e;i;i=i[t]){if(3==i.nodeType&&0!==i.nodeValue.length)return e;if(1==i.nodeType&&!he(i))return i}return e}var i,o,a=new r(Q);if(e&&t&&(e=n(e,"previousSibling"),t=n(t,"nextSibling"),a.compare(e,t))){for(i=e.nextSibling;i&&i!=t;)o=i,i=i.nextSibling,e.appendChild(o);return Q.remove(t),me(ge(t.childNodes),function(t){e.appendChild(t)}),e}return t}function X(t,n){var r,i,o;return r=t[n?"startContainer":"endContainer"],i=t[n?"startOffset":"endOffset"],1==r.nodeType&&(o=r.childNodes.length-1,!n&&i&&i--,r=r.childNodes[i>o?o:i]),3===r.nodeType&&n&&i>=r.nodeValue.length&&(r=new e(r,l.getBody()).next()||r),3!==r.nodeType||n||0!==i||(r=new e(r,l.getBody()).prev()||r),r}function K(t,n,r,i){function o(e){var t=Q.create("span",{id:m,"data-mce-bogus":!0,style:v?"color:red":""});return e&&t.appendChild(l.getDoc().createTextNode(oe)),t}function a(e,t){for(;e;){if(3===e.nodeType&&e.nodeValue!==oe||e.childNodes.length>1)return!1;t&&1===e.nodeType&&t.push(e),e=e.firstChild}return!0}function s(e){for(;e;){if(e.id===m)return e;e=e.parentNode}}function c(t){var n;if(t)for(n=new e(t,t),t=n.current();t;t=n.next())if(3===t.nodeType)return t}function d(e,t){var n,r;if(e)r=Z.getRng(!0),a(e)?(t!==!1&&(r.setStartBefore(e),r.setEndBefore(e)),Q.remove(e)):(n=c(e),n.nodeValue.charAt(0)===oe&&(n.deleteData(0,1),r.startContainer==n&&r.startOffset>0&&r.setStart(n,r.startOffset-1),r.endContainer==n&&r.endOffset>0&&r.setEnd(n,r.endOffset-1)),Q.remove(e,1)),Z.setRng(r);else if(e=s(Z.getStart()),!e)for(;e=Q.get(m);)d(e,!1)}function f(){var e,t,i,a,l,u,d;e=Z.getRng(!0),a=e.startOffset,u=e.startContainer,d=u.nodeValue,t=s(Z.getStart()),t&&(i=c(t));var f=/[^\s\u00a0\u00ad\u200b\ufeff]/;d&&a>0&&a<d.length&&f.test(d.charAt(a))&&f.test(d.charAt(a-1))?(l=Z.getBookmark(),e.collapse(!0),e=W(e,g(n)),e=ee.split(e),w(n,r,e),Z.moveToBookmark(l)):(t&&i.nodeValue===oe?w(n,r,t):(t=o(!0),i=t.firstChild,e.insertNode(t),a=1,w(n,r,t)),Z.setCursorLocation(i,a))}function p(){var e=Z.getRng(!0),t,a,s,l,c,d,f=[],p,h;for(t=e.startContainer,a=e.startOffset,c=t,3==t.nodeType&&(a!=t.nodeValue.length&&(l=!0),c=c.parentNode);c;){if(_(c,n,r,i)){d=c;break}c.nextSibling&&(l=!0),f.push(c),c=c.parentNode}if(d)if(l)s=Z.getBookmark(),e.collapse(!0),e=W(e,g(n),!0),e=ee.split(e),E(n,r,e),Z.moveToBookmark(s);else{for(h=o(),c=h,p=f.length-1;p>=0;p--)c.appendChild(Q.clone(f[p],!1)),c=c.firstChild;c.appendChild(Q.doc.createTextNode(oe)),c=c.firstChild;var m=Q.getParent(d,u);m&&Q.isEmpty(m)?d.parentNode.replaceChild(h,d):Q.insertAfter(h,d),Z.setCursorLocation(c,1),Q.isEmpty(d)&&Q.remove(d)}}function h(){var e;e=s(Z.getStart()),e&&!Q.isEmpty(e)&&ve(e,function(e){1!=e.nodeType||e.id===m||Q.isEmpty(e)||Q.setAttrib(e,"data-mce-bogus",null)},"childNodes")}var m="_mce_caret",v=l.settings.caret_debug;l._hasCaretEvents||(pe=function(){var e=[],t;if(a(s(Z.getStart()),e))for(t=e.length;t--;)Q.setAttrib(e[t],"data-mce-bogus","1")},fe=function(e){var t=e.keyCode;d(),8==t&&Z.isCollapsed()&&Z.getStart().innerHTML==oe&&d(s(Z.getStart())),37!=t&&39!=t||d(s(Z.getStart())),h()},l.on("SetContent",function(e){e.selection&&h()}),l._hasCaretEvents=!0),"apply"==t?f():p()}function G(t){var n=t.startContainer,r=t.startOffset,i,o,a,s,l;if((t.startContainer!=t.endContainer||!d(t.startContainer.childNodes[t.startOffset]))&&(3==n.nodeType&&r>=n.nodeValue.length&&(r=ie(n),n=n.parentNode,i=!0),1==n.nodeType))for(s=n.childNodes,n=s[Math.min(r,s.length-1)],o=new e(n,Q.getParent(n,Q.isBlock)),(r>s.length-1||i)&&o.next(),a=o.current();a;a=o.next())if(3==a.nodeType&&!z(a))return l=Q.create("a",{"data-mce-bogus":"all"},oe),a.parentNode.insertBefore(l,a),t.setStart(a,0),Z.setRng(t),void Q.remove(l)}var J={},Q=l.dom,Z=l.selection,ee=new t(Q),te=l.schema.isValidChild,ne=Q.isBlock,re=l.settings.forced_root_block,ie=Q.nodeIndex,oe="\ufeff",ae=/^(src|href|style)$/,se=!1,le=!0,ue,ce,de=Q.getContentEditable,fe,pe,he=n.isBookmarkNode,me=o.each,ge=o.grep,ve=o.walk,ye=o.extend;ye(this,{get:g,register:v,unregister:y,apply:w,remove:E,toggle:N,match:S,matchAll:k,matchNode:_,canApply:T,formatChanged:R,getCssText:A}),h(),m(),l.on("BeforeGetContent",function(e){pe&&"raw"!=e.format&&pe()}),l.on("mouseup keydown",function(e){fe&&fe(e)})}}),r(Q,[],function(){var e=0,t=1,n=2,r=function(r,i){var o=r.length+i.length+2,a=new Array(o),s=new Array(o),l=function(e,t,n){return{start:e,end:t,diag:n}},u=function(o,a,s,l,c){var f=d(o,a,s,l);if(null===f||f.start===a&&f.diag===a-l||f.end===o&&f.diag===o-s)for(var p=o,h=s;p<a||h<l;)p<a&&h<l&&r[p]===i[h]?(c.push([e,r[p]]),++p,++h):a-o>l-s?(c.push([n,r[p]]),++p):(c.push([t,i[h]]),++h);else{u(o,f.start,s,f.start-f.diag,c);for(var m=f.start;m<f.end;++m)c.push([e,r[m]]);u(f.end,a,f.end-f.diag,l,c)}},c=function(e,t,n,o){for(var a=e;a-t<o&&a<n&&r[a]===i[a-t];)++a;return l(e,a,t)},d=function(e,t,n,o){var l=t-e,u=o-n;if(0===l||0===u)return null;var d=l-u,f=u+l,p=(f%2===0?f:f+1)/2;a[1+p]=e,s[1+p]=t+1;for(var h=0;h<=p;++h){for(var m=-h;m<=h;m+=2){var g=m+p;m===-h||m!=h&&a[g-1]<a[g+1]?a[g]=a[g+1]:a[g]=a[g-1]+1;for(var v=a[g],y=v-e+n-m;v<t&&y<o&&r[v]===i[y];)a[g]=++v,++y;if(d%2!=0&&d-h<=m&&m<=d+h&&s[g-d]<=a[g])return c(s[g-d],m+e-n,t,o)}for(m=d-h;m<=d+h;m+=2){for(g=m+p-d,m===d-h||m!=d+h&&s[g+1]<=s[g-1]?s[g]=s[g+1]-1:s[g]=s[g-1],v=s[g]-1,y=v-e+n-m;v>=e&&y>=n&&r[v]===i[y];)s[g]=v--,y--;if(d%2===0&&-h<=m&&m<=h&&s[g]<=a[g+d])return c(s[g],m+e-n,t,o)}}},f=[];return u(0,r.length,0,i.length,f),f};return{KEEP:e,DELETE:n,INSERT:t,diff:r}}),r(Z,[h,C,Q],function(e,t,n){var r=function(e){return 1===e.nodeType?e.outerHTML:3===e.nodeType?t.encodeRaw(e.data,!1):8===e.nodeType?"<!--"+e.data+"-->":""},i=function(e){var t,n,r;for(r=document.createElement("div"),t=document.createDocumentFragment(),e&&(r.innerHTML=e);n=r.firstChild;)t.appendChild(n);return t},o=function(e,t,n){var r=i(t);if(e.hasChildNodes()&&n<e.childNodes.length){var o=e.childNodes[n];o.parentNode.insertBefore(r,o)}else e.appendChild(r)},a=function(e,t){if(e.hasChildNodes()&&t<e.childNodes.length){var n=e.childNodes[t];n.parentNode.removeChild(n)}},s=function(t,r){var i=0;e.each(t,function(e){e[0]===n.KEEP?i++:e[0]===n.INSERT?(o(r,e[1],i),i++):e[0]===n.DELETE&&a(r,i)})},l=function(t){return e.map(t.childNodes,r)},u=function(t,i){var o=e.map(i.childNodes,r);return s(n.diff(o,t),i),i};return{read:l,write:u}}),r(ee,[h,Z],function(e,t){var n=function(e){return e.indexOf("</iframe>")!==-1},r=function(e){return{type:"fragmented",fragments:e,content:"",bookmark:null,beforeBookmark:null}},i=function(e){return{type:"complete",fragments:null,content:e,bookmark:null,beforeBookmark:null}},o=function(o){var a,s,l;return a=t.read(o.getBody()),l=e.map(a,function(e){return o.serializer.trimContent(e)}),s=l.join(""),n(s)?r(l):i(s)},a=function(e,n,r){"fragmented"===n.type?t.write(n.fragments,e.getBody()):e.setContent(n.content,{format:"raw"}),e.selection.moveToBookmark(r?n.beforeBookmark:n.bookmark)},s=function(e){return"fragmented"===e.type?e.fragments.join(""):e.content},l=function(e,t){return s(e)===s(t)};return{createFragmentedLevel:r,createCompleteLevel:i,createFromEditor:o,applyToEditor:a,isEq:l}}),r(te,[I,m,ee],function(e,t,n){return function(e){function r(t){e.setDirty(t)}function i(e){a.typing=!1,a.add({},e)}function o(){a.typing&&(a.typing=!1,a.add())}var a=this,s=0,l=[],u,c,d=0;return e.on("init",function(){a.add()}),e.on("BeforeExecCommand",function(e){var t=e.command;"Undo"!==t&&"Redo"!==t&&"mceRepaint"!==t&&(o(),a.beforeChange())}),e.on("ExecCommand",function(e){var t=e.command;"Undo"!==t&&"Redo"!==t&&"mceRepaint"!==t&&i(e)}),e.on("ObjectResizeStart Cut",function(){a.beforeChange()}),e.on("SaveContent ObjectResized blur",i),e.on("DragEnd",i),e.on("KeyUp",function(t){var o=t.keyCode;t.isDefaultPrevented()||((o>=33&&o<=36||o>=37&&o<=40||45===o||t.ctrlKey)&&(i(),e.nodeChanged()),46!==o&&8!==o||e.nodeChanged(),c&&a.typing&&(e.isDirty()||(r(l[0]&&!n.isEq(n.createFromEditor(e),l[0])),e.isDirty()&&e.fire("change",{level:l[0],lastLevel:null})),e.fire("TypingUndo"),c=!1,e.nodeChanged()))}),e.on("KeyDown",function(e){var t=e.keyCode;if(!e.isDefaultPrevented()){if(t>=33&&t<=36||t>=37&&t<=40||45===t)return void(a.typing&&i(e));var n=e.ctrlKey&&!e.altKey||e.metaKey;!(t<16||t>20)||224===t||91===t||a.typing||n||(a.beforeChange(),a.typing=!0,a.add({},e),c=!0)}}),e.on("MouseDown",function(e){a.typing&&i(e)}),e.addShortcut("meta+z","","Undo"),e.addShortcut("meta+y,meta+shift+z","","Redo"),e.on("AddUndo Undo Redo ClearUndos",function(t){t.isDefaultPrevented()||e.nodeChanged()}),a={data:l,typing:!1,beforeChange:function(){d||(u=e.selection.getBookmark(2,!0))},add:function(i,o){var a,c=e.settings,f,p;if(p=n.createFromEditor(e),i=i||{},i=t.extend(i,p),d||e.removed)return null;if(f=l[s],e.fire("BeforeAddUndo",{level:i,lastLevel:f,originalEvent:o}).isDefaultPrevented())return null;if(f&&n.isEq(f,i))return null;if(l[s]&&(l[s].beforeBookmark=u),c.custom_undo_redo_levels&&l.length>c.custom_undo_redo_levels){for(a=0;a<l.length-1;a++)l[a]=l[a+1];l.length--,s=l.length}i.bookmark=e.selection.getBookmark(2,!0),s<l.length-1&&(l.length=s+1),l.push(i),s=l.length-1;var h={level:i,lastLevel:f,originalEvent:o};return e.fire("AddUndo",h),s>0&&(r(!0),e.fire("change",h)),i},undo:function(){var t;return a.typing&&(a.add(),a.typing=!1),s>0&&(t=l[--s],n.applyToEditor(e,t,!0),r(!0),e.fire("undo",{level:t})),t},redo:function(){var t;return s<l.length-1&&(t=l[++s],n.applyToEditor(e,t,!1),r(!0),e.fire("redo",{level:t})),t},clear:function(){l=[],s=0,a.typing=!1,a.data=l,e.fire("ClearUndos")},hasUndo:function(){return s>0||a.typing&&l[0]&&!n.isEq(n.createFromEditor(e),l[0])},hasRedo:function(){return s<l.length-1&&!a.typing},transact:function(e){o(),a.beforeChange();try{d++,e()}finally{d--}return a.add()},extra:function(t,r){var i,o;a.transact(t)&&(o=l[s].bookmark,i=l[s-1],n.applyToEditor(e,i,!0),a.transact(r)&&(l[s-1].beforeBookmark=o))}}}}),r(ne,[y,T,k,d],function(e,t,n,r){var i=r.ie&&r.ie<11;return function(o){function a(a){function h(e){return e&&s.isBlock(e)&&!/^(TD|TH|CAPTION|FORM)$/.test(e.nodeName)&&!/^(fixed|absolute)/i.test(e.style.position)&&"true"!==s.getContentEditable(e)}function m(e){return e&&/^(TD|TH|CAPTION)$/.test(e.nodeName)}function g(e){var t;s.isBlock(e)&&(t=l.getRng(),e.appendChild(s.create("span",null,"\xa0")),l.select(e),e.lastChild.outerHTML="",l.setRng(t))}function v(e){var t=e,n=[],r;if(t){for(;t=t.firstChild;){if(s.isBlock(t))return;1!=t.nodeType||f[t.nodeName.toLowerCase()]||n.push(t)}for(r=n.length;r--;)t=n[r],!t.hasChildNodes()||t.firstChild==t.lastChild&&""===t.firstChild.nodeValue?s.remove(t):"A"==t.nodeName&&" "===(t.innerText||t.textContent)&&s.remove(t)}}function y(t){function n(e){for(;e;){if(1==e.nodeType||3==e.nodeType&&e.data&&/[\r\n\s]/.test(e.data))return e;e=e.nextSibling}}var i,o,a,u=t,c;if(t){if(r.ie&&r.ie<9&&P&&P.firstChild&&P.firstChild==P.lastChild&&"BR"==P.firstChild.tagName&&s.remove(P.firstChild),/^(LI|DT|DD)$/.test(t.nodeName)){var d=n(t.firstChild);d&&/^(UL|OL|DL)$/.test(d.nodeName)&&t.insertBefore(s.doc.createTextNode("\xa0"),t.firstChild)}if(a=s.createRng(),r.ie||t.normalize(),t.hasChildNodes()){for(i=new e(t,t);o=i.current();){if(3==o.nodeType){a.setStart(o,0),a.setEnd(o,0);break}if(p[o.nodeName.toLowerCase()]){a.setStartBefore(o),a.setEndBefore(o);break}u=o,o=i.next()}o||(a.setStart(u,0),a.setEnd(u,0))}else"BR"==t.nodeName?t.nextSibling&&s.isBlock(t.nextSibling)?((!O||O<9)&&(c=s.create("br"),t.parentNode.insertBefore(c,t)),a.setStartBefore(t),a.setEndBefore(t)):(a.setStartAfter(t),a.setEndAfter(t)):(a.setStart(t,0),a.setEnd(t,0));l.setRng(a),s.remove(c),l.scrollIntoView(t)}}function b(e){var t=u.forced_root_block;t&&t.toLowerCase()===e.tagName.toLowerCase()&&s.setAttribs(e,u.forced_root_block_attrs)}function C(e){e.innerHTML=i?"":'<br data-mce-bogus="1">'}function x(e){var t=L,n,r,o,a=d.getTextInlineElements();if(e||"TABLE"==U?(n=s.create(e||V),b(n)):n=P.cloneNode(!1),o=n,u.keep_styles!==!1)do if(a[t.nodeName]){if("_mce_caret"==t.id)continue;r=t.cloneNode(!1),s.setAttrib(r,"id",""),n.hasChildNodes()?(r.appendChild(n.firstChild),n.appendChild(r)):(o=r,n.appendChild(r))}while((t=t.parentNode)&&t!=D);return i||(o.innerHTML='<br data-mce-bogus="1">'),n}function w(t){var n,r,i;if(3==L.nodeType&&(t?M>0:M<L.nodeValue.length))return!1;if(L.parentNode==P&&$&&!t)return!0;if(t&&1==L.nodeType&&L==P.firstChild)return!0;if("TABLE"===L.nodeName||L.previousSibling&&"TABLE"==L.previousSibling.nodeName)return $&&!t||!$&&t;for(n=new e(L,P),3==L.nodeType&&(t&&0===M?n.prev():t||M!=L.nodeValue.length||n.next());r=n.current();){if(1===r.nodeType){if(!r.getAttribute("data-mce-bogus")&&(i=r.nodeName.toLowerCase(),f[i]&&"br"!==i))return!1}else if(3===r.nodeType&&!/^[ \t\r\n]*$/.test(r.nodeValue))return!1;t?n.prev():n.next()}return!0}function E(e,t){var n,r,i,a,l,u,c=V||"P";if(r=s.getParent(e,s.isBlock),!r||!h(r)){if(r=r||D,u=r==o.getBody()||m(r)?r.nodeName.toLowerCase():r.parentNode.nodeName.toLowerCase(),!r.hasChildNodes())return n=s.create(c),b(n),r.appendChild(n),A.setStart(n,0),A.setEnd(n,0),n;for(a=e;a.parentNode!=r;)a=a.parentNode;for(;a&&!s.isBlock(a);)i=a,a=a.previousSibling;if(i&&d.isValidChild(u,c.toLowerCase())){for(n=s.create(c),b(n),i.parentNode.insertBefore(n,i),a=i;a&&!s.isBlock(a);)l=a.nextSibling,n.appendChild(a),a=l;A.setStart(e,t),A.setEnd(e,t)}}return e}function N(){function e(e){for(var t=z[e?"firstChild":"lastChild"];t&&1!=t.nodeType;)t=t[e?"nextSibling":"previousSibling"];return t===P}function t(){var e=z.parentNode;return/^(LI|DT|DD)$/.test(e.nodeName)?e:z}if(z!=o.getBody()){var n=z.parentNode.nodeName;/^(OL|UL|LI)$/.test(n)&&(V="LI"),I=V?x(V):s.create("BR"),e(!0)&&e()?"LI"==n?s.insertAfter(I,t()):s.replace(I,z):e(!0)?"LI"==n?(s.insertAfter(I,t()),I.appendChild(s.doc.createTextNode(" ")),I.appendChild(z)):z.parentNode.insertBefore(I,z):e()?(s.insertAfter(I,t()),g(I)):(z=t(),B=A.cloneRange(),B.setStartAfter(P),B.setEndAfter(z),F=B.extractContents(),"LI"==V&&"LI"==F.firstChild.nodeName?(I=F.firstChild,s.insertAfter(F,z)):(s.insertAfter(F,z),s.insertAfter(I,z))),s.remove(P),y(I),c.add()}}function _(){o.execCommand("InsertLineBreak",!1,a)}function S(e){do 3===e.nodeType&&(e.nodeValue=e.nodeValue.replace(/^[\r\n]+/,"")),e=e.firstChild;while(e)}function k(e){var t=s.getRoot(),n,r;for(n=e;n!==t&&"false"!==s.getContentEditable(n);)"true"===s.getContentEditable(n)&&(r=n),n=n.parentNode;return n!==t?r:t}function T(e){var t;i||(e.normalize(),t=e.lastChild,t&&!/^(left|right)$/gi.test(s.getStyle(t,"float",!0))||s.add(e,"br"))}function R(){I=/^(H[1-6]|PRE|FIGURE)$/.test(U)&&"HGROUP"!=W?x(V):x(),u.end_container_on_empty_block&&h(z)&&s.isEmpty(P)?I=s.split(z,P):s.insertAfter(I,P),y(I)}var A,B,D,L,M,P,O,H,I,F,z,U,W,V,$;if(A=l.getRng(!0),!a.isDefaultPrevented()){if(!A.collapsed)return void o.execCommand("Delete");if(new t(s).normalize(A),L=A.startContainer,M=A.startOffset,V=(u.force_p_newlines?"p":"")||u.forced_root_block,V=V?V.toUpperCase():"",O=s.doc.documentMode,H=a.shiftKey,1==L.nodeType&&L.hasChildNodes()&&($=M>L.childNodes.length-1,L=L.childNodes[Math.min(M,L.childNodes.length-1)]||L,M=$&&3==L.nodeType?L.nodeValue.length:0),D=k(L)){if(c.beforeChange(),!s.isBlock(D)&&D!=s.getRoot())return void(V&&!H||_());if((V&&!H||!V&&H)&&(L=E(L,M)),P=s.getParent(L,s.isBlock),z=P?s.getParent(P.parentNode,s.isBlock):null,U=P?P.nodeName.toUpperCase():"",W=z?z.nodeName.toUpperCase():"","LI"!=W||a.ctrlKey||(P=z,U=W),o.undoManager.typing&&(o.undoManager.typing=!1,o.undoManager.add()),/^(LI|DT|DD)$/.test(U)){if(!V&&H)return void _();if(s.isEmpty(P))return void N()}if("PRE"==U&&u.br_in_pre!==!1){if(!H)return void _()}else if(!V&&!H&&"LI"!=U||V&&H)return void _();V&&P===o.getBody()||(V=V||"P",n.isCaretContainerBlock(P)?(I=n.showCaretContainerBlock(P),s.isEmpty(P)&&C(P),y(I)):w()?R():w(!0)?(I=P.parentNode.insertBefore(x(),P),g(I),y(P)):(B=A.cloneRange(),B.setEndAfter(P),F=B.extractContents(),S(F),I=F.firstChild,s.insertAfter(F,P),v(I),T(P),s.isEmpty(P)&&C(P),I.normalize(),s.isEmpty(I)?(s.remove(I),R()):y(I)),s.setAttrib(I,"id",""),o.fire("NewBlock",{newBlock:I}),c.typing=!1,c.add())}}}var s=o.dom,l=o.selection,u=o.settings,c=o.undoManager,d=o.schema,f=d.getNonEmptyElements(),p=d.getMoveCaretBeforeOnEnterElements();o.on("keydown",function(e){13==e.keyCode&&a(e)!==!1&&e.preventDefault()})}}),r(re,[],function(){return function(e){function t(){var t=i.getStart(),s=e.getBody(),l,u,c,d,f,p,h,m=-16777215,g,v,y,b,C;if(C=n.forced_root_block,t&&1===t.nodeType&&C){for(;t&&t!=s;){if(a[t.nodeName])return;t=t.parentNode}if(l=i.getRng(),l.setStart){u=l.startContainer,c=l.startOffset,d=l.endContainer,f=l.endOffset;try{v=e.getDoc().activeElement===s}catch(x){}}else l.item&&(t=l.item(0),l=e.getDoc().body.createTextRange(),l.moveToElementText(t)),v=l.parentElement().ownerDocument===e.getDoc(),y=l.duplicate(),y.collapse(!0),c=y.move("character",m)*-1,y.collapsed||(y=l.duplicate(),y.collapse(!1),f=y.move("character",m)*-1-c);for(t=s.firstChild,b=s.nodeName.toLowerCase();t;)if((3===t.nodeType||1==t.nodeType&&!a[t.nodeName])&&o.isValidChild(b,C.toLowerCase())){if(3===t.nodeType&&0===t.nodeValue.length){h=t,t=t.nextSibling,r.remove(h);continue}p||(p=r.create(C,e.settings.forced_root_block_attrs),t.parentNode.insertBefore(p,t),
g=!0),h=t,t=t.nextSibling,p.appendChild(h)}else p=null,t=t.nextSibling;if(g&&v){if(l.setStart)l.setStart(u,c),l.setEnd(d,f),i.setRng(l);else try{l=e.getDoc().body.createTextRange(),l.moveToElementText(s),l.collapse(!0),l.moveStart("character",c),f>0&&l.moveEnd("character",f),l.select()}catch(x){}e.nodeChanged()}}}var n=e.settings,r=e.dom,i=e.selection,o=e.schema,a=o.getBlockElements();n.forced_root_block&&e.on("NodeChange",t)}}),r(ie,[z,y,_,$,k,U],function(e,t,n,r,i,o){function a(e){return e>0}function s(e){return e<0}function l(e,t){for(var n;n=e(t);)if(!N(n))return n;return null}function u(e,n,r,i,o){var u=new t(e,i);if(s(n)){if((x(e)||N(e))&&(e=l(u.prev,!0),r(e)))return e;for(;e=l(u.prev,o);)if(r(e))return e}if(a(n)){if((x(e)||N(e))&&(e=l(u.next,!0),r(e)))return e;for(;e=l(u.next,o);)if(r(e))return e}return null}function c(e,t){for(e=e.parentNode;e&&e!=t;e=e.parentNode)if(C(e))return e;return t}function d(e,t){for(;e&&e!=t;){if(w(e))return e;e=e.parentNode}return null}function f(e,t,n){return d(e.container(),n)==d(t.container(),n)}function p(e,t,n){return c(e.container(),n)==c(t.container(),n)}function h(e,t){var n,r;return t?(n=t.container(),r=t.offset(),S(n)?n.childNodes[r+e]:null):null}function m(e,t){var n=t.ownerDocument.createRange();return e?(n.setStartBefore(t),n.setEndBefore(t)):(n.setStartAfter(t),n.setEndAfter(t)),n}function g(e,t,n){return d(t,e)==d(n,e)}function v(e,t,n){var r,i;for(i=e?"previousSibling":"nextSibling";n&&n!=t;){if(r=n[i],E(r)&&(r=r[i]),x(r)){if(g(t,r,n))return r;break}if(k(r))break;n=n.parentNode}return null}function y(e,t,r){var o,a,s,l,u=_(v,!0,t),c=_(v,!1,t);if(a=r.startContainer,s=r.startOffset,i.isCaretContainerBlock(a)){if(S(a)||(a=a.parentNode),l=a.getAttribute("data-mce-caret"),"before"==l&&(o=a.nextSibling,x(o)))return T(o);if("after"==l&&(o=a.previousSibling,x(o)))return R(o)}if(!r.collapsed)return r;if(n.isText(a)){if(E(a)){if(1===e){if(o=c(a))return T(o);if(o=u(a))return R(o)}if(e===-1){if(o=u(a))return R(o);if(o=c(a))return T(o)}return r}if(i.endsWithCaretContainer(a)&&s>=a.data.length-1)return 1===e&&(o=c(a))?T(o):r;if(i.startsWithCaretContainer(a)&&s<=1)return e===-1&&(o=u(a))?R(o):r;if(s===a.data.length)return o=c(a),o?T(o):r;if(0===s)return o=u(a),o?R(o):r}return r}function b(e,t){return x(h(e,t))}var C=n.isContentEditableTrue,x=n.isContentEditableFalse,w=n.matchStyleValues("display","block table table-cell table-caption"),E=i.isCaretContainer,N=i.isCaretContainerBlock,_=e.curry,S=n.isElement,k=o.isCaretCandidate,T=_(m,!0),R=_(m,!1);return{isForwards:a,isBackwards:s,findNode:u,getEditingHost:c,getParentBlock:d,isInSameBlock:f,isInSameEditingHost:p,isBeforeContentEditableFalse:_(b,0),isAfterContentEditableFalse:_(b,-1),normalizeRange:y}}),r(oe,[_,U,$,ie,h,z],function(e,t,n,r,i,o){function a(e,t){for(var n=[];e&&e!=t;)n.push(e),e=e.parentNode;return n}function s(e,t){return e.hasChildNodes()&&t<e.childNodes.length?e.childNodes[t]:null}function l(e,t){if(m(e)){if(v(t.previousSibling)&&!f(t.previousSibling))return n.before(t);if(f(t))return n(t,0)}if(g(e)){if(v(t.nextSibling)&&!f(t.nextSibling))return n.after(t);if(f(t))return n(t,t.data.length)}return g(e)?h(t)?n.before(t):n.after(t):n.before(t)}function u(t,i){var o;return!!e.isBr(t)&&(o=c(1,n.after(t),i),!!o&&!r.isInSameBlock(n.before(t),n.before(o),i))}function c(e,t,h){var C,x,w,E,N,_,S;if(!p(h)||!t)return null;if(S=t,C=S.container(),x=S.offset(),f(C)){if(g(e)&&x>0)return n(C,--x);if(m(e)&&x<C.length)return n(C,++x);w=C}else{if(g(e)&&x>0&&(E=s(C,x-1),v(E)))return!y(E)&&(N=r.findNode(E,e,b,E))?f(N)?n(N,N.data.length):n.after(N):f(E)?n(E,E.data.length):n.before(E);if(m(e)&&x<C.childNodes.length&&(E=s(C,x),v(E)))return u(E,h)?c(e,n.after(E),h):!y(E)&&(N=r.findNode(E,e,b,E))?f(N)?n(N,0):n.before(N):f(E)?n(E,0):n.after(E);w=S.getNode()}return(m(e)&&S.isAtEnd()||g(e)&&S.isAtStart())&&(w=r.findNode(w,e,o.constant(!0),h,!0),b(w))?l(e,w):(E=r.findNode(w,e,b,h),_=i.last(i.filter(a(C,h),d)),!_||E&&_.contains(E)?E?l(e,E):null:S=m(e)?n.after(_):n.before(_))}var d=e.isContentEditableFalse,f=e.isText,p=e.isElement,h=e.isBr,m=r.isForwards,g=r.isBackwards,v=t.isCaretCandidate,y=t.isAtomic,b=t.isEditableCaretCandidate;return function(e){return{next:function(t){return c(1,t,e)},prev:function(t){return c(-1,t,e)}}}}),r(ae,[m,oe,$],function(e,t,n){var r=function(e){var t=e.firstChild,n=e.lastChild;return t&&"meta"===t.name&&(t=t.next),n&&"mce_marker"===n.attr("id")&&(n=n.prev),!(!t||t!==n)&&("ul"===t.name||"ol"===t.name)},i=function(e){var t=e.firstChild,n=e.lastChild;return t&&"META"===t.nodeName&&t.parentNode.removeChild(t),n&&"mce_marker"===n.id&&n.parentNode.removeChild(n),e},o=function(e,t,n){var r=t.serialize(n),o=e.createFragment(r);return i(o)},a=function(t){return e.grep(t.childNodes,function(e){return"LI"===e.nodeName})},s=function(e){return!e.firstChild},l=function(e){return e.length>0&&s(e[e.length-1])?e.slice(0,-1):e},u=function(e,t){var n=e.getParent(t,e.isBlock);return n&&"LI"===n.nodeName?n:null},c=function(e,t){return!!u(e,t)},d=function(e,t){var n=t.cloneRange(),r=t.cloneRange();return n.setStartBefore(e),r.setEndAfter(e),[n.cloneContents(),r.cloneContents()]},f=function(e,r){var i=n.before(e),o=new t(r),a=o.next(i);return a?a.toRange():null},p=function(e,r){var i=n.after(e),o=new t(r),a=o.prev(i);return a?a.toRange():null},h=function(t,n,r,i){var o=d(t,i),a=t.parentNode;return a.insertBefore(o[0],t),e.each(n,function(e){a.insertBefore(e,t)}),a.insertBefore(o[1],t),a.removeChild(t),p(n[n.length-1],r)},m=function(t,n,r){var i=t.parentNode;return e.each(n,function(e){i.insertBefore(e,t)}),f(t,r)},g=function(e,t,n,r){return r.insertAfter(t.reverse(),e),p(t[0],n)},v=function(e,r,i,s){var c=o(r,e,s),d=u(r,i.startContainer),f=l(a(c.firstChild)),p=1,v=2,y=r.getRoot(),b=function(e){var o=n.fromRangeStart(i),a=new t(r.getRoot()),s=e===p?a.prev(o):a.next(o);return!s||u(r,s.getNode())!==d};return b(p)?m(d,f,y):b(v)?g(d,f,y,r):h(d,f,y,i)};return{isListFragment:r,insertAtCaret:v,isParentBlockLi:c,trimListItems:l,listItems:a}}),r(se,[d,m,P,oe,$,X,_,ae],function(e,t,n,r,i,o,a,s){var l=a.matchNodeNames("td th"),u=function(e,t,n){if("all"===n.getAttribute("data-mce-bogus"))n.parentNode.insertBefore(e.dom.createFragment(t),n);else{var r=n.firstChild,i=n.lastChild;!r||r===i&&"BR"===r.nodeName?e.dom.setHTML(n,t):e.selection.setContent(t)}},c=function(a,c,d){function f(e){function t(e){return r[e]&&3==r[e].nodeType}var n,r,i;return n=L.getRng(!0),r=n.startContainer,i=n.startOffset,3==r.nodeType&&(i>0?e=e.replace(/^&nbsp;/," "):t("previousSibling")||(e=e.replace(/^ /,"&nbsp;")),i<r.length?e=e.replace(/&nbsp;(<br>|)$/," "):t("nextSibling")||(e=e.replace(/(&nbsp;| )(<br>|)$/,"&nbsp;"))),e}function p(){var e,t,n;e=L.getRng(!0),t=e.startContainer,n=e.startOffset,3==t.nodeType&&e.collapsed&&("\xa0"===t.data[n]?(t.deleteData(n,1),/[\u00a0| ]$/.test(c)||(c+=" ")):"\xa0"===t.data[n-1]&&(t.deleteData(n-1,1),/[\u00a0| ]$/.test(c)||(c=" "+c)))}function h(){if(B){var e=a.getBody(),n=new o(M);t.each(M.select("*[data-mce-fragment]"),function(t){for(var r=t.parentNode;r&&r!=e;r=r.parentNode)D[t.nodeName.toLowerCase()]&&n.compare(r,t)&&M.remove(t,!0)})}}function m(e){for(var t=e;t=t.walk();)1===t.type&&t.attr("data-mce-fragment","1")}function g(e){t.each(e.getElementsByTagName("*"),function(e){e.removeAttribute("data-mce-fragment")})}function v(e){return!!e.getAttribute("data-mce-fragment")}function y(e){return e&&!a.schema.getShortEndedElements()[e.nodeName]}function b(t){function n(e){for(var t=a.getBody();e&&e!==t;e=e.parentNode)if("false"===a.dom.getContentEditable(e))return e;return null}function o(e){var t=i.fromRangeStart(e),n=new r(a.getBody());if(t=n.next(t))return t.toRange()}var s,u,c;if(t){if(L.scrollIntoView(t),s=n(t))return M.remove(t),void L.select(s);k=M.createRng(),T=t.previousSibling,T&&3==T.nodeType?(k.setStart(T,T.nodeValue.length),e.ie||(R=t.nextSibling,R&&3==R.nodeType&&(T.appendData(R.data),R.parentNode.removeChild(R)))):(k.setStartBefore(t),k.setEndBefore(t)),u=M.getParent(t,M.isBlock),M.remove(t),u&&M.isEmpty(u)&&(a.$(u).empty(),k.setStart(u,0),k.setEnd(u,0),l(u)||v(u)||!(c=o(k))?M.add(u,M.create("br",{"data-mce-bogus":"1"})):(k=c,M.remove(u))),L.setRng(k)}}var C,x,w,E,N,_,S,k,T,R,A,B,D=a.schema.getTextInlineElements(),L=a.selection,M=a.dom;/^ | $/.test(c)&&(c=f(c)),C=a.parser,B=d.merge,x=new n({validate:a.settings.validate},a.schema),A='<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;&#x200B;</span>',_={content:c,format:"html",selection:!0},a.fire("BeforeSetContent",_),c=_.content,c.indexOf("{$caret}")==-1&&(c+="{$caret}"),c=c.replace(/\{\$caret\}/,A),k=L.getRng();var P=k.startContainer||(k.parentElement?k.parentElement():null),O=a.getBody();P===O&&L.isCollapsed()&&M.isBlock(O.firstChild)&&y(O.firstChild)&&M.isEmpty(O.firstChild)&&(k=M.createRng(),k.setStart(O.firstChild,0),k.setEnd(O.firstChild,0),L.setRng(k)),L.isCollapsed()||(a.selection.setRng(a.selection.getRng()),a.getDoc().execCommand("Delete",!1,null),p()),w=L.getNode();var H={context:w.nodeName.toLowerCase(),data:d.data};if(N=C.parse(c,H),d.paste===!0&&s.isListFragment(N)&&s.isParentBlockLi(M,w))return k=s.insertAtCaret(x,M,a.selection.getRng(!0),N),a.selection.setRng(k),void a.fire("SetContent",_);if(m(N),T=N.lastChild,"mce_marker"==T.attr("id"))for(S=T,T=T.prev;T;T=T.walk(!0))if(3==T.type||!M.isBlock(T.name)){a.schema.isValidChild(T.parent.name,"span")&&T.parent.insert(S,T,"br"===T.name);break}if(a._selectionOverrides.showBlockCaretContainer(w),H.invalid){for(L.setContent(A),w=L.getNode(),E=a.getBody(),9==w.nodeType?w=T=E:T=w;T!==E;)w=T,T=T.parentNode;c=w==E?E.innerHTML:M.getOuterHTML(w),c=x.serialize(C.parse(c.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i,function(){return x.serialize(N)}))),w==E?M.setHTML(E,c):M.setOuterHTML(w,c)}else c=x.serialize(N),u(a,c,w);h(),b(M.get("mce_marker")),g(a.getBody()),a.fire("SetContent",_),a.addVisual()},d=function(e){var n;return"string"!=typeof e?(n=t.extend({paste:e.paste,data:{paste:e.paste}},e),{content:e.content,details:n}):{content:e,details:{}}},f=function(e,t){var n=d(t);c(e,n.content,n.details)};return{insertAtCaret:f}}),r(le,[d,m,T,y,se,_],function(e,n,r,i,o,a){var s=n.each,l=n.extend,u=n.map,c=n.inArray,d=n.explode,f=e.ie&&e.ie<11,p=!0,h=!1;return function(n){function m(e,t,r,i){var o,a,l=0;if(/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(e)||i&&i.skip_focus||n.focus(),i=n.fire("BeforeExecCommand",{command:e,ui:t,value:r}),i.isDefaultPrevented())return!1;if(a=e.toLowerCase(),o=D.exec[a])return o(a,t,r),n.fire("ExecCommand",{command:e,ui:t,value:r}),!0;if(s(n.plugins,function(i){if(i.execCommand&&i.execCommand(e,t,r))return n.fire("ExecCommand",{command:e,ui:t,value:r}),l=!0,!1}),l)return l;if(n.theme&&n.theme.execCommand&&n.theme.execCommand(e,t,r))return n.fire("ExecCommand",{command:e,ui:t,value:r}),!0;try{l=n.getDoc().execCommand(e,t,r)}catch(u){}return!!l&&(n.fire("ExecCommand",{command:e,ui:t,value:r}),!0)}function g(e){var t;if(!n.quirks.isHidden()){if(e=e.toLowerCase(),t=D.state[e])return t(e);try{return n.getDoc().queryCommandState(e)}catch(r){}return!1}}function v(e){var t;if(!n.quirks.isHidden()){if(e=e.toLowerCase(),t=D.value[e])return t(e);try{return n.getDoc().queryCommandValue(e)}catch(r){}}}function y(e,t){t=t||"exec",s(e,function(e,n){s(n.toLowerCase().split(","),function(n){D[t][n]=e})})}function b(e,t,r){e=e.toLowerCase(),D.exec[e]=function(e,i,o,a){return t.call(r||n,i,o,a)}}function C(e){if(e=e.toLowerCase(),D.exec[e])return!0;try{return n.getDoc().queryCommandSupported(e)}catch(t){}return!1}function x(e,t,r){e=e.toLowerCase(),D.state[e]=function(){return t.call(r||n)}}function w(e,t,r){e=e.toLowerCase(),D.value[e]=function(){return t.call(r||n)}}function E(e){return e=e.toLowerCase(),!!D.exec[e]}function N(e,r,i){return r===t&&(r=h),i===t&&(i=null),n.getDoc().execCommand(e,r,i)}function _(e){return B.match(e)}function S(e,r){B.toggle(e,r?{value:r}:t),n.nodeChanged()}function k(e){M=A.getBookmark(e)}function T(){A.moveToBookmark(M)}var R,A,B,D={state:{},exec:{},value:{}},L=n.settings,M;n.on("PreInit",function(){R=n.dom,A=n.selection,L=n.settings,B=n.formatter}),l(this,{execCommand:m,queryCommandState:g,queryCommandValue:v,queryCommandSupported:C,addCommands:y,addCommand:b,addQueryStateHandler:x,addQueryValueHandler:w,hasCustomCommand:E}),y({"mceResetDesignMode,mceBeginUndoLevel":function(){},"mceEndUndoLevel,mceAddUndoLevel":function(){n.undoManager.add()},"Cut,Copy,Paste":function(t){var r=n.getDoc(),i;try{N(t)}catch(o){i=p}if("paste"!==t||r.queryCommandEnabled(t)||(i=!0),i||!r.queryCommandSupported(t)){var a=n.translate("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.");e.mac&&(a=a.replace(/Ctrl\+/g,"\u2318+")),n.notificationManager.open({text:a,type:"error"})}},unlink:function(){if(A.isCollapsed()){var e=n.dom.getParent(n.selection.getStart(),"a");return void(e&&n.dom.remove(e,!0))}B.remove("link")},"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull,JustifyNone":function(e){var t=e.substring(7);"full"==t&&(t="justify"),s("left,center,right,justify".split(","),function(e){t!=e&&B.remove("align"+e)}),"none"!=t&&S("align"+t)},"InsertUnorderedList,InsertOrderedList":function(e){var t,n;N(e),t=R.getParent(A.getNode(),"ol,ul"),t&&(n=t.parentNode,/^(H[1-6]|P|ADDRESS|PRE)$/.test(n.nodeName)&&(k(),R.split(n,t),T()))},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){S(e)},"ForeColor,HiliteColor,FontName":function(e,t,n){S(e,n)},FontSize:function(e,t,n){var r,i;n>=1&&n<=7&&(i=d(L.font_size_style_values),r=d(L.font_size_classes),n=r?r[n-1]||n:i[n-1]||n),S(e,n)},RemoveFormat:function(e){B.remove(e)},mceBlockQuote:function(){S("blockquote")},FormatBlock:function(e,t,n){return S(n||"p")},mceCleanup:function(){var e=A.getBookmark();n.setContent(n.getContent({cleanup:p}),{cleanup:p}),A.moveToBookmark(e)},mceRemoveNode:function(e,t,r){var i=r||A.getNode();i!=n.getBody()&&(k(),n.dom.remove(i,p),T())},mceSelectNodeDepth:function(e,t,r){var i=0;R.getParent(A.getNode(),function(e){if(1==e.nodeType&&i++==r)return A.select(e),h},n.getBody())},mceSelectNode:function(e,t,n){A.select(n)},mceInsertContent:function(e,t,r){o.insertAtCaret(n,r)},mceInsertRawHTML:function(e,t,r){A.setContent("tiny_mce_marker"),n.setContent(n.getContent().replace(/tiny_mce_marker/g,function(){return r}))},mceToggleFormat:function(e,t,n){S(n)},mceSetContent:function(e,t,r){n.setContent(r)},"Indent,Outdent":function(e){var t,r,i;t=L.indentation,r=/[a-z%]+$/i.exec(t),t=parseInt(t,10),g("InsertUnorderedList")||g("InsertOrderedList")?N(e):(L.forced_root_block||R.getParent(A.getNode(),R.isBlock)||B.apply("div"),s(A.getSelectedBlocks(),function(o){if("false"!==R.getContentEditable(o)&&"LI"!==o.nodeName){var a=n.getParam("indent_use_margin",!1)?"margin":"padding";a="TABLE"===o.nodeName?"margin":a,a+="rtl"==R.getStyle(o,"direction",!0)?"Right":"Left","outdent"==e?(i=Math.max(0,parseInt(o.style[a]||0,10)-t),R.setStyle(o,a,i?i+r:"")):(i=parseInt(o.style[a]||0,10)+t+r,R.setStyle(o,a,i))}}))},mceRepaint:function(){},InsertHorizontalRule:function(){n.execCommand("mceInsertContent",!1,"<hr />")},mceToggleVisualAid:function(){n.hasVisual=!n.hasVisual,n.addVisual()},mceReplaceContent:function(e,t,r){n.execCommand("mceInsertContent",!1,r.replace(/\{\$selection\}/g,A.getContent({format:"text"})))},mceInsertLink:function(e,t,n){var r;"string"==typeof n&&(n={href:n}),r=R.getParent(A.getNode(),"a"),n.href=n.href.replace(" ","%20"),r&&n.href||B.remove("link"),n.href&&B.apply("link",n,r)},selectAll:function(){var e=R.getRoot(),t;if(A.getRng().setStart){var n=R.getParent(A.getStart(),a.isContentEditableTrue);n&&(t=R.createRng(),t.selectNodeContents(n),A.setRng(t))}else t=A.getRng(),t.item||(t.moveToElementText(e),t.select())},"delete":function(){N("Delete");var e=n.getBody();R.isEmpty(e)&&(n.setContent(""),e.firstChild&&R.isBlock(e.firstChild)?n.selection.setCursorLocation(e.firstChild,0):n.selection.setCursorLocation(e,0))},mceNewDocument:function(){n.setContent("")},InsertLineBreak:function(e,t,o){function a(){for(var e=new i(m,v),t,r=n.schema.getNonEmptyElements();t=e.next();)if(r[t.nodeName.toLowerCase()]||t.length>0)return!0}var s=o,l,u,c,d=A.getRng(!0);new r(R).normalize(d);var h=d.startOffset,m=d.startContainer;if(1==m.nodeType&&m.hasChildNodes()){var g=h>m.childNodes.length-1;m=m.childNodes[Math.min(h,m.childNodes.length-1)]||m,h=g&&3==m.nodeType?m.nodeValue.length:0}var v=R.getParent(m,R.isBlock),y=v?v.nodeName.toUpperCase():"",b=v?R.getParent(v.parentNode,R.isBlock):null,C=b?b.nodeName.toUpperCase():"",x=s&&s.ctrlKey;"LI"!=C||x||(v=b,y=C),m&&3==m.nodeType&&h>=m.nodeValue.length&&(f||a()||(l=R.create("br"),d.insertNode(l),d.setStartAfter(l),d.setEndAfter(l),u=!0)),l=R.create("br"),d.insertNode(l);var w=R.doc.documentMode;return f&&"PRE"==y&&(!w||w<8)&&l.parentNode.insertBefore(R.doc.createTextNode("\r"),l),c=R.create("span",{},"&nbsp;"),l.parentNode.insertBefore(c,l),A.scrollIntoView(c),R.remove(c),u?(d.setStartBefore(l),d.setEndBefore(l)):(d.setStartAfter(l),d.setEndAfter(l)),A.setRng(d),n.undoManager.add(),p}}),y({"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(e){var t="align"+e.substring(7),n=A.isCollapsed()?[R.getParent(A.getNode(),R.isBlock)]:A.getSelectedBlocks(),r=u(n,function(e){return!!B.matchNode(e,t)});return c(r,p)!==-1},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){return _(e)},mceBlockQuote:function(){return _("blockquote")},Outdent:function(){var e;if(L.inline_styles){if((e=R.getParent(A.getStart(),R.isBlock))&&parseInt(e.style.paddingLeft,10)>0)return p;if((e=R.getParent(A.getEnd(),R.isBlock))&&parseInt(e.style.paddingLeft,10)>0)return p}return g("InsertUnorderedList")||g("InsertOrderedList")||!L.inline_styles&&!!R.getParent(A.getNode(),"BLOCKQUOTE")},"InsertUnorderedList,InsertOrderedList":function(e){var t=R.getParent(A.getNode(),"ul,ol");return t&&("insertunorderedlist"===e&&"UL"===t.tagName||"insertorderedlist"===e&&"OL"===t.tagName)}},"state"),y({"FontSize,FontName":function(e){var t=0,n;return(n=R.getParent(A.getNode(),"span"))&&(t="fontsize"==e?n.style.fontSize:n.style.fontFamily.replace(/, /g,",").replace(/[\'\"]/g,"").toLowerCase()),t}},"value"),y({Undo:function(){n.undoManager.undo()},Redo:function(){n.undoManager.redo()}})}}),r(ue,[m],function(e){function t(e,o){var a=this,s,l;if(e=r(e),o=a.settings=o||{},s=o.base_uri,/^([\w\-]+):([^\/]{2})/i.test(e)||/^\s*#/.test(e))return void(a.source=e);var u=0===e.indexOf("//");0!==e.indexOf("/")||u||(e=(s?s.protocol||"http":"http")+"://mce_host"+e),/^[\w\-]*:?\/\//.test(e)||(l=o.base_uri?o.base_uri.path:new t(location.href).directory,""===o.base_uri.protocol?e="//mce_host"+a.toAbsPath(l,e):(e=/([^#?]*)([#?]?.*)/.exec(e),e=(s&&s.protocol||"http")+"://mce_host"+a.toAbsPath(l,e[1])+e[2])),e=e.replace(/@@/g,"(mce_at)"),e=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e),n(i,function(t,n){var r=e[n];r&&(r=r.replace(/\(mce_at\)/g,"@@")),a[t]=r}),s&&(a.protocol||(a.protocol=s.protocol),a.userInfo||(a.userInfo=s.userInfo),a.port||"mce_host"!==a.host||(a.port=s.port),a.host&&"mce_host"!==a.host||(a.host=s.host),a.source=""),u&&(a.protocol="")}var n=e.each,r=e.trim,i="source protocol authority userInfo user password host port relative path directory file query anchor".split(" "),o={ftp:21,http:80,https:443,mailto:25};return t.prototype={setPath:function(e){var t=this;e=/^(.*?)\/?(\w+)?$/.exec(e),t.path=e[0],t.directory=e[1],t.file=e[2],t.source="",t.getURI()},toRelative:function(e){var n=this,r;if("./"===e)return e;if(e=new t(e,{base_uri:n}),"mce_host"!=e.host&&n.host!=e.host&&e.host||n.port!=e.port||n.protocol!=e.protocol&&""!==e.protocol)return e.getURI();var i=n.getURI(),o=e.getURI();return i==o||"/"==i.charAt(i.length-1)&&i.substr(0,i.length-1)==o?i:(r=n.toRelPath(n.path,e.path),e.query&&(r+="?"+e.query),e.anchor&&(r+="#"+e.anchor),r)},toAbsolute:function(e,n){return e=new t(e,{base_uri:this}),e.getURI(n&&this.isSameOrigin(e))},isSameOrigin:function(e){if(this.host==e.host&&this.protocol==e.protocol){if(this.port==e.port)return!0;var t=o[this.protocol];if(t&&(this.port||t)==(e.port||t))return!0}return!1},toRelPath:function(e,t){var n,r=0,i="",o,a;if(e=e.substring(0,e.lastIndexOf("/")),e=e.split("/"),n=t.split("/"),e.length>=n.length)for(o=0,a=e.length;o<a;o++)if(o>=n.length||e[o]!=n[o]){r=o+1;break}if(e.length<n.length)for(o=0,a=n.length;o<a;o++)if(o>=e.length||e[o]!=n[o]){r=o+1;break}if(1===r)return t;for(o=0,a=e.length-(r-1);o<a;o++)i+="../";for(o=r-1,a=n.length;o<a;o++)i+=o!=r-1?"/"+n[o]:n[o];return i},toAbsPath:function(e,t){var r,i=0,o=[],a,s;for(a=/\/$/.test(t)?"/":"",e=e.split("/"),t=t.split("/"),n(e,function(e){e&&o.push(e)}),e=o,r=t.length-1,o=[];r>=0;r--)0!==t[r].length&&"."!==t[r]&&(".."!==t[r]?i>0?i--:o.push(t[r]):i++);return r=e.length-i,s=r<=0?o.reverse().join("/"):e.slice(0,r).join("/")+"/"+o.reverse().join("/"),0!==s.indexOf("/")&&(s="/"+s),a&&s.lastIndexOf("/")!==s.length-1&&(s+=a),s},getURI:function(e){var t,n=this;return n.source&&!e||(t="",e||(t+=n.protocol?n.protocol+"://":"//",n.userInfo&&(t+=n.userInfo+"@"),n.host&&(t+=n.host),n.port&&(t+=":"+n.port)),n.path&&(t+=n.path),n.query&&(t+="?"+n.query),n.anchor&&(t+="#"+n.anchor),n.source=t),n.source}},t.parseDataUri=function(e){var t,n;return e=decodeURIComponent(e).split(","),n=/data:([^;]+)/.exec(e[0]),n&&(t=n[1]),{type:t,data:e[1]}},t.getDocumentBaseUrl=function(e){var t;return t=0!==e.protocol.indexOf("http")&&"file:"!==e.protocol?e.href:e.protocol+"//"+e.host+e.pathname,/^[^:]+:\/\/\/?[^\/]+\//.test(t)&&(t=t.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(t)||(t+="/")),t},t}),r(ce,[m],function(e){function t(){}var n=e.each,r=e.extend,i,o;return t.extend=i=function(e){function t(){var e,t,n,r=this;if(!o&&(r.init&&r.init.apply(r,arguments),t=r.Mixins))for(e=t.length;e--;)n=t[e],n.init&&n.init.apply(r,arguments)}function a(){return this}function s(e,t){return function(){var n=this,r=n._super,i;return n._super=u[e],i=t.apply(n,arguments),n._super=r,i}}var l=this,u=l.prototype,c,d,f;o=!0,c=new l,o=!1,e.Mixins&&(n(e.Mixins,function(t){for(var n in t)"init"!==n&&(e[n]=t[n])}),u.Mixins&&(e.Mixins=u.Mixins.concat(e.Mixins))),e.Methods&&n(e.Methods.split(","),function(t){e[t]=a}),e.Properties&&n(e.Properties.split(","),function(t){var n="_"+t;e[t]=function(e){var t=this,r;return e!==r?(t[n]=e,t):t[n]}}),e.Statics&&n(e.Statics,function(e,n){t[n]=e}),e.Defaults&&u.Defaults&&(e.Defaults=r({},u.Defaults,e.Defaults));for(d in e)f=e[d],"function"==typeof f&&u[d]?c[d]=s(d,f):c[d]=f;return t.prototype=c,t.constructor=t,t.extend=i,t},t}),r(de,[m],function(e){function t(t){function n(){return!1}function r(){return!0}function i(e,i){var o,s,l,u;if(e=e.toLowerCase(),i=i||{},i.type=e,i.target||(i.target=c),i.preventDefault||(i.preventDefault=function(){i.isDefaultPrevented=r},i.stopPropagation=function(){i.isPropagationStopped=r},i.stopImmediatePropagation=function(){i.isImmediatePropagationStopped=r},i.isDefaultPrevented=n,i.isPropagationStopped=n,i.isImmediatePropagationStopped=n),t.beforeFire&&t.beforeFire(i),o=d[e])for(s=0,l=o.length;s<l;s++){if(u=o[s],u.once&&a(e,u.func),i.isImmediatePropagationStopped())return i.stopPropagation(),i;if(u.func.call(c,i)===!1)return i.preventDefault(),i}return i}function o(t,r,i,o){var a,s,l;if(r===!1&&(r=n),r)for(r={func:r},o&&e.extend(r,o),s=t.toLowerCase().split(" "),l=s.length;l--;)t=s[l],a=d[t],a||(a=d[t]=[],f(t,!0)),i?a.unshift(r):a.push(r);return u}function a(e,t){var n,r,i,o,a;if(e)for(o=e.toLowerCase().split(" "),n=o.length;n--;){if(e=o[n],r=d[e],!e){for(i in d)f(i,!1),delete d[i];return u}if(r){if(t)for(a=r.length;a--;)r[a].func===t&&(r=r.slice(0,a).concat(r.slice(a+1)),d[e]=r);else r.length=0;r.length||(f(e,!1),delete d[e])}}else{for(e in d)f(e,!1);d={}}return u}function s(e,t,n){return o(e,t,n,{once:!0})}function l(e){return e=e.toLowerCase(),!(!d[e]||0===d[e].length)}var u=this,c,d={},f;t=t||{},c=t.scope||u,f=t.toggleEvent||n,u.fire=i,u.on=o,u.off=a,u.once=s,u.has=l}var n=e.makeMap("focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave wheel keydown keypress keyup input contextmenu dragstart dragend dragover draggesture dragdrop drop drag submit compositionstart compositionend compositionupdate touchstart touchmove touchend"," ");return t.isNative=function(e){return!!n[e.toLowerCase()]},t}),r(fe,[],function(){function e(e){this.create=e.create}return e.create=function(t,n){return new e({create:function(e,r){function i(t){e.set(r,t.value)}function o(e){t.set(n,e.value)}var a;return e.on("change:"+r,o),t.on("change:"+n,i),a=e._bindings,a||(a=e._bindings=[],e.on("destroy",function(){for(var e=a.length;e--;)a[e]()})),a.push(function(){t.off("change:"+n,i)}),t.get(n)}})},e}),r(pe,[de],function(e){function t(t){return t._eventDispatcher||(t._eventDispatcher=new e({scope:t,toggleEvent:function(n,r){e.isNative(n)&&t.toggleNativeEvent&&t.toggleNativeEvent(n,r)}})),t._eventDispatcher}return{fire:function(e,n,r){var i=this;if(i.removed&&"remove"!==e)return n;if(n=t(i).fire(e,n,r),r!==!1&&i.parent)for(var o=i.parent();o&&!n.isPropagationStopped();)o.fire(e,n,!1),o=o.parent();return n},on:function(e,n,r){return t(this).on(e,n,r)},off:function(e,n){return t(this).off(e,n)},once:function(e,n){return t(this).once(e,n)},hasEventListeners:function(e){return t(this).has(e)}}}),r(he,[fe,pe,ce,m],function(e,t,n,r){function i(e){return e.nodeType>0}function o(e,t){var n,a;if(e===t)return!0;if(null===e||null===t)return e===t;if("object"!=typeof e||"object"!=typeof t)return e===t;if(r.isArray(t)){if(e.length!==t.length)return!1;for(n=e.length;n--;)if(!o(e[n],t[n]))return!1}if(i(e)||i(t))return e===t;a={};for(n in t){if(!o(e[n],t[n]))return!1;a[n]=!0}for(n in e)if(!a[n]&&!o(e[n],t[n]))return!1;return!0}return n.extend({Mixins:[t],init:function(t){var n,r;t=t||{};for(n in t)r=t[n],r instanceof e&&(t[n]=r.create(this,n));this.data=t},set:function(t,n){var r,i,a=this.data[t];if(n instanceof e&&(n=n.create(this,t)),"object"==typeof t){for(r in t)this.set(r,t[r]);return this}return o(a,n)||(this.data[t]=n,i={target:this,name:t,value:n,oldValue:a},this.fire("change:"+t,i),this.fire("change",i)),this},get:function(e){return this.data[e]},has:function(e){return e in this.data},bind:function(t){return e.create(this,t)},destroy:function(){this.fire("destroy")}})}),r(me,[ce],function(e){function t(e){for(var t=[],n=e.length,r;n--;)r=e[n],r.__checked||(t.push(r),r.__checked=1);for(n=t.length;n--;)delete t[n].__checked;return t}var n=/^([\w\\*]+)?(?:#([\w\-\\]+))?(?:\.([\w\\\.]+))?(?:\[\@?([\w\\]+)([\^\$\*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i,r=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,i=/^\s*|\s*$/g,o,a=e.extend({init:function(e){function t(e){if(e)return e=e.toLowerCase(),function(t){return"*"===e||t.type===e}}function o(e){if(e)return function(t){return t._name===e}}function a(e){if(e)return e=e.split("."),function(t){for(var n=e.length;n--;)if(!t.classes.contains(e[n]))return!1;return!0}}function s(e,t,n){if(e)return function(r){var i=r[e]?r[e]():"";return t?"="===t?i===n:"*="===t?i.indexOf(n)>=0:"~="===t?(" "+i+" ").indexOf(" "+n+" ")>=0:"!="===t?i!=n:"^="===t?0===i.indexOf(n):"$="===t&&i.substr(i.length-n.length)===n:!!n}}function l(e){var t;if(e)return e=/(?:not\((.+)\))|(.+)/i.exec(e),e[1]?(t=c(e[1],[]),function(e){return!d(e,t)}):(e=e[2],function(t,n,r){return"first"===e?0===n:"last"===e?n===r-1:"even"===e?n%2===0:"odd"===e?n%2===1:!!t[e]&&t[e]()})}function u(e,r,u){function c(e){e&&r.push(e)}var d;return d=n.exec(e.replace(i,"")),c(t(d[1])),c(o(d[2])),c(a(d[3])),c(s(d[4],d[5],d[6])),c(l(d[7])),r.pseudo=!!d[7],r.direct=u,r}function c(e,t){var n=[],i,o,a;do if(r.exec(""),o=r.exec(e),o&&(e=o[3],n.push(o[1]),o[2])){i=o[3];break}while(o);for(i&&c(i,t),e=[],a=0;a<n.length;a++)">"!=n[a]&&e.push(u(n[a],[],">"===n[a-1]));return t.push(e),t}var d=this.match;this._selectors=c(e,[])},match:function(e,t){var n,r,i,o,a,s,l,u,c,d,f,p,h;for(t=t||this._selectors,n=0,r=t.length;n<r;n++){for(a=t[n],o=a.length,h=e,p=0,i=o-1;i>=0;i--)for(u=a[i];h;){if(u.pseudo)for(f=h.parent().items(),c=d=f.length;c--&&f[c]!==h;);for(s=0,l=u.length;s<l;s++)if(!u[s](h,c,d)){s=l+1;break}if(s===l){p++;break}if(i===o-1)break;h=h.parent()}if(p===o)return!0}return!1},find:function(e){function n(e,t,i){var o,a,s,l,u,c=t[i];for(o=0,a=e.length;o<a;o++){for(u=e[o],s=0,l=c.length;s<l;s++)if(!c[s](u,o,a)){s=l+1;break}if(s===l)i==t.length-1?r.push(u):u.items&&n(u.items(),t,i+1);else if(c.direct)return;u.items&&n(u.items(),t,i)}}var r=[],i,s,l=this._selectors;if(e.items){for(i=0,s=l.length;i<s;i++)n(e.items(),l[i],0);s>1&&(r=t(r))}return o||(o=a.Collection),new o(r)}});return a}),r(ge,[m,me,ce],function(e,t,n){var r,i,o=Array.prototype.push,a=Array.prototype.slice;return i={length:0,init:function(e){e&&this.add(e)},add:function(t){var n=this;return e.isArray(t)?o.apply(n,t):t instanceof r?n.add(t.toArray()):o.call(n,t),n},set:function(e){var t=this,n=t.length,r;for(t.length=0,t.add(e),r=t.length;r<n;r++)delete t[r];return t},filter:function(e){var n=this,i,o,a=[],s,l;for("string"==typeof e?(e=new t(e),l=function(t){return e.match(t)}):l=e,i=0,o=n.length;i<o;i++)s=n[i],l(s)&&a.push(s);return new r(a)},slice:function(){return new r(a.apply(this,arguments))},eq:function(e){return e===-1?this.slice(e):this.slice(e,+e+1)},each:function(t){return e.each(this,t),this},toArray:function(){return e.toArray(this)},indexOf:function(e){for(var t=this,n=t.length;n--&&t[n]!==e;);return n},reverse:function(){return new r(e.toArray(this).reverse())},hasClass:function(e){return!!this[0]&&this[0].classes.contains(e)},prop:function(e,t){var n=this,r,i;return t!==r?(n.each(function(n){n[e]&&n[e](t)}),n):(i=n[0],i&&i[e]?i[e]():void 0)},exec:function(t){var n=this,r=e.toArray(arguments).slice(1);return n.each(function(e){e[t]&&e[t].apply(e,r)}),n},remove:function(){for(var e=this.length;e--;)this[e].remove();return this},addClass:function(e){return this.each(function(t){t.classes.add(e)})},removeClass:function(e){return this.each(function(t){t.classes.remove(e)})}},e.each("fire on off show hide append prepend before after reflow".split(" "),function(t){i[t]=function(){var n=e.toArray(arguments);return this.each(function(e){t in e&&e[t].apply(e,n)}),this}}),e.each("text name disabled active selected checked visible parent value data".split(" "),function(e){i[e]=function(t){return this.prop(e,t)}}),r=n.extend(i),t.Collection=r,r}),r(ve,[d,m,w],function(e,t,n){var r=0,i={id:function(){return"mceu_"+r++},create:function(e,r,i){var o=document.createElement(e);return n.DOM.setAttribs(o,r),"string"==typeof i?o.innerHTML=i:t.each(i,function(e){e.nodeType&&o.appendChild(e)}),o},createFragment:function(e){return n.DOM.createFragment(e)},getWindowSize:function(){return n.DOM.getViewPort()},getSize:function(e){var t,n;if(e.getBoundingClientRect){var r=e.getBoundingClientRect();t=Math.max(r.width||r.right-r.left,e.offsetWidth),n=Math.max(r.height||r.bottom-r.bottom,e.offsetHeight)}else t=e.offsetWidth,n=e.offsetHeight;return{width:t,height:n}},getPos:function(e,t){return n.DOM.getPos(e,t||i.getContainer())},getContainer:function(){return e.container?e.container:document.body},getViewPort:function(e){return n.DOM.getViewPort(e)},get:function(e){return document.getElementById(e)},addClass:function(e,t){return n.DOM.addClass(e,t)},removeClass:function(e,t){return n.DOM.removeClass(e,t)},hasClass:function(e,t){return n.DOM.hasClass(e,t)},toggleClass:function(e,t,r){return n.DOM.toggleClass(e,t,r)},css:function(e,t,r){return n.DOM.setStyle(e,t,r)},getRuntimeStyle:function(e,t){return n.DOM.getStyle(e,t,!0)},on:function(e,t,r,i){return n.DOM.bind(e,t,r,i)},off:function(e,t,r){
return n.DOM.unbind(e,t,r)},fire:function(e,t,r){return n.DOM.fire(e,t,r)},innerHtml:function(e,t){n.DOM.setHTML(e,t)}};return i}),r(ye,[],function(){return{parseBox:function(e){var t,n=10;if(e)return"number"==typeof e?(e=e||0,{top:e,left:e,bottom:e,right:e}):(e=e.split(" "),t=e.length,1===t?e[1]=e[2]=e[3]=e[0]:2===t?(e[2]=e[0],e[3]=e[1]):3===t&&(e[3]=e[1]),{top:parseInt(e[0],n)||0,right:parseInt(e[1],n)||0,bottom:parseInt(e[2],n)||0,left:parseInt(e[3],n)||0})},measureBox:function(e,t){function n(t){var n=document.defaultView;return n?(t=t.replace(/[A-Z]/g,function(e){return"-"+e}),n.getComputedStyle(e,null).getPropertyValue(t)):e.currentStyle[t]}function r(e){var t=parseFloat(n(e),10);return isNaN(t)?0:t}return{top:r(t+"TopWidth"),right:r(t+"RightWidth"),bottom:r(t+"BottomWidth"),left:r(t+"LeftWidth")}}}}),r(be,[m],function(e){function t(){}function n(e){this.cls=[],this.cls._map={},this.onchange=e||t,this.prefix=""}return e.extend(n.prototype,{add:function(e){return e&&!this.contains(e)&&(this.cls._map[e]=!0,this.cls.push(e),this._change()),this},remove:function(e){if(this.contains(e)){for(var t=0;t<this.cls.length&&this.cls[t]!==e;t++);this.cls.splice(t,1),delete this.cls._map[e],this._change()}return this},toggle:function(e,t){var n=this.contains(e);return n!==t&&(n?this.remove(e):this.add(e),this._change()),this},contains:function(e){return!!this.cls._map[e]},_change:function(){delete this.clsValue,this.onchange.call(this)}}),n.prototype.toString=function(){var e;if(this.clsValue)return this.clsValue;e="";for(var t=0;t<this.cls.length;t++)t>0&&(e+=" "),e+=this.prefix+this.cls[t];return e},n}),r(Ce,[c],function(e){var t={},n;return{add:function(r){var i=r.parent();if(i){if(!i._layout||i._layout.isNative())return;t[i._id]||(t[i._id]=i),n||(n=!0,e.requestAnimationFrame(function(){var e,r;n=!1;for(e in t)r=t[e],r.state.get("rendered")&&r.reflow();t={}},document.body))}},remove:function(e){t[e._id]&&delete t[e._id]}}}),r(xe,[ce,m,de,he,ge,ve,g,ye,be,Ce],function(e,t,n,r,i,o,a,s,l,u){function c(e){return e._eventDispatcher||(e._eventDispatcher=new n({scope:e,toggleEvent:function(t,r){r&&n.isNative(t)&&(e._nativeEvents||(e._nativeEvents={}),e._nativeEvents[t]=!0,e.state.get("rendered")&&d(e))}})),e._eventDispatcher}function d(e){function t(t){var n=e.getParentCtrl(t.target);n&&n.fire(t.type,t)}function n(){var e=u._lastHoverCtrl;e&&(e.fire("mouseleave",{target:e.getEl()}),e.parents().each(function(e){e.fire("mouseleave",{target:e.getEl()})}),u._lastHoverCtrl=null)}function r(t){var n=e.getParentCtrl(t.target),r=u._lastHoverCtrl,i=0,o,a,s;if(n!==r){if(u._lastHoverCtrl=n,a=n.parents().toArray().reverse(),a.push(n),r){for(s=r.parents().toArray().reverse(),s.push(r),i=0;i<s.length&&a[i]===s[i];i++);for(o=s.length-1;o>=i;o--)r=s[o],r.fire("mouseleave",{target:r.getEl()})}for(o=i;o<a.length;o++)n=a[o],n.fire("mouseenter",{target:n.getEl()})}}function i(t){t.preventDefault(),"mousewheel"==t.type?(t.deltaY=-.025*t.wheelDelta,t.wheelDeltaX&&(t.deltaX=-.025*t.wheelDeltaX)):(t.deltaX=0,t.deltaY=t.detail),t=e.fire("wheel",t)}var o,s,l,u,c,d;if(c=e._nativeEvents){for(l=e.parents().toArray(),l.unshift(e),o=0,s=l.length;!u&&o<s;o++)u=l[o]._eventsRoot;for(u||(u=l[l.length-1]||e),e._eventsRoot=u,s=o,o=0;o<s;o++)l[o]._eventsRoot=u;var h=u._delegates;h||(h=u._delegates={});for(d in c){if(!c)return!1;"wheel"!==d||p?("mouseenter"===d||"mouseleave"===d?u._hasMouseEnter||(a(u.getEl()).on("mouseleave",n).on("mouseover",r),u._hasMouseEnter=1):h[d]||(a(u.getEl()).on(d,t),h[d]=!0),c[d]=!1):f?a(e.getEl()).on("mousewheel",i):a(e.getEl()).on("DOMMouseScroll",i)}}}var f="onmousewheel"in document,p=!1,h="mce-",m,g=0,v={Statics:{classPrefix:h},isRtl:function(){return m.rtl},classPrefix:h,init:function(e){function n(e){var t;for(e=e.split(" "),t=0;t<e.length;t++)i.classes.add(e[t])}var i=this,o,u;i.settings=e=t.extend({},i.Defaults,e),i._id=e.id||"mceu_"+g++,i._aria={role:e.role},i._elmCache={},i.$=a,i.state=new r({visible:!0,active:!1,disabled:!1,value:""}),i.data=new r(e.data),i.classes=new l(function(){i.state.get("rendered")&&(i.getEl().className=this.toString())}),i.classes.prefix=i.classPrefix,o=e.classes,o&&(i.Defaults&&(u=i.Defaults.classes,u&&o!=u&&n(u)),n(o)),t.each("title text name visible disabled active value".split(" "),function(t){t in e&&i[t](e[t])}),i.on("click",function(){if(i.disabled())return!1}),i.settings=e,i.borderBox=s.parseBox(e.border),i.paddingBox=s.parseBox(e.padding),i.marginBox=s.parseBox(e.margin),e.hidden&&i.hide()},Properties:"parent,name",getContainerElm:function(){return o.getContainer()},getParentCtrl:function(e){for(var t,n=this.getRoot().controlIdLookup;e&&n&&!(t=n[e.id]);)e=e.parentNode;return t},initLayoutRect:function(){var e=this,t=e.settings,n,r,i=e.getEl(),a,l,u,c,d,f,p,h;n=e.borderBox=e.borderBox||s.measureBox(i,"border"),e.paddingBox=e.paddingBox||s.measureBox(i,"padding"),e.marginBox=e.marginBox||s.measureBox(i,"margin"),h=o.getSize(i),f=t.minWidth,p=t.minHeight,u=f||h.width,c=p||h.height,a=t.width,l=t.height,d=t.autoResize,d="undefined"!=typeof d?d:!a&&!l,a=a||u,l=l||c;var m=n.left+n.right,g=n.top+n.bottom,v=t.maxWidth||65535,y=t.maxHeight||65535;return e._layoutRect=r={x:t.x||0,y:t.y||0,w:a,h:l,deltaW:m,deltaH:g,contentW:a-m,contentH:l-g,innerW:a-m,innerH:l-g,startMinWidth:f||0,startMinHeight:p||0,minW:Math.min(u,v),minH:Math.min(c,y),maxW:v,maxH:y,autoResize:d,scrollW:0},e._lastLayoutRect={},r},layoutRect:function(e){var t=this,n=t._layoutRect,r,i,o,a,s,l;return n||(n=t.initLayoutRect()),e?(o=n.deltaW,a=n.deltaH,e.x!==s&&(n.x=e.x),e.y!==s&&(n.y=e.y),e.minW!==s&&(n.minW=e.minW),e.minH!==s&&(n.minH=e.minH),i=e.w,i!==s&&(i=i<n.minW?n.minW:i,i=i>n.maxW?n.maxW:i,n.w=i,n.innerW=i-o),i=e.h,i!==s&&(i=i<n.minH?n.minH:i,i=i>n.maxH?n.maxH:i,n.h=i,n.innerH=i-a),i=e.innerW,i!==s&&(i=i<n.minW-o?n.minW-o:i,i=i>n.maxW-o?n.maxW-o:i,n.innerW=i,n.w=i+o),i=e.innerH,i!==s&&(i=i<n.minH-a?n.minH-a:i,i=i>n.maxH-a?n.maxH-a:i,n.innerH=i,n.h=i+a),e.contentW!==s&&(n.contentW=e.contentW),e.contentH!==s&&(n.contentH=e.contentH),r=t._lastLayoutRect,r.x===n.x&&r.y===n.y&&r.w===n.w&&r.h===n.h||(l=m.repaintControls,l&&l.map&&!l.map[t._id]&&(l.push(t),l.map[t._id]=!0),r.x=n.x,r.y=n.y,r.w=n.w,r.h=n.h),t):n},repaint:function(){var e=this,t,n,r,i,o,a,s,l,u,c;u=document.createRange?function(e){return e}:Math.round,t=e.getEl().style,i=e._layoutRect,l=e._lastRepaintRect||{},o=e.borderBox,a=o.left+o.right,s=o.top+o.bottom,i.x!==l.x&&(t.left=u(i.x)+"px",l.x=i.x),i.y!==l.y&&(t.top=u(i.y)+"px",l.y=i.y),i.w!==l.w&&(c=u(i.w-a),t.width=(c>=0?c:0)+"px",l.w=i.w),i.h!==l.h&&(c=u(i.h-s),t.height=(c>=0?c:0)+"px",l.h=i.h),e._hasBody&&i.innerW!==l.innerW&&(c=u(i.innerW),r=e.getEl("body"),r&&(n=r.style,n.width=(c>=0?c:0)+"px"),l.innerW=i.innerW),e._hasBody&&i.innerH!==l.innerH&&(c=u(i.innerH),r=r||e.getEl("body"),r&&(n=n||r.style,n.height=(c>=0?c:0)+"px"),l.innerH=i.innerH),e._lastRepaintRect=l,e.fire("repaint",{},!1)},updateLayoutRect:function(){var e=this;e.parent()._lastRect=null,o.css(e.getEl(),{width:"",height:""}),e._layoutRect=e._lastRepaintRect=e._lastLayoutRect=null,e.initLayoutRect()},on:function(e,t){function n(e){var t,n;return"string"!=typeof e?e:function(i){return t||r.parentsAndSelf().each(function(r){var i=r.settings.callbacks;if(i&&(t=i[e]))return n=r,!1}),t?t.call(n,i):(i.action=e,void this.fire("execute",i))}}var r=this;return c(r).on(e,n(t)),r},off:function(e,t){return c(this).off(e,t),this},fire:function(e,t,n){var r=this;if(t=t||{},t.control||(t.control=r),t=c(r).fire(e,t),n!==!1&&r.parent)for(var i=r.parent();i&&!t.isPropagationStopped();)i.fire(e,t,!1),i=i.parent();return t},hasEventListeners:function(e){return c(this).has(e)},parents:function(e){var t=this,n,r=new i;for(n=t.parent();n;n=n.parent())r.add(n);return e&&(r=r.filter(e)),r},parentsAndSelf:function(e){return new i(this).add(this.parents(e))},next:function(){var e=this.parent().items();return e[e.indexOf(this)+1]},prev:function(){var e=this.parent().items();return e[e.indexOf(this)-1]},innerHtml:function(e){return this.$el.html(e),this},getEl:function(e){var t=e?this._id+"-"+e:this._id;return this._elmCache[t]||(this._elmCache[t]=a("#"+t)[0]),this._elmCache[t]},show:function(){return this.visible(!0)},hide:function(){return this.visible(!1)},focus:function(){try{this.getEl().focus()}catch(e){}return this},blur:function(){return this.getEl().blur(),this},aria:function(e,t){var n=this,r=n.getEl(n.ariaTarget);return"undefined"==typeof t?n._aria[e]:(n._aria[e]=t,n.state.get("rendered")&&r.setAttribute("role"==e?e:"aria-"+e,t),n)},encode:function(e,t){return t!==!1&&(e=this.translate(e)),(e||"").replace(/[&<>"]/g,function(e){return"&#"+e.charCodeAt(0)+";"})},translate:function(e){return m.translate?m.translate(e):e},before:function(e){var t=this,n=t.parent();return n&&n.insert(e,n.items().indexOf(t),!0),t},after:function(e){var t=this,n=t.parent();return n&&n.insert(e,n.items().indexOf(t)),t},remove:function(){var e=this,t=e.getEl(),n=e.parent(),r,i;if(e.items){var o=e.items().toArray();for(i=o.length;i--;)o[i].remove()}n&&n.items&&(r=[],n.items().each(function(t){t!==e&&r.push(t)}),n.items().set(r),n._lastRect=null),e._eventsRoot&&e._eventsRoot==e&&a(t).off();var s=e.getRoot().controlIdLookup;return s&&delete s[e._id],t&&t.parentNode&&t.parentNode.removeChild(t),e.state.set("rendered",!1),e.state.destroy(),e.fire("remove"),e},renderBefore:function(e){return a(e).before(this.renderHtml()),this.postRender(),this},renderTo:function(e){return a(e||this.getContainerElm()).append(this.renderHtml()),this.postRender(),this},preRender:function(){},render:function(){},renderHtml:function(){return'<div id="'+this._id+'" class="'+this.classes+'"></div>'},postRender:function(){var e=this,t=e.settings,n,r,i,o,s;e.$el=a(e.getEl()),e.state.set("rendered",!0);for(o in t)0===o.indexOf("on")&&e.on(o.substr(2),t[o]);if(e._eventsRoot){for(i=e.parent();!s&&i;i=i.parent())s=i._eventsRoot;if(s)for(o in s._nativeEvents)e._nativeEvents[o]=!0}d(e),t.style&&(n=e.getEl(),n&&(n.setAttribute("style",t.style),n.style.cssText=t.style)),e.settings.border&&(r=e.borderBox,e.$el.css({"border-top-width":r.top,"border-right-width":r.right,"border-bottom-width":r.bottom,"border-left-width":r.left}));var l=e.getRoot();l.controlIdLookup||(l.controlIdLookup={}),l.controlIdLookup[e._id]=e;for(var c in e._aria)e.aria(c,e._aria[c]);e.state.get("visible")===!1&&(e.getEl().style.display="none"),e.bindStates(),e.state.on("change:visible",function(t){var n=t.value,r;e.state.get("rendered")&&(e.getEl().style.display=n===!1?"none":"",e.getEl().getBoundingClientRect()),r=e.parent(),r&&(r._lastRect=null),e.fire(n?"show":"hide"),u.add(e)}),e.fire("postrender",{},!1)},bindStates:function(){},scrollIntoView:function(e){function t(e,t){var n,r,i=e;for(n=r=0;i&&i!=t&&i.nodeType;)n+=i.offsetLeft||0,r+=i.offsetTop||0,i=i.offsetParent;return{x:n,y:r}}var n=this.getEl(),r=n.parentNode,i,o,a,s,l,u,c=t(n,r);return i=c.x,o=c.y,a=n.offsetWidth,s=n.offsetHeight,l=r.clientWidth,u=r.clientHeight,"end"==e?(i-=l-a,o-=u-s):"center"==e&&(i-=l/2-a/2,o-=u/2-s/2),r.scrollLeft=i,r.scrollTop=o,this},getRoot:function(){for(var e=this,t,n=[];e;){if(e.rootControl){t=e.rootControl;break}n.push(e),t=e,e=e.parent()}t||(t=this);for(var r=n.length;r--;)n[r].rootControl=t;return t},reflow:function(){u.remove(this);var e=this.parent();return e._layout&&!e._layout.isNative()&&e.reflow(),this}};return t.each("text title visible disabled active value".split(" "),function(e){v[e]=function(t){return 0===arguments.length?this.state.get(e):("undefined"!=typeof t&&this.state.set(e,t),this)}}),m=e.extend(v)}),r(we,[],function(){var e={},t;return{add:function(t,n){e[t.toLowerCase()]=n},has:function(t){return!!e[t.toLowerCase()]},create:function(n,r){var i,o,a;if(!t){a=tinymce.ui;for(o in a)e[o.toLowerCase()]=a[o];t=!0}if("string"==typeof n?(r=r||{},r.type=n):(r=n,n=r.type),n=n.toLowerCase(),i=e[n],!i)throw new Error("Could not find control by type: "+n);return i=new i(r),i.type=n,i}}}),r(Ee,[],function(){return function(e){function t(e){return e&&1===e.nodeType}function n(e){return e=e||C,t(e)?e.getAttribute("role"):null}function r(e){for(var t,r=e||C;r=r.parentNode;)if(t=n(r))return t}function i(e){var n=C;if(t(n))return n.getAttribute("aria-"+e)}function o(e){var t=e.tagName.toUpperCase();return"INPUT"==t||"TEXTAREA"==t||"SELECT"==t}function a(e){return!(!o(e)||e.hidden)||!!/^(button|menuitem|checkbox|tab|menuitemcheckbox|option|gridcell|slider)$/.test(n(e))}function s(e){function t(e){if(1==e.nodeType&&"none"!=e.style.display&&!e.disabled){a(e)&&n.push(e);for(var r=0;r<e.childNodes.length;r++)t(e.childNodes[r])}}var n=[];return t(e||b.getEl()),n}function l(e){var t,n;e=e||x,n=e.parents().toArray(),n.unshift(e);for(var r=0;r<n.length&&(t=n[r],!t.settings.ariaRoot);r++);return t}function u(e){var t=l(e),n=s(t.getEl());t.settings.ariaRemember&&"lastAriaIndex"in t?c(t.lastAriaIndex,n):c(0,n)}function c(e,t){return e<0?e=t.length-1:e>=t.length&&(e=0),t[e]&&t[e].focus(),e}function d(e,t){var n=-1,r=l();t=t||s(r.getEl());for(var i=0;i<t.length;i++)t[i]===C&&(n=i);n+=e,r.lastAriaIndex=c(n,t)}function f(){var e=r();"tablist"==e?d(-1,s(C.parentNode)):x.parent().submenu?v():d(-1)}function p(){var e=n(),t=r();"tablist"==t?d(1,s(C.parentNode)):"menuitem"==e&&"menu"==t&&i("haspopup")?y():d(1)}function h(){d(-1)}function m(){var e=n(),t=r();"menuitem"==e&&"menubar"==t?y():"button"==e&&i("haspopup")?y({key:"down"}):d(1)}function g(e){var t=r();if("tablist"==t){var n=s(x.getEl("body"))[0];n&&n.focus()}else d(e.shiftKey?-1:1)}function v(){x.fire("cancel")}function y(e){e=e||{},x.fire("click",{target:C,aria:e})}var b=e.root,C,x;try{C=document.activeElement}catch(w){C=document.body}return x=b.getParentCtrl(C),b.on("keydown",function(e){function t(e,t){o(C)||"slider"!==n(C)&&t(e)!==!1&&e.preventDefault()}if(!e.isDefaultPrevented())switch(e.keyCode){case 37:t(e,f);break;case 39:t(e,p);break;case 38:t(e,h);break;case 40:t(e,m);break;case 27:v();break;case 14:case 13:case 32:t(e,y);break;case 9:g(e)!==!1&&e.preventDefault()}}),b.on("focusin",function(e){C=e.target,x=e.control}),{focusFirst:u}}}),r(Ne,[xe,ge,me,we,Ee,m,g,be,Ce],function(e,t,n,r,i,o,a,s,l){var u={};return e.extend({init:function(e){var n=this;n._super(e),e=n.settings,e.fixed&&n.state.set("fixed",!0),n._items=new t,n.isRtl()&&n.classes.add("rtl"),n.bodyClasses=new s(function(){n.state.get("rendered")&&(n.getEl("body").className=this.toString())}),n.bodyClasses.prefix=n.classPrefix,n.classes.add("container"),n.bodyClasses.add("container-body"),e.containerCls&&n.classes.add(e.containerCls),n._layout=r.create((e.layout||"")+"layout"),n.settings.items?n.add(n.settings.items):n.add(n.render()),n._hasBody=!0},items:function(){return this._items},find:function(e){return e=u[e]=u[e]||new n(e),e.find(this)},add:function(e){var t=this;return t.items().add(t.create(e)).parent(t),t},focus:function(e){var t=this,n,r,i;return e&&(r=t.keyboardNav||t.parents().eq(-1)[0].keyboardNav)?void r.focusFirst(t):(i=t.find("*"),t.statusbar&&i.add(t.statusbar.items()),i.each(function(e){return e.settings.autofocus?(n=null,!1):void(e.canFocus&&(n=n||e))}),n&&n.focus(),t)},replace:function(e,t){for(var n,r=this.items(),i=r.length;i--;)if(r[i]===e){r[i]=t;break}i>=0&&(n=t.getEl(),n&&n.parentNode.removeChild(n),n=e.getEl(),n&&n.parentNode.removeChild(n)),t.parent(this)},create:function(t){var n=this,i,a=[];return o.isArray(t)||(t=[t]),o.each(t,function(t){t&&(t instanceof e||("string"==typeof t&&(t={type:t}),i=o.extend({},n.settings.defaults,t),t.type=i.type=i.type||t.type||n.settings.defaultType||(i.defaults?i.defaults.type:null),t=r.create(i)),a.push(t))}),a},renderNew:function(){var e=this;return e.items().each(function(t,n){var r;t.parent(e),t.state.get("rendered")||(r=e.getEl("body"),r.hasChildNodes()&&n<=r.childNodes.length-1?a(r.childNodes[n]).before(t.renderHtml()):a(r).append(t.renderHtml()),t.postRender(),l.add(t))}),e._layout.applyClasses(e.items().filter(":visible")),e._lastRect=null,e},append:function(e){return this.add(e).renderNew()},prepend:function(e){var t=this;return t.items().set(t.create(e).concat(t.items().toArray())),t.renderNew()},insert:function(e,t,n){var r=this,i,o,a;return e=r.create(e),i=r.items(),!n&&t<i.length-1&&(t+=1),t>=0&&t<i.length&&(o=i.slice(0,t).toArray(),a=i.slice(t).toArray(),i.set(o.concat(e,a))),r.renderNew()},fromJSON:function(e){var t=this;for(var n in e)t.find("#"+n).value(e[n]);return t},toJSON:function(){var e=this,t={};return e.find("*").each(function(e){var n=e.name(),r=e.value();n&&"undefined"!=typeof r&&(t[n]=r)}),t},renderHtml:function(){var e=this,t=e._layout,n=this.settings.role;return e.preRender(),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes+'"'+(n?' role="'+this.settings.role+'"':"")+'><div id="'+e._id+'-body" class="'+e.bodyClasses+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div></div>"},postRender:function(){var e=this,t;return e.items().exec("postRender"),e._super(),e._layout.postRender(e),e.state.set("rendered",!0),e.settings.style&&e.$el.css(e.settings.style),e.settings.border&&(t=e.borderBox,e.$el.css({"border-top-width":t.top,"border-right-width":t.right,"border-bottom-width":t.bottom,"border-left-width":t.left})),e.parent()||(e.keyboardNav=new i({root:e})),e},initLayoutRect:function(){var e=this,t=e._super();return e._layout.recalc(e),t},recalc:function(){var e=this,t=e._layoutRect,n=e._lastRect;if(!n||n.w!=t.w||n.h!=t.h)return e._layout.recalc(e),t=e.layoutRect(),e._lastRect={x:t.x,y:t.y,w:t.w,h:t.h},!0},reflow:function(){var t;if(l.remove(this),this.visible()){for(e.repaintControls=[],e.repaintControls.map={},this.recalc(),t=e.repaintControls.length;t--;)e.repaintControls[t].repaint();"flow"!==this.settings.layout&&"stack"!==this.settings.layout&&this.repaint(),e.repaintControls=[]}return this}})}),r(_e,[g],function(e){function t(e){var t,n,r,i,o,a,s,l,u=Math.max;return t=e.documentElement,n=e.body,r=u(t.scrollWidth,n.scrollWidth),i=u(t.clientWidth,n.clientWidth),o=u(t.offsetWidth,n.offsetWidth),a=u(t.scrollHeight,n.scrollHeight),s=u(t.clientHeight,n.clientHeight),l=u(t.offsetHeight,n.offsetHeight),{width:r<o?i:r,height:a<l?s:a}}function n(e){var t,n;if(e.changedTouches)for(t="screenX screenY pageX pageY clientX clientY".split(" "),n=0;n<t.length;n++)e[t[n]]=e.changedTouches[0][t[n]]}return function(r,i){function o(){return s.getElementById(i.handle||r)}var a,s=i.document||document,l,u,c,d,f,p;i=i||{},u=function(r){var u=t(s),h,m;n(r),r.preventDefault(),l=r.button,h=o(),f=r.screenX,p=r.screenY,m=window.getComputedStyle?window.getComputedStyle(h,null).getPropertyValue("cursor"):h.runtimeStyle.cursor,a=e("<div></div>").css({position:"absolute",top:0,left:0,width:u.width,height:u.height,zIndex:2147483647,opacity:1e-4,cursor:m}).appendTo(s.body),e(s).on("mousemove touchmove",d).on("mouseup touchend",c),i.start(r)},d=function(e){return n(e),e.button!==l?c(e):(e.deltaX=e.screenX-f,e.deltaY=e.screenY-p,e.preventDefault(),void i.drag(e))},c=function(t){n(t),e(s).off("mousemove touchmove",d).off("mouseup touchend",c),a.remove(),i.stop&&i.stop(t)},this.destroy=function(){e(o()).off()},e(o()).on("mousedown touchstart",u)}}),r(Se,[g,_e],function(e,t){return{init:function(){var e=this;e.on("repaint",e.renderScroll)},renderScroll:function(){function n(){function t(t,a,s,l,u,c){var d,f,p,h,m,g,v,y,b;if(f=i.getEl("scroll"+t)){if(y=a.toLowerCase(),b=s.toLowerCase(),e(i.getEl("absend")).css(y,i.layoutRect()[l]-1),!u)return void e(f).css("display","none");e(f).css("display","block"),d=i.getEl("body"),p=i.getEl("scroll"+t+"t"),h=d["client"+s]-2*o,h-=n&&r?f["client"+c]:0,m=d["scroll"+s],g=h/m,v={},v[y]=d["offset"+a]+o,v[b]=h,e(f).css(v),v={},v[y]=d["scroll"+a]*g,v[b]=h*g,e(p).css(v)}}var n,r,a;a=i.getEl("body"),n=a.scrollWidth>a.clientWidth,r=a.scrollHeight>a.clientHeight,t("h","Left","Width","contentW",n,"Height"),t("v","Top","Height","contentH",r,"Width")}function r(){function n(n,r,a,s,l){var u,c=i._id+"-scroll"+n,d=i.classPrefix;e(i.getEl()).append('<div id="'+c+'" class="'+d+"scrollbar "+d+"scrollbar-"+n+'"><div id="'+c+'t" class="'+d+'scrollbar-thumb"></div></div>'),i.draghelper=new t(c+"t",{start:function(){u=i.getEl("body")["scroll"+r],e("#"+c).addClass(d+"active")},drag:function(e){var t,c,d,f,p=i.layoutRect();c=p.contentW>p.innerW,d=p.contentH>p.innerH,f=i.getEl("body")["client"+a]-2*o,f-=c&&d?i.getEl("scroll"+n)["client"+l]:0,t=f/i.getEl("body")["scroll"+a],i.getEl("body")["scroll"+r]=u+e["delta"+s]/t},stop:function(){e("#"+c).removeClass(d+"active")}})}i.classes.add("scroll"),n("v","Top","Height","Y","Width"),n("h","Left","Width","X","Height")}var i=this,o=2;i.settings.autoScroll&&(i._hasScroll||(i._hasScroll=!0,r(),i.on("wheel",function(e){var t=i.getEl("body");t.scrollLeft+=10*(e.deltaX||0),t.scrollTop+=10*e.deltaY,n()}),e(i.getEl("body")).on("scroll",n)),n())}}}),r(ke,[Ne,Se],function(e,t){return e.extend({Defaults:{layout:"fit",containerCls:"panel"},Mixins:[t],renderHtml:function(){var e=this,t=e._layout,n=e.settings.html;return e.preRender(),t.preRender(e),"undefined"==typeof n?n='<div id="'+e._id+'-body" class="'+e.bodyClasses+'">'+t.renderHtml(e)+"</div>":("function"==typeof n&&(n=n.call(e)),e._hasBody=!1),'<div id="'+e._id+'" class="'+e.classes+'" hidefocus="1" tabindex="-1" role="group">'+(e._preBodyHtml||"")+n+"</div>"}})}),r(Te,[ve],function(e){function t(t,n,r){var i,o,a,s,l,u,c,d,f,p;return f=e.getViewPort(),o=e.getPos(n),a=o.x,s=o.y,t.state.get("fixed")&&"static"==e.getRuntimeStyle(document.body,"position")&&(a-=f.x,s-=f.y),i=t.getEl(),p=e.getSize(i),l=p.width,u=p.height,p=e.getSize(n),c=p.width,d=p.height,r=(r||"").split(""),"b"===r[0]&&(s+=d),"r"===r[1]&&(a+=c),"c"===r[0]&&(s+=Math.round(d/2)),"c"===r[1]&&(a+=Math.round(c/2)),"b"===r[3]&&(s-=u),"r"===r[4]&&(a-=l),"c"===r[3]&&(s-=Math.round(u/2)),"c"===r[4]&&(a-=Math.round(l/2)),{x:a,y:s,w:l,h:u}}return{testMoveRel:function(n,r){for(var i=e.getViewPort(),o=0;o<r.length;o++){var a=t(this,n,r[o]);if(this.state.get("fixed")){if(a.x>0&&a.x+a.w<i.w&&a.y>0&&a.y+a.h<i.h)return r[o]}else if(a.x>i.x&&a.x+a.w<i.w+i.x&&a.y>i.y&&a.y+a.h<i.h+i.y)return r[o]}return r[0]},moveRel:function(e,n){"string"!=typeof n&&(n=this.testMoveRel(e,n));var r=t(this,e,n);return this.moveTo(r.x,r.y)},moveBy:function(e,t){var n=this,r=n.layoutRect();return n.moveTo(r.x+e,r.y+t),n},moveTo:function(t,n){function r(e,t,n){return e<0?0:e+n>t?(e=t-n,e<0?0:e):e}var i=this;if(i.settings.constrainToViewport){var o=e.getViewPort(window),a=i.layoutRect();t=r(t,o.w+o.x,a.w),n=r(n,o.h+o.y,a.h)}return i.state.get("rendered")?i.layoutRect({x:t,y:n}).repaint():(i.settings.x=t,i.settings.y=n),i.fire("move",{x:t,y:n}),i}}}),r(Re,[ve],function(e){return{resizeToContent:function(){this._layoutRect.autoResize=!0,this._lastRect=null,this.reflow()},resizeTo:function(t,n){if(t<=1||n<=1){var r=e.getWindowSize();t=t<=1?t*r.w:t,n=n<=1?n*r.h:n}return this._layoutRect.autoResize=!1,this.layoutRect({minW:t,minH:n,w:t,h:n}).reflow()},resizeBy:function(e,t){var n=this,r=n.layoutRect();return n.resizeTo(r.w+e,r.h+t)}}}),r(Ae,[ke,Te,Re,ve,g,c],function(e,t,n,r,i,o){function a(e,t){for(;e;){if(e==t)return!0;e=e.parent()}}function s(e){for(var t=v.length;t--;){var n=v[t],r=n.getParentCtrl(e.target);if(n.settings.autohide){if(r&&(a(r,n)||n.parent()===r))continue;e=n.fire("autohide",{target:e.target}),e.isDefaultPrevented()||n.hide()}}}function l(){h||(h=function(e){2!=e.button&&s(e)},i(document).on("click touchstart",h))}function u(){m||(m=function(){var e;for(e=v.length;e--;)d(v[e])},i(window).on("scroll",m))}function c(){if(!g){var e=document.documentElement,t=e.clientWidth,n=e.clientHeight;g=function(){document.all&&t==e.clientWidth&&n==e.clientHeight||(t=e.clientWidth,n=e.clientHeight,C.hideAll())},i(window).on("resize",g)}}function d(e){function t(t,n){for(var r,i=0;i<v.length;i++)if(v[i]!=e)for(r=v[i].parent();r&&(r=r.parent());)r==e&&v[i].fixed(t).moveBy(0,n).repaint()}var n=r.getViewPort().y;e.settings.autofix&&(e.state.get("fixed")?e._autoFixY>n&&(e.fixed(!1).layoutRect({y:e._autoFixY}).repaint(),t(!1,e._autoFixY-n)):(e._autoFixY=e.layoutRect().y,e._autoFixY<n&&(e.fixed(!0).layoutRect({y:0}).repaint(),t(!0,n-e._autoFixY))))}function f(e,t){var n,r=C.zIndex||65535,o;if(e)y.push(t);else for(n=y.length;n--;)y[n]===t&&y.splice(n,1);if(y.length)for(n=0;n<y.length;n++)y[n].modal&&(r++,o=y[n]),y[n].getEl().style.zIndex=r,y[n].zIndex=r,r++;var a=i("#"+t.classPrefix+"modal-block",t.getContainerElm())[0];o?i(a).css("z-index",o.zIndex-1):a&&(a.parentNode.removeChild(a),b=!1),C.currentZIndex=r}function p(e){var t;for(t=v.length;t--;)v[t]===e&&v.splice(t,1);for(t=y.length;t--;)y[t]===e&&y.splice(t,1)}var h,m,g,v=[],y=[],b,C=e.extend({Mixins:[t,n],init:function(e){var t=this;t._super(e),t._eventsRoot=t,t.classes.add("floatpanel"),e.autohide&&(l(),c(),v.push(t)),e.autofix&&(u(),t.on("move",function(){d(this)})),t.on("postrender show",function(e){if(e.control==t){var n,r=t.classPrefix;t.modal&&!b&&(n=i("#"+r+"modal-block",t.getContainerElm()),n[0]||(n=i('<div id="'+r+'modal-block" class="'+r+"reset "+r+'fade"></div>').appendTo(t.getContainerElm())),o.setTimeout(function(){n.addClass(r+"in"),i(t.getEl()).addClass(r+"in")}),b=!0),f(!0,t)}}),t.on("show",function(){t.parents().each(function(e){if(e.state.get("fixed"))return t.fixed(!0),!1})}),e.popover&&(t._preBodyHtml='<div class="'+t.classPrefix+'arrow"></div>',t.classes.add("popover").add("bottom").add(t.isRtl()?"end":"start")),t.aria("label",e.ariaLabel),t.aria("labelledby",t._id),t.aria("describedby",t.describedBy||t._id+"-none")},fixed:function(e){var t=this;if(t.state.get("fixed")!=e){if(t.state.get("rendered")){var n=r.getViewPort();e?t.layoutRect().y-=n.y:t.layoutRect().y+=n.y}t.classes.toggle("fixed",e),t.state.set("fixed",e)}return t},show:function(){var e=this,t,n=e._super();for(t=v.length;t--&&v[t]!==e;);return t===-1&&v.push(e),n},hide:function(){return p(this),f(!1,this),this._super()},hideAll:function(){C.hideAll()},close:function(){var e=this;return e.fire("close").isDefaultPrevented()||(e.remove(),f(!1,e)),e},remove:function(){p(this),this._super()},postRender:function(){var e=this;return e.settings.bodyRole&&this.getEl("body").setAttribute("role",e.settings.bodyRole),e._super()}});return C.hideAll=function(){for(var e=v.length;e--;){var t=v[e];t&&t.settings.autohide&&(t.hide(),v.splice(e,1))}},C}),r(Be,[Ae,ke,ve,g,_e,ye,d,c],function(e,t,n,r,i,o,a,s){function l(e){var t="width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0",n=r("meta[name=viewport]")[0],i;a.overrideViewPort!==!1&&(n||(n=document.createElement("meta"),n.setAttribute("name","viewport"),document.getElementsByTagName("head")[0].appendChild(n)),i=n.getAttribute("content"),i&&"undefined"!=typeof p&&(p=i),n.setAttribute("content",e?t:p))}function u(e,t){c()&&t===!1&&r([document.documentElement,document.body]).removeClass(e+"fullscreen")}function c(){for(var e=0;e<f.length;e++)if(f[e]._fullscreen)return!0;return!1}function d(){function e(){var e,t=n.getWindowSize(),r;for(e=0;e<f.length;e++)r=f[e].layoutRect(),f[e].moveTo(f[e].settings.x||Math.max(0,t.w/2-r.w/2),f[e].settings.y||Math.max(0,t.h/2-r.h/2))}if(!a.desktop){var t={w:window.innerWidth,h:window.innerHeight};s.setInterval(function(){var e=window.innerWidth,n=window.innerHeight;t.w==e&&t.h==n||(t={w:e,h:n},r(window).trigger("resize"))},100)}r(window).on("resize",e)}var f=[],p="",h=e.extend({modal:!0,Defaults:{border:1,layout:"flex",containerCls:"panel",role:"dialog",callbacks:{submit:function(){this.fire("submit",{data:this.toJSON()})},close:function(){this.close()}}},init:function(e){var r=this;r._super(e),r.isRtl()&&r.classes.add("rtl"),r.classes.add("window"),r.bodyClasses.add("window-body"),r.state.set("fixed",!0),e.buttons&&(r.statusbar=new t({layout:"flex",border:"1 0 0 0",spacing:3,padding:10,align:"center",pack:r.isRtl()?"start":"end",defaults:{type:"button"},items:e.buttons}),r.statusbar.classes.add("foot"),r.statusbar.parent(r)),r.on("click",function(e){var t=r.classPrefix+"close";(n.hasClass(e.target,t)||n.hasClass(e.target.parentNode,t))&&r.close()}),r.on("cancel",function(){r.close()}),r.aria("describedby",r.describedBy||r._id+"-none"),r.aria("label",e.title),r._fullscreen=!1},recalc:function(){var e=this,t=e.statusbar,r,i,o,a;e._fullscreen&&(e.layoutRect(n.getWindowSize()),e.layoutRect().contentH=e.layoutRect().innerH),e._super(),r=e.layoutRect(),e.settings.title&&!e._fullscreen&&(i=r.headerW,i>r.w&&(o=r.x-Math.max(0,i/2),e.layoutRect({w:i,x:o}),a=!0)),t&&(t.layoutRect({w:e.layoutRect().innerW}).recalc(),i=t.layoutRect().minW+r.deltaW,i>r.w&&(o=r.x-Math.max(0,i-r.w),e.layoutRect({w:i,x:o}),a=!0)),a&&e.recalc()},initLayoutRect:function(){var e=this,t=e._super(),r=0,i;if(e.settings.title&&!e._fullscreen){i=e.getEl("head");var o=n.getSize(i);t.headerW=o.width,t.headerH=o.height,r+=t.headerH}e.statusbar&&(r+=e.statusbar.layoutRect().h),t.deltaH+=r,t.minH+=r,t.h+=r;var a=n.getWindowSize();return t.x=e.settings.x||Math.max(0,a.w/2-t.w/2),t.y=e.settings.y||Math.max(0,a.h/2-t.h/2),t},renderHtml:function(){var e=this,t=e._layout,n=e._id,r=e.classPrefix,i=e.settings,o="",a="",s=i.html;return e.preRender(),t.preRender(e),i.title&&(o='<div id="'+n+'-head" class="'+r+'window-head"><div id="'+n+'-title" class="'+r+'title">'+e.encode(i.title)+'</div><div id="'+n+'-dragh" class="'+r+'dragh"></div><button type="button" class="'+r+'close" aria-hidden="true"><i class="mce-ico mce-i-remove"></i></button></div>'),i.url&&(s='<iframe src="'+i.url+'" tabindex="-1"></iframe>'),"undefined"==typeof s&&(s=t.renderHtml(e)),e.statusbar&&(a=e.statusbar.renderHtml()),'<div id="'+n+'" class="'+e.classes+'" hidefocus="1"><div class="'+e.classPrefix+'reset" role="application">'+o+'<div id="'+n+'-body" class="'+e.bodyClasses+'">'+s+"</div>"+a+"</div></div>"},fullscreen:function(e){var t=this,i=document.documentElement,a,l=t.classPrefix,u;if(e!=t._fullscreen)if(r(window).on("resize",function(){var e;if(t._fullscreen)if(a)t._timer||(t._timer=s.setTimeout(function(){var e=n.getWindowSize();t.moveTo(0,0).resizeTo(e.w,e.h),t._timer=0},50));else{e=(new Date).getTime();var r=n.getWindowSize();t.moveTo(0,0).resizeTo(r.w,r.h),(new Date).getTime()-e>50&&(a=!0)}}),u=t.layoutRect(),t._fullscreen=e,e){t._initial={x:u.x,y:u.y,w:u.w,h:u.h},t.borderBox=o.parseBox("0"),t.getEl("head").style.display="none",u.deltaH-=u.headerH+2,r([i,document.body]).addClass(l+"fullscreen"),t.classes.add("fullscreen");var c=n.getWindowSize();t.moveTo(0,0).resizeTo(c.w,c.h)}else t.borderBox=o.parseBox(t.settings.border),t.getEl("head").style.display="",u.deltaH+=u.headerH,r([i,document.body]).removeClass(l+"fullscreen"),t.classes.remove("fullscreen"),t.moveTo(t._initial.x,t._initial.y).resizeTo(t._initial.w,t._initial.h);return t.reflow()},postRender:function(){var e=this,t;setTimeout(function(){e.classes.add("in"),e.fire("open")},0),e._super(),e.statusbar&&e.statusbar.postRender(),e.focus(),this.dragHelper=new i(e._id+"-dragh",{start:function(){t={x:e.layoutRect().x,y:e.layoutRect().y}},drag:function(n){e.moveTo(t.x+n.deltaX,t.y+n.deltaY)}}),e.on("submit",function(t){t.isDefaultPrevented()||e.close()}),f.push(e),l(!0)},submit:function(){return this.fire("submit",{data:this.toJSON()})},remove:function(){var e=this,t;for(e.dragHelper.destroy(),e._super(),e.statusbar&&this.statusbar.remove(),u(e.classPrefix,!1),t=f.length;t--;)f[t]===e&&f.splice(t,1);l(f.length>0)},getContentWindow:function(){var e=this.getEl().getElementsByTagName("iframe")[0];return e?e.contentWindow:null}});return d(),h}),r(De,[Be],function(e){var t=e.extend({init:function(e){e={border:1,padding:20,layout:"flex",pack:"center",align:"center",containerCls:"panel",autoScroll:!0,buttons:{type:"button",text:"Ok",action:"ok"},items:{type:"label",multiline:!0,maxWidth:500,maxHeight:200}},this._super(e)},Statics:{OK:1,OK_CANCEL:2,YES_NO:3,YES_NO_CANCEL:4,msgBox:function(n){function r(e,t,n){return{type:"button",text:e,subtype:n?"primary":"",onClick:function(e){e.control.parents()[1].close(),o(t)}}}var i,o=n.callback||function(){};switch(n.buttons){
case t.OK_CANCEL:i=[r("Ok",!0,!0),r("Cancel",!1)];break;case t.YES_NO:case t.YES_NO_CANCEL:i=[r("Yes",1,!0),r("No",0)],n.buttons==t.YES_NO_CANCEL&&i.push(r("Cancel",-1));break;default:i=[r("Ok",!0,!0)]}return new e({padding:20,x:n.x,y:n.y,minWidth:300,minHeight:100,layout:"flex",pack:"center",align:"center",buttons:i,title:n.title,role:"alertdialog",items:{type:"label",multiline:!0,maxWidth:500,maxHeight:200,text:n.text},onPostRender:function(){this.aria("describedby",this.items()[0]._id)},onClose:n.onClose,onCancel:function(){o(!1)}}).renderTo(document.body).reflow()},alert:function(e,n){return"string"==typeof e&&(e={text:e}),e.callback=n,t.msgBox(e)},confirm:function(e,n){return"string"==typeof e&&(e={text:e}),e.callback=n,e.buttons=t.OK_CANCEL,t.msgBox(e)}}});return t}),r(Le,[Be,De],function(e,t){return function(n){function r(){if(s.length)return s[s.length-1]}function i(e){n.fire("OpenWindow",{win:e})}function o(e){n.fire("CloseWindow",{win:e})}var a=this,s=[];a.windows=s,n.on("remove",function(){for(var e=s.length;e--;)s[e].close()}),a.open=function(t,r){var a;return n.editorManager.setActive(n),t.title=t.title||" ",t.url=t.url||t.file,t.url&&(t.width=parseInt(t.width||320,10),t.height=parseInt(t.height||240,10)),t.body&&(t.items={defaults:t.defaults,type:t.bodyType||"form",items:t.body,data:t.data,callbacks:t.commands}),t.url||t.buttons||(t.buttons=[{text:"Ok",subtype:"primary",onclick:function(){a.find("form")[0].submit()}},{text:"Cancel",onclick:function(){a.close()}}]),a=new e(t),s.push(a),a.on("close",function(){for(var e=s.length;e--;)s[e]===a&&s.splice(e,1);s.length||n.focus(),o(a)}),t.data&&a.on("postRender",function(){this.find("*").each(function(e){var n=e.name();n in t.data&&e.value(t.data[n])})}),a.features=t||{},a.params=r||{},1===s.length&&n.nodeChanged(),a=a.renderTo().reflow(),i(a),a},a.alert=function(e,r,a){var s;s=t.alert(e,function(){r?r.call(a||this):n.focus()}),s.on("close",function(){o(s)}),i(s)},a.confirm=function(e,n,r){var a;a=t.confirm(e,function(e){n.call(r||this,e)}),a.on("close",function(){o(a)}),i(a)},a.close=function(){r()&&r().close()},a.getParams=function(){return r()?r().params:null},a.setParams=function(e){r()&&(r().params=e)},a.getWindows=function(){return s}}}),r(Me,[xe,Te],function(e,t){return e.extend({Mixins:[t],Defaults:{classes:"widget tooltip tooltip-n"},renderHtml:function(){var e=this,t=e.classPrefix;return'<div id="'+e._id+'" class="'+e.classes+'" role="presentation"><div class="'+t+'tooltip-arrow"></div><div class="'+t+'tooltip-inner">'+e.encode(e.state.get("text"))+"</div></div>"},bindStates:function(){var e=this;return e.state.on("change:text",function(t){e.getEl().lastChild.innerHTML=e.encode(t.value)}),e._super()},repaint:function(){var e=this,t,n;t=e.getEl().style,n=e._layoutRect,t.left=n.x+"px",t.top=n.y+"px",t.zIndex=131070}})}),r(Pe,[xe,Me],function(e,t){var n,r=e.extend({init:function(e){var t=this;t._super(e),e=t.settings,t.canFocus=!0,e.tooltip&&r.tooltips!==!1&&(t.on("mouseenter",function(n){var r=t.tooltip().moveTo(-65535);if(n.control==t){var i=r.text(e.tooltip).show().testMoveRel(t.getEl(),["bc-tc","bc-tl","bc-tr"]);r.classes.toggle("tooltip-n","bc-tc"==i),r.classes.toggle("tooltip-nw","bc-tl"==i),r.classes.toggle("tooltip-ne","bc-tr"==i),r.moveRel(t.getEl(),i)}else r.hide()}),t.on("mouseleave mousedown click",function(){t.tooltip().hide()})),t.aria("label",e.ariaLabel||e.tooltip)},tooltip:function(){return n||(n=new t({type:"tooltip"}),n.renderTo()),n},postRender:function(){var e=this,t=e.settings;e._super(),e.parent()||!t.width&&!t.height||(e.initLayoutRect(),e.repaint()),t.autofocus&&e.focus()},bindStates:function(){function e(e){n.aria("disabled",e),n.classes.toggle("disabled",e)}function t(e){n.aria("pressed",e),n.classes.toggle("active",e)}var n=this;return n.state.on("change:disabled",function(t){e(t.value)}),n.state.on("change:active",function(e){t(e.value)}),n.state.get("disabled")&&e(!0),n.state.get("active")&&t(!0),n._super()},remove:function(){this._super(),n&&(n.remove(),n=null)}});return r}),r(Oe,[Pe],function(e){return e.extend({Defaults:{value:0},init:function(e){var t=this;t._super(e),t.classes.add("progress"),t.settings.filter||(t.settings.filter=function(e){return Math.round(e)})},renderHtml:function(){var e=this,t=e._id,n=this.classPrefix;return'<div id="'+t+'" class="'+e.classes+'"><div class="'+n+'bar-container"><div class="'+n+'bar"></div></div><div class="'+n+'text">0%</div></div>'},postRender:function(){var e=this;return e._super(),e.value(e.settings.value),e},bindStates:function(){function e(e){e=t.settings.filter(e),t.getEl().lastChild.innerHTML=e+"%",t.getEl().firstChild.firstChild.style.width=e+"%"}var t=this;return t.state.on("change:value",function(t){e(t.value)}),e(t.state.get("value")),t._super()}})}),r(He,[xe,Te,Oe,c],function(e,t,n,r){return e.extend({Mixins:[t],Defaults:{classes:"widget notification"},init:function(e){var t=this;t._super(e),e.text&&t.text(e.text),e.icon&&(t.icon=e.icon),e.color&&(t.color=e.color),e.type&&t.classes.add("notification-"+e.type),e.timeout&&(e.timeout<0||e.timeout>0)&&!e.closeButton?t.closeButton=!1:(t.classes.add("has-close"),t.closeButton=!0),e.progressBar&&(t.progressBar=new n),t.on("click",function(e){e.target.className.indexOf(t.classPrefix+"close")!=-1&&t.close()})},renderHtml:function(){var e=this,t=e.classPrefix,n="",r="",i="",o="";return e.icon&&(n='<i class="'+t+"ico "+t+"i-"+e.icon+'"></i>'),e.color&&(o=' style="background-color: '+e.color+'"'),e.closeButton&&(r='<button type="button" class="'+t+'close" aria-hidden="true">\xd7</button>'),e.progressBar&&(i=e.progressBar.renderHtml()),'<div id="'+e._id+'" class="'+e.classes+'"'+o+' role="presentation">'+n+'<div class="'+t+'notification-inner">'+e.state.get("text")+"</div>"+i+r+"</div>"},postRender:function(){var e=this;return r.setTimeout(function(){e.$el.addClass(e.classPrefix+"in")}),e._super()},bindStates:function(){var e=this;return e.state.on("change:text",function(t){e.getEl().childNodes[1].innerHTML=t.value}),e.progressBar&&e.progressBar.bindStates(),e._super()},close:function(){var e=this;return e.fire("close").isDefaultPrevented()||e.remove(),e},repaint:function(){var e=this,t,n;t=e.getEl().style,n=e._layoutRect,t.left=n.x+"px",t.top=n.y+"px",t.zIndex=65534}})}),r(Ie,[He,c,m],function(e,t,n){return function(r){function i(){if(f.length)return f[f.length-1]}function o(){t.requestAnimationFrame(function(){a(),s()})}function a(){for(var e=0;e<f.length;e++)f[e].moveTo(0,0)}function s(){if(f.length>0){var e=f.slice(0,1)[0],t=r.inline?r.getElement():r.getContentAreaContainer();if(e.moveRel(t,"tc-tc"),f.length>1)for(var n=1;n<f.length;n++)f[n].moveRel(f[n-1].getEl(),"bc-tc")}}function l(e,t){if(!c(t))return null;var r=n.grep(e,function(e){return u(t,e)});return 0===r.length?null:r[0]}function u(e,t){return e.type===t.settings.type&&e.text===t.settings.text}function c(e){return!e.progressBar&&!e.timeout}var d=this,f=[];d.notifications=f,r.on("remove",function(){for(var e=f.length;e--;)f[e].close()}),r.on("ResizeEditor",s),r.on("ResizeWindow",o),d.open=function(t){if(!r.removed){var n;r.editorManager.setActive(r);var i=l(f,t);return null===i?(n=new e(t),f.push(n),t.timeout>0&&(n.timer=setTimeout(function(){n.close()},t.timeout)),n.on("close",function(){var e=f.length;for(n.timer&&r.getWin().clearTimeout(n.timer);e--;)f[e]===n&&f.splice(e,1);s()}),n.renderTo(),s()):n=i,n}},d.close=function(){i()&&i().close()},d.getNotifications=function(){return f},r.on("SkinLoaded",function(){var e=r.settings.service_message;e&&r.notificationManager.open({text:e,type:"warning",timeout:0,icon:""})})}}),r(Fe,[w],function(e){function t(t,n,r){for(var i=[];n&&n!=t;n=n.parentNode)i.push(e.nodeIndex(n,r));return i}function n(e,t){var n,r,i;for(r=e,n=t.length-1;n>=0;n--){if(i=r.childNodes,t[n]>i.length-1)return null;r=i[t[n]]}return r}return{create:t,resolve:n}}),r(ze,[I,T,y,Fe,A,C,d,m,c,k,$,oe],function(e,t,n,r,i,o,a,s,l,u,c,d){return function(f){function p(e,t){try{f.getDoc().execCommand(e,!1,t)}catch(n){}}function h(){var e=f.getDoc().documentMode;return e?e:6}function m(e){return e.isDefaultPrevented()}function g(e){var t,n;e.dataTransfer&&(f.selection.isCollapsed()&&"IMG"==e.target.tagName&&re.select(e.target),t=f.selection.getContent(),t.length>0&&(n=ce+escape(f.id)+","+escape(t),e.dataTransfer.setData(de,n)))}function v(e){var t;return e.dataTransfer&&(t=e.dataTransfer.getData(de),t&&t.indexOf(ce)>=0)?(t=t.substr(ce.length).split(","),{id:unescape(t[0]),html:unescape(t[1])}):null}function y(e){f.queryCommandSupported("mceInsertClipboardContent")?f.execCommand("mceInsertClipboardContent",!1,{content:e}):f.execCommand("mceInsertContent",!1,e)}function b(){function i(e){var t=x.schema.getBlockElements(),n=f.getBody();if("BR"!=e.nodeName)return!1;for(;e!=n&&!t[e.nodeName];e=e.parentNode)if(e.nextSibling)return!1;return!0}function o(e,t){var n;for(n=e.nextSibling;n&&n!=t;n=n.nextSibling)if((3!=n.nodeType||0!==Z.trim(n.data).length)&&n!==t)return!1;return n===t}function a(e,t,r){var o,a,s;if(x.isChildOf(e,f.getBody()))for(s=x.schema.getNonEmptyElements(),o=new n(r||e,e);a=o[t?"next":"prev"]();){if(s[a.nodeName]&&!i(a))return a;if(3==a.nodeType&&a.data.length>0)return a}}function u(e){var n,r,i,o,s;if(!e.collapsed&&(n=x.getParent(t.getNode(e.startContainer,e.startOffset),x.isBlock),r=x.getParent(t.getNode(e.endContainer,e.endOffset),x.isBlock),s=f.schema.getTextBlockElements(),n!=r&&s[n.nodeName]&&s[r.nodeName]&&"false"!==x.getContentEditable(n)&&"false"!==x.getContentEditable(r)))return e.deleteContents(),i=a(n,!1),o=a(r,!0),x.isEmpty(r)||Z(n).append(r.childNodes),Z(r).remove(),i?1==i.nodeType?"BR"==i.nodeName?(e.setStartBefore(i),e.setEndBefore(i)):(e.setStartAfter(i),e.setEndAfter(i)):(e.setStart(i,i.data.length),e.setEnd(i,i.data.length)):o&&(1==o.nodeType?(e.setStartBefore(o),e.setEndBefore(o)):(e.setStart(o,0),e.setEnd(o,0))),w.setRng(e),!0}function c(e,n){var r,i,s,l,u,c;if(!e.collapsed)return e;if(u=e.startContainer,c=e.startOffset,3==u.nodeType)if(n){if(c<u.data.length)return e}else if(c>0)return e;r=t.getNode(u,c),s=x.getParent(r,x.isBlock),i=a(f.getBody(),n,r),l=x.getParent(i,x.isBlock);var d=1===u.nodeType&&c>u.childNodes.length-1;if(!r||!i)return e;if(l&&s!=l)if(n){if(!o(s,l))return e;1==r.nodeType?"BR"==r.nodeName?e.setStartBefore(r):e.setStartAfter(r):e.setStart(r,r.data.length),1==i.nodeType?e.setEnd(i,0):e.setEndBefore(i)}else{if(!o(l,s))return e;1==i.nodeType?"BR"==i.nodeName?e.setStartBefore(i):e.setStartAfter(i):e.setStart(i,i.data.length),1==r.nodeType&&d?e.setEndAfter(r):e.setEndBefore(r)}return e}function d(e){var t=w.getRng();if(t=c(t,e),u(t))return!0}function p(e,t){function n(e,n){return m=Z(n).parents().filter(function(e,t){return!!f.schema.getTextInlineElements()[t.nodeName]}),l=e.cloneNode(!1),m=s.map(m,function(e){return e=e.cloneNode(!1),l.hasChildNodes()?(e.appendChild(l.firstChild),l.appendChild(e)):l.appendChild(e),l.appendChild(e),e}),m.length?(h=x.create("br"),m[0].appendChild(h),x.replace(l,e),t.setStartBefore(h),t.setEndBefore(h),f.selection.setRng(t),h):null}function i(e){return e&&f.schema.getTextBlockElements()[e.tagName]}var o,a,l,u,c,d,p,h,m;if(t.collapsed&&(d=t.startContainer,p=t.startOffset,a=x.getParent(d,x.isBlock),i(a)))if(1==d.nodeType){if(d=d.childNodes[p],d&&"BR"!=d.tagName)return;if(c=e?a.nextSibling:a.previousSibling,x.isEmpty(a)&&i(c)&&x.isEmpty(c)&&n(a,d))return x.remove(c),!0}else if(3==d.nodeType){if(o=r.create(a,d),u=a.cloneNode(!0),d=r.resolve(u,o),e){if(p>=d.data.length)return;d.deleteData(p,1)}else{if(p<=0)return;d.deleteData(p-1,1)}if(x.isEmpty(u))return n(a,d)}}function h(e){var t,n,r;d(e)||(s.each(f.getBody().getElementsByTagName("*"),function(e){"SPAN"==e.tagName&&e.setAttribute("mce-data-marked",1),!e.hasAttribute("data-mce-style")&&e.hasAttribute("style")&&f.dom.setAttrib(e,"style",f.dom.getAttrib(e,"style"))}),t=new E(function(){}),t.observe(f.getDoc(),{childList:!0,attributes:!0,subtree:!0,attributeFilter:["style"]}),f.getDoc().execCommand(e?"ForwardDelete":"Delete",!1,null),n=f.selection.getRng(),r=n.startContainer.parentNode,s.each(t.takeRecords(),function(e){if(x.isChildOf(e.target,f.getBody())){if("style"==e.attributeName){var t=e.target.getAttribute("data-mce-style");t?e.target.setAttribute("style",t):e.target.removeAttribute("style")}s.each(e.addedNodes,function(e){if("SPAN"==e.nodeName&&!e.getAttribute("mce-data-marked")){var t,i;e==r&&(t=n.startOffset,i=e.firstChild),x.remove(e,!0),i&&(n.setStart(i,t),n.setEnd(i,t),f.selection.setRng(n))}})}}),t.disconnect(),s.each(f.dom.select("span[mce-data-marked]"),function(e){e.removeAttribute("mce-data-marked")}))}function b(e){f.undoManager.transact(function(){h(e)})}var C=f.getDoc(),x=f.dom,w=f.selection,E=window.MutationObserver,N,_;E||(N=!0,E=function(){function e(e){var t=e.relatedNode||e.target;n.push({target:t,addedNodes:[t]})}function t(e){var t=e.relatedNode||e.target;n.push({target:t,attributeName:e.attrName})}var n=[],r;this.observe=function(n){r=n,r.addEventListener("DOMSubtreeModified",e,!1),r.addEventListener("DOMNodeInsertedIntoDocument",e,!1),r.addEventListener("DOMNodeInserted",e,!1),r.addEventListener("DOMAttrModified",t,!1)},this.disconnect=function(){r.removeEventListener("DOMSubtreeModified",e,!1),r.removeEventListener("DOMNodeInsertedIntoDocument",e,!1),r.removeEventListener("DOMNodeInserted",e,!1),r.removeEventListener("DOMAttrModified",t,!1)},this.takeRecords=function(){return n}}),f.on("keydown",function(e){var t=e.keyCode==te,n=e.ctrlKey||e.metaKey;if(!m(e)&&(t||e.keyCode==ee)){var r=f.selection.getRng(),i=r.startContainer,o=r.startOffset;if(t&&e.shiftKey)return;if(p(t,r))return void e.preventDefault();if(!n&&r.collapsed&&3==i.nodeType&&(t?o<i.data.length:o>0))return;e.preventDefault(),n&&f.selection.getSel().modify("extend",t?"forward":"backward",e.metaKey?"lineboundary":"word"),h(t)}}),f.on("keypress",function(t){if(!m(t)&&!w.isCollapsed()&&t.charCode>31&&!e.metaKeyPressed(t)){var n,r,i,o,a,s;n=f.selection.getRng(),s=String.fromCharCode(t.charCode),t.preventDefault(),r=Z(n.startContainer).parents().filter(function(e,t){return!!f.schema.getTextInlineElements()[t.nodeName]}),h(!0),r=r.filter(function(e,t){return!Z.contains(f.getBody(),t)}),r.length?(i=x.createFragment(),r.each(function(e,t){t=t.cloneNode(!1),i.hasChildNodes()?(t.appendChild(i.firstChild),i.appendChild(t)):(a=t,i.appendChild(t)),i.appendChild(t)}),a.appendChild(f.getDoc().createTextNode(s)),o=x.getParent(n.startContainer,x.isBlock),x.isEmpty(o)?Z(o).empty().append(i):n.insertNode(i),n.setStart(a.firstChild,1),n.setEnd(a.firstChild,1),f.selection.setRng(n)):f.selection.setContent(s)}}),f.addCommand("Delete",function(){h()}),f.addCommand("ForwardDelete",function(){h(!0)}),N||(f.on("dragstart",function(e){_=w.getRng(),g(e)}),f.on("drop",function(e){if(!m(e)){var n=v(e);n&&(e.preventDefault(),l.setEditorTimeout(f,function(){var r=t.getCaretRangeFromPoint(e.x,e.y,C);_&&(w.setRng(_),_=null,b()),w.setRng(r),y(n.html)}))}}),f.on("cut",function(e){m(e)||!e.clipboardData||f.selection.isCollapsed()||(e.preventDefault(),e.clipboardData.clearData(),e.clipboardData.setData("text/html",f.selection.getContent()),e.clipboardData.setData("text/plain",f.selection.getContent({format:"text"})),l.setEditorTimeout(f,function(){b(!0)}))}))}function C(){function e(e){var t=ne.create("body"),n=e.cloneContents();return t.appendChild(n),re.serializer.serialize(t,{format:"html"})}function n(n){if(!n.setStart){if(n.item)return!1;var r=n.duplicate();return r.moveToElementText(f.getBody()),t.compareRanges(n,r)}var i=e(n),o=ne.createRng();o.selectNode(f.getBody());var a=e(o);return i===a}f.on("keydown",function(e){var t=e.keyCode,r,i;if(!m(e)&&(t==te||t==ee)){if(r=f.selection.isCollapsed(),i=f.getBody(),r&&!ne.isEmpty(i))return;if(!r&&!n(f.selection.getRng()))return;e.preventDefault(),f.setContent(""),i.firstChild&&ne.isBlock(i.firstChild)?f.selection.setCursorLocation(i.firstChild,0):f.selection.setCursorLocation(i,0),f.nodeChanged()}})}function x(){f.shortcuts.add("meta+a",null,"SelectAll")}function w(){f.settings.content_editable||ne.bind(f.getDoc(),"mousedown mouseup",function(e){var t;if(e.target==f.getDoc().documentElement)if(t=re.getRng(),f.getBody().focus(),"mousedown"==e.type){if(u.isCaretContainer(t.startContainer))return;re.placeCaretAt(e.clientX,e.clientY)}else re.setRng(t)})}function E(){f.on("keydown",function(e){if(!m(e)&&e.keyCode===ee){if(!f.getBody().getElementsByTagName("hr").length)return;if(re.isCollapsed()&&0===re.getRng(!0).startOffset){var t=re.getNode(),n=t.previousSibling;if("HR"==t.nodeName)return ne.remove(t),void e.preventDefault();n&&n.nodeName&&"hr"===n.nodeName.toLowerCase()&&(ne.remove(n),e.preventDefault())}}})}function N(){window.Range.prototype.getClientRects||f.on("mousedown",function(e){if(!m(e)&&"HTML"===e.target.nodeName){var t=f.getBody();t.blur(),l.setEditorTimeout(f,function(){t.focus()})}})}function _(){f.on("click",function(e){var t=e.target;/^(IMG|HR)$/.test(t.nodeName)&&"false"!==ne.getContentEditableParent(t)&&(e.preventDefault(),re.select(t),f.nodeChanged()),"A"==t.nodeName&&ne.hasClass(t,"mce-item-anchor")&&(e.preventDefault(),re.select(t))})}function S(){function e(){var e=ne.getAttribs(re.getStart().cloneNode(!1));return function(){var t=re.getStart();t!==f.getBody()&&(ne.setAttrib(t,"style",null),Q(e,function(e){t.setAttributeNode(e.cloneNode(!0))}))}}function t(){return!re.isCollapsed()&&ne.getParent(re.getStart(),ne.isBlock)!=ne.getParent(re.getEnd(),ne.isBlock)}f.on("keypress",function(n){var r;if(!m(n)&&(8==n.keyCode||46==n.keyCode)&&t())return r=e(),f.getDoc().execCommand("delete",!1,null),r(),n.preventDefault(),!1}),ne.bind(f.getDoc(),"cut",function(n){var r;!m(n)&&t()&&(r=e(),l.setEditorTimeout(f,function(){r()}))})}function k(){document.body.setAttribute("role","application")}function T(){f.on("keydown",function(e){if(!m(e)&&e.keyCode===ee&&re.isCollapsed()&&0===re.getRng(!0).startOffset){var t=re.getNode().previousSibling;if(t&&t.nodeName&&"table"===t.nodeName.toLowerCase())return e.preventDefault(),!1}})}function R(){h()>7||(p("RespectVisibilityInDesign",!0),f.contentStyles.push(".mceHideBrInPre pre br {display: none}"),ne.addClass(f.getBody(),"mceHideBrInPre"),oe.addNodeFilter("pre",function(e){for(var t=e.length,n,r,o,a;t--;)for(n=e[t].getAll("br"),r=n.length;r--;)o=n[r],a=o.prev,a&&3===a.type&&"\n"!=a.value.charAt(a.value-1)?a.value+="\n":o.parent.insert(new i("#text",3),o,!0).value="\n"}),ae.addNodeFilter("pre",function(e){for(var t=e.length,n,r,i,o;t--;)for(n=e[t].getAll("br"),r=n.length;r--;)i=n[r],o=i.prev,o&&3==o.type&&(o.value=o.value.replace(/\r?\n$/,""))}))}function A(){ne.bind(f.getBody(),"mouseup",function(){var e,t=re.getNode();"IMG"==t.nodeName&&((e=ne.getStyle(t,"width"))&&(ne.setAttrib(t,"width",e.replace(/[^0-9%]+/g,"")),ne.setStyle(t,"width","")),(e=ne.getStyle(t,"height"))&&(ne.setAttrib(t,"height",e.replace(/[^0-9%]+/g,"")),ne.setStyle(t,"height","")))})}function B(){f.on("keydown",function(t){var n,r,i,o,a;if(!m(t)&&t.keyCode==e.BACKSPACE&&(n=re.getRng(),r=n.startContainer,i=n.startOffset,o=ne.getRoot(),a=r,n.collapsed&&0===i)){for(;a&&a.parentNode&&a.parentNode.firstChild==a&&a.parentNode!=o;)a=a.parentNode;"BLOCKQUOTE"===a.tagName&&(f.formatter.toggle("blockquote",null,a),n=ne.createRng(),n.setStart(r,0),n.setEnd(r,0),re.setRng(n))}})}function D(){function e(){K(),p("StyleWithCSS",!1),p("enableInlineTableEditing",!1),ie.object_resizing||p("enableObjectResizing",!1)}ie.readonly||f.on("BeforeExecCommand MouseDown",e)}function L(){function e(){Q(ne.select("a"),function(e){var t=e.parentNode,n=ne.getRoot();if(t.lastChild===e){for(;t&&!ne.isBlock(t);){if(t.parentNode.lastChild!==t||t===n)return;t=t.parentNode}ne.add(t,"br",{"data-mce-bogus":1})}})}f.on("SetContent ExecCommand",function(t){"setcontent"!=t.type&&"mceInsertLink"!==t.command||e()})}function M(){ie.forced_root_block&&f.on("init",function(){p("DefaultParagraphSeparator",ie.forced_root_block)})}function P(){f.on("keydown",function(e){var t;m(e)||e.keyCode!=ee||(t=f.getDoc().selection.createRange(),t&&t.item&&(e.preventDefault(),f.undoManager.beforeChange(),ne.remove(t.item(0)),f.undoManager.add()))})}function O(){var e;h()>=10&&(e="",Q("p div h1 h2 h3 h4 h5 h6".split(" "),function(t,n){e+=(n>0?",":"")+t+":empty"}),f.contentStyles.push(e+"{padding-right: 1px !important}"))}function H(){h()<9&&(oe.addNodeFilter("noscript",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.firstChild,r&&n.attr("data-mce-innertext",r.value)}),ae.addNodeFilter("noscript",function(e){for(var t=e.length,n,r,a;t--;)n=e[t],r=e[t].firstChild,r?r.value=o.decode(r.value):(a=n.attributes.map["data-mce-innertext"],a&&(n.attr("data-mce-innertext",null),r=new i("#text",3),r.value=a,r.raw=!0,n.append(r)))}))}function I(){function e(e,t){var n=i.createTextRange();try{n.moveToPoint(e,t)}catch(r){n=null}return n}function t(t){var r;t.button?(r=e(t.x,t.y),r&&(r.compareEndPoints("StartToStart",a)>0?r.setEndPoint("StartToStart",a):r.setEndPoint("EndToEnd",a),r.select())):n()}function n(){var e=r.selection.createRange();a&&!e.item&&0===e.compareEndPoints("StartToEnd",e)&&a.select(),ne.unbind(r,"mouseup",n),ne.unbind(r,"mousemove",t),a=o=0}var r=ne.doc,i=r.body,o,a,s;r.documentElement.unselectable=!0,ne.bind(r,"mousedown contextmenu",function(i){if("HTML"===i.target.nodeName){if(o&&n(),s=r.documentElement,s.scrollHeight>s.clientHeight)return;o=1,a=e(i.x,i.y),a&&(ne.bind(r,"mouseup",n),ne.bind(r,"mousemove",t),ne.getRoot().focus(),a.select())}})}function F(){f.on("keyup focusin mouseup",function(t){65==t.keyCode&&e.metaKeyPressed(t)||re.normalize()},!0)}function z(){f.contentStyles.push("img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")}function U(){f.inline||f.on("keydown",function(){document.activeElement==document.body&&f.getWin().focus()})}function W(){f.inline||(f.contentStyles.push("body {min-height: 150px}"),f.on("click",function(e){var t;if("HTML"==e.target.nodeName){if(a.ie>11)return void f.getBody().focus();t=f.selection.getRng(),f.getBody().focus(),f.selection.setRng(t),f.selection.normalize(),f.nodeChanged()}}))}function V(){a.mac&&f.on("keydown",function(t){!e.metaKeyPressed(t)||t.shiftKey||37!=t.keyCode&&39!=t.keyCode||(t.preventDefault(),f.selection.getSel().modify("move",37==t.keyCode?"backward":"forward","lineboundary"))})}function $(){p("AutoUrlDetect",!1)}function q(){f.on("click",function(e){var t=e.target;do if("A"===t.tagName)return void e.preventDefault();while(t=t.parentNode)}),f.contentStyles.push(".mce-content-body {-webkit-touch-callout: none}")}function j(){f.on("init",function(){f.dom.bind(f.getBody(),"submit",function(e){e.preventDefault()})})}function Y(){oe.addNodeFilter("br",function(e){for(var t=e.length;t--;)"Apple-interchange-newline"==e[t].attr("class")&&e[t].remove()})}function X(){f.on("dragstart",function(e){g(e)}),f.on("drop",function(e){if(!m(e)){var n=v(e);if(n&&n.id!=f.id){e.preventDefault();var r=t.getCaretRangeFromPoint(e.x,e.y,f.getDoc());re.setRng(r),y(n.html)}}})}function K(){}function G(){var e;return se?(e=f.selection.getSel(),!e||!e.rangeCount||0===e.rangeCount):0}function J(){function t(e){var t=new d(e.getBody()),n=e.selection.getRng(),r=c.fromRangeStart(n),i=c.fromRangeEnd(n),o=t.prev(r),a=t.next(i);return!e.selection.isCollapsed()&&(!o||o.isAtStart()&&r.isEqual(o))&&(!a||a.isAtEnd()&&r.isEqual(a))}f.on("keypress",function(n){!m(n)&&!re.isCollapsed()&&n.charCode>31&&!e.metaKeyPressed(n)&&t(f)&&(n.preventDefault(),f.setContent(String.fromCharCode(n.charCode)),f.selection.select(f.getBody(),!0),f.selection.collapse(!1),f.nodeChanged())}),f.on("keydown",function(e){var n=e.keyCode;m(e)||n!=te&&n!=ee||t(f)&&(e.preventDefault(),f.setContent(""),f.nodeChanged())})}var Q=s.each,Z=f.$,ee=e.BACKSPACE,te=e.DELETE,ne=f.dom,re=f.selection,ie=f.settings,oe=f.parser,ae=f.serializer,se=a.gecko,le=a.ie,ue=a.webkit,ce="data:text/mce-internal,",de=le?"Text":"URL";return B(),C(),a.windowsPhone||F(),ue&&(J(),b(),w(),_(),M(),j(),T(),Y(),a.iOS?(U(),W(),q()):x()),le&&a.ie<11&&(E(),k(),R(),A(),P(),O(),H(),I()),a.ie>=11&&(W(),T()),a.ie&&(x(),$(),X()),se&&(J(),E(),N(),S(),D(),L(),z(),V(),T()),{refreshContentEditable:K,isHidden:G}}}),r(Ue,[pe,w,m],function(e,t,n){function r(e,t){return"selectionchange"==t?e.getDoc():!e.inline&&/^mouse|touch|click|contextmenu|drop|dragover|dragend/.test(t)?e.getDoc().documentElement:e.settings.event_root?(e.eventRoot||(e.eventRoot=o.select(e.settings.event_root)[0]),e.eventRoot):e.getBody()}function i(e,t){function n(e){return!e.hidden&&!e.readonly}var i=r(e,t),s;if(e.delegates||(e.delegates={}),!e.delegates[t])if(e.settings.event_root){if(a||(a={},e.editorManager.on("removeEditor",function(){var t;if(!e.editorManager.activeEditor&&a){for(t in a)e.dom.unbind(r(e,t));a=null}})),a[t])return;s=function(r){for(var i=r.target,a=e.editorManager.editors,s=a.length;s--;){var l=a[s].getBody();(l===i||o.isChildOf(i,l))&&n(a[s])&&a[s].fire(t,r)}},a[t]=s,o.bind(i,t,s)}else s=function(r){n(e)&&e.fire(t,r)},o.bind(i,t,s),e.delegates[t]=s}var o=t.DOM,a,s={bindPendingEventDelegates:function(){var e=this;n.each(e._pendingNativeEvents,function(t){i(e,t)})},toggleNativeEvent:function(e,t){var n=this;"focus"!=e&&"blur"!=e&&(t?n.initialized?i(n,e):n._pendingNativeEvents?n._pendingNativeEvents.push(e):n._pendingNativeEvents=[e]:n.initialized&&(n.dom.unbind(r(n,e),e,n.delegates[e]),delete n.delegates[e]))},unbindAllNativeEvents:function(){var e=this,t;if(e.delegates){for(t in e.delegates)e.dom.unbind(r(e,t),t,e.delegates[t]);delete e.delegates}e.inline||(e.getBody().onload=null,e.dom.unbind(e.getWin()),e.dom.unbind(e.getDoc())),e.dom.unbind(e.getBody()),e.dom.unbind(e.getContainer())}};return s=n.extend({},e,s)}),r(We,[],function(){function e(e,t,n){try{e.getDoc().execCommand(t,!1,n)}catch(r){}}function t(e){var t,n;return t=e.getBody(),n=function(t){e.dom.getParents(t.target,"a").length>0&&t.preventDefault()},e.dom.bind(t,"click",n),{unbind:function(){e.dom.unbind(t,"click",n)}}}function n(n,r){n._clickBlocker&&(n._clickBlocker.unbind(),n._clickBlocker=null),r?(n._clickBlocker=t(n),n.selection.controlSelection.hideResizeRect(),n.readonly=!0,n.getBody().contentEditable=!1):(n.readonly=!1,n.getBody().contentEditable=!0,e(n,"StyleWithCSS",!1),e(n,"enableInlineTableEditing",!1),e(n,"enableObjectResizing",!1),n.focus(),n.nodeChanged())}function r(e,t){var r=e.readonly?"readonly":"design";t!=r&&(e.initialized?n(e,"readonly"==t):e.on("init",function(){n(e,"readonly"==t)}),e.fire("SwitchMode",{mode:t}))}return{setMode:r}}),r(Ve,[m,d],function(e,t){var n=e.each,r=e.explode,i={f9:120,f10:121,f11:122},o=e.makeMap("alt,ctrl,shift,meta,access");return function(a){function s(e){var a,s,l={};n(r(e,"+"),function(e){e in o?l[e]=!0:/^[0-9]{2,}$/.test(e)?l.keyCode=parseInt(e,10):(l.charCode=e.charCodeAt(0),l.keyCode=i[e]||e.toUpperCase().charCodeAt(0))}),a=[l.keyCode];for(s in o)l[s]?a.push(s):l[s]=!1;return l.id=a.join(","),l.access&&(l.alt=!0,t.mac?l.ctrl=!0:l.shift=!0),l.meta&&(t.mac?l.meta=!0:(l.ctrl=!0,l.meta=!1)),l}function l(t,n,i,o){var l;return l=e.map(r(t,">"),s),l[l.length-1]=e.extend(l[l.length-1],{func:i,scope:o||a}),e.extend(l[0],{desc:a.translate(n),subpatterns:l.slice(1)})}function u(e){return e.altKey||e.ctrlKey||e.metaKey}function c(e){return"keydown"===e.type&&e.keyCode>=112&&e.keyCode<=123}function d(e,t){return!!t&&(t.ctrl==e.ctrlKey&&t.meta==e.metaKey&&(t.alt==e.altKey&&t.shift==e.shiftKey&&(!!(e.keyCode==t.keyCode||e.charCode&&e.charCode==t.charCode)&&(e.preventDefault(),!0))))}function f(e){return e.func?e.func.call(e.scope):null}var p=this,h={},m=[];a.on("keyup keypress keydown",function(e){!u(e)&&!c(e)||e.isDefaultPrevented()||(n(h,function(t){if(d(e,t))return m=t.subpatterns.slice(0),"keydown"==e.type&&f(t),!0}),d(e,m[0])&&(1===m.length&&"keydown"==e.type&&f(m[0]),m.shift()))}),p.add=function(t,i,o,s){var u;return u=o,"string"==typeof o?o=function(){a.execCommand(u,!1,null)}:e.isArray(u)&&(o=function(){a.execCommand(u[0],u[1],u[2])}),n(r(e.trim(t.toLowerCase())),function(e){var t=l(e,i,o,s);h[t.id]=t}),!0},p.remove=function(e){var t=l(e);return!!h[t.id]&&(delete h[t.id],!0)}}}),r($e,[u,m,z],function(e,t,n){return function(r,i){function o(e){var t,n;return n={"image/jpeg":"jpg","image/jpg":"jpg","image/gif":"gif","image/png":"png"},t=n[e.blob().type.toLowerCase()]||"dat",e.filename()+"."+t}function a(e,t){return e?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):t}function s(e){return{id:e.id,blob:e.blob,base64:e.base64,filename:n.constant(o(e))}}function l(e,t,n,r){var o,s;o=new XMLHttpRequest,o.open("POST",i.url),o.withCredentials=i.credentials,o.upload.onprogress=function(e){r(e.loaded/e.total*100)},o.onerror=function(){n("Image upload failed due to a XHR Transport error. Code: "+o.status)},o.onload=function(){var e;return 200!=o.status?void n("HTTP Error: "+o.status):(e=JSON.parse(o.responseText),e&&"string"==typeof e.location?void t(a(i.basePath,e.location)):void n("Invalid JSON: "+o.responseText))},s=new FormData,s.append("file",e.blob(),e.filename()),o.send(s)}function u(){return new e(function(e){e([])})}function c(e,t){return{url:t,blobInfo:e,status:!0}}function d(e,t){return{url:"",blobInfo:e,status:!1,error:t}}function f(e,n){t.each(y[e],function(e){e(n)}),delete y[e]}function p(t,n,i){return r.markPending(t.blobUri()),new e(function(e){var o,a,l=function(){};try{var u=function(){o&&(o.close(),a=l)},p=function(n){u(),r.markUploaded(t.blobUri(),n),f(t.blobUri(),c(t,n)),e(c(t,n))},h=function(n){u(),r.removeFailed(t.blobUri()),f(t.blobUri(),d(t,n)),e(d(t,n))};a=function(e){e<0||e>100||(o||(o=i()),o.progressBar.value(e))},n(s(t),p,h,a)}catch(m){e(d(t,m.message))}})}function h(e){return e===l}function m(t){var n=t.blobUri();return new e(function(e){y[n]=y[n]||[],y[n].push(e)})}function g(n,o){return n=t.grep(n,function(e){return!r.isUploaded(e.blobUri())}),e.all(t.map(n,function(e){return r.isPending(e.blobUri())?m(e):p(e,i.handler,o)}))}function v(e,t){return!i.url&&h(i.handler)?u():g(e,t)}var y={};return i=t.extend({credentials:!1,handler:l},i),{upload:v}}}),r(qe,[u],function(e){function t(t){return new e(function(e){var n=new XMLHttpRequest;n.open("GET",t,!0),n.responseType="blob",n.onload=function(){200==this.status&&e(this.response)},n.send()})}function n(e){var t,n;return e=decodeURIComponent(e).split(","),n=/data:([^;]+)/.exec(e[0]),n&&(t=n[1]),{type:t,data:e[1]}}function r(t){return new e(function(e){var r,i,o;t=n(t);try{r=atob(t.data)}catch(a){return void e(new Blob([]))}for(i=new Uint8Array(r.length),o=0;o<i.length;o++)i[o]=r.charCodeAt(o);e(new Blob([i],{type:t.type}))})}function i(e){return 0===e.indexOf("blob:")?t(e):0===e.indexOf("data:")?r(e):null}function o(t){return new e(function(e){var n=new FileReader;n.onloadend=function(){e(n.result)},n.readAsDataURL(t)})}return{uriToBlob:i,blobToDataUri:o,parseDataUri:n}}),r(je,[u,h,z,qe,d],function(e,t,n,r,i){var o=0,a=function(e){return(e||"blobid")+o++};return function(o,s){function l(l,c){function d(e,t){var n,i;return 0===e.src.indexOf("blob:")?(i=s.getByUri(e.src),void(i?t({image:e,blobInfo:i}):r.uriToBlob(e.src).then(function(o){r.blobToDataUri(o).then(function(l){n=r.parseDataUri(l).data,i=s.create(a(),o,n),s.add(i),t({image:e,blobInfo:i})})}))):(n=r.parseDataUri(e.src).data,i=s.findFirst(function(e){return e.base64()===n}),void(i?t({image:e,blobInfo:i}):r.uriToBlob(e.src).then(function(r){i=s.create(a(),r,n),s.add(i),t({image:e,blobInfo:i})})))}var f,p;return c||(c=n.constant(!0)),f=t.filter(l.getElementsByTagName("img"),function(e){var t=e.src;return!!i.fileApi&&(!e.hasAttribute("data-mce-bogus")&&(!e.hasAttribute("data-mce-placeholder")&&(!(!t||t==i.transparentSrc)&&(0===t.indexOf("blob:")?!o.isUploaded(t):0===t.indexOf("data:")&&c(e)))))}),p=t.map(f,function(t){var n;return u[t.src]?new e(function(e){u[t.src].then(function(n){e({image:t,blobInfo:n.blobInfo})})}):(n=new e(function(e){d(t,e)}).then(function(e){return delete u[e.image.src],e})["catch"](function(e){return delete u[t.src],e}),u[t.src]=n,
n)}),e.all(p)}var u={};return{findAll:l}}}),r(Ye,[h,z],function(e,t){return function(){function n(e,t,n,r){return{id:c(e),filename:c(r||e),blob:c(t),base64:c(n),blobUri:c(URL.createObjectURL(t))}}function r(e){i(e.id())||u.push(e)}function i(e){return o(function(t){return t.id()===e})}function o(t){return e.filter(u,t)[0]}function a(e){return o(function(t){return t.blobUri()==e})}function s(t){u=e.filter(u,function(e){return e.blobUri()!==t||(URL.revokeObjectURL(e.blobUri()),!1)})}function l(){e.each(u,function(e){URL.revokeObjectURL(e.blobUri())}),u=[]}var u=[],c=t.constant;return{create:n,add:r,get:i,getByUri:a,findFirst:o,removeByUri:s,destroy:l}}}),r(Xe,[],function(){return function(){function e(e,t){return{status:e,resultUri:t}}function t(e){return e in d}function n(e){var t=d[e];return t?t.resultUri:null}function r(e){return!!t(e)&&d[e].status===u}function i(e){return!!t(e)&&d[e].status===c}function o(t){d[t]=e(u,null)}function a(t,n){d[t]=e(c,n)}function s(e){delete d[e]}function l(){d={}}var u=1,c=2,d={};return{hasBlobUri:t,getResultUri:n,isPending:r,isUploaded:i,markPending:o,markUploaded:a,removeFailed:s,destroy:l}}}),r(Ke,[N],function(e){var t=e.PluginManager,n=function(e,n){for(var r in t.urls){var i=t.urls[r]+"/plugin"+n+".js";if(i===e)return r}return null},r=function(e,t){var r=n(t,e.suffix);return r?"Failed to load plugin: "+r+" from url "+t:"Failed to load plugin url: "+t},i=function(e,t){e.notificationManager.open({type:"error",text:t})},o=function(e,t){e._skinLoaded?i(e,t):e.on("SkinLoaded",function(){i(e,t)})},a=function(e,t){o(e,"Failed to upload image: "+t)},s=function(e,t){o(e,r(e,t))};return{pluginLoadError:s,uploadError:a}}),r(Ge,[h,$e,je,Ye,Xe,Ke],function(e,t,n,r,i,o){return function(a){function s(e){return function(t){return a.selection?e(t):[]}}function l(){return"?"+(new Date).getTime()}function u(e,t,n){var r=0;do r=e.indexOf(t,r),r!==-1&&(e=e.substring(0,r)+n+e.substr(r+t.length),r+=n.length-t.length+1);while(r!==-1);return e}function c(e,t,n){return e=u(e,'src="'+t+'"','src="'+n+'"'),e=u(e,'data-mce-src="'+t+'"','data-mce-src="'+n+'"')}function d(t,n){e.each(a.undoManager.data,function(r){"fragmented"===r.type?r.fragments=e.map(r.fragments,function(e){return c(e,t,n)}):r.content=c(r.content,t,n)})}function f(){return a.notificationManager.open({text:a.translate("Image uploading..."),type:"info",timeout:-1,progressBar:!0})}function p(e,t){C.removeByUri(e.src),d(e.src,t),a.$(e).attr({src:E.images_reuse_filename?t+l():t,"data-mce-src":a.convertURL(t,"src")})}function h(n){return x||(x=new t(N,{url:E.images_upload_url,basePath:E.images_upload_base_path,credentials:E.images_upload_credentials,handler:E.images_upload_handler})),v().then(s(function(t){var r;return r=e.map(t,function(e){return e.blobInfo}),x.upload(r,f).then(s(function(r){return r=e.map(r,function(e,n){var r=t[n].image;return e.status&&a.settings.images_replace_blob_uris!==!1?p(r,e.url):e.error&&o.uploadError(a,e.error),{element:r,status:e.status}}),n&&n(r),r}))}))}function m(e){if(E.automatic_uploads!==!1)return h(e)}function g(e){return!E.images_dataimg_filter||E.images_dataimg_filter(e)}function v(){return w||(w=new n(N,C)),w.findAll(a.getBody(),g).then(s(function(t){return e.each(t,function(e){d(e.image.src,e.blobInfo.blobUri()),e.image.src=e.blobInfo.blobUri(),e.image.removeAttribute("data-mce-src")}),t}))}function y(){C.destroy(),N.destroy(),w=x=null}function b(t){return t.replace(/src="(blob:[^"]+)"/g,function(t,n){var r=N.getResultUri(n);if(r)return'src="'+r+'"';var i=C.getByUri(n);return i||(i=e.reduce(a.editorManager.editors,function(e,t){return e||t.editorUpload.blobCache.getByUri(n)},null)),i?'src="data:'+i.blob().type+";base64,"+i.base64()+'"':t})}var C=new r,x,w,E=a.settings,N=new i;return a.on("setContent",function(){a.settings.automatic_uploads!==!1?m():v()}),a.on("RawSaveContent",function(e){e.content=b(e.content)}),a.on("getContent",function(e){e.source_view||"raw"==e.format||(e.content=b(e.content))}),a.on("PostRender",function(){a.parser.addNodeFilter("img",function(t){e.each(t,function(e){var t=e.attr("src");if(!C.getByUri(t)){var n=N.getResultUri(t);n&&e.attr("src",n)}})})}),{blobCache:C,uploadImages:h,uploadImagesAuto:m,scanForImages:v,destroy:y}}}),r(Je,[k,$,_,T,g,W,c],function(e,t,n,r,i,o,a){var s=n.isContentEditableFalse;return function(t,n){function r(e,n){var r=o.collapse(e.getBoundingClientRect(),n),i,a,s,l,u;return"BODY"==t.tagName?(i=t.ownerDocument.documentElement,a=t.scrollLeft||i.scrollLeft,s=t.scrollTop||i.scrollTop):(u=t.getBoundingClientRect(),a=t.scrollLeft-u.left,s=t.scrollTop-u.top),r.left+=a,r.right+=a,r.top+=s,r.bottom+=s,r.width=1,l=e.offsetWidth-e.clientWidth,l>0&&(n&&(l*=-1),r.left+=l,r.right+=l),r}function l(){var n,r,o,a,s;for(n=i("*[contentEditable=false]",t),a=0;a<n.length;a++)r=n[a],o=r.previousSibling,e.endsWithCaretContainer(o)&&(s=o.data,1==s.length?o.parentNode.removeChild(o):o.deleteData(s.length-1,1)),o=r.nextSibling,e.startsWithCaretContainer(o)&&(s=o.data,1==s.length?o.parentNode.removeChild(o):o.deleteData(0,1));return null}function u(o,a){var l,u;return c(),n(a)?(g=e.insertBlock("p",a,o),l=r(a,o),i(g).css("top",l.top),m=i('<div class="mce-visual-caret" data-mce-bogus="all"></div>').css(l).appendTo(t),o&&m.addClass("mce-visual-caret-before"),d(),u=a.ownerDocument.createRange(),u.setStart(g,0),u.setEnd(g,0),u):(g=e.insertInline(a,o),u=a.ownerDocument.createRange(),s(g.nextSibling)?(u.setStart(g,0),u.setEnd(g,0)):(u.setStart(g,1),u.setEnd(g,1)),u)}function c(){l(),g&&(e.remove(g),g=null),m&&(m.remove(),m=null),clearInterval(h)}function d(){h=a.setInterval(function(){i("div.mce-visual-caret",t).toggleClass("mce-visual-caret-hidden")},500)}function f(){a.clearInterval(h)}function p(){return".mce-visual-caret {position: absolute;background-color: black;background-color: currentcolor;}.mce-visual-caret-hidden {display: none;}*[data-mce-caret] {position: absolute;left: -1000px;right: auto;top: 0;margin: 0;padding: 0;}"}var h,m,g;return{show:u,hide:c,getCss:p,destroy:f}}}),r(Qe,[h,_,W],function(e,t,n){function r(i){function o(t){return e.map(t,function(e){return e=n.clone(e),e.node=i,e})}if(e.isArray(i))return e.reduce(i,function(e,t){return e.concat(r(t))},[]);if(t.isElement(i))return o(i.getClientRects());if(t.isText(i)){var a=i.ownerDocument.createRange();return a.setStart(i,0),a.setEnd(i,i.data.length),o(a.getClientRects())}}return{getClientRects:r}}),r(Ze,[z,h,Qe,U,ie,oe,$,W],function(e,t,n,r,i,o,a,s){function l(e,t,n,o){for(;o=i.findNode(o,e,r.isEditableCaretCandidate,t);)if(n(o))return}function u(e,r,i,o,a,s){function u(o){var s,l,u;for(u=n.getClientRects(o),e==-1&&(u=u.reverse()),s=0;s<u.length;s++)if(l=u[s],!i(l,p)){if(f.length>0&&r(l,t.last(f))&&c++,l.line=c,a(l))return!0;f.push(l)}}var c=0,d,f=[],p;return(p=t.last(s.getClientRects()))?(d=s.getNode(),u(d),l(e,o,u,d),f):f}function c(e,t){return t.line>e}function d(e,t){return t.line===e}function f(e,n,r,i){function l(n){return 1==e?t.last(n.getClientRects()):t.last(n.getClientRects())}var u=new o(n),c,d,f,p,h=[],m=0,g,v;1==e?(c=u.next,d=s.isBelow,f=s.isAbove,p=a.after(i)):(c=u.prev,d=s.isAbove,f=s.isBelow,p=a.before(i)),v=l(p);do if(p.isVisible()&&(g=l(p),!f(g,v))){if(h.length>0&&d(g,t.last(h))&&m++,g=s.clone(g),g.position=p,g.line=m,r(g))return h;h.push(g)}while(p=c(p));return h}var p=e.curry,h=p(u,-1,s.isAbove,s.isBelow),m=p(u,1,s.isBelow,s.isAbove);return{upUntil:h,downUntil:m,positionsUntil:f,isAboveLine:p(c),isLine:p(d)}}),r(et,[z,h,_,Qe,W,ie,U],function(e,t,n,r,i,o,a){function s(e,t){return Math.abs(e.left-t)}function l(e,t){return Math.abs(e.right-t)}function u(e,n){function r(e,t){return e>=t.left&&e<=t.right}return t.reduce(e,function(e,t){var i,o;return i=Math.min(s(e,n),l(e,n)),o=Math.min(s(t,n),l(t,n)),r(n,t)?t:r(n,e)?e:o==i&&m(t.node)?t:o<i?t:e})}function c(e,t,n,r){for(;r=g(r,e,a.isEditableCaretCandidate,t);)if(n(r))return}function d(e,n){function o(e,i){var o;return o=t.filter(r.getClientRects(i),function(t){return!e(t,n)}),a=a.concat(o),0===o.length}var a=[];return a.push(n),c(-1,e,v(o,i.isAbove),n.node),c(1,e,v(o,i.isBelow),n.node),a}function f(e){return t.filter(t.toArray(e.getElementsByTagName("*")),m)}function p(e,t){return{node:e.node,before:s(e,t)<l(e,t)}}function h(e,n,i){var o,a;return o=r.getClientRects(f(e)),o=t.filter(o,function(e){return i>=e.top&&i<=e.bottom}),a=u(o,n),a&&(a=u(d(e,a),n),a&&m(a.node))?p(a,n):null}var m=n.isContentEditableFalse,g=o.findNode,v=e.curry;return{findClosestClientRect:u,findLineNodeRects:d,closestCaret:h}}),r(tt,[],function(){var e=function(e){var t,n,r,i;return i=e.getBoundingClientRect(),t=e.ownerDocument,n=t.documentElement,r=t.defaultView,{top:i.top+r.pageYOffset-n.clientTop,left:i.left+r.pageXOffset-n.clientLeft}},t=function(t){return t.inline?e(t.getBody()):{left:0,top:0}},n=function(e){var t=e.getBody();return e.inline?{left:t.scrollLeft,top:t.scrollTop}:{left:0,top:0}},r=function(e){var t=e.getBody(),n=e.getDoc().documentElement,r={left:t.scrollLeft,top:t.scrollTop},i={left:t.scrollLeft||n.scrollLeft,top:t.scrollTop||n.scrollTop};return e.inline?r:i},i=function(t,n){if(n.target.ownerDocument!==t.getDoc()){var i=e(t.getContentAreaContainer()),o=r(t);return{left:n.pageX-i.left+o.left,top:n.pageY-i.top+o.top}}return{left:n.pageX,top:n.pageY}},o=function(e,t,n){return{pageX:n.left-e.left+t.left,pageY:n.top-e.top+t.top}},a=function(e,r){return o(t(e),n(e),i(e,r))};return{calc:a}}),r(nt,[_,h,z,c,w,tt],function(e,t,n,r,i,o){var a=e.isContentEditableFalse,s=e.isContentEditableTrue,l=function(e,t){return a(t)&&t!==e},u=function(e,t,n){return t!==n&&!e.dom.isChildOf(t,n)&&!a(t)},c=function(e){var t=e.cloneNode(!0);return t.removeAttribute("data-mce-selected"),t},d=function(e,t,n,r){var i=t.cloneNode(!0);e.dom.setStyles(i,{width:n,height:r}),e.dom.setAttrib(i,"data-mce-selected",null);var o=e.dom.create("div",{"class":"mce-drag-container","data-mce-bogus":"all",unselectable:"on",contenteditable:"false"});return e.dom.setStyles(o,{position:"absolute",opacity:.5,overflow:"hidden",border:0,padding:0,margin:0,width:n,height:r}),e.dom.setStyles(i,{margin:0,boxSizing:"border-box"}),o.appendChild(i),o},f=function(e,t){e.parentNode!==t&&t.appendChild(e)},p=function(e,t,n,r,i,o){var a=0,s=0;e.style.left=t.pageX+"px",e.style.top=t.pageY+"px",t.pageX+n>i&&(a=t.pageX+n-i),t.pageY+r>o&&(s=t.pageY+r-o),e.style.width=n-a+"px",e.style.height=r-s+"px"},h=function(e){e&&e.parentNode&&e.parentNode.removeChild(e)},m=function(e){return 0===e.button},g=function(e){return e.element},v=function(e,t){return{pageX:t.pageX-e.relX,pageY:t.pageY+5}},y=function(e,r){return function(i){if(m(i)){var o=t.find(r.dom.getParents(i.target),n.or(a,s));if(l(r.getBody(),o)){var u=r.dom.getPos(o),c=r.getBody(),f=r.getDoc().documentElement;e.element=o,e.screenX=i.screenX,e.screenY=i.screenY,e.maxX=(r.inline?c.scrollWidth:f.offsetWidth)-2,e.maxY=(r.inline?c.scrollHeight:f.offsetHeight)-2,e.relX=i.pageX-u.x,e.relY=i.pageY-u.y,e.width=o.offsetWidth,e.height=o.offsetHeight,e.ghost=d(r,o,e.width,e.height)}}}},b=function(e,t){var n=r.throttle(function(e,n){t._selectionOverrides.hideFakeCaret(),t.selection.placeCaretAt(e,n)},0);return function(r){var i=Math.max(Math.abs(r.screenX-e.screenX),Math.abs(r.screenY-e.screenY));if(g(e)&&!e.dragging&&i>10){var a=t.fire("dragstart",{target:e.element});if(a.isDefaultPrevented())return;e.dragging=!0,t.focus()}if(e.dragging){var s=v(e,o.calc(t,r));f(e.ghost,t.getBody()),p(e.ghost,s,e.width,e.height,e.maxX,e.maxY),n(r.clientX,r.clientY)}}},C=function(e){var t=e.getSel().getRangeAt(0),n=t.startContainer;return 3===n.nodeType?n.parentNode:n},x=function(e,t){return function(n){if(e.dragging&&u(t,C(t.selection),e.element)){var r=c(e.element),i=t.fire("drop",{targetClone:r,clientX:n.clientX,clientY:n.clientY});i.isDefaultPrevented()||(r=i.targetClone,t.undoManager.transact(function(){h(e.element),t.insertContent(t.dom.getOuterHTML(r)),t._selectionOverrides.hideFakeCaret()}))}E(e)}},w=function(e,t){return function(){E(e),e.dragging&&t.fire("dragend")}},E=function(e){e.dragging=!1,e.element=null,h(e.ghost)},N=function(e){var t={},n,r,o,a,s,l;n=i.DOM,l=document,r=y(t,e),o=b(t,e),a=x(t,e),s=w(t,e),e.on("mousedown",r),e.on("mousemove",o),e.on("mouseup",a),n.bind(l,"mousemove",o),n.bind(l,"mouseup",s),e.on("remove",function(){n.unbind(l,"mousemove",o),n.unbind(l,"mouseup",s)})},_=function(e){e.on("drop",function(t){var n="undefined"!=typeof t.clientX?e.getDoc().elementFromPoint(t.clientX,t.clientY):null;(a(n)||a(e.dom.getContentEditableParent(n)))&&t.preventDefault()})},S=function(e){N(e),_(e)};return{init:S}}),r(rt,[d,oe,$,k,ie,Je,Ze,et,_,T,W,I,z,h,c,nt],function(e,t,n,r,i,o,a,s,l,u,c,d,f,p,h,m){function g(e,t){for(;t=e(t);)if(t.isVisible())return t;return t}function v(u){function v(e){return u.dom.hasClass(e,"mce-offscreen-selection")}function _(){var e=u.dom.get(le);return e?e.getElementsByTagName("*")[0]:e}function S(e){return u.dom.isBlock(e)}function k(e){e&&u.selection.setRng(e)}function T(){return u.selection.getRng()}function R(e,t){u.selection.scrollIntoView(e,t)}function A(e,t,n){var r;return r=u.fire("ShowCaret",{target:t,direction:e,before:n}),r.isDefaultPrevented()?null:(R(t,e===-1),se.show(n,t))}function B(e){var t;return t=u.fire("BeforeObjectSelected",{target:e}),t.isDefaultPrevented()?null:D(e)}function D(e){var t=e.ownerDocument.createRange();return t.selectNode(e),t}function L(e,t){var n=i.isInSameBlock(e,t);return!(n||!l.isBr(e.getNode()))||n}function M(e,t){return t=i.normalizeRange(e,re,t),e==-1?n.fromRangeStart(t):n.fromRangeEnd(t)}function P(e){return r.isCaretContainerBlock(e.startContainer)}function O(e,t,n,r){var i,o,a,s;return!r.collapsed&&(i=N(r),C(i))?A(e,i,e==-1):(s=P(r),o=M(e,r),n(o)?B(o.getNode(e==-1)):(o=t(o))?n(o)?A(e,o.getNode(e==-1),1==e):(a=t(o),n(a)&&L(o,a)?A(e,a.getNode(e==-1),1==e):s?$(o.toRange()):null):s?r:null)}function H(e,t,n){var r,i,o,l,u,c,d,f,h;if(h=N(n),r=M(e,n),i=t(re,a.isAboveLine(1),r),o=p.filter(i,a.isLine(1)),u=p.last(r.getClientRects()),E(r)&&(h=r.getNode()),w(r)&&(h=r.getNode(!0)),!u)return null;if(c=u.left,l=s.findClosestClientRect(o,c),l&&C(l.node))return d=Math.abs(c-l.left),f=Math.abs(c-l.right),A(e,l.node,d<f);if(h){var m=a.positionsUntil(e,re,a.isAboveLine(1),h);if(l=s.findClosestClientRect(p.filter(m,a.isLine(1)),c))return $(l.position.toRange());if(l=p.last(p.filter(m,a.isLine(0))))return $(l.position.toRange())}}function I(t,r){function i(){var t=u.dom.create(u.settings.forced_root_block);return(!e.ie||e.ie>=11)&&(t.innerHTML='<br data-mce-bogus="1">'),t}var o,a,s;if(r.collapsed&&u.settings.forced_root_block){if(o=u.dom.getParent(r.startContainer,"PRE"),!o)return;a=1==t?oe(n.fromRangeStart(r)):ae(n.fromRangeStart(r)),a||(s=i(),1==t?u.$(o).after(s):u.$(o).before(s),u.selection.select(s,!0),u.selection.collapse())}}function F(e,t,n,r){var i;return(i=O(e,t,n,r))?i:(i=I(e,r),i?i:null)}function z(e,t,n){var r;return(r=H(e,t,n))?r:(r=I(e,n),r?r:null)}function U(){return ce("*[data-mce-caret]")[0]}function W(e){e.hasAttribute("data-mce-caret")&&(r.showCaretContainerBlock(e),k(T()),R(e[0]))}function V(e){var t,r;return e=i.normalizeRange(1,re,e),t=n.fromRangeStart(e),C(t.getNode())?A(1,t.getNode(),!t.isAtEnd()):C(t.getNode(!0))?A(1,t.getNode(!0),!1):(r=u.dom.getParent(t.getNode(),f.or(C,b)),C(r)?A(1,r,!1):null)}function $(e){var t;return e&&e.collapsed?(t=V(e),t?t:e):e}function q(e){var t,i,o,a;return C(e)?(C(e.previousSibling)&&(o=e.previousSibling),i=ae(n.before(e)),i||(t=oe(n.after(e))),t&&x(t.getNode())&&(a=t.getNode()),r.remove(e.previousSibling),r.remove(e.nextSibling),u.dom.remove(e),u.dom.isEmpty(u.getBody())?(u.setContent(""),void u.focus()):o?n.after(o).toRange():a?n.before(a).toRange():i?i.toRange():t?t.toRange():null):null}function j(e){var t=u.schema.getTextBlockElements();return e.nodeName in t}function Y(e){return u.dom.isEmpty(e)}function X(e,t,r){var i=u.dom,o,a,s,l;if(o=i.getParent(t.getNode(),i.isBlock),a=i.getParent(r.getNode(),i.isBlock),e===-1){if(l=r.getNode(!0),w(r)&&S(l))return j(o)?(Y(o)&&i.remove(o),n.after(l).toRange()):q(r.getNode(!0))}else if(l=t.getNode(),E(t)&&S(l))return j(a)?(Y(a)&&i.remove(a),n.before(l).toRange()):q(t.getNode());if(o===a||!j(o)||!j(a))return null;for(;s=o.firstChild;)a.appendChild(s);return u.dom.remove(o),r.toRange()}function K(e,t,n,i){var o,a,s,l;return!i.collapsed&&(o=N(i),C(o))?$(q(o)):(a=M(e,i),n(a)&&r.isCaretContainerBlock(i.startContainer)?(l=e==-1?ie.prev(a):ie.next(a),l?$(l.toRange()):i):t(a)?$(q(a.getNode(e==-1))):(s=e==-1?ie.prev(a):ie.next(a),t(s)?e===-1?X(e,a,s):X(e,s,a):void 0))}function G(){function i(e,t){var n=t(T());n&&!e.isDefaultPrevented()&&(e.preventDefault(),k(n))}function o(e){for(var t=u.getBody();e&&e!=t;){if(b(e)||C(e))return e;e=e.parentNode}return null}function l(e,t,n){return!n.collapsed&&p.reduce(n.getClientRects(),function(n,r){return n||c.containsXY(r,e,t)},!1)}function f(e){var t=!1;e.on("touchstart",function(){t=!1}),e.on("touchmove",function(){t=!0}),e.on("touchend",function(e){var n=o(e.target);C(n)&&(t||(e.preventDefault(),Z(B(n))))})}function g(){var e,t=o(u.selection.getNode());b(t)&&S(t)&&u.dom.isEmpty(t)&&(e=u.dom.create("br",{"data-mce-bogus":"1"}),u.$(t).empty().append(e),u.selection.setRng(n.before(e).toRange()))}function x(e){var t=U();if(t)return"compositionstart"==e.type?(e.preventDefault(),e.stopPropagation(),void W(t)):void(r.hasContent(t)&&W(t))}function N(e){var t;switch(e.keyCode){case d.DELETE:t=g();break;case d.BACKSPACE:t=g()}t&&e.preventDefault()}var R=y(F,1,oe,E),D=y(F,-1,ae,w),L=y(K,1,E,w),M=y(K,-1,w,E),P=y(z,-1,a.upUntil),O=y(z,1,a.downUntil);u.on("mouseup",function(){var e=T();e.collapsed&&k(V(e))}),u.on("click",function(e){var t;t=o(e.target),t&&(C(t)&&(e.preventDefault(),u.focus()),b(t)&&u.dom.isChildOf(t,u.selection.getNode())&&ee())}),u.on("blur NewBlock",function(){ee(),ne()});var H=function(e){var r=new t(e);if(!e.firstChild)return!1;var i=n.before(e.firstChild),o=r.next(i);return o&&!E(o)&&!w(o)},I=function(e,t){var n=u.dom.getParent(e,u.dom.isBlock),r=u.dom.getParent(t,u.dom.isBlock);return n===r},j=function(e){return!(e.keyCode>=112&&e.keyCode<=123)},Y=function(e,t){var n=u.dom.getParent(e,u.dom.isBlock),r=u.dom.getParent(t,u.dom.isBlock);return n&&!I(n,r)&&H(n)};f(u),u.on("mousedown",function(e){var t;if(t=o(e.target))C(t)?(e.preventDefault(),Z(B(t))):l(e.clientX,e.clientY,u.selection.getRng())||u.selection.placeCaretAt(e.clientX,e.clientY);else{ee(),ne();var n=s.closestCaret(re,e.clientX,e.clientY);n&&(Y(e.target,n.node)||(e.preventDefault(),u.getBody().focus(),k(A(1,n.node,n.before))))}}),u.on("keydown",function(e){if(!d.modifierPressed(e))switch(e.keyCode){case d.RIGHT:i(e,R);break;case d.DOWN:i(e,O);break;case d.LEFT:i(e,D);break;case d.UP:i(e,P);break;case d.DELETE:i(e,L);break;case d.BACKSPACE:i(e,M);break;default:C(u.selection.getNode())&&j(e)&&e.preventDefault()}}),u.on("keyup compositionstart",function(e){x(e),N(e)},!0),u.on("cut",function(){var e=u.selection.getNode();C(e)&&h.setEditorTimeout(u,function(){k($(q(e)))})}),u.on("getSelectionRange",function(e){var t=e.range;if(ue){if(!ue.parentNode)return void(ue=null);t=t.cloneRange(),t.selectNode(ue),e.range=t}}),u.on("setSelectionRange",function(e){var t;t=Z(e.range),t&&(e.range=t)}),u.on("AfterSetSelectionRange",function(e){var t=e.range;Q(t)||ne(),v(t.startContainer.parentNode)||ee()}),u.on("focus",function(){h.setEditorTimeout(u,function(){u.selection.setRng($(u.selection.getRng()))},0)}),u.on("copy",function(t){var n=t.clipboardData;if(!t.isDefaultPrevented()&&t.clipboardData&&!e.ie){var r=_();r&&(t.preventDefault(),n.clearData(),n.setData("text/html",r.outerHTML),n.setData("text/plain",r.outerText))}}),m.init(u)}function J(){var e=u.contentStyles,t=".mce-content-body";e.push(se.getCss()),e.push(t+" .mce-offscreen-selection {position: absolute;left: -9999999999px;max-width: 1000000px;}"+t+" *[contentEditable=false] {cursor: default;}"+t+" *[contentEditable=true] {cursor: text;}")}function Q(e){return r.isCaretContainer(e.startContainer)||r.isCaretContainer(e.endContainer)}function Z(t){var n,r=u.$,i=u.dom,o,a,s,l,c,d,f,p,h;if(!t)return null;if(t.collapsed){if(!Q(t)){if(f=M(1,t),C(f.getNode()))return A(1,f.getNode(),!f.isAtEnd());if(C(f.getNode(!0)))return A(1,f.getNode(!0),!1)}return null}return s=t.startContainer,l=t.startOffset,c=t.endOffset,3==s.nodeType&&0==l&&C(s.parentNode)&&(s=s.parentNode,l=i.nodeIndex(s),s=s.parentNode),1!=s.nodeType?null:(c==l+1&&(n=s.childNodes[l]),C(n)?(p=h=n.cloneNode(!0),d=u.fire("ObjectSelected",{target:n,targetClone:p}),d.isDefaultPrevented()?null:(p=d.targetClone,o=r("#"+le),0===o.length&&(o=r('<div data-mce-bogus="all" class="mce-offscreen-selection"></div>').attr("id",le),o.appendTo(u.getBody())),t=u.dom.createRng(),p===h&&e.ie?(o.empty().append('<p style="font-size: 0" data-mce-bogus="all">\xa0</p>').append(p),t.setStartAfter(o[0].firstChild.firstChild),t.setEndAfter(p)):(o.empty().append("\xa0").append(p).append("\xa0"),t.setStart(o[0].firstChild,1),t.setEnd(o[0].lastChild,0)),o.css({top:i.getPos(n,u.getBody()).y}),o[0].focus(),a=u.selection.getSel(),a.removeAllRanges(),a.addRange(t),u.$("*[data-mce-selected]").removeAttr("data-mce-selected"),n.setAttribute("data-mce-selected",1),ue=n,ne(),t)):null)}function ee(){ue&&(ue.removeAttribute("data-mce-selected"),u.$("#"+le).remove(),ue=null)}function te(){se.destroy(),ue=null}function ne(){se.hide()}var re=u.getBody(),ie=new t(re),oe=y(g,ie.next),ae=y(g,ie.prev),se=new o(u.getBody(),S),le="sel-"+u.dom.uniqueId(),ue,ce=u.$;return e.ceFalse&&(G(),J()),{showBlockCaretContainer:W,hideFakeCaret:ne,destroy:te}}var y=f.curry,b=l.isContentEditableTrue,C=l.isContentEditableFalse,x=l.isElement,w=i.isAfterContentEditableFalse,E=i.isBeforeContentEditableFalse,N=u.getSelectedNode;return v}),r(it,[],function(){var e=0,t=function(){var e=function(){return Math.round(4294967295*Math.random()).toString(36)},t=(new Date).getTime();return"s"+t.toString(36)+e()+e()+e()},n=function(n){return n+e++ +t()};return{uuid:n}}),r(ot,[],function(){var e=function(e,t,n){var r=e.sidebars?e.sidebars:[];r.push({name:t,settings:n}),e.sidebars=r};return{add:e}}),r(at,[w,g,N,R,A,O,P,Y,J,te,ne,re,le,ue,E,f,Le,Ie,B,L,ze,d,m,c,Ue,We,Ve,Ge,rt,it,ot,Ke],function(e,n,r,i,o,a,s,l,u,c,d,f,p,h,m,g,v,y,b,C,x,w,E,N,_,S,k,T,R,A,B,D){function L(e,t,i){var o=this,a,s,l;a=o.documentBaseUrl=i.documentBaseURL,s=i.baseURI,l=i.defaultSettings,t=H({id:e,theme:"modern",delta_width:0,delta_height:0,popup_css:"",plugins:"",document_base_url:a,add_form_submit_trigger:!0,submit_patch:!0,add_unload_trigger:!0,convert_urls:!0,relative_urls:!0,remove_script_host:!0,object_resizing:!0,doctype:"<!DOCTYPE html>",visual:!0,font_size_style_values:"xx-small,x-small,small,medium,large,x-large,xx-large",font_size_legacy_values:"xx-small,small,medium,large,x-large,xx-large,300%",forced_root_block:"p",hidden_input:!0,padd_empty_editor:!0,render_ui:!0,indentation:"30px",inline_styles:!0,convert_fonts_to_spans:!0,indent:"simple",indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",validate:!0,entity_encoding:"named",url_converter:o.convertURL,url_converter_scope:o,ie7_compat:!0},l,t),l&&l.external_plugins&&t.external_plugins&&(t.external_plugins=H({},l.external_plugins,t.external_plugins)),o.settings=t,r.language=t.language||"en",r.languageLoad=t.language_load,r.baseURL=i.baseURL,o.id=t.id=e,o.setDirty(!1),o.plugins={},o.documentBaseURI=new h(t.document_base_url||a,{base_uri:s}),o.baseURI=s,o.contentCSS=[],o.contentStyles=[],o.shortcuts=new k(o),o.loadedCSS={},o.editorCommands=new p(o),o.suffix=i.suffix,o.editorManager=i,o.inline=t.inline,o.settings.content_editable=o.inline,t.cache_suffix&&(w.cacheSuffix=t.cache_suffix.replace(/^[\?\&]+/,"")),t.override_viewport===!1&&(w.overrideViewPort=!1),i.fire("SetupEditor",o),o.execCallback("setup",o),o.$=n.overrideDefaults(function(){return{context:o.inline?o.getBody():o.getDoc(),element:o.getBody()}})}var M=e.DOM,P=r.ThemeManager,O=r.PluginManager,H=E.extend,I=E.each,F=E.explode,z=E.inArray,U=E.trim,W=E.resolve,V=g.Event,$=w.gecko,q=w.ie;return L.prototype={render:function(){function e(){M.unbind(window,"ready",e),n.render()}function t(){var e=m.ScriptLoader;if(r.language&&"en"!=r.language&&!r.language_url&&(r.language_url=n.editorManager.baseURL+"/langs/"+r.language+".js"),r.language_url&&e.add(r.language_url),r.theme&&"function"!=typeof r.theme&&"-"!=r.theme.charAt(0)&&!P.urls[r.theme]){var t=r.theme_url;t=t?n.documentBaseURI.toAbsolute(t):"themes/"+r.theme+"/theme"+o+".js",P.load(r.theme,t)}E.isArray(r.plugins)&&(r.plugins=r.plugins.join(" ")),I(r.external_plugins,function(e,t){O.load(t,e),r.plugins+=" "+t}),I(r.plugins.split(/[ ,]/),function(e){if(e=U(e),e&&!O.urls[e])if("-"==e.charAt(0)){e=e.substr(1,e.length);var t=O.dependencies(e);I(t,function(e){var t={prefix:"plugins/",resource:e,suffix:"/plugin"+o+".js"};e=O.createUrl(t,e),O.load(e.resource,e)})}else O.load(e,{prefix:"plugins/",resource:e,suffix:"/plugin"+o+".js"})}),e.loadQueue(function(){n.removed||n.init()},n,function(e){D.pluginLoadError(n,e[0]),n.removed||n.init()})}var n=this,r=n.settings,i=n.id,o=n.suffix;if(!V.domLoaded)return void M.bind(window,"ready",e);if(n.getElement()&&w.contentEditable){r.inline?n.inline=!0:(n.orgVisibility=n.getElement().style.visibility,n.getElement().style.visibility="hidden");var a=n.getElement().form||M.getParent(i,"form");a&&(n.formElement=a,r.hidden_input&&!/TEXTAREA|INPUT/i.test(n.getElement().nodeName)&&(M.insertAfter(M.create("input",{type:"hidden",name:i}),i),n.hasHiddenInput=!0),n.formEventDelegate=function(e){n.fire(e.type,e)},M.bind(a,"submit reset",n.formEventDelegate),n.on("reset",function(){n.setContent(n.startContent,{format:"raw"})}),!r.submit_patch||a.submit.nodeType||a.submit.length||a._mceOldSubmit||(a._mceOldSubmit=a.submit,a.submit=function(){return n.editorManager.triggerSave(),n.setDirty(!1),a._mceOldSubmit(a)})),n.windowManager=new v(n),n.notificationManager=new y(n),"xml"==r.encoding&&n.on("GetContent",function(e){e.save&&(e.content=M.encode(e.content))}),r.add_form_submit_trigger&&n.on("submit",function(){n.initialized&&n.save()}),r.add_unload_trigger&&(n._beforeUnload=function(){!n.initialized||n.destroyed||n.isHidden()||n.save({format:"raw",no_events:!0,set_dirty:!1})},n.editorManager.on("BeforeUnload",n._beforeUnload)),n.editorManager.add(n),t()}},init:function(){function e(n){var r=O.get(n),i,o;if(i=O.urls[n]||t.documentBaseUrl.replace(/\/$/,""),n=U(n),r&&z(m,n)===-1){if(I(O.dependencies(n),function(t){e(t)}),t.plugins[n])return;o=new r(t,i,t.$),t.plugins[n]=o,o.init&&(o.init(t,i),m.push(n))}}var t=this,n=t.settings,r=t.getElement(),i,o,a,s,l,u,c,d,f,p,h,m=[];if(t.rtl=n.rtl_ui||t.editorManager.i18n.rtl,t.editorManager.i18n.setCode(n.language),n.aria_label=n.aria_label||M.getAttrib(r,"aria-label",t.getLang("aria.rich_text_area")),t.fire("ScriptsLoaded"),n.theme&&("function"!=typeof n.theme?(n.theme=n.theme.replace(/-/,""),u=P.get(n.theme),t.theme=new u(t,P.urls[n.theme]),t.theme.init&&t.theme.init(t,P.urls[n.theme]||t.documentBaseUrl.replace(/\/$/,""),t.$)):t.theme=n.theme),I(n.plugins.replace(/\-/g,"").split(/[ ,]/),e),n.render_ui&&t.theme&&(t.orgDisplay=r.style.display,"function"!=typeof n.theme?(i=n.width||r.style.width||r.offsetWidth,o=n.height||r.style.height||r.offsetHeight,a=n.min_height||100,p=/^[0-9\.]+(|px)$/i,p.test(""+i)&&(i=Math.max(parseInt(i,10),100)),p.test(""+o)&&(o=Math.max(parseInt(o,10),a)),l=t.theme.renderUI({targetNode:r,width:i,height:o,deltaWidth:n.delta_width,deltaHeight:n.delta_height}),n.content_editable||(o=(l.iframeHeight||o)+("number"==typeof o?l.deltaHeight||0:""),o<a&&(o=a))):(l=n.theme(t,r),l.editorContainer.nodeType&&(l.editorContainer.id=l.editorContainer.id||t.id+"_parent"),l.iframeContainer.nodeType&&(l.iframeContainer.id=l.iframeContainer.id||t.id+"_iframecontainer"),o=l.iframeHeight||r.offsetHeight),t.editorContainer=l.editorContainer),n.content_css&&I(F(n.content_css),function(e){t.contentCSS.push(t.documentBaseURI.toAbsolute(e))}),n.content_style&&t.contentStyles.push(n.content_style),n.content_editable)return r=s=l=null,t.initContentBody();if(t.iframeHTML=n.doctype+"<html><head>",n.document_base_url!=t.documentBaseUrl&&(t.iframeHTML+='<base href="'+t.documentBaseURI.getURI()+'" />'),!w.caretAfter&&n.ie7_compat&&(t.iframeHTML+='<meta http-equiv="X-UA-Compatible" content="IE=7" />'),t.iframeHTML+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',!/#$/.test(document.location.href))for(h=0;h<t.contentCSS.length;h++){var g=t.contentCSS[h];t.iframeHTML+='<link type="text/css" rel="stylesheet" href="'+E._addCacheSuffix(g)+'" />',t.loadedCSS[g]=!0}d=n.body_id||"tinymce",d.indexOf("=")!=-1&&(d=t.getParam("body_id","","hash"),d=d[t.id]||d),f=n.body_class||"",f.indexOf("=")!=-1&&(f=t.getParam("body_class","","hash"),f=f[t.id]||""),n.content_security_policy&&(t.iframeHTML+='<meta http-equiv="Content-Security-Policy" content="'+n.content_security_policy+'" />'),t.iframeHTML+='</head><body id="'+d+'" class="mce-content-body '+f+'" data-id="'+t.id+'"><br></body></html>';var v='javascript:(function(){document.open();document.domain="'+document.domain+'";var ed = window.parent.tinymce.get("'+t.id+'");document.write(ed.iframeHTML);document.close();ed.initContentBody(true);})()';document.domain!=location.hostname&&w.ie&&w.ie<12&&(c=v);var y=M.create("iframe",{id:t.id+"_ifr",frameBorder:"0",allowTransparency:"true",title:t.editorManager.translate("Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"),style:{width:"100%",height:o,display:"block"}});if(y.onload=function(){y.onload=null,t.fire("load")},M.setAttrib(y,"src",c||'javascript:""'),t.contentAreaContainer=l.iframeContainer,t.iframeElement=y,s=M.add(l.iframeContainer,y),q)try{t.getDoc()}catch(b){s.src=c=v}l.editorContainer&&(M.get(l.editorContainer).style.display=t.orgDisplay,t.hidden=M.isHidden(l.editorContainer)),t.getElement().style.display="none",M.setAttrib(t.id,"aria-hidden",!0),c||t.initContentBody(),r=s=l=null},initContentBody:function(t){var n=this,r=n.settings,s=n.getElement(),p=n.getDoc(),h,m;r.inline||(n.getElement().style.visibility=n.orgVisibility),t||r.content_editable||(p.open(),p.write(n.iframeHTML),p.close()),r.content_editable&&(n.on("remove",function(){var e=this.getBody();M.removeClass(e,"mce-content-body"),M.removeClass(e,"mce-edit-focus"),M.setAttrib(e,"contentEditable",null)}),M.addClass(s,"mce-content-body"),n.contentDocument=p=r.content_document||document,n.contentWindow=r.content_window||window,n.bodyElement=s,r.content_document=r.content_window=null,r.root_name=s.nodeName.toLowerCase()),h=n.getBody(),h.disabled=!0,n.readonly=r.readonly,n.readonly||(n.inline&&"static"==M.getStyle(h,"position",!0)&&(h.style.position="relative"),h.contentEditable=n.getParam("content_editable_state",!0)),h.disabled=!1,n.editorUpload=new T(n),n.schema=new b(r),n.dom=new e(p,{keep_values:!0,url_converter:n.convertURL,url_converter_scope:n,hex_colors:r.force_hex_style_colors,class_filter:r.class_filter,update_styles:!0,root_element:n.inline?n.getBody():null,collect:r.content_editable,schema:n.schema,onSetAttrib:function(e){n.fire("SetAttrib",e)}}),n.parser=new C(r,n.schema),n.parser.addAttributeFilter("src,href,style,tabindex",function(e,t){for(var r=e.length,i,o=n.dom,a,s;r--;)if(i=e[r],a=i.attr(t),s="data-mce-"+t,!i.attributes.map[s]){if(0===a.indexOf("data:")||0===a.indexOf("blob:"))continue;"style"===t?(a=o.serializeStyle(o.parseStyle(a),i.name),a.length||(a=null),i.attr(s,a),i.attr(t,a)):"tabindex"===t?(i.attr(s,a),i.attr(t,null)):i.attr(s,n.convertURL(a,t,i.name))}}),n.parser.addNodeFilter("script",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.attr("type")||"no/type",
0!==r.indexOf("mce-")&&n.attr("type","mce-"+r)}),n.parser.addNodeFilter("#cdata",function(e){for(var t=e.length,n;t--;)n=e[t],n.type=8,n.name="#comment",n.value="[CDATA["+n.value+"]]"}),n.parser.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div",function(e){for(var t=e.length,r,i=n.schema.getNonEmptyElements();t--;)r=e[t],r.isEmpty(i)&&0===r.getAll("br").length&&(r.append(new o("br",1)).shortEnded=!0)}),n.serializer=new a(r,n),n.selection=new l(n.dom,n.getWin(),n.serializer,n),n.formatter=new u(n),n.undoManager=new c(n),n.forceBlocks=new f(n),n.enterKey=new d(n),n._nodeChangeDispatcher=new i(n),n._selectionOverrides=new R(n),n.fire("PreInit"),r.browser_spellcheck||r.gecko_spellcheck||(p.body.spellcheck=!1,M.setAttrib(h,"spellcheck","false")),n.quirks=new x(n),n.fire("PostRender"),r.directionality&&(h.dir=r.directionality),r.nowrap&&(h.style.whiteSpace="nowrap"),r.protect&&n.on("BeforeSetContent",function(e){I(r.protect,function(t){e.content=e.content.replace(t,function(e){return"<!--mce:protected "+escape(e)+"-->"})})}),n.on("SetContent",function(){n.addVisual(n.getBody())}),r.padd_empty_editor&&n.on("PostProcess",function(e){e.content=e.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|<br \/>|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/,"")}),n.load({initial:!0,format:"html"}),n.startContent=n.getContent({format:"raw"}),n.initialized=!0,n.bindPendingEventDelegates(),n.fire("init"),n.focus(!0),n.nodeChanged({initial:!0}),n.execCallback("init_instance_callback",n),n.on("compositionstart compositionend",function(e){n.composing="compositionstart"===e.type}),n.contentStyles.length>0&&(m="",I(n.contentStyles,function(e){m+=e+"\r\n"}),n.dom.addStyle(m)),I(n.contentCSS,function(e){n.loadedCSS[e]||(n.dom.loadCSS(e),n.loadedCSS[e]=!0)}),r.auto_focus&&N.setEditorTimeout(n,function(){var e;e=r.auto_focus===!0?n:n.editorManager.get(r.auto_focus),e.destroyed||e.focus()},100),s=p=h=null},focus:function(e){function t(e){return n.dom.getParent(e,function(e){return"true"===n.dom.getContentEditable(e)})}var n=this,r=n.selection,i=n.settings.content_editable,o,a,s=n.getDoc(),l=n.getBody(),u;if(!e){if(o=r.getRng(),o.item&&(a=o.item(0)),n.quirks.refreshContentEditable(),u=t(r.getNode()),n.$.contains(l,u))return u.focus(),r.normalize(),void n.editorManager.setActive(n);if(i||(w.opera||n.getBody().focus(),n.getWin().focus()),$||i){if(l.setActive)try{l.setActive()}catch(c){l.focus()}else l.focus();i&&r.normalize()}a&&a.ownerDocument==s&&(o=s.body.createControlRange(),o.addElement(a),o.select())}n.editorManager.setActive(n)},execCallback:function(e){var t=this,n=t.settings[e],r;if(n)return t.callbackLookup&&(r=t.callbackLookup[e])&&(n=r.func,r=r.scope),"string"==typeof n&&(r=n.replace(/\.\w+$/,""),r=r?W(r):0,n=W(n),t.callbackLookup=t.callbackLookup||{},t.callbackLookup[e]={func:n,scope:r}),n.apply(r||t,Array.prototype.slice.call(arguments,1))},translate:function(e){var t=this.settings.language||"en",n=this.editorManager.i18n;return e?(e=n.data[t+"."+e]||e.replace(/\{\#([^\}]+)\}/g,function(e,r){return n.data[t+"."+r]||"{#"+r+"}"}),this.editorManager.translate(e)):""},getLang:function(e,n){return this.editorManager.i18n.data[(this.settings.language||"en")+"."+e]||(n!==t?n:"{#"+e+"}")},getParam:function(e,t,n){var r=e in this.settings?this.settings[e]:t,i;return"hash"===n?(i={},"string"==typeof r?I(r.indexOf("=")>0?r.split(/[;,](?![^=;,]*(?:[;,]|$))/):r.split(","),function(e){e=e.split("="),e.length>1?i[U(e[0])]=U(e[1]):i[U(e[0])]=U(e)}):i=r,i):r},nodeChanged:function(e){this._nodeChangeDispatcher.nodeChanged(e)},addButton:function(e,t){var n=this;t.cmd&&(t.onclick=function(){n.execCommand(t.cmd)}),t.text||t.icon||(t.icon=e),n.buttons=n.buttons||{},t.tooltip=t.tooltip||t.title,n.buttons[e]=t},addSidebar:function(e,t){return B.add(this,e,t)},addMenuItem:function(e,t){var n=this;t.cmd&&(t.onclick=function(){n.execCommand(t.cmd)}),n.menuItems=n.menuItems||{},n.menuItems[e]=t},addContextToolbar:function(e,t){var n=this,r;n.contextToolbars=n.contextToolbars||[],"string"==typeof e&&(r=e,e=function(e){return n.dom.is(e,r)}),n.contextToolbars.push({id:A.uuid("mcet"),predicate:e,items:t})},addCommand:function(e,t,n){this.editorCommands.addCommand(e,t,n)},addQueryStateHandler:function(e,t,n){this.editorCommands.addQueryStateHandler(e,t,n)},addQueryValueHandler:function(e,t,n){this.editorCommands.addQueryValueHandler(e,t,n)},addShortcut:function(e,t,n,r){this.shortcuts.add(e,t,n,r)},execCommand:function(e,t,n,r){return this.editorCommands.execCommand(e,t,n,r)},queryCommandState:function(e){return this.editorCommands.queryCommandState(e)},queryCommandValue:function(e){return this.editorCommands.queryCommandValue(e)},queryCommandSupported:function(e){return this.editorCommands.queryCommandSupported(e)},show:function(){var e=this;e.hidden&&(e.hidden=!1,e.inline?e.getBody().contentEditable=!0:(M.show(e.getContainer()),M.hide(e.id)),e.load(),e.fire("show"))},hide:function(){var e=this,t=e.getDoc();e.hidden||(q&&t&&!e.inline&&t.execCommand("SelectAll"),e.save(),e.inline?(e.getBody().contentEditable=!1,e==e.editorManager.focusedEditor&&(e.editorManager.focusedEditor=null)):(M.hide(e.getContainer()),M.setStyle(e.id,"display",e.orgDisplay)),e.hidden=!0,e.fire("hide"))},isHidden:function(){return!!this.hidden},setProgressState:function(e,t){this.fire("ProgressState",{state:e,time:t})},load:function(e){var n=this,r=n.getElement(),i;if(r)return e=e||{},e.load=!0,i=n.setContent(r.value!==t?r.value:r.innerHTML,e),e.element=r,e.no_events||n.fire("LoadContent",e),e.element=r=null,i},save:function(e){var t=this,n=t.getElement(),r,i;if(n&&t.initialized)return e=e||{},e.save=!0,e.element=n,r=e.content=t.getContent(e),e.no_events||t.fire("SaveContent",e),"raw"==e.format&&t.fire("RawSaveContent",e),r=e.content,/TEXTAREA|INPUT/i.test(n.nodeName)?n.value=r:(t.inline||(n.innerHTML=r),(i=M.getParent(t.id,"form"))&&I(i.elements,function(e){if(e.name==t.id)return e.value=r,!1})),e.element=n=null,e.set_dirty!==!1&&t.setDirty(!1),r},setContent:function(e,t){var n=this,r=n.getBody(),i,o;return t=t||{},t.format=t.format||"html",t.set=!0,t.content=e,t.no_events||n.fire("BeforeSetContent",t),e=t.content,0===e.length||/^\s+$/.test(e)?(o=q&&q<11?"":'<br data-mce-bogus="1">',"TABLE"==r.nodeName?e="<tr><td>"+o+"</td></tr>":/^(UL|OL)$/.test(r.nodeName)&&(e="<li>"+o+"</li>"),i=n.settings.forced_root_block,i&&n.schema.isValidChild(r.nodeName.toLowerCase(),i.toLowerCase())?(e=o,e=n.dom.createHTML(i,n.settings.forced_root_block_attrs,e)):q||e||(e='<br data-mce-bogus="1">'),n.dom.setHTML(r,e),n.fire("SetContent",t)):("raw"!==t.format&&(e=new s({validate:n.validate},n.schema).serialize(n.parser.parse(e,{isRootContent:!0}))),t.content=U(e),n.dom.setHTML(r,t.content),t.no_events||n.fire("SetContent",t)),t.content},getContent:function(e){var t=this,n,r=t.getBody();return e=e||{},e.format=e.format||"html",e.get=!0,e.getInner=!0,e.no_events||t.fire("BeforeGetContent",e),n="raw"==e.format?E.trim(t.serializer.getTrimmedContent()):"text"==e.format?r.innerText||r.textContent:t.serializer.serialize(r,e),"text"!=e.format?e.content=U(n):e.content=n,e.no_events||t.fire("GetContent",e),e.content},insertContent:function(e,t){t&&(e=H({content:e},t)),this.execCommand("mceInsertContent",!1,e)},isDirty:function(){return!this.isNotDirty},setDirty:function(e){var t=!this.isNotDirty;this.isNotDirty=!e,e&&e!=t&&this.fire("dirty")},setMode:function(e){S.setMode(this,e)},getContainer:function(){var e=this;return e.container||(e.container=M.get(e.editorContainer||e.id+"_parent")),e.container},getContentAreaContainer:function(){return this.contentAreaContainer},getElement:function(){return this.targetElm||(this.targetElm=M.get(this.id)),this.targetElm},getWin:function(){var e=this,t;return e.contentWindow||(t=e.iframeElement,t&&(e.contentWindow=t.contentWindow)),e.contentWindow},getDoc:function(){var e=this,t;return e.contentDocument||(t=e.getWin(),t&&(e.contentDocument=t.document)),e.contentDocument},getBody:function(){var e=this.getDoc();return this.bodyElement||(e?e.body:null)},convertURL:function(e,t,n){var r=this,i=r.settings;return i.urlconverter_callback?r.execCallback("urlconverter_callback",e,n,!0,t):!i.convert_urls||n&&"LINK"==n.nodeName||0===e.indexOf("file:")||0===e.length?e:i.relative_urls?r.documentBaseURI.toRelative(e):e=r.documentBaseURI.toAbsolute(e,i.remove_script_host)},addVisual:function(e){var n=this,r=n.settings,i=n.dom,o;e=e||n.getBody(),n.hasVisual===t&&(n.hasVisual=r.visual),I(i.select("table,a",e),function(e){var t;switch(e.nodeName){case"TABLE":return o=r.visual_table_class||"mce-item-table",t=i.getAttrib(e,"border"),void(t&&"0"!=t||!n.hasVisual?i.removeClass(e,o):i.addClass(e,o));case"A":return void(i.getAttrib(e,"href",!1)||(t=i.getAttrib(e,"name")||e.id,o=r.visual_anchor_class||"mce-item-anchor",t&&n.hasVisual?i.addClass(e,o):i.removeClass(e,o)))}}),n.fire("VisualAid",{element:e,hasVisual:n.hasVisual})},remove:function(){var e=this;e.removed||(e.save(),e.removed=1,e.unbindAllNativeEvents(),e.hasHiddenInput&&M.remove(e.getElement().nextSibling),e.inline||(q&&q<10&&e.getDoc().execCommand("SelectAll",!1,null),M.setStyle(e.id,"display",e.orgDisplay),e.getBody().onload=null),e.fire("remove"),e.editorManager.remove(e),M.remove(e.getContainer()),e._selectionOverrides.destroy(),e.editorUpload.destroy(),e.destroy())},destroy:function(e){var t=this,n;if(!t.destroyed){if(!e&&!t.removed)return void t.remove();e||(t.editorManager.off("beforeunload",t._beforeUnload),t.theme&&t.theme.destroy&&t.theme.destroy(),t.selection.destroy(),t.dom.destroy()),n=t.formElement,n&&(n._mceOldSubmit&&(n.submit=n._mceOldSubmit,n._mceOldSubmit=null),M.unbind(n,"submit reset",t.formEventDelegate)),t.contentAreaContainer=t.formElement=t.container=t.editorContainer=null,t.bodyElement=t.contentDocument=t.contentWindow=null,t.iframeElement=t.targetElm=null,t.selection&&(t.selection=t.selection.win=t.selection.dom=t.selection.dom.doc=null),t.destroyed=1}},uploadImages:function(e){return this.editorUpload.uploadImages(e)},_scanForImages:function(){return this.editorUpload.scanForImages()}},H(L.prototype,_),L}),r(st,[m],function(e){var t={},n="en";return{setCode:function(e){e&&(n=e,this.rtl=!!this.data[e]&&"rtl"===this.data[e]._dir)},getCode:function(){return n},rtl:!1,add:function(e,n){var r=t[e];r||(t[e]=r={});for(var i in n)r[i]=n[i];this.setCode(e)},translate:function(r){function i(t){return e.is(t,"function")?Object.prototype.toString.call(t):o(t)?"":""+t}function o(t){return""===t||null===t||e.is(t,"undefined")}function a(t){return t=i(t),e.hasOwn(s,t)?i(s[t]):t}var s=t[n]||{};if(o(r))return"";if(e.is(r,"object")&&e.hasOwn(r,"raw"))return i(r.raw);if(e.is(r,"array")){var l=r.slice(1);r=a(r[0]).replace(/\{([0-9]+)\}/g,function(t,n){return e.hasOwn(l,n)?i(l[n]):t})}return a(r).replace(/{context:\w+}$/,"")},data:t}}),r(lt,[w,c,d],function(e,t,n){function r(e){function r(){try{return document.activeElement}catch(e){return document.body}}function u(e,t){if(t&&t.startContainer){if(!e.isChildOf(t.startContainer,e.getRoot())||!e.isChildOf(t.endContainer,e.getRoot()))return;return{startContainer:t.startContainer,startOffset:t.startOffset,endContainer:t.endContainer,endOffset:t.endOffset}}return t}function c(e,t){var n;return t.startContainer?(n=e.getDoc().createRange(),n.setStart(t.startContainer,t.startOffset),n.setEnd(t.endContainer,t.endOffset)):n=t,n}function d(d){var f=d.editor;f.on("init",function(){(f.inline||n.ie)&&("onbeforedeactivate"in document&&n.ie<9?f.dom.bind(f.getBody(),"beforedeactivate",function(e){if(e.target==f.getBody())try{f.lastRng=f.selection.getRng()}catch(t){}}):f.on("nodechange mouseup keyup",function(e){var t=r();"nodechange"==e.type&&e.selectionChange||(t&&t.id==f.id+"_ifr"&&(t=f.getBody()),f.dom.isChildOf(t,f.getBody())&&(f.lastRng=f.selection.getRng()))}),n.webkit&&!i&&(i=function(){var t=e.activeEditor;if(t&&t.selection){var n=t.selection.getRng();n&&!n.collapsed&&(f.lastRng=n)}},s.bind(document,"selectionchange",i)))}),f.on("setcontent",function(){f.lastRng=null}),f.on("mousedown",function(){f.selection.lastFocusBookmark=null}),f.on("focusin",function(){var t=e.focusedEditor,n;f.selection.lastFocusBookmark&&(n=c(f,f.selection.lastFocusBookmark),f.selection.lastFocusBookmark=null,f.selection.setRng(n)),t!=f&&(t&&t.fire("blur",{focusedEditor:f}),e.setActive(f),e.focusedEditor=f,f.fire("focus",{blurredEditor:t}),f.focus(!0)),f.lastRng=null}),f.on("focusout",function(){t.setEditorTimeout(f,function(){var t=e.focusedEditor;l(f,r())||t!=f||(f.fire("blur",{focusedEditor:null}),e.focusedEditor=null,f.selection&&(f.selection.lastFocusBookmark=null))})}),o||(o=function(t){var n=e.activeEditor,r;r=t.target,n&&r.ownerDocument==document&&(n.selection&&r!=n.getBody()&&(n.selection.lastFocusBookmark=u(n.dom,n.lastRng)),r==document.body||l(n,r)||e.focusedEditor!=n||(n.fire("blur",{focusedEditor:null}),e.focusedEditor=null))},s.bind(document,"focusin",o)),f.inline&&!a&&(a=function(t){var n=e.activeEditor,r=n.dom;if(n.inline&&r&&!r.isChildOf(t.target,n.getBody())){var i=n.selection.getRng();i.collapsed||(n.lastRng=i)}},s.bind(document,"mouseup",a))}function f(t){e.focusedEditor==t.editor&&(e.focusedEditor=null),e.activeEditor||(s.unbind(document,"selectionchange",i),s.unbind(document,"focusin",o),s.unbind(document,"mouseup",a),i=o=a=null)}e.on("AddEditor",d),e.on("RemoveEditor",f)}var i,o,a,s=e.DOM,l=function(e,t){var n=e?e.settings.custom_ui_selector:"",i=s.getParent(t,function(t){return r.isEditorUIElement(t)||!!n&&e.dom.is(t,n)});return null!==i};return r.isEditorUIElement=function(e){return e.className.toString().indexOf("mce-")!==-1},r._isUIElement=l,r}),r(ut,[at,g,w,ue,d,m,u,pe,st,lt,N],function(e,t,n,r,i,o,a,s,l,u,c){function d(e){v(x.editors,function(t){"scroll"===e.type?t.fire("ScrollWindow",e):t.fire("ResizeWindow",e)})}function f(e,n){n!==w&&(n?t(window).on("resize scroll",d):t(window).off("resize scroll",d),w=n)}function p(e){var t=x.editors,n;delete t[e.id];for(var r=0;r<t.length;r++)if(t[r]==e){t.splice(r,1),n=!0;break}return x.activeEditor==e&&(x.activeEditor=t[0]),x.focusedEditor==e&&(x.focusedEditor=null),n}function h(e){return e&&e.initialized&&!(e.getContainer()||e.getBody()).parentNode&&(p(e),e.unbindAllNativeEvents(),e.destroy(!0),e.removed=!0,e=null),e}var m=n.DOM,g=o.explode,v=o.each,y=o.extend,b=0,C,x,w=!1;return x={$:t,majorVersion:"4",minorVersion:"5.4",releaseDate:"2017-02-23",editors:[],i18n:l,activeEditor:null,setup:function(){var e=this,t,n,i="",o,a;if(n=r.getDocumentBaseUrl(document.location),/^[^:]+:\/\/\/?[^\/]+\//.test(n)&&(n=n.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(n)||(n+="/")),o=window.tinymce||window.tinyMCEPreInit)t=o.base||o.baseURL,i=o.suffix;else{for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){a=s[l].src;var c=a.substring(a.lastIndexOf("/"));if(/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(a)){c.indexOf(".min")!=-1&&(i=".min"),t=a.substring(0,a.lastIndexOf("/"));break}}!t&&document.currentScript&&(a=document.currentScript.src,a.indexOf(".min")!=-1&&(i=".min"),t=a.substring(0,a.lastIndexOf("/")))}e.baseURL=new r(n).toAbsolute(t),e.documentBaseURL=n,e.baseURI=new r(e.baseURL),e.suffix=i,e.focusManager=new u(e)},overrideDefaults:function(e){var t,n;t=e.base_url,t&&(this.baseURL=new r(this.documentBaseURL).toAbsolute(t.replace(/\/+$/,"")),this.baseURI=new r(this.baseURL)),n=e.suffix,e.suffix&&(this.suffix=n),this.defaultSettings=e;var i=e.plugin_base_urls;for(var o in i)c.PluginManager.urls[o]=i[o]},init:function(n){function r(e,t){return e.inline&&t.tagName.toLowerCase()in C}function i(e,t){window.console&&!window.test&&window.console.log(e,t)}function s(e){var t=e.id;return t||(t=e.name,t=t&&!m.get(t)?e.name:m.uniqueId(),e.setAttribute("id",t)),t}function l(e){var t=n[e];if(t)return t.apply(f,Array.prototype.slice.call(arguments,2))}function u(e,t){return t.constructor===RegExp?t.test(e.className):m.hasClass(e,t)}function c(e){var t,n=[];if(e.types)return v(e.types,function(e){n=n.concat(m.select(e.selector))}),n;if(e.selector)return m.select(e.selector);if(e.target)return[e.target];switch(e.mode){case"exact":t=e.elements||"",t.length>0&&v(g(t),function(e){var t;(t=m.get(e))?n.push(t):v(document.forms,function(t){v(t.elements,function(t){t.name===e&&(e="mce_editor_"+b++,m.setAttrib(t,"id",e),n.push(t))})})});break;case"textareas":case"specific_textareas":v(m.select("textarea"),function(t){e.editor_deselector&&u(t,e.editor_deselector)||e.editor_selector&&!u(t,e.editor_selector)||n.push(t)})}return n}function d(){function a(t,n,r){var i=new e(t,n,f);p.push(i),i.on("init",function(){++u===g.length&&x(p)}),i.targetElm=i.targetElm||r,i.render()}var u=0,p=[],g;return m.unbind(window,"ready",d),l("onpageload"),g=t.unique(c(n)),n.types?void v(n.types,function(e){o.each(g,function(t){return!m.is(t,e.selector)||(a(s(t),y({},n,e),t),!1)})}):(o.each(g,function(e){h(f.get(e.id))}),g=o.grep(g,function(e){return!f.get(e.id)}),void v(g,function(e){r(n,e)?i("Could not initialize inline editor on invalid inline target element",e):a(s(e),n,e)}))}var f=this,p,C;C=o.makeMap("area base basefont br col frame hr img input isindex link meta param embed source wbr track colgroup option tbody tfoot thead tr script noscript style textarea video audio iframe object menu"," ");var x=function(e){p=e};return f.settings=n,m.bind(window,"ready",d),new a(function(e){p?e(p):x=function(t){e(t)}})},get:function(e){return arguments.length?e in this.editors?this.editors[e]:null:this.editors},add:function(e){var t=this,n=t.editors;return n[e.id]=e,n.push(e),f(n,!0),t.activeEditor=e,t.fire("AddEditor",{editor:e}),C||(C=function(){t.fire("BeforeUnload")},m.bind(window,"beforeunload",C)),e},createEditor:function(t,n){return this.add(new e(t,n,this))},remove:function(e){var t=this,n,r=t.editors,i;{if(e)return"string"==typeof e?(e=e.selector||e,void v(m.select(e),function(e){i=r[e.id],i&&t.remove(i)})):(i=e,r[i.id]?(p(i)&&t.fire("RemoveEditor",{editor:i}),r.length||m.unbind(window,"beforeunload",C),i.remove(),f(r,r.length>0),i):null);for(n=r.length-1;n>=0;n--)t.remove(r[n])}},execCommand:function(t,n,r){var i=this,o=i.get(r);switch(t){case"mceAddEditor":return i.get(r)||new e(r,i.settings,i).render(),!0;case"mceRemoveEditor":return o&&o.remove(),!0;case"mceToggleEditor":return o?(o.isHidden()?o.show():o.hide(),!0):(i.execCommand("mceAddEditor",0,r),!0)}return!!i.activeEditor&&i.activeEditor.execCommand(t,n,r)},triggerSave:function(){v(this.editors,function(e){e.save()})},addI18n:function(e,t){l.add(e,t)},translate:function(e){return l.translate(e)},setActive:function(e){var t=this.activeEditor;this.activeEditor!=e&&(t&&t.fire("deactivate",{relatedTarget:e}),e.fire("activate",{relatedTarget:t})),this.activeEditor=e}},y(x,s),x.setup(),window.tinymce=window.tinyMCE=x,x}),r(ct,[ut,m],function(e,t){var n=t.each,r=t.explode;e.on("AddEditor",function(e){var t=e.editor;t.on("preInit",function(){function e(e,t){n(t,function(t,n){t&&s.setStyle(e,n,t)}),s.rename(e,"span")}function i(e){s=t.dom,l.convert_fonts_to_spans&&n(s.select("font,u,strike",e.node),function(e){o[e.nodeName.toLowerCase()](s,e)})}var o,a,s,l=t.settings;l.inline_styles&&(a=r(l.font_size_legacy_values),o={font:function(t,n){e(n,{backgroundColor:n.style.backgroundColor,color:n.color,fontFamily:n.face,fontSize:a[parseInt(n.size,10)-1]})},u:function(n,r){"html4"===t.settings.schema&&e(r,{textDecoration:"underline"})},strike:function(t,n){e(n,{textDecoration:"line-through"})}},t.on("PreProcess SetContent",i))})})}),r(dt,[pe,m],function(e,t){var n={send:function(e){function r(){!e.async||4==i.readyState||o++>1e4?(e.success&&o<1e4&&200==i.status?e.success.call(e.success_scope,""+i.responseText,i,e):e.error&&e.error.call(e.error_scope,o>1e4?"TIMED_OUT":"GENERAL",i,e),i=null):setTimeout(r,10)}var i,o=0;if(e.scope=e.scope||this,e.success_scope=e.success_scope||e.scope,e.error_scope=e.error_scope||e.scope,e.async=e.async!==!1,e.data=e.data||"",n.fire("beforeInitialize",{settings:e}),i=new XMLHttpRequest){if(i.overrideMimeType&&i.overrideMimeType(e.content_type),i.open(e.type||(e.data?"POST":"GET"),e.url,e.async),e.crossDomain&&(i.withCredentials=!0),e.content_type&&i.setRequestHeader("Content-Type",e.content_type),e.requestheaders&&t.each(e.requestheaders,function(e){i.setRequestHeader(e.key,e.value)}),i.setRequestHeader("X-Requested-With","XMLHttpRequest"),i=n.fire("beforeSend",{xhr:i,settings:e}).xhr,i.send(e.data),!e.async)return r();setTimeout(r,10)}}};return t.extend(n,e),n}),r(ft,[],function(){function e(t,n){var r,i,o,a;if(n=n||'"',null===t)return"null";if(o=typeof t,"string"==o)return i="\bb\tt\nn\ff\rr\"\"''\\\\",n+t.replace(/([\u0080-\uFFFF\x00-\x1f\"\'\\])/g,function(e,t){return'"'===n&&"'"===e?e:(r=i.indexOf(t),r+1?"\\"+i.charAt(r+1):(e=t.charCodeAt().toString(16),"\\u"+"0000".substring(e.length)+e))})+n;if("object"==o){if(t.hasOwnProperty&&"[object Array]"===Object.prototype.toString.call(t)){for(r=0,i="[";r<t.length;r++)i+=(r>0?",":"")+e(t[r],n);return i+"]"}i="{";for(a in t)t.hasOwnProperty(a)&&(i+="function"!=typeof t[a]?(i.length>1?","+n:n)+a+n+":"+e(t[a],n):"");return i+"}"}return""+t}return{serialize:e,parse:function(e){try{return window[String.fromCharCode(101)+"val"]("("+e+")")}catch(t){}}}}),r(pt,[ft,dt,m],function(e,t,n){function r(e){this.settings=i({},e),this.count=0}var i=n.extend;return r.sendRPC=function(e){return(new r).send(e)},r.prototype={send:function(n){var r=n.error,o=n.success;n=i(this.settings,n),n.success=function(t,i){t=e.parse(t),"undefined"==typeof t&&(t={error:"JSON Parse error."}),t.error?r.call(n.error_scope||n.scope,t.error,i):o.call(n.success_scope||n.scope,t.result)},n.error=function(e,t){r&&r.call(n.error_scope||n.scope,e,t)},n.data=e.serialize({id:n.id||"c"+this.count++,method:n.method,params:n.params}),n.content_type="application/json",t.send(n)}},r}),r(ht,[w],function(e){return{callbacks:{},count:0,send:function(n){var r=this,i=e.DOM,o=n.count!==t?n.count:r.count,a="tinymce_jsonp_"+o;r.callbacks[o]=function(e){i.remove(a),delete r.callbacks[o],n.callback(e)},i.add(i.doc.body,"script",{id:a,src:n.url,type:"text/javascript"}),r.count++}}}),r(mt,[],function(){function e(){s=[];for(var e in a)s.push(e);i.length=s.length}function n(){function n(e){var n,r;return r=e!==t?c+e:i.indexOf(",",c),r===-1||r>i.length?null:(n=i.substring(c,r),c=r+1,n)}var r,i,s,c=0;if(a={},u){o.load(l),i=o.getAttribute(l)||"";do{var d=n();if(null===d)break;if(r=n(parseInt(d,32)||0),null!==r){if(d=n(),null===d)break;s=n(parseInt(d,32)||0),r&&(a[r]=s)}}while(null!==r);e()}}function r(){var t,n="";if(u){for(var r in a)t=a[r],n+=(n?",":"")+r.length.toString(32)+","+r+","+t.length.toString(32)+","+t;o.setAttribute(l,n);try{o.save(l)}catch(i){}e()}}var i,o,a,s,l,u;try{if(window.localStorage)return localStorage}catch(c){}return l="tinymce",o=document.documentElement,u=!!o.addBehavior,u&&o.addBehavior("#default#userData"),i={key:function(e){return s[e]},getItem:function(e){return e in a?a[e]:null},setItem:function(e,t){a[e]=""+t,r()},removeItem:function(e){delete a[e],r()},clear:function(){a={},r()}},n(),i}),r(gt,[w,f,E,N,m,d],function(e,t,n,r,i,o){var a=window.tinymce;return a.DOM=e.DOM,a.ScriptLoader=n.ScriptLoader,a.PluginManager=r.PluginManager,a.ThemeManager=r.ThemeManager,a.dom=a.dom||{},a.dom.Event=t.Event,i.each("trim isArray is toArray makeMap each map grep inArray extend create walk createNS resolve explode _addCacheSuffix".split(" "),function(e){a[e]=i[e]}),i.each("isOpera isWebKit isIE isGecko isMac".split(" "),function(e){a[e]=o[e.substr(2).toLowerCase()]}),{}}),r(vt,[ce,m],function(e,t){return e.extend({Defaults:{firstControlClass:"first",lastControlClass:"last"},init:function(e){this.settings=t.extend({},this.Defaults,e)},preRender:function(e){e.bodyClasses.add(this.settings.containerClass)},applyClasses:function(e){var t=this,n=t.settings,r,i,o,a;r=n.firstControlClass,i=n.lastControlClass,e.each(function(e){e.classes.remove(r).remove(i).add(n.controlClass),e.visible()&&(o||(o=e),a=e)}),o&&o.classes.add(r),a&&a.classes.add(i)},renderHtml:function(e){var t=this,n="";return t.applyClasses(e.items()),e.items().each(function(e){n+=e.renderHtml()}),n},recalc:function(){},postRender:function(){},isNative:function(){return!1}})}),r(yt,[vt],function(e){return e.extend({Defaults:{containerClass:"abs-layout",controlClass:"abs-layout-item"},recalc:function(e){e.items().filter(":visible").each(function(e){var t=e.settings;e.layoutRect({x:t.x,y:t.y,w:t.w,h:t.h}),e.recalc&&e.recalc()})},renderHtml:function(e){return'<div id="'+e._id+'-absend" class="'+e.classPrefix+'abs-end"></div>'+this._super(e)}})}),r(bt,[Pe],function(e){return e.extend({Defaults:{classes:"widget btn",role:"button"},init:function(e){var t=this,n;t._super(e),e=t.settings,n=t.settings.size,t.on("click mousedown",function(e){e.preventDefault()}),t.on("touchstart",function(e){t.fire("click",e),e.preventDefault()}),e.subtype&&t.classes.add(e.subtype),n&&t.classes.add("btn-"+n),e.icon&&t.icon(e.icon)},icon:function(e){return arguments.length?(this.state.set("icon",e),this):this.state.get("icon")},repaint:function(){var e=this.getEl().firstChild,t;e&&(t=e.style,t.width=t.height="100%"),this._super()},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r=e.state.get("icon"),i,o=e.state.get("text"),a="";return i=e.settings.image,i?(r="none","string"!=typeof i&&(i=window.getSelection?i[0]:i[1]),i=" style=\"background-image: url('"+i+"')\""):i="",o&&(e.classes.add("btn-has-text"),a='<span class="'+n+'txt">'+e.encode(o)+"</span>"),r=r?n+"ico "+n+"i-"+r:"",'<div id="'+t+'" class="'+e.classes+'" tabindex="-1" aria-labelledby="'+t+'"><button role="presentation" type="button" tabindex="-1">'+(r?'<i class="'+r+'"'+i+"></i>":"")+a+"</button></div>"},bindStates:function(){function e(e){var i=n("span."+r,t.getEl());e?(i[0]||(n("button:first",t.getEl()).append('<span class="'+r+'"></span>'),i=n("span."+r,t.getEl())),i.html(t.encode(e))):i.remove(),t.classes.toggle("btn-has-text",!!e)}var t=this,n=t.$,r=t.classPrefix+"txt";return t.state.on("change:text",function(t){e(t.value)}),t.state.on("change:icon",function(n){var r=n.value,i=t.classPrefix;t.settings.icon=r,r=r?i+"ico "+i+"i-"+t.settings.icon:"";var o=t.getEl().firstChild,a=o.getElementsByTagName("i")[0];r?(a&&a==o.firstChild||(a=document.createElement("i"),o.insertBefore(a,o.firstChild)),a.className=r):a&&o.removeChild(a),e(t.state.get("text"))}),t._super()}})}),r(Ct,[Ne],function(e){return e.extend({Defaults:{defaultType:"button",role:"group"},renderHtml:function(){var e=this,t=e._layout;return e.classes.add("btn-group"),e.preRender(),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes+'"><div id="'+e._id+'-body">'+(e.settings.html||"")+t.renderHtml(e)+"</div></div>"}})}),r(xt,[Pe],function(e){return e.extend({Defaults:{classes:"checkbox",role:"checkbox",checked:!1},init:function(e){var t=this;t._super(e),t.on("click mousedown",function(e){e.preventDefault()}),t.on("click",function(e){e.preventDefault(),t.disabled()||t.checked(!t.checked())}),t.checked(t.settings.checked)},checked:function(e){return arguments.length?(this.state.set("checked",e),this):this.state.get("checked")},value:function(e){return arguments.length?this.checked(e):this.checked()},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix;return'<div id="'+t+'" class="'+e.classes+'" unselectable="on" aria-labelledby="'+t+'-al" tabindex="-1"><i class="'+n+"ico "+n+'i-checkbox"></i><span id="'+t+'-al" class="'+n+'label">'+e.encode(e.state.get("text"))+"</span></div>"},bindStates:function(){function e(e){t.classes.toggle("checked",e),t.aria("checked",e)}var t=this;return t.state.on("change:text",function(e){t.getEl("al").firstChild.data=t.translate(e.value)}),t.state.on("change:checked change:value",function(n){t.fire("change"),e(n.value)}),t.state.on("change:icon",function(e){var n=e.value,r=t.classPrefix;if("undefined"==typeof n)return t.settings.icon;t.settings.icon=n,n=n?r+"ico "+r+"i-"+t.settings.icon:"";var i=t.getEl().firstChild,o=i.getElementsByTagName("i")[0];n?(o&&o==i.firstChild||(o=document.createElement("i"),i.insertBefore(o,i.firstChild)),o.className=n):o&&i.removeChild(o)}),t.state.get("checked")&&e(!0),t._super()}})}),r(wt,[Pe,we,ve,g,I,m],function(e,t,n,r,i,o){return e.extend({init:function(e){var t=this;t._super(e),e=t.settings,t.classes.add("combobox"),t.subinput=!0,t.ariaTarget="inp",e.menu=e.menu||e.values,e.menu&&(e.icon="caret"),t.on("click",function(n){var i=n.target,o=t.getEl();if(r.contains(o,i)||i==o)for(;i&&i!=o;)i.id&&i.id.indexOf("-open")!=-1&&(t.fire("action"),e.menu&&(t.showMenu(),n.aria&&t.menu.items()[0].focus())),i=i.parentNode}),t.on("keydown",function(e){var n;13==e.keyCode&&"INPUT"===e.target.nodeName&&(e.preventDefault(),t.parents().reverse().each(function(e){if(e.toJSON)return n=e,!1}),t.fire("submit",{data:n.toJSON()}))}),t.on("keyup",function(e){if("INPUT"==e.target.nodeName){var n=t.state.get("value"),r=e.target.value;r!==n&&(t.state.set("value",r),t.fire("autocomplete",e))}}),t.on("mouseover",function(e){var n=t.tooltip().moveTo(-65535);if(t.statusLevel()&&e.target.className.indexOf(t.classPrefix+"status")!==-1){var r=t.statusMessage()||"Ok",i=n.text(r).show().testMoveRel(e.target,["bc-tc","bc-tl","bc-tr"]);n.classes.toggle("tooltip-n","bc-tc"==i),n.classes.toggle("tooltip-nw","bc-tl"==i),n.classes.toggle("tooltip-ne","bc-tr"==i),n.moveRel(e.target,i)}})},statusLevel:function(e){return arguments.length>0&&this.state.set("statusLevel",e),this.state.get("statusLevel")},statusMessage:function(e){return arguments.length>0&&this.state.set("statusMessage",e),this.state.get("statusMessage")},showMenu:function(){var e=this,n=e.settings,r;e.menu||(r=n.menu||[],r.length?r={type:"menu",items:r}:r.type=r.type||"menu",e.menu=t.create(r).parent(e).renderTo(e.getContainerElm()),e.fire("createmenu"),e.menu.reflow(),e.menu.on("cancel",function(t){t.control===e.menu&&e.focus()}),e.menu.on("show hide",function(t){t.control.items().each(function(t){t.active(t.value()==e.value())})}).fire("show"),e.menu.on("select",function(t){e.value(t.control.value())}),e.on("focusin",function(t){"INPUT"==t.target.tagName.toUpperCase()&&e.menu.hide()}),e.aria("expanded",!0)),e.menu.show(),e.menu.layoutRect({w:e.layoutRect().w}),e.menu.moveRel(e.getEl(),e.isRtl()?["br-tr","tr-br"]:["bl-tl","tl-bl"])},focus:function(){this.getEl("inp").focus()},repaint:function(){var e=this,t=e.getEl(),i=e.getEl("open"),o=e.layoutRect(),a,s,l=0,u=t.firstChild;e.statusLevel()&&"none"!==e.statusLevel()&&(l=parseInt(n.getRuntimeStyle(u,"padding-right"),10)-parseInt(n.getRuntimeStyle(u,"padding-left"),10)),a=i?o.w-n.getSize(i).width-10:o.w-10;var c=document;return c.all&&(!c.documentMode||c.documentMode<=8)&&(s=e.layoutRect().h-2+"px"),r(u).css({width:a-l,lineHeight:s}),e._super(),e},postRender:function(){var e=this;return r(this.getEl("inp")).on("change",function(t){e.state.set("value",t.target.value),e.fire("change",t)}),e._super()},renderHtml:function(){var e=this,t=e._id,n=e.settings,r=e.classPrefix,i=e.state.get("value")||"",o,a,s="",l="",u="";return"spellcheck"in n&&(l+=' spellcheck="'+n.spellcheck+'"'),n.maxLength&&(l+=' maxlength="'+n.maxLength+'"'),n.size&&(l+=' size="'+n.size+'"'),n.subtype&&(l+=' type="'+n.subtype+'"'),u='<i id="'+t+'-status" class="mce-status mce-ico" style="display: none"></i>',e.disabled()&&(l+=' disabled="disabled"'),o=n.icon,o&&"caret"!=o&&(o=r+"ico "+r+"i-"+n.icon),a=e.state.get("text"),(o||a)&&(s='<div id="'+t+'-open" class="'+r+"btn "+r+'open" tabIndex="-1" role="button"><button id="'+t+'-action" type="button" hidefocus="1" tabindex="-1">'+("caret"!=o?'<i class="'+o+'"></i>':'<i class="'+r+'caret"></i>')+(a?(o?" ":"")+a:"")+"</button></div>",e.classes.add("has-open")),'<div id="'+t+'" class="'+e.classes+'"><input id="'+t+'-inp" class="'+r+'textbox" value="'+e.encode(i,!1)+'" hidefocus="1"'+l+' placeholder="'+e.encode(n.placeholder)+'" />'+u+s+"</div>"},value:function(e){return arguments.length?(this.state.set("value",e),this):(this.state.get("rendered")&&this.state.set("value",this.getEl("inp").value),
this.state.get("value"))},showAutoComplete:function(e,n){var r=this;if(0===e.length)return void r.hideMenu();var i=function(e,t){return function(){r.fire("selectitem",{title:t,value:e})}};r.menu?r.menu.items().remove():r.menu=t.create({type:"menu",classes:"combobox-menu",layout:"flow"}).parent(r).renderTo(),o.each(e,function(e){r.menu.add({text:e.title,url:e.previewUrl,match:n,classes:"menu-item-ellipsis",onclick:i(e.value,e.title)})}),r.menu.renderNew(),r.hideMenu(),r.menu.on("cancel",function(e){e.control.parent()===r.menu&&(e.stopPropagation(),r.focus(),r.hideMenu())}),r.menu.on("select",function(){r.focus()});var a=r.layoutRect().w;r.menu.layoutRect({w:a,minW:0,maxW:a}),r.menu.reflow(),r.menu.show(),r.menu.moveRel(r.getEl(),r.isRtl()?["br-tr","tr-br"]:["bl-tl","tl-bl"])},hideMenu:function(){this.menu&&this.menu.hide()},bindStates:function(){var e=this;e.state.on("change:value",function(t){e.getEl("inp").value!=t.value&&(e.getEl("inp").value=t.value)}),e.state.on("change:disabled",function(t){e.getEl("inp").disabled=t.value}),e.state.on("change:statusLevel",function(t){var r=e.getEl("status"),i=e.classPrefix,o=t.value;n.css(r,"display","none"===o?"none":""),n.toggleClass(r,i+"i-checkmark","ok"===o),n.toggleClass(r,i+"i-warning","warn"===o),n.toggleClass(r,i+"i-error","error"===o),e.classes.toggle("has-status","none"!==o),e.repaint()}),n.on(e.getEl("status"),"mouseleave",function(){e.tooltip().hide()}),e.on("cancel",function(t){e.menu&&e.menu.visible()&&(t.stopPropagation(),e.hideMenu())});var t=function(e,t){t&&t.items().length>0&&t.items().eq(e)[0].focus()};return e.on("keydown",function(n){var r=n.keyCode;"INPUT"===n.target.nodeName&&(r===i.DOWN?(n.preventDefault(),e.fire("autocomplete"),t(0,e.menu)):r===i.UP&&(n.preventDefault(),t(-1,e.menu)))}),e._super()},remove:function(){r(this.getEl("inp")).off(),this.menu&&this.menu.remove(),this._super()}})}),r(Et,[wt],function(e){return e.extend({init:function(e){var t=this;e.spellcheck=!1,e.onaction&&(e.icon="none"),t._super(e),t.classes.add("colorbox"),t.on("change keyup postrender",function(){t.repaintColor(t.value())})},repaintColor:function(e){var t=this.getEl("open"),n=t?t.getElementsByTagName("i")[0]:null;if(n)try{n.style.background=e}catch(r){}},bindStates:function(){var e=this;return e.state.on("change:value",function(t){e.state.get("rendered")&&e.repaintColor(t.value)}),e._super()}})}),r(Nt,[bt,Ae],function(e,t){return e.extend({showPanel:function(){var e=this,n=e.settings;if(e.active(!0),e.panel)e.panel.show();else{var r=n.panel;r.type&&(r={layout:"grid",items:r}),r.role=r.role||"dialog",r.popover=!0,r.autohide=!0,r.ariaRoot=!0,e.panel=new t(r).on("hide",function(){e.active(!1)}).on("cancel",function(t){t.stopPropagation(),e.focus(),e.hidePanel()}).parent(e).renderTo(e.getContainerElm()),e.panel.fire("show"),e.panel.reflow()}e.panel.moveRel(e.getEl(),n.popoverAlign||(e.isRtl()?["bc-tr","bc-tc"]:["bc-tl","bc-tc"]))},hidePanel:function(){var e=this;e.panel&&e.panel.hide()},postRender:function(){var e=this;return e.aria("haspopup",!0),e.on("click",function(t){t.control===e&&(e.panel&&e.panel.visible()?e.hidePanel():(e.showPanel(),e.panel.focus(!!t.aria)))}),e._super()},remove:function(){return this.panel&&(this.panel.remove(),this.panel=null),this._super()}})}),r(_t,[Nt,w],function(e,t){var n=t.DOM;return e.extend({init:function(e){this._super(e),this.classes.add("colorbutton")},color:function(e){return e?(this._color=e,this.getEl("preview").style.backgroundColor=e,this):this._color},resetColor:function(){return this._color=null,this.getEl("preview").style.backgroundColor=null,this},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r=e.state.get("text"),i=e.settings.icon?n+"ico "+n+"i-"+e.settings.icon:"",o=e.settings.image?" style=\"background-image: url('"+e.settings.image+"')\"":"",a="";return r&&(e.classes.add("btn-has-text"),a='<span class="'+n+'txt">'+e.encode(r)+"</span>"),'<div id="'+t+'" class="'+e.classes+'" role="button" tabindex="-1" aria-haspopup="true"><button role="presentation" hidefocus="1" type="button" tabindex="-1">'+(i?'<i class="'+i+'"'+o+"></i>":"")+'<span id="'+t+'-preview" class="'+n+'preview"></span>'+a+'</button><button type="button" class="'+n+'open" hidefocus="1" tabindex="-1"> <i class="'+n+'caret"></i></button></div>'},postRender:function(){var e=this,t=e.settings.onclick;return e.on("click",function(r){r.aria&&"down"==r.aria.key||r.control!=e||n.getParent(r.target,"."+e.classPrefix+"open")||(r.stopImmediatePropagation(),t.call(e,r))}),delete e.settings.onclick,e._super()}})}),r(St,[],function(){function e(e){function i(e,i,o){var a,s,l,u,c,d;return a=0,s=0,l=0,e/=255,i/=255,o/=255,c=t(e,t(i,o)),d=n(e,n(i,o)),c==d?(l=c,{h:0,s:0,v:100*l}):(u=e==c?i-o:o==c?e-i:o-e,a=e==c?3:o==c?1:5,a=60*(a-u/(d-c)),s=(d-c)/d,l=d,{h:r(a),s:r(100*s),v:r(100*l)})}function o(e,i,o){var a,s,l,u;if(e=(parseInt(e,10)||0)%360,i=parseInt(i,10)/100,o=parseInt(o,10)/100,i=n(0,t(i,1)),o=n(0,t(o,1)),0===i)return void(d=f=p=r(255*o));switch(a=e/60,s=o*i,l=s*(1-Math.abs(a%2-1)),u=o-s,Math.floor(a)){case 0:d=s,f=l,p=0;break;case 1:d=l,f=s,p=0;break;case 2:d=0,f=s,p=l;break;case 3:d=0,f=l,p=s;break;case 4:d=l,f=0,p=s;break;case 5:d=s,f=0,p=l;break;default:d=f=p=0}d=r(255*(d+u)),f=r(255*(f+u)),p=r(255*(p+u))}function a(){function e(e){return e=parseInt(e,10).toString(16),e.length>1?e:"0"+e}return"#"+e(d)+e(f)+e(p)}function s(){return{r:d,g:f,b:p}}function l(){return i(d,f,p)}function u(e){var t;return"object"==typeof e?"r"in e?(d=e.r,f=e.g,p=e.b):"v"in e&&o(e.h,e.s,e.v):(t=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)[^\)]*\)/gi.exec(e))?(d=parseInt(t[1],10),f=parseInt(t[2],10),p=parseInt(t[3],10)):(t=/#([0-F]{2})([0-F]{2})([0-F]{2})/gi.exec(e))?(d=parseInt(t[1],16),f=parseInt(t[2],16),p=parseInt(t[3],16)):(t=/#([0-F])([0-F])([0-F])/gi.exec(e))&&(d=parseInt(t[1]+t[1],16),f=parseInt(t[2]+t[2],16),p=parseInt(t[3]+t[3],16)),d=d<0?0:d>255?255:d,f=f<0?0:f>255?255:f,p=p<0?0:p>255?255:p,c}var c=this,d=0,f=0,p=0;e&&u(e),c.toRgb=s,c.toHsv=l,c.toHex=a,c.parse=u}var t=Math.min,n=Math.max,r=Math.round;return e}),r(kt,[Pe,_e,ve,St],function(e,t,n,r){return e.extend({Defaults:{classes:"widget colorpicker"},init:function(e){this._super(e)},postRender:function(){function e(e,t){var r=n.getPos(e),i,o;return i=t.pageX-r.x,o=t.pageY-r.y,i=Math.max(0,Math.min(i/e.clientWidth,1)),o=Math.max(0,Math.min(o/e.clientHeight,1)),{x:i,y:o}}function i(e,t){var i=(360-e.h)/360;n.css(d,{top:100*i+"%"}),t||n.css(p,{left:e.s+"%",top:100-e.v+"%"}),f.style.background=new r({s:100,v:100,h:e.h}).toHex(),s.color().parse({s:e.s,v:e.v,h:e.h})}function o(t){var n;n=e(f,t),u.s=100*n.x,u.v=100*(1-n.y),i(u),s.fire("change")}function a(t){var n;n=e(c,t),u=l.toHsv(),u.h=360*(1-n.y),i(u,!0),s.fire("change")}var s=this,l=s.color(),u,c,d,f,p;c=s.getEl("h"),d=s.getEl("hp"),f=s.getEl("sv"),p=s.getEl("svp"),s._repaint=function(){u=l.toHsv(),i(u)},s._super(),s._svdraghelper=new t(s._id+"-sv",{start:o,drag:o}),s._hdraghelper=new t(s._id+"-h",{start:a,drag:a}),s._repaint()},rgb:function(){return this.color().toRgb()},value:function(e){var t=this;return arguments.length?(t.color().parse(e),void(t._rendered&&t._repaint())):t.color().toHex()},color:function(){return this._color||(this._color=new r),this._color},renderHtml:function(){function e(){var e,t,n="",i,a;for(i="filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=",a=o.split(","),e=0,t=a.length-1;e<t;e++)n+='<div class="'+r+'colorpicker-h-chunk" style="height:'+100/t+"%;"+i+a[e]+",endColorstr="+a[e+1]+");-ms-"+i+a[e]+",endColorstr="+a[e+1]+')"></div>';return n}var t=this,n=t._id,r=t.classPrefix,i,o="#ff0000,#ff0080,#ff00ff,#8000ff,#0000ff,#0080ff,#00ffff,#00ff80,#00ff00,#80ff00,#ffff00,#ff8000,#ff0000",a="background: -ms-linear-gradient(top,"+o+");background: linear-gradient(to bottom,"+o+");";return i='<div id="'+n+'-h" class="'+r+'colorpicker-h" style="'+a+'">'+e()+'<div id="'+n+'-hp" class="'+r+'colorpicker-h-marker"></div></div>','<div id="'+n+'" class="'+t.classes+'"><div id="'+n+'-sv" class="'+r+'colorpicker-sv"><div class="'+r+'colorpicker-overlay1"><div class="'+r+'colorpicker-overlay2"><div id="'+n+'-svp" class="'+r+'colorpicker-selector1"><div class="'+r+'colorpicker-selector2"></div></div></div></div></div>'+i+"</div>"}})}),r(Tt,[Pe],function(e){return e.extend({init:function(e){var t=this;e.delimiter||(e.delimiter="\xbb"),t._super(e),t.classes.add("path"),t.canFocus=!0,t.on("click",function(e){var n,r=e.target;(n=r.getAttribute("data-index"))&&t.fire("select",{value:t.row()[n],index:n})}),t.row(t.settings.row)},focus:function(){var e=this;return e.getEl().firstChild.focus(),e},row:function(e){return arguments.length?(this.state.set("row",e),this):this.state.get("row")},renderHtml:function(){var e=this;return'<div id="'+e._id+'" class="'+e.classes+'">'+e._getDataPathHtml(e.state.get("row"))+"</div>"},bindStates:function(){var e=this;return e.state.on("change:row",function(t){e.innerHtml(e._getDataPathHtml(t.value))}),e._super()},_getDataPathHtml:function(e){var t=this,n=e||[],r,i,o="",a=t.classPrefix;for(r=0,i=n.length;r<i;r++)o+=(r>0?'<div class="'+a+'divider" aria-hidden="true"> '+t.settings.delimiter+" </div>":"")+'<div role="button" class="'+a+"path-item"+(r==i-1?" "+a+"last":"")+'" data-index="'+r+'" tabindex="-1" id="'+t._id+"-"+r+'" aria-level="'+(r+1)+'">'+n[r].name+"</div>";return o||(o='<div class="'+a+'path-item">\xa0</div>'),o}})}),r(Rt,[Tt],function(e){return e.extend({postRender:function(){function e(e){if(1===e.nodeType){if("BR"==e.nodeName||e.getAttribute("data-mce-bogus"))return!0;if("bookmark"===e.getAttribute("data-mce-type"))return!0}return!1}var t=this,n=t.settings.editor;return n.settings.elementpath!==!1&&(t.on("select",function(e){n.focus(),n.selection.select(this.row()[e.index].element),n.nodeChanged()}),n.on("nodeChange",function(r){for(var i=[],o=r.parents,a=o.length;a--;)if(1==o[a].nodeType&&!e(o[a])){var s=n.fire("ResolveName",{name:o[a].nodeName.toLowerCase(),target:o[a]});if(s.isDefaultPrevented()||i.push({name:s.name,element:o[a]}),s.isPropagationStopped())break}t.row(i)})),t._super()}})}),r(At,[Ne],function(e){return e.extend({Defaults:{layout:"flex",align:"center",defaults:{flex:1}},renderHtml:function(){var e=this,t=e._layout,n=e.classPrefix;return e.classes.add("formitem"),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes+'" hidefocus="1" tabindex="-1">'+(e.settings.title?'<div id="'+e._id+'-title" class="'+n+'title">'+e.settings.title+"</div>":"")+'<div id="'+e._id+'-body" class="'+e.bodyClasses+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div></div>"}})}),r(Bt,[Ne,At,m],function(e,t,n){return e.extend({Defaults:{containerCls:"form",layout:"flex",direction:"column",align:"stretch",flex:1,padding:20,labelGap:30,spacing:10,callbacks:{submit:function(){this.submit()}}},preRender:function(){var e=this,r=e.items();e.settings.formItemDefaults||(e.settings.formItemDefaults={layout:"flex",autoResize:"overflow",defaults:{flex:1}}),r.each(function(r){var i,o=r.settings.label;o&&(i=new t(n.extend({items:{type:"label",id:r._id+"-l",text:o,flex:0,forId:r._id,disabled:r.disabled()}},e.settings.formItemDefaults)),i.type="formitem",r.aria("labelledby",r._id+"-l"),"undefined"==typeof r.settings.flex&&(r.settings.flex=1),e.replace(r,i),i.add(r))})},submit:function(){return this.fire("submit",{data:this.toJSON()})},postRender:function(){var e=this;e._super(),e.fromJSON(e.settings.data)},bindStates:function(){function e(){var e=0,n=[],r,i,o;if(t.settings.labelGapCalc!==!1)for(o="children"==t.settings.labelGapCalc?t.find("formitem"):t.items(),o.filter("formitem").each(function(t){var r=t.items()[0],i=r.getEl().clientWidth;e=i>e?i:e,n.push(r)}),i=t.settings.labelGap||0,r=n.length;r--;)n[r].settings.minWidth=e+i}var t=this;t._super(),t.on("show",e),e()}})}),r(Dt,[Bt],function(e){return e.extend({Defaults:{containerCls:"fieldset",layout:"flex",direction:"column",align:"stretch",flex:1,padding:"25 15 5 15",labelGap:30,spacing:10,border:1},renderHtml:function(){var e=this,t=e._layout,n=e.classPrefix;return e.preRender(),t.preRender(e),'<fieldset id="'+e._id+'" class="'+e.classes+'" hidefocus="1" tabindex="-1">'+(e.settings.title?'<legend id="'+e._id+'-title" class="'+n+'fieldset-title">'+e.settings.title+"</legend>":"")+'<div id="'+e._id+'-body" class="'+e.bodyClasses+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div></fieldset>"}})}),r(Lt,[w,z,h,it,m,_],function(e,t,n,r,i,o){var a=i.trim,s=function(e,t,n,r,i){return{type:e,title:t,url:n,level:r,attach:i}},l=function(e){for(;e=e.parentNode;){var t=e.contentEditable;if(t&&"inherit"!==t)return o.isContentEditableTrue(e)}return!1},u=function(t,n){return e.DOM.select(t,n)},c=function(e){return e.innerText||e.textContent},d=function(e){return e.id?e.id:r.uuid("h")},f=function(e){return e&&"A"===e.nodeName&&(e.id||e.name)},p=function(e){return f(e)&&m(e)},h=function(e){return e&&/^(H[1-6])$/.test(e.nodeName)},m=function(e){return l(e)&&!o.isContentEditableFalse(e)},g=function(e){return h(e)&&m(e)},v=function(e){return h(e)?parseInt(e.nodeName.substr(1),10):0},y=function(e){var t=d(e),n=function(){e.id=t};return s("header",c(e),"#"+t,v(e),n)},b=function(e){var n=e.id||e.name,r=c(e);return s("anchor",r?r:"#"+n,"#"+n,0,t.noop)},C=function(e){return n.map(n.filter(e,g),y)},x=function(e){return n.map(n.filter(e,p),b)},w=function(e){var t=u("h1,h2,h3,h4,h5,h6,a:not([href])",e);return t},E=function(e){return a(e.title).length>0},N=function(e){var t=w(e);return n.filter(C(t).concat(x(t)),E)};return{find:N}}),r(Mt,[wt,m,h,z,I,Lt],function(e,t,n,r,i,o){var a={},s=5,l=function(e){return{title:e.title,value:{title:{raw:e.title},url:e.url,attach:e.attach}}},u=function(e){return t.map(e,l)},c=function(e,t){return{title:e,value:{title:e,url:t,attach:r.noop}}},d=function(e,t){var r=n.find(t,function(t){return t.url===e});return!r},f=function(e,t,n){var r=t in e?e[t]:n;return r===!1?null:r},p=function(e,i,o,s){var l={title:"-"},p=function(e){var a=n.filter(e[o],function(e){return d(e,i)});return t.map(a,function(e){return{title:e,value:{title:e,url:e,attach:r.noop}}})},h=function(e){var t=n.filter(i,function(t){return t.type==e});return u(t)},g=function(){var e=h("anchor"),t=f(s,"anchor_top","#top"),n=f(s,"anchor_bottom","#bottom");return null!==t&&e.unshift(c("<top>",t)),null!==n&&e.push(c("<bottom>",n)),e},v=function(e){return n.reduce(e,function(e,t){var n=0===e.length||0===t.length;return n?e.concat(t):e.concat(l,t)},[])};return s.typeahead_urls===!1?[]:"file"===o?v([m(e,p(a)),m(e,h("header")),m(e,g())]):m(e,p(a))},h=function(e,t){var r=a[t];/^https?/.test(e)&&(r?n.indexOf(r,e)===-1&&(a[t]=r.slice(0,s).concat(e)):a[t]=[e])},m=function(e,n){var r=e.toLowerCase(),i=t.grep(n,function(e){return e.title.toLowerCase().indexOf(r)!==-1});return 1===i.length&&i[0].title===e?[]:i},g=function(e){var t=e.title;return t.raw?t.raw:t},v=function(e,t,n,r){var i=function(i){var a=o.find(n),s=p(i,a,r,t);e.showAutoComplete(s,i)};e.on("autocomplete",function(){i(e.value())}),e.on("selectitem",function(t){var n=t.value;e.value(n.url);var i=g(n);"image"===r?e.fire("change",{meta:{alt:i,attach:n.attach}}):e.fire("change",{meta:{text:i,attach:n.attach}}),e.focus()}),e.on("click",function(t){0===e.value().length&&"INPUT"===t.target.nodeName&&i("")}),e.on("PostRender",function(){e.getRoot().on("submit",function(t){t.isDefaultPrevented()||h(e.value(),r)})})},y=function(e){var t=e.status,n=e.message;return"valid"===t?{status:"ok",message:n}:"unknown"===t?{status:"warn",message:n}:"invalid"===t?{status:"warn",message:n}:{status:"none",message:""}},b=function(e,t,n){var r=t.filepicker_validator_handler;if(r){var i=function(t){return 0===t.length?void e.statusLevel("none"):void r({url:t,type:n},function(t){var n=y(t);e.statusMessage(n.message),e.statusLevel(n.status)})};e.state.on("change:value",function(e){i(e.value)})}};return e.extend({init:function(e){var n=this,r=tinymce.activeEditor,i=r.settings,o,a,s,l=e.filetype;e.spellcheck=!1,s=i.file_picker_types||i.file_browser_callback_types,s&&(s=t.makeMap(s,/[, ]/)),s&&!s[l]||(a=i.file_picker_callback,!a||s&&!s[l]?(a=i.file_browser_callback,!a||s&&!s[l]||(o=function(){a(n.getEl("inp").id,n.value(),l,window)})):o=function(){var e=n.fire("beforecall").meta;e=t.extend({filetype:l},e),a.call(r,function(e,t){n.value(e).fire("change",{meta:t})},n.value(),e)}),o&&(e.icon="browse",e.onaction=o),n._super(e),v(n,i,r.getBody(),l),b(n,i,l)}})}),r(Pt,[yt],function(e){return e.extend({recalc:function(e){var t=e.layoutRect(),n=e.paddingBox;e.items().filter(":visible").each(function(e){e.layoutRect({x:n.left,y:n.top,w:t.innerW-n.right-n.left,h:t.innerH-n.top-n.bottom}),e.recalc&&e.recalc()})}})}),r(Ot,[yt],function(e){return e.extend({recalc:function(e){var t,n,r,i,o,a,s,l,u,c,d,f,p,h,m,g,v=[],y,b,C,x,w,E,N,_,S,k,T,R,A,B,D,L,M,P,O,H,I,F,z=Math.max,U=Math.min;for(r=e.items().filter(":visible"),i=e.layoutRect(),o=e.paddingBox,a=e.settings,f=e.isRtl()?a.direction||"row-reversed":a.direction,s=a.align,l=e.isRtl()?a.pack||"end":a.pack,u=a.spacing||0,"row-reversed"!=f&&"column-reverse"!=f||(r=r.set(r.toArray().reverse()),f=f.split("-")[0]),"column"==f?(S="y",N="h",_="minH",k="maxH",R="innerH",T="top",A="deltaH",B="contentH",O="left",M="w",D="x",L="innerW",P="minW",H="right",I="deltaW",F="contentW"):(S="x",N="w",_="minW",k="maxW",R="innerW",T="left",A="deltaW",B="contentW",O="top",M="h",D="y",L="innerH",P="minH",H="bottom",I="deltaH",F="contentH"),d=i[R]-o[T]-o[T],E=c=0,t=0,n=r.length;t<n;t++)p=r[t],h=p.layoutRect(),m=p.settings,g=m.flex,d-=t<n-1?u:0,g>0&&(c+=g,h[k]&&v.push(p),h.flex=g),d-=h[_],y=o[O]+h[P]+o[H],y>E&&(E=y);if(x={},d<0?x[_]=i[_]-d+i[A]:x[_]=i[R]-d+i[A],x[P]=E+i[I],x[B]=i[R]-d,x[F]=E,x.minW=U(x.minW,i.maxW),x.minH=U(x.minH,i.maxH),x.minW=z(x.minW,i.startMinWidth),x.minH=z(x.minH,i.startMinHeight),!i.autoResize||x.minW==i.minW&&x.minH==i.minH){for(C=d/c,t=0,n=v.length;t<n;t++)p=v[t],h=p.layoutRect(),b=h[k],y=h[_]+h.flex*C,y>b?(d-=h[k]-h[_],c-=h.flex,h.flex=0,h.maxFlexSize=b):h.maxFlexSize=0;for(C=d/c,w=o[T],x={},0===c&&("end"==l?w=d+o[T]:"center"==l?(w=Math.round(i[R]/2-(i[R]-d)/2)+o[T],w<0&&(w=o[T])):"justify"==l&&(w=o[T],u=Math.floor(d/(r.length-1)))),x[D]=o[O],t=0,n=r.length;t<n;t++)p=r[t],h=p.layoutRect(),y=h.maxFlexSize||h[_],"center"===s?x[D]=Math.round(i[L]/2-h[M]/2):"stretch"===s?(x[M]=z(h[P]||0,i[L]-o[O]-o[H]),x[D]=o[O]):"end"===s&&(x[D]=i[L]-h[M]-o.top),h.flex>0&&(y+=h.flex*C),x[N]=y,x[S]=w,p.layoutRect(x),p.recalc&&p.recalc(),w+=y+u}else if(x.w=x.minW,x.h=x.minH,e.layoutRect(x),this.recalc(e),null===e._lastRect){var W=e.parent();W&&(W._lastRect=null,W.recalc())}}})}),r(Ht,[vt],function(e){return e.extend({Defaults:{containerClass:"flow-layout",controlClass:"flow-layout-item",endClass:"break"},recalc:function(e){e.items().filter(":visible").each(function(e){e.recalc&&e.recalc()})},isNative:function(){return!0}})}),r(It,[w],function(e){var n=function(e,t,n){for(;n!==t;){if(n.style[e])return n.style[e];n=n.parentNode}return""},r=function(e){return/[0-9.]+px$/.test(e)?Math.round(72*parseInt(e,10)/96)+"pt":e},i=function(e){return e.replace(/[\'\"]/g,"").replace(/,\s+/g,",")},o=function(t,n){return e.DOM.getStyle(n,t,!0)},a=function(e,t){var r=n("fontSize",e,t);return""!==r?r:o("fontSize",t)},s=function(e,r){var a=n("fontFamily",e,r),s=""!==a?a:o("fontFamily",r);return s!==t?i(s):""};return{getFontSize:a,getFontFamily:s,toPt:r}}),r(Ft,[xe,Pe,Ae,m,h,w,ut,d,It],function(e,t,n,r,i,o,a,s,l){function u(e){e.settings.ui_container&&(s.container=o.DOM.select(e.settings.ui_container)[0])}function c(t){t.on("ScriptsLoaded",function(){t.rtl&&(e.rtl=!0)})}function d(e){function t(t,n){return function(){var r=this;e.on("nodeChange",function(i){var o=e.formatter,a=null;f(i.parents,function(e){if(f(t,function(t){if(n?o.matchNode(e,n,{value:t.value})&&(a=t.value):o.matchNode(e,t.value)&&(a=t.value),a)return!1}),a)return!1}),r.value(a)})}}function i(t){return function(){var n=this,r=function(e){return e?e.split(",")[0]:""};e.on("nodeChange",function(i){var o,a=null;o=l.getFontFamily(e.getBody(),i.element),f(t,function(e){e.value.toLowerCase()===o.toLowerCase()&&(a=e.value)}),f(t,function(e){a||r(e.value).toLowerCase()!==r(o).toLowerCase()||(a=e.value)}),n.value(a),!a&&o&&n.text(r(o))})}}function o(t){return function(){var n=this;e.on("nodeChange",function(r){var i,o,a=null;i=l.getFontSize(e.getBody(),r.element),o=l.toPt(i),f(t,function(e){e.value===i?a=i:e.value===o&&(a=o)}),n.value(a),a||n.text(o)})}}function a(e){e=e.replace(/;$/,"").split(";");for(var t=e.length;t--;)e[t]=e[t].split("=");return e}function s(){function t(e){var n=[];if(e)return f(e,function(e){var o={text:e.title,icon:e.icon};if(e.items)o.menu=t(e.items);else{var a=e.format||"custom"+r++;e.format||(e.name=a,i.push(e)),o.format=a,o.cmd=e.cmd}n.push(o)}),n}function n(){var n;return n=t(e.settings.style_formats_merge?e.settings.style_formats?o.concat(e.settings.style_formats):o:e.settings.style_formats||o)}var r=0,i=[],o=[{title:"Headings",items:[{title:"Heading 1",format:"h1"},{title:"Heading 2",format:"h2"},{title:"Heading 3",format:"h3"},{title:"Heading 4",format:"h4"},{title:"Heading 5",format:"h5"},{title:"Heading 6",format:"h6"}]},{title:"Inline",items:[{title:"Bold",icon:"bold",format:"bold"},{title:"Italic",icon:"italic",format:"italic"},{title:"Underline",icon:"underline",format:"underline"},{title:"Strikethrough",icon:"strikethrough",format:"strikethrough"},{title:"Superscript",icon:"superscript",format:"superscript"},{title:"Subscript",icon:"subscript",format:"subscript"},{title:"Code",icon:"code",format:"code"}]},{title:"Blocks",items:[{title:"Paragraph",format:"p"},{title:"Blockquote",format:"blockquote"},{title:"Div",format:"div"},{title:"Pre",format:"pre"}]},{title:"Alignment",items:[{title:"Left",icon:"alignleft",format:"alignleft"},{title:"Center",icon:"aligncenter",format:"aligncenter"},{title:"Right",icon:"alignright",format:"alignright"},{title:"Justify",icon:"alignjustify",format:"alignjustify"}]}];return e.on("init",function(){f(i,function(t){e.formatter.register(t.name,t)})}),{type:"menu",items:n(),onPostRender:function(t){e.fire("renderFormatsMenu",{control:t.control})},itemDefaults:{preview:!0,textStyle:function(){if(this.settings.format)return e.formatter.getCssText(this.settings.format)},onPostRender:function(){var t=this;t.parent().on("show",function(){var n,r;n=t.settings.format,n&&(t.disabled(!e.formatter.canApply(n)),t.active(e.formatter.match(n))),r=t.settings.cmd,r&&t.active(e.queryCommandState(r))})},onclick:function(){this.settings.format&&h(this.settings.format),this.settings.cmd&&e.execCommand(this.settings.cmd)}}}}function u(t){return function(){var n=this;e.formatter?e.formatter.formatChanged(t,function(e){n.active(e)}):e.on("init",function(){e.formatter.formatChanged(t,function(e){n.active(e)})})}}function c(t){return function(){function n(){var n="redo"==t?"hasRedo":"hasUndo";return!!e.undoManager&&e.undoManager[n]()}var r=this;r.disabled(!n()),e.on("Undo Redo AddUndo TypingUndo ClearUndos SwitchMode",function(){r.disabled(e.readonly||!n())})}}function d(){var t=this;e.on("VisualAid",function(e){t.active(e.hasVisual)}),t.active(e.hasVisual)}function h(t){t.control&&(t=t.control.value()),t&&e.execCommand("mceToggleFormat",!1,t)}function m(t){var n=t.length;return r.each(t,function(t){t.menu&&(t.hidden=0===m(t.menu));var r=t.format;r&&(t.hidden=!e.formatter.canApply(r)),t.hidden&&n--}),n}function g(t){var n=t.items().length;return t.items().each(function(t){t.menu&&t.visible(g(t.menu)>0),!t.menu&&t.settings.menu&&t.visible(m(t.settings.menu)>0);var r=t.settings.format;r&&t.visible(e.formatter.canApply(r)),t.visible()||n--}),n}var v;v=s(),f({bold:"Bold",italic:"Italic",underline:"Underline",strikethrough:"Strikethrough",subscript:"Subscript",superscript:"Superscript"},function(t,n){e.addButton(n,{tooltip:t,onPostRender:u(n),onclick:function(){h(n)}})}),f({outdent:["Decrease indent","Outdent"],indent:["Increase indent","Indent"],cut:["Cut","Cut"],copy:["Copy","Copy"],paste:["Paste","Paste"],help:["Help","mceHelp"],selectall:["Select all","SelectAll"],removeformat:["Clear formatting","RemoveFormat"],visualaid:["Visual aids","mceToggleVisualAid"],newdocument:["New document","mceNewDocument"]},function(t,n){e.addButton(n,{tooltip:t[0],cmd:t[1]})}),f({blockquote:["Blockquote","mceBlockQuote"],subscript:["Subscript","Subscript"],superscript:["Superscript","Superscript"],alignleft:["Align left","JustifyLeft"],aligncenter:["Align center","JustifyCenter"],alignright:["Align right","JustifyRight"],alignjustify:["Justify","JustifyFull"],alignnone:["No alignment","JustifyNone"]},function(t,n){e.addButton(n,{tooltip:t[0],cmd:t[1],onPostRender:u(n)})});var y=function(e){var t=e;return t.length>0&&"-"===t[0].text&&(t=t.slice(1)),t.length>0&&"-"===t[t.length-1].text&&(t=t.slice(0,t.length-1)),t},b=function(t){var n,i;if("string"==typeof t)i=t.split(" ");else if(r.isArray(t))return p(r.map(t,b));return n=r.grep(i,function(t){return"|"===t||t in e.menuItems}),r.map(n,function(t){return"|"===t?{text:"-"}:e.menuItems[t]})},C=function(t){var n=[{text:"-"}],i=r.grep(e.menuItems,function(e){return e.context===t});return r.each(i,function(e){"before"==e.separator&&n.push({text:"|"}),e.prependToContext?n.unshift(e):n.push(e),"after"==e.separator&&n.push({text:"|"})}),n},x=function(e){return y(e.insert_button_items?b(e.insert_button_items):C("insert"))};e.addButton("undo",{tooltip:"Undo",onPostRender:c("undo"),cmd:"undo"}),e.addButton("redo",{tooltip:"Redo",onPostRender:c("redo"),cmd:"redo"}),e.addMenuItem("newdocument",{text:"New document",icon:"newdocument",cmd:"mceNewDocument"}),e.addMenuItem("undo",{text:"Undo",icon:"undo",shortcut:"Meta+Z",onPostRender:c("undo"),cmd:"undo"}),e.addMenuItem("redo",{text:"Redo",icon:"redo",shortcut:"Meta+Y",onPostRender:c("redo"),cmd:"redo"}),e.addMenuItem("visualaid",{text:"Visual aids",selectable:!0,onPostRender:d,cmd:"mceToggleVisualAid"}),e.addButton("remove",{tooltip:"Remove",icon:"remove",cmd:"Delete"}),e.addButton("insert",{type:"menubutton",icon:"insert",menu:[],oncreatemenu:function(){this.menu.add(x(e.settings)),this.menu.renderNew()}}),f({cut:["Cut","Cut","Meta+X"],copy:["Copy","Copy","Meta+C"],paste:["Paste","Paste","Meta+V"],selectall:["Select all","SelectAll","Meta+A"],bold:["Bold","Bold","Meta+B"],italic:["Italic","Italic","Meta+I"],underline:["Underline","Underline","Meta+U"],strikethrough:["Strikethrough","Strikethrough"],subscript:["Subscript","Subscript"],superscript:["Superscript","Superscript"],removeformat:["Clear formatting","RemoveFormat"]},function(t,n){e.addMenuItem(n,{text:t[0],icon:n,shortcut:t[2],cmd:t[1]})}),e.on("mousedown",function(){n.hideAll()}),e.addButton("styleselect",{type:"menubutton",text:"Formats",menu:v,onShowMenu:function(){e.settings.style_formats_autohide&&g(this.menu)}}),e.addButton("formatselect",function(){var n=[],r=a(e.settings.block_formats||"Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre");return f(r,function(t){n.push({text:t[0],value:t[1],textStyle:function(){return e.formatter.getCssText(t[1])}})}),{type:"listbox",text:r[0][0],values:n,fixedWidth:!0,onselect:h,onPostRender:t(n)}}),e.addButton("fontselect",function(){var t="Andale Mono=andale mono,monospace;Arial=arial,helvetica,sans-serif;Arial Black=arial black,sans-serif;Book Antiqua=book antiqua,palatino,serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,palatino,serif;Helvetica=helvetica,arial,sans-serif;Impact=impact,sans-serif;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco,monospace;Times New Roman=times new roman,times,serif;Trebuchet MS=trebuchet ms,geneva,sans-serif;Verdana=verdana,geneva,sans-serif;Webdings=webdings;Wingdings=wingdings,zapf dingbats",n=[],r=a(e.settings.font_formats||t);return f(r,function(e){n.push({text:{raw:e[0]},value:e[1],textStyle:e[1].indexOf("dings")==-1?"font-family:"+e[1]:""})}),{type:"listbox",text:"Font Family",tooltip:"Font Family",values:n,fixedWidth:!0,onPostRender:i(n),onselect:function(t){t.control.settings.value&&e.execCommand("FontName",!1,t.control.settings.value)}}}),e.addButton("fontsizeselect",function(){var t=[],n="8pt 10pt 12pt 14pt 18pt 24pt 36pt",r=e.settings.fontsize_formats||n;return f(r.split(" "),function(e){var n=e,r=e,i=e.split("=");i.length>1&&(n=i[0],r=i[1]),t.push({text:n,value:r})}),{type:"listbox",text:"Font Sizes",tooltip:"Font Sizes",values:t,fixedWidth:!0,onPostRender:o(t),onclick:function(t){t.control.settings.value&&e.execCommand("FontSize",!1,t.control.settings.value)}}}),e.addMenuItem("formats",{text:"Formats",menu:v})}var f=r.each,p=function(e){return i.reduce(e,function(e,t){return e.concat(t)},[])};a.on("AddEditor",function(e){var t=e.editor;c(t),d(t),u(t)}),e.translate=function(e){return a.translate(e)},t.tooltips=!s.iOS}),r(zt,[yt],function(e){return e.extend({recalc:function(e){var t,n,r,i,o,a,s,l,u,c,d,f,p,h,m,g,v,y,b,C,x,w,E,N=[],_=[],S,k,T,R,A,B;t=e.settings,i=e.items().filter(":visible"),o=e.layoutRect(),r=t.columns||Math.ceil(Math.sqrt(i.length)),n=Math.ceil(i.length/r),y=t.spacingH||t.spacing||0,b=t.spacingV||t.spacing||0,C=t.alignH||t.align,x=t.alignV||t.align,g=e.paddingBox,A="reverseRows"in t?t.reverseRows:e.isRtl(),C&&"string"==typeof C&&(C=[C]),x&&"string"==typeof x&&(x=[x]);for(d=0;d<r;d++)N.push(0);for(f=0;f<n;f++)_.push(0);for(f=0;f<n;f++)for(d=0;d<r&&(c=i[f*r+d],c);d++)u=c.layoutRect(),S=u.minW,k=u.minH,N[d]=S>N[d]?S:N[d],_[f]=k>_[f]?k:_[f];for(T=o.innerW-g.left-g.right,w=0,d=0;d<r;d++)w+=N[d]+(d>0?y:0),T-=(d>0?y:0)+N[d];for(R=o.innerH-g.top-g.bottom,E=0,f=0;f<n;f++)E+=_[f]+(f>0?b:0),R-=(f>0?b:0)+_[f];if(w+=g.left+g.right,E+=g.top+g.bottom,l={},l.minW=w+(o.w-o.innerW),l.minH=E+(o.h-o.innerH),l.contentW=l.minW-o.deltaW,l.contentH=l.minH-o.deltaH,l.minW=Math.min(l.minW,o.maxW),l.minH=Math.min(l.minH,o.maxH),l.minW=Math.max(l.minW,o.startMinWidth),l.minH=Math.max(l.minH,o.startMinHeight),!o.autoResize||l.minW==o.minW&&l.minH==o.minH){o.autoResize&&(l=e.layoutRect(l),l.contentW=l.minW-o.deltaW,l.contentH=l.minH-o.deltaH);var D;D="start"==t.packV?0:R>0?Math.floor(R/n):0;var L=0,M=t.flexWidths;if(M)for(d=0;d<M.length;d++)L+=M[d];else L=r;var P=T/L;for(d=0;d<r;d++)N[d]+=M?M[d]*P:P;for(h=g.top,f=0;f<n;f++){for(p=g.left,s=_[f]+D,d=0;d<r&&(B=A?f*r+r-1-d:f*r+d,c=i[B],c);d++)m=c.settings,u=c.layoutRect(),a=Math.max(N[d],u.startMinWidth),u.x=p,u.y=h,v=m.alignH||(C?C[d]||C[0]:null),"center"==v?u.x=p+a/2-u.w/2:"right"==v?u.x=p+a-u.w:"stretch"==v&&(u.w=a),v=m.alignV||(x?x[d]||x[0]:null),"center"==v?u.y=h+s/2-u.h/2:"bottom"==v?u.y=h+s-u.h:"stretch"==v&&(u.h=s),c.layoutRect(u),p+=a+y,c.recalc&&c.recalc();h+=s+b}}else if(l.w=l.minW,l.h=l.minH,e.layoutRect(l),this.recalc(e),null===e._lastRect){var O=e.parent();O&&(O._lastRect=null,O.recalc())}}})}),r(Ut,[Pe,c],function(e,t){return e.extend({renderHtml:function(){var e=this;return e.classes.add("iframe"),e.canFocus=!1,'<iframe id="'+e._id+'" class="'+e.classes+'" tabindex="-1" src="'+(e.settings.url||"javascript:''")+'" frameborder="0"></iframe>'},src:function(e){this.getEl().src=e},html:function(e,n){var r=this,i=this.getEl().contentWindow.document.body;return i?(i.innerHTML=e,n&&n()):t.setTimeout(function(){r.html(e)}),this}})}),r(Wt,[Pe],function(e){return e.extend({init:function(e){var t=this;t._super(e),t.classes.add("widget").add("infobox"),t.canFocus=!1},severity:function(e){this.classes.remove("error"),this.classes.remove("warning"),this.classes.remove("success"),this.classes.add(e)},help:function(e){this.state.set("help",e)},renderHtml:function(){var e=this,t=e.classPrefix;return'<div id="'+e._id+'" class="'+e.classes+'"><div id="'+e._id+'-body">'+e.encode(e.state.get("text"))+'<button role="button" tabindex="-1"><i class="'+t+"ico "+t+'i-help"></i></button></div></div>'},bindStates:function(){var e=this;return e.state.on("change:text",function(t){e.getEl("body").firstChild.data=e.encode(t.value),e.state.get("rendered")&&e.updateLayoutRect()}),e.state.on("change:help",function(t){
e.classes.toggle("has-help",t.value),e.state.get("rendered")&&e.updateLayoutRect()}),e._super()}})}),r(Vt,[Pe,ve],function(e,t){return e.extend({init:function(e){var t=this;t._super(e),t.classes.add("widget").add("label"),t.canFocus=!1,e.multiline&&t.classes.add("autoscroll"),e.strong&&t.classes.add("strong")},initLayoutRect:function(){var e=this,n=e._super();if(e.settings.multiline){var r=t.getSize(e.getEl());r.width>n.maxW&&(n.minW=n.maxW,e.classes.add("multiline")),e.getEl().style.width=n.minW+"px",n.startMinH=n.h=n.minH=Math.min(n.maxH,t.getSize(e.getEl()).height)}return n},repaint:function(){var e=this;return e.settings.multiline||(e.getEl().style.lineHeight=e.layoutRect().h+"px"),e._super()},severity:function(e){this.classes.remove("error"),this.classes.remove("warning"),this.classes.remove("success"),this.classes.add(e)},renderHtml:function(){var e=this,t,n,r=e.settings.forId;return!r&&(n=e.settings.forName)&&(t=e.getRoot().find("#"+n)[0],t&&(r=t._id)),r?'<label id="'+e._id+'" class="'+e.classes+'"'+(r?' for="'+r+'"':"")+">"+e.encode(e.state.get("text"))+"</label>":'<span id="'+e._id+'" class="'+e.classes+'">'+e.encode(e.state.get("text"))+"</span>"},bindStates:function(){var e=this;return e.state.on("change:text",function(t){e.innerHtml(e.encode(t.value)),e.state.get("rendered")&&e.updateLayoutRect()}),e._super()}})}),r($t,[Ne],function(e){return e.extend({Defaults:{role:"toolbar",layout:"flow"},init:function(e){var t=this;t._super(e),t.classes.add("toolbar")},postRender:function(){var e=this;return e.items().each(function(e){e.classes.add("toolbar-item")}),e._super()}})}),r(qt,[$t],function(e){return e.extend({Defaults:{role:"menubar",containerCls:"menubar",ariaRoot:!0,defaults:{type:"menubutton"}}})}),r(jt,[bt,we,qt],function(e,t,n){function r(e,t){for(;e;){if(t===e)return!0;e=e.parentNode}return!1}var i=e.extend({init:function(e){var t=this;t._renderOpen=!0,t._super(e),e=t.settings,t.classes.add("menubtn"),e.fixedWidth&&t.classes.add("fixed-width"),t.aria("haspopup",!0),t.state.set("menu",e.menu||t.render())},showMenu:function(e){var n=this,r;return n.menu&&n.menu.visible()&&e!==!1?n.hideMenu():(n.menu||(r=n.state.get("menu")||[],r.length?r={type:"menu",items:r}:r.type=r.type||"menu",r.renderTo?n.menu=r.parent(n).show().renderTo():n.menu=t.create(r).parent(n).renderTo(),n.fire("createmenu"),n.menu.reflow(),n.menu.on("cancel",function(e){e.control.parent()===n.menu&&(e.stopPropagation(),n.focus(),n.hideMenu())}),n.menu.on("select",function(){n.focus()}),n.menu.on("show hide",function(e){e.control==n.menu&&n.activeMenu("show"==e.type),n.aria("expanded","show"==e.type)}).fire("show")),n.menu.show(),n.menu.layoutRect({w:n.layoutRect().w}),n.menu.moveRel(n.getEl(),n.isRtl()?["br-tr","tr-br"]:["bl-tl","tl-bl"]),void n.fire("showmenu"))},hideMenu:function(){var e=this;e.menu&&(e.menu.items().each(function(e){e.hideMenu&&e.hideMenu()}),e.menu.hide())},activeMenu:function(e){this.classes.toggle("active",e)},renderHtml:function(){var e=this,t=e._id,r=e.classPrefix,i=e.settings.icon,o,a=e.state.get("text"),s="";return o=e.settings.image,o?(i="none","string"!=typeof o&&(o=window.getSelection?o[0]:o[1]),o=" style=\"background-image: url('"+o+"')\""):o="",a&&(e.classes.add("btn-has-text"),s='<span class="'+r+'txt">'+e.encode(a)+"</span>"),i=e.settings.icon?r+"ico "+r+"i-"+i:"",e.aria("role",e.parent()instanceof n?"menuitem":"button"),'<div id="'+t+'" class="'+e.classes+'" tabindex="-1" aria-labelledby="'+t+'"><button id="'+t+'-open" role="presentation" type="button" tabindex="-1">'+(i?'<i class="'+i+'"'+o+"></i>":"")+s+' <i class="'+r+'caret"></i></button></div>'},postRender:function(){var e=this;return e.on("click",function(t){t.control===e&&r(t.target,e.getEl())&&(e.focus(),e.showMenu(!t.aria),t.aria&&e.menu.items().filter(":visible")[0].focus())}),e.on("mouseenter",function(t){var n=t.control,r=e.parent(),o;n&&r&&n instanceof i&&n.parent()==r&&(r.items().filter("MenuButton").each(function(e){e.hideMenu&&e!=n&&(e.menu&&e.menu.visible()&&(o=!0),e.hideMenu())}),o&&(n.focus(),n.showMenu()))}),e._super()},bindStates:function(){var e=this;return e.state.on("change:menu",function(){e.menu&&e.menu.remove(),e.menu=null}),e._super()},remove:function(){this._super(),this.menu&&this.menu.remove()}});return i}),r(Yt,[Pe,we,d,c],function(e,t,n,r){return e.extend({Defaults:{border:0,role:"menuitem"},init:function(e){var t=this,n;t._super(e),e=t.settings,t.classes.add("menu-item"),e.menu&&t.classes.add("menu-item-expand"),e.preview&&t.classes.add("menu-item-preview"),n=t.state.get("text"),"-"!==n&&"|"!==n||(t.classes.add("menu-item-sep"),t.aria("role","separator"),t.state.set("text","-")),e.selectable&&(t.aria("role","menuitemcheckbox"),t.classes.add("menu-item-checkbox"),e.icon="selected"),e.preview||e.selectable||t.classes.add("menu-item-normal"),t.on("mousedown",function(e){e.preventDefault()}),e.menu&&!e.ariaHideMenu&&t.aria("haspopup",!0)},hasMenus:function(){return!!this.settings.menu},showMenu:function(){var e=this,n=e.settings,r,i=e.parent();if(i.items().each(function(t){t!==e&&t.hideMenu()}),n.menu){r=e.menu,r?r.show():(r=n.menu,r.length?r={type:"menu",items:r}:r.type=r.type||"menu",i.settings.itemDefaults&&(r.itemDefaults=i.settings.itemDefaults),r=e.menu=t.create(r).parent(e).renderTo(),r.reflow(),r.on("cancel",function(t){t.stopPropagation(),e.focus(),r.hide()}),r.on("show hide",function(e){e.control.items&&e.control.items().each(function(e){e.active(e.settings.selected)})}).fire("show"),r.on("hide",function(t){t.control===r&&e.classes.remove("selected")}),r.submenu=!0),r._parentMenu=i,r.classes.add("menu-sub");var o=r.testMoveRel(e.getEl(),e.isRtl()?["tl-tr","bl-br","tr-tl","br-bl"]:["tr-tl","br-bl","tl-tr","bl-br"]);r.moveRel(e.getEl(),o),r.rel=o,o="menu-sub-"+o,r.classes.remove(r._lastRel).add(o),r._lastRel=o,e.classes.add("selected"),e.aria("expanded",!0)}},hideMenu:function(){var e=this;return e.menu&&(e.menu.items().each(function(e){e.hideMenu&&e.hideMenu()}),e.menu.hide(),e.aria("expanded",!1)),e},renderHtml:function(){function e(e){var t,r,i={};for(i=n.mac?{alt:"&#x2325;",ctrl:"&#x2318;",shift:"&#x21E7;",meta:"&#x2318;"}:{meta:"Ctrl"},e=e.split("+"),t=0;t<e.length;t++)r=i[e[t].toLowerCase()],r&&(e[t]=r);return e.join("+")}function t(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function r(e){var n=s.match||"";return n?e.replace(new RegExp(t(n),"gi"),function(e){return"!mce~match["+e+"]mce~match!"}):e}function i(e){return e.replace(new RegExp(t("!mce~match["),"g"),"<b>").replace(new RegExp(t("]mce~match!"),"g"),"</b>")}var o=this,a=o._id,s=o.settings,l=o.classPrefix,u=o.state.get("text"),c=o.settings.icon,d="",f=s.shortcut,p=o.encode(s.url),h="";return c&&o.parent().classes.add("menu-has-icons"),s.image&&(d=" style=\"background-image: url('"+s.image+"')\""),f&&(f=e(f)),c=l+"ico "+l+"i-"+(o.settings.icon||"none"),h="-"!==u?'<i class="'+c+'"'+d+"></i>\xa0":"",u=i(o.encode(r(u))),p=i(o.encode(r(p))),'<div id="'+a+'" class="'+o.classes+'" tabindex="-1">'+h+("-"!==u?'<span id="'+a+'-text" class="'+l+'text">'+u+"</span>":"")+(f?'<div id="'+a+'-shortcut" class="'+l+'menu-shortcut">'+f+"</div>":"")+(s.menu?'<div class="'+l+'caret"></div>':"")+(p?'<div class="'+l+'menu-item-link">'+p+"</div>":"")+"</div>"},postRender:function(){var e=this,t=e.settings,n=t.textStyle;if("function"==typeof n&&(n=n.call(this)),n){var i=e.getEl("text");i&&i.setAttribute("style",n)}return e.on("mouseenter click",function(n){n.control===e&&(t.menu||"click"!==n.type?(e.showMenu(),n.aria&&e.menu.focus(!0)):(e.fire("select"),r.requestAnimationFrame(function(){e.parent().hideAll()})))}),e._super(),e},hover:function(){var e=this;return e.parent().items().each(function(e){e.classes.remove("selected")}),e.classes.toggle("selected",!0),e},active:function(e){return"undefined"!=typeof e&&this.aria("checked",e),this._super(e)},remove:function(){this._super(),this.menu&&this.menu.remove()}})}),r(Xt,[g,xe,c],function(e,t,n){return function(r,i){var o=this,a,s=t.classPrefix,l;o.show=function(t,u){function c(){a&&(e(r).append('<div class="'+s+"throbber"+(i?" "+s+"throbber-inline":"")+'"></div>'),u&&u())}return o.hide(),a=!0,t?l=n.setTimeout(c,t):c(),o},o.hide=function(){var e=r.lastChild;return n.clearTimeout(l),e&&e.className.indexOf("throbber")!=-1&&e.parentNode.removeChild(e),a=!1,o}}}),r(Kt,[Ae,Yt,Xt,m],function(e,t,n,r){return e.extend({Defaults:{defaultType:"menuitem",border:1,layout:"stack",role:"application",bodyRole:"menu",ariaRoot:!0},init:function(e){var t=this;if(e.autohide=!0,e.constrainToViewport=!0,"function"==typeof e.items&&(e.itemsFactory=e.items,e.items=[]),e.itemDefaults)for(var n=e.items,i=n.length;i--;)n[i]=r.extend({},e.itemDefaults,n[i]);t._super(e),t.classes.add("menu")},repaint:function(){return this.classes.toggle("menu-align",!0),this._super(),this.getEl().style.height="",this.getEl("body").style.height="",this},cancel:function(){var e=this;e.hideAll(),e.fire("select")},load:function(){function e(){t.throbber&&(t.throbber.hide(),t.throbber=null)}var t=this,r,i;i=t.settings.itemsFactory,i&&(t.throbber||(t.throbber=new n(t.getEl("body"),!0),0===t.items().length?(t.throbber.show(),t.fire("loading")):t.throbber.show(100,function(){t.items().remove(),t.fire("loading")}),t.on("hide close",e)),t.requestTime=r=(new Date).getTime(),t.settings.itemsFactory(function(n){return 0===n.length?void t.hide():void(t.requestTime===r&&(t.getEl().style.width="",t.getEl("body").style.width="",e(),t.items().remove(),t.getEl("body").innerHTML="",t.add(n),t.renderNew(),t.fire("loaded")))}))},hideAll:function(){var e=this;return this.find("menuitem").exec("hideMenu"),e._super()},preRender:function(){var e=this;return e.items().each(function(t){var n=t.settings;if(n.icon||n.image||n.selectable)return e._hasIcons=!0,!1}),e.settings.itemsFactory&&e.on("postrender",function(){e.settings.itemsFactory&&e.load()}),e._super()}})}),r(Gt,[jt,Kt],function(e,t){return e.extend({init:function(e){function t(r){for(var a=0;a<r.length;a++){if(i=r[a].selected||e.value===r[a].value)return o=o||r[a].text,n.state.set("value",r[a].value),!0;if(r[a].menu&&t(r[a].menu))return!0}}var n=this,r,i,o,a;n._super(e),e=n.settings,n._values=r=e.values,r&&("undefined"!=typeof e.value&&t(r),!i&&r.length>0&&(o=r[0].text,n.state.set("value",r[0].value)),n.state.set("menu",r)),n.state.set("text",e.text||o),n.classes.add("listbox"),n.on("select",function(t){var r=t.control;a&&(t.lastControl=a),e.multiple?r.active(!r.active()):n.value(t.control.value()),a=r})},bindStates:function(){function e(e,n){e instanceof t&&e.items().each(function(e){e.hasMenus()||e.active(e.value()===n)})}function n(e,t){var r;if(e)for(var i=0;i<e.length;i++){if(e[i].value===t)return e[i];if(e[i].menu&&(r=n(e[i].menu,t)))return r}}var r=this;return r.on("show",function(t){e(t.control,r.value())}),r.state.on("change:value",function(e){var t=n(r.state.get("menu"),e.value);t?r.text(t.text):r.text(r.settings.text)}),r._super()}})}),r(Jt,[xt],function(e){return e.extend({Defaults:{classes:"radio",role:"radio"}})}),r(Qt,[Pe,_e],function(e,t){return e.extend({renderHtml:function(){var e=this,t=e.classPrefix;return e.classes.add("resizehandle"),"both"==e.settings.direction&&e.classes.add("resizehandle-both"),e.canFocus=!1,'<div id="'+e._id+'" class="'+e.classes+'"><i class="'+t+"ico "+t+'i-resize"></i></div>'},postRender:function(){var e=this;e._super(),e.resizeDragHelper=new t(this._id,{start:function(){e.fire("ResizeStart")},drag:function(t){"both"!=e.settings.direction&&(t.deltaX=0),e.fire("Resize",t)},stop:function(){e.fire("ResizeEnd")}})},remove:function(){return this.resizeDragHelper&&this.resizeDragHelper.destroy(),this._super()}})}),r(Zt,[Pe],function(e){function t(e){var t="";if(e)for(var n=0;n<e.length;n++)t+='<option value="'+e[n]+'">'+e[n]+"</option>";return t}return e.extend({Defaults:{classes:"selectbox",role:"selectbox",options:[]},init:function(e){var t=this;t._super(e),t.settings.size&&(t.size=t.settings.size),t.settings.options&&(t._options=t.settings.options),t.on("keydown",function(e){var n;13==e.keyCode&&(e.preventDefault(),t.parents().reverse().each(function(e){if(e.toJSON)return n=e,!1}),t.fire("submit",{data:n.toJSON()}))})},options:function(e){return arguments.length?(this.state.set("options",e),this):this.state.get("options")},renderHtml:function(){var e=this,n,r="";return n=t(e._options),e.size&&(r=' size = "'+e.size+'"'),'<select id="'+e._id+'" class="'+e.classes+'"'+r+">"+n+"</select>"},bindStates:function(){var e=this;return e.state.on("change:options",function(n){e.getEl().innerHTML=t(n.value)}),e._super()}})}),r(en,[Pe,_e,ve],function(e,t,n){function r(e,t,n){return e<t&&(e=t),e>n&&(e=n),e}function i(e,t,n){e.setAttribute("aria-"+t,n)}function o(e,t){var r,o,a,s,l,u;"v"==e.settings.orientation?(s="top",a="height",o="h"):(s="left",a="width",o="w"),u=e.getEl("handle"),r=(e.layoutRect()[o]||100)-n.getSize(u)[a],l=r*((t-e._minValue)/(e._maxValue-e._minValue))+"px",u.style[s]=l,u.style.height=e.layoutRect().h+"px",i(u,"valuenow",t),i(u,"valuetext",""+e.settings.previewFilter(t)),i(u,"valuemin",e._minValue),i(u,"valuemax",e._maxValue)}return e.extend({init:function(e){var t=this;e.previewFilter||(e.previewFilter=function(e){return Math.round(100*e)/100}),t._super(e),t.classes.add("slider"),"v"==e.orientation&&t.classes.add("vertical"),t._minValue=e.minValue||0,t._maxValue=e.maxValue||100,t._initValue=t.state.get("value")},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix;return'<div id="'+t+'" class="'+e.classes+'"><div id="'+t+'-handle" class="'+n+'slider-handle" role="slider" tabindex="-1"></div></div>'},reset:function(){this.value(this._initValue).repaint()},postRender:function(){function e(e,t,n){return(n+e)/(t-e)}function i(e,t,n){return n*(t-e)-e}function o(t,n){function o(o){var a;a=s.value(),a=i(t,n,e(t,n,a)+.05*o),a=r(a,t,n),s.value(a),s.fire("dragstart",{value:a}),s.fire("drag",{value:a}),s.fire("dragend",{value:a})}s.on("keydown",function(e){switch(e.keyCode){case 37:case 38:o(-1);break;case 39:case 40:o(1)}})}function a(e,i,o){var a,l,u,h,m;s._dragHelper=new t(s._id,{handle:s._id+"-handle",start:function(e){a=e[c],l=parseInt(s.getEl("handle").style[d],10),u=(s.layoutRect()[p]||100)-n.getSize(o)[f],s.fire("dragstart",{value:m})},drag:function(t){var n=t[c]-a;h=r(l+n,0,u),o.style[d]=h+"px",m=e+h/u*(i-e),s.value(m),s.tooltip().text(""+s.settings.previewFilter(m)).show().moveRel(o,"bc tc"),s.fire("drag",{value:m})},stop:function(){s.tooltip().hide(),s.fire("dragend",{value:m})}})}var s=this,l,u,c,d,f,p;l=s._minValue,u=s._maxValue,"v"==s.settings.orientation?(c="screenY",d="top",f="height",p="h"):(c="screenX",d="left",f="width",p="w"),s._super(),o(l,u,s.getEl("handle")),a(l,u,s.getEl("handle"))},repaint:function(){this._super(),o(this,this.value())},bindStates:function(){var e=this;return e.state.on("change:value",function(t){o(e,t.value)}),e._super()}})}),r(tn,[Pe],function(e){return e.extend({renderHtml:function(){var e=this;return e.classes.add("spacer"),e.canFocus=!1,'<div id="'+e._id+'" class="'+e.classes+'"></div>'}})}),r(nn,[jt,ve,g],function(e,t,n){return e.extend({Defaults:{classes:"widget btn splitbtn",role:"button"},repaint:function(){var e=this,r=e.getEl(),i=e.layoutRect(),o,a;return e._super(),o=r.firstChild,a=r.lastChild,n(o).css({width:i.w-t.getSize(a).width,height:i.h-2}),n(a).css({height:i.h-2}),e},activeMenu:function(e){var t=this;n(t.getEl().lastChild).toggleClass(t.classPrefix+"active",e)},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r,i=e.state.get("icon"),o=e.state.get("text"),a="";return r=e.settings.image,r?(i="none","string"!=typeof r&&(r=window.getSelection?r[0]:r[1]),r=" style=\"background-image: url('"+r+"')\""):r="",i=e.settings.icon?n+"ico "+n+"i-"+i:"",o&&(e.classes.add("btn-has-text"),a='<span class="'+n+'txt">'+e.encode(o)+"</span>"),'<div id="'+t+'" class="'+e.classes+'" role="button" tabindex="-1"><button type="button" hidefocus="1" tabindex="-1">'+(i?'<i class="'+i+'"'+r+"></i>":"")+a+'</button><button type="button" class="'+n+'open" hidefocus="1" tabindex="-1">'+(e._menuBtnText?(i?"\xa0":"")+e._menuBtnText:"")+' <i class="'+n+'caret"></i></button></div>'},postRender:function(){var e=this,t=e.settings.onclick;return e.on("click",function(e){var n=e.target;if(e.control==this)for(;n;){if(e.aria&&"down"!=e.aria.key||"BUTTON"==n.nodeName&&n.className.indexOf("open")==-1)return e.stopImmediatePropagation(),void(t&&t.call(this,e));n=n.parentNode}}),delete e.settings.onclick,e._super()}})}),r(rn,[Ht],function(e){return e.extend({Defaults:{containerClass:"stack-layout",controlClass:"stack-layout-item",endClass:"break"},isNative:function(){return!0}})}),r(on,[ke,g,ve],function(e,t,n){return e.extend({Defaults:{layout:"absolute",defaults:{type:"panel"}},activateTab:function(e){var n;this.activeTabId&&(n=this.getEl(this.activeTabId),t(n).removeClass(this.classPrefix+"active"),n.setAttribute("aria-selected","false")),this.activeTabId="t"+e,n=this.getEl("t"+e),n.setAttribute("aria-selected","true"),t(n).addClass(this.classPrefix+"active"),this.items()[e].show().fire("showtab"),this.reflow(),this.items().each(function(t,n){e!=n&&t.hide()})},renderHtml:function(){var e=this,t=e._layout,n="",r=e.classPrefix;return e.preRender(),t.preRender(e),e.items().each(function(t,i){var o=e._id+"-t"+i;t.aria("role","tabpanel"),t.aria("labelledby",o),n+='<div id="'+o+'" class="'+r+'tab" unselectable="on" role="tab" aria-controls="'+t._id+'" aria-selected="false" tabIndex="-1">'+e.encode(t.settings.title)+"</div>"}),'<div id="'+e._id+'" class="'+e.classes+'" hidefocus="1" tabindex="-1"><div id="'+e._id+'-head" class="'+r+'tabs" role="tablist">'+n+'</div><div id="'+e._id+'-body" class="'+e.bodyClasses+'">'+t.renderHtml(e)+"</div></div>"},postRender:function(){var e=this;e._super(),e.settings.activeTab=e.settings.activeTab||0,e.activateTab(e.settings.activeTab),this.on("click",function(t){var n=t.target.parentNode;if(n&&n.id==e._id+"-head")for(var r=n.childNodes.length;r--;)n.childNodes[r]==t.target&&e.activateTab(r)})},initLayoutRect:function(){var e=this,t,r,i;r=n.getSize(e.getEl("head")).width,r=r<0?0:r,i=0,e.items().each(function(e){r=Math.max(r,e.layoutRect().minW),i=Math.max(i,e.layoutRect().minH)}),e.items().each(function(e){e.settings.x=0,e.settings.y=0,e.settings.w=r,e.settings.h=i,e.layoutRect({x:0,y:0,w:r,h:i})});var o=n.getSize(e.getEl("head")).height;return e.settings.minWidth=r,e.settings.minHeight=i+o,t=e._super(),t.deltaH+=o,t.innerH=t.h-t.deltaH,t}})}),r(an,[Pe,m,ve],function(e,t,n){return e.extend({init:function(e){var t=this;t._super(e),t.classes.add("textbox"),e.multiline?t.classes.add("multiline"):(t.on("keydown",function(e){var n;13==e.keyCode&&(e.preventDefault(),t.parents().reverse().each(function(e){if(e.toJSON)return n=e,!1}),t.fire("submit",{data:n.toJSON()}))}),t.on("keyup",function(e){t.state.set("value",e.target.value)}))},repaint:function(){var e=this,t,n,r,i,o=0,a;t=e.getEl().style,n=e._layoutRect,a=e._lastRepaintRect||{};var s=document;return!e.settings.multiline&&s.all&&(!s.documentMode||s.documentMode<=8)&&(t.lineHeight=n.h-o+"px"),r=e.borderBox,i=r.left+r.right+8,o=r.top+r.bottom+(e.settings.multiline?8:0),n.x!==a.x&&(t.left=n.x+"px",a.x=n.x),n.y!==a.y&&(t.top=n.y+"px",a.y=n.y),n.w!==a.w&&(t.width=n.w-i+"px",a.w=n.w),n.h!==a.h&&(t.height=n.h-o+"px",a.h=n.h),e._lastRepaintRect=a,e.fire("repaint",{},!1),e},renderHtml:function(){var e=this,r=e.settings,i,o;return i={id:e._id,hidefocus:"1"},t.each(["rows","spellcheck","maxLength","size","readonly","min","max","step","list","pattern","placeholder","required","multiple"],function(e){i[e]=r[e]}),e.disabled()&&(i.disabled="disabled"),r.subtype&&(i.type=r.subtype),o=n.create(r.multiline?"textarea":"input",i),o.value=e.state.get("value"),o.className=e.classes,o.outerHTML},value:function(e){return arguments.length?(this.state.set("value",e),this):(this.state.get("rendered")&&this.state.set("value",this.getEl().value),this.state.get("value"))},postRender:function(){var e=this;e.getEl().value=e.state.get("value"),e._super(),e.$el.on("change",function(t){e.state.set("value",t.target.value),e.fire("change",t)})},bindStates:function(){var e=this;return e.state.on("change:value",function(t){e.getEl().value!=t.value&&(e.getEl().value=t.value)}),e.state.on("change:disabled",function(t){e.getEl().disabled=t.value}),e._super()},remove:function(){this.$el.off(),this._super()}})}),r(sn,[],function(){var e=this||window,t=function(){return e.tinymce};return"function"==typeof e.define&&(e.define.amd||e.define("ephox/tinymce",[],t)),"object"==typeof module&&(module.exports=window.tinymce),{}}),a([l,u,c,d,f,p,m,g,v,y,C,w,E,N,T,A,B,D,L,M,P,O,I,F,j,Y,J,te,le,ue,ce,de,pe,me,ge,Ce,xe,we,Ee,Ne,_e,Se,ke,Te,Re,Ae,Be,De,Le,Me,Pe,Oe,He,Ie,Ue,Ve,at,st,lt,ut,dt,ft,pt,ht,mt,gt,vt,yt,bt,Ct,xt,wt,Et,Nt,_t,St,kt,Tt,Rt,At,Bt,Dt,Mt,Pt,Ot,Ht,Ft,zt,Ut,Wt,Vt,$t,qt,jt,Yt,Xt,Kt,Gt,Jt,Qt,Zt,en,tn,nn,rn,on,an])}(window);


// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//





$(document).ready(function () {
  $('form').on("click", function(event){
   if (this.id == "form_id") {
   event.preventDefault();
   this.submit();}
  });
});
