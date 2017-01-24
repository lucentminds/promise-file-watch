# promise-file-watch
Watch one or more paths for a change in a file or directory.

## Installation

Install by npm.

```shell
npm install git+https://github.com/lucentminds/promise-file-watch.git
```

### Useage:

```js
var watch = require( 'promise-file-watch' );

watch( './src', function( cFullChangedPath ){
    console.log( 'Changed:', cFullChangedPath );

})
.then(function( cWatchedPath ){
    console.log( 'Now watching', cWatchedPath, '...' );
});
```

## Examples

Watch one directory.

```js
watch( './src', function( cFullChangedPath ){
    console.log( 'Changed:', cFullChangedPath );

})
.then(function( cWatchedPath ){
    console.log( 'Now watching', cWatchedPath, '...' );
});
```

Watch multiple paths.

```js
watch( ['./src', '/another/project/file1.txt'], function( cFullChangedPath ){
    console.log( 'Changed:', cFullChangedPath );
})
.then(function( aWatchedPaths ){
    console.log( aWatchedPaths );
});
```