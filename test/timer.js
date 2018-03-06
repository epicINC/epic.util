const { performance } = require('perf_hooks')
console.log(Date.now())
console.log(performance.now())
 // process.hrtime()

const {
	PerformanceObserver
  } = require('perf_hooks');
  
  function someFunction() {
	console.log('hello world');
  }
  
  const wrapped = performance.timerify(someFunction);
  
  const obs = new PerformanceObserver((list) => {
	console.log(list.getEntries()[0].duration);
	obs.disconnect();
	performance.clearFunctions();
  });
  obs.observe({ entryTypes: ['function'] });
  
  // A performance timeline entry will be created
  let start = Date.now()
  let startTick = performance.now()
  wrapped();

console.log(Date.now())
console.log(performance.nodeTiming)
console.log(performance.nodeTiming.nodeStart, performance.now(),  performance.nodeTiming.nodeStart + performance.now())

console.log(process.hrtime())