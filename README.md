# promise-file-watch
Watch one or more paths for a change in a file or directory.

## Stability: 0 - Deprecated
[![deprecated](https://badges.github.io/stability-badges/dist/deprecated.svg)](http://github.com/badges/stability-badges)

This package used the native nodejs `fs` api to rescursively watch directories. Unfortunately this is no longer supported through the api on Linux. The [chokidar](https://github.com/paulmillr/chokidar) library does this job quite nicely with promises and async stuff too. I see no reason to maintain this repo.


~~~
...
...
...
~~~

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