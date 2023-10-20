var buffer = new ArrayBuffer(10);
var view = new Uint8Array(buffer);
// var view1 = new Int16Array(buffer)
// console.log('buffer',view, view1)
console.log(buffer)
view[0] = 42
view[1] = 10
console.log('buffer:',buffer)