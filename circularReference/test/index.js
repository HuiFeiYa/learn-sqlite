// index.js
const a = require('./a');
console.log('index:', a);

/**
 * b: {} 在 a.js 没有执行完时返回的是默认值
 * a: Module B 模块b加载完毕
 * index: Module A
 */