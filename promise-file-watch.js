/** 
 * 01-24-2017
 * Watch one or more paths for a change in a file or directory.
 * ~~ Scott Johnson
 */

/*jslint node:true*/

var fs = require( 'fs' );
var path = require( 'path' );
var Q = require( 'q' );
var resolve = require( 'promise-resolve-path' );
var watch = module.exports = function( aSrc, fnCallback ){ // jshint ignore:line
    var deferred = Q.defer();
    var cSrcType = typeof aSrc;

    switch( true ) {
    case ( cSrcType === 'string' ):
        aSrc = [aSrc];
        break;

    case Array.isArray( aSrc ):
        break;

    default:
        deferred.reject( 'Invalid source path argument: '.concat( aSrc ) );
        return deferred.promise;

    }// /switch()

    resolve( aSrc )
    .then(function( aResolved ){
        var i, l = aResolved.length;
        var aPromises = [];

        for( i = 0, l = aResolved.length; i < l; i++ ) {
           aPromises.push( watchOnePath( aResolved[ i ], fnCallback ) );
        }// /for()

        return Q.all( aPromises );

    })
    .then(function( aWatched ){
        if( cSrcType === 'string' )  {
            deferred.resolve( aWatched[0] );
        }
        else {
            deferred.resolve( aWatched );
        }
    })
    .fail(function( err ){
       deferred.reject( err );
    }).done();

    return deferred.promise;
};// /watch()

watch.watchers = {};

watch.set = function( cPath, oWatcher ){
    watch.watchers[ cPath ] = oWatcher;
};// /set()

watch.get = function( cPath ){
    return watch.watchers[ cPath ];
};// /get()

watch.remove = function( cPath ){
    delete watch.watchers[ cPath ];
};// /remove()


var watchOnePath = function( cPath, fnCallback ){
    var deferred = Q.defer();
    var nTimeout = 0;
    var cRootDir = cPath;
    var oWatcher = null;
    var onEveryEvent = function( event, cPathChanged ){
        // Use a timeout to debounce multiple calls within 10ms.
        clearTimeout( nTimeout );
        nTimeout = setTimeout( fnCallback, 10, path.join( cRootDir, cPathChanged ) );
    };// /onEveryEvent()

    fs.stat( cPath, function( err, stats ){
        if( err ) {
            return deferred.reject( err );
        }

        if( !stats.isDirectory() ){
            cRootDir = path.dirname( cPath );
        }

        oWatcher = fs.watch( cPath, { recursive: true }, onEveryEvent );

        oWatcher.path = cPath;
        watch.set( cPath, oWatcher );

        deferred.resolve( cPath );

    });

    
    return deferred.promise;
};// /watchOnePath()