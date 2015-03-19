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

SugarWorker还支持事件定义，方便监听另一条线程的状态

```javascript
work('core/test.js')
	.back(function(e){
		console.log(e);
	})
	.set('loading',function(e){
		console.log('loading');
		console.log(e);
	})
	.post('test data');
```

```javascript
//test.js
onmessage = function(){
	postMessage({
		eventType : 'loading',
		data : {...}//some datas
	});
}
```

通过worker线程返回对象，添加eventType属性，可以在主线程触发定义的事件；

添加eventType的返回数据，不会触发主线程back方法；

但跟事件定义不同的是，同名的事件不能重复定义，重复定义会覆盖原来的事件；

```javascript
work('core/test.js')
	.set('loading',function(e){
		...//failure
	})
	.set('finish',function(e){
		...//succeed
	})
	.set('loading',function(e){
		...//succeed
	})
```

重复的事件（loading），只会触发后面一次定义的事件；