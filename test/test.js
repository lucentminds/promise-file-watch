
/*jslint node:true*/

var watch = require( '../promise-file-watch' );

watch( ['./test/folder', './test/folder'], function( cFullChangedPath ){
    console.log( 'Changed:', cFullChangedPath );

})
.then(function( cWatchedPath ){
    console.log( 'Watching', cWatchedPath, '...' );
}).done();