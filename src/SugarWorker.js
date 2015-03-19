(function (Global) {
    //Class
    //SugarWorkerEvent
    function SugarWorkerEvent(sugarWorker, workerEvent) {
        this.target = sugarWorker;
        this.orginEvent = workerEvent;
        this.data = workerEvent.data;
        this.timeStamp = workerEvent.timeStamp;
    }
    SugarWorkerEvent.prototype.end = function () {
        this.target.worker.terminate();
    }
    SugarWorkerEvent.prototype.post = function (data) {
        this.target.worker.postMessage(data);
    }

    //SugarWorker
    function SugarWorker(workerUrl) {
        var _this = this;
        //保存Worker实例
        var worker = new Worker(workerUrl);
        this.worker = worker;
        //保存eventList
        var eventList = {};
        this.eventList = eventList;
        //worker响应
        worker.onmessage = function (e) {
            var sugarWorkerEvent = new SugarWorkerEvent(_this, e);
            var eventType = e.data.eventType;
            if (eventType) {
                if (eventList[eventType]) {
                    //重设event
                    sugarWorkerEvent.data = e.data.data;
                    sugarWorkerEvent.type = e.data.eventType;
                    eventList[eventType](sugarWorkerEvent);
                }
            } else {
                sugarWorkerEvent.type = e.type;
                _this.message(sugarWorkerEvent);
            }
        };
    }
    SugarWorker.prototype.back = function (readyFun) {
        //设置响应
        this.message = readyFun;
        return this;
    }
    //postMessage
    SugarWorker.prototype.post = function (data) {
        this.worker.postMessage(data);
        return this;
    }
    //onerror
    SugarWorker.prototype.err = function (errFun) {
        this.worker.onerror = errFun;
        return this;
    }
    SugarWorker.prototype.set = function (eventType, eveFun) {
        this.eventList[eventType] = eveFun;
        return this;
    }

    //Function
    var work = function (fileUrl) {
        return new SugarWorker(fileUrl);
    };

    //init
    if (Global.define && Global.define.br) {
        //BrowserRequire Module
        Global.define(function () {
            return work;
        }, 'sugarWork');
    } else if (typeof define === "function" && define.amd) {
        //AMD
        define("sugarWork", [], function () {
            return work;
        });
    } else {
        Global.work = work;
    }
})(window);