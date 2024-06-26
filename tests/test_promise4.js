// https://github.com/espruino/Espruino/issues/894
// test chaining with catch...
var sequence = "";

var p = new Promise( function(resolve,reject) { reject(1); });
p.then( function(value) {
        sequence+="A"+value;
        return value + 1;
}).then( function(value) {
        sequence+="C"+value;
        return new Promise( function( resolve ) { resolve( 4 ); } );
}).catch( function( value ) {
        sequence+="D"+value;
} );
p.then(function(value) { // resolve handler (not called)
  sequence+="B"+value;
}, function(value) { // reject handler
  sequence+="r"+value;
});
setTimeout(function() {
  result = sequence == "r1D1";
  console.log(result, sequence);
},10);
