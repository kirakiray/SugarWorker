# SugarWorker
Syntax sugar for WebWorker

给使用web多线程开发webworker添加语法糖，使得使用起来更简单。

#####webWorker
```javascript
var lsitWorker = new Worker('core/listWorker.js');
lsitWorker.onmessage = function(e){
	if(e.data){
		listWorker.postMessage('new test data');
	}
	...(response)
	console.log(e);
	lsitWorker.terminate();
};
listWorker.onerror = function(e){
	...(response)
	console.error(e);
};
listWorker.postMessage('test data');
```

#####SugarWorker
```javascript
work('core/listWorker.js')
.back(function(e){
	if(e.data){
		e.post('new test data');
	}
	...(response)
	console.log(e);
	e.end();
})
.err(function(e){
	...(response)
	console.error(e);
})
.post('test data');
```