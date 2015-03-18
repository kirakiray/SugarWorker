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
        //保存Worker实例
        this.worker = new Worker(workerUrl);
    }
    SugarWorker.prototype.back = function (readyFun) {
        var _this = this;
        //设置响应
        this.worker.onmessage = function (e) {
            var sugarWorkerEvent = new SugarWorkerEvent(_this, e);
            readyFun(sugarWorkerEvent);
        };
        return this;
    }
    SugarWorker.prototype.post = function (data) {
        this.worker.postMessage(data);
        return this;
    }
    SugarWorker.prototype.err = function (errFun) {
        this.worker.onerror = errFun;
        return this;
    }

    //Function
    var work = function (fileUrl) {
        return new SugarWorker(fileUrl);
    };

    //init
    Global.work = work;
})(window);