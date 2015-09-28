define(["require", "exports", '../../System/Collections/Queue'], function (require, exports, Queue) {
    var _lastId = 0 | 0;
    var _defaultScheduler;
    var _currentScheduler;
    var MAX_INT32_SIGNED = 2147483647 | 0;
    var TaskScheduler = (function () {
        function TaskScheduler(_maximumConcurrencyLevel) {
            if (_maximumConcurrencyLevel === void 0) { _maximumConcurrencyLevel = MAX_INT32_SIGNED; }
            this._maximumConcurrencyLevel = _maximumConcurrencyLevel;
            this._id = ++_lastId;
            this._queue = new Queue();
        }
        Object.defineProperty(TaskScheduler, "current", {
            get: function () {
                return _currentScheduler || TaskScheduler.defaultInstance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskScheduler, "defaultInstance", {
            get: function () {
                if (!_defaultScheduler)
                    _defaultScheduler = new TaskScheduler();
                return _defaultScheduler;
            },
            enumerable: true,
            configurable: true
        });
        TaskScheduler.fromCurrentSynchronizationContext = function () {
            return null;
        };
        Object.defineProperty(TaskScheduler.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskScheduler.prototype, "maximumConcurrencyLevel", {
            get: function () {
                return this._maximumConcurrencyLevel;
            },
            enumerable: true,
            configurable: true
        });
        TaskScheduler.prototype._getScheduledTasks = function () {
            return this._queue.toArray();
        };
        TaskScheduler.prototype._ensureWorkerReady = function () {
            var _this = this;
            var _ = this;
            if (!_._workerId) {
                _._workerId = setTimeout(function () {
                    _._workerId = 0;
                    _currentScheduler = _this;
                    while (_._queue.count) {
                        _._tryExecuteTask(_._queue.dequeue());
                    }
                    _currentScheduler = null;
                });
            }
        };
        TaskScheduler.prototype.queueTask = function (task) {
            if (!task)
                throw new Error("ArgumentNullException");
            this._queue.enqueue(task);
            this._ensureWorkerReady();
        };
        TaskScheduler.prototype._tryDequeue = function (task) {
            return this._queue.remove(task) !== 0;
        };
        TaskScheduler.prototype._tryExecuteTask = function (task) {
            if (task['_executingTaskScheduler'] != this)
                throw new Error("Executed Task on wrong TaskScheduler.");
            return task['_executeEntry'](true);
        };
        TaskScheduler.prototype.tryExecuteTaskInline = function (task, taskWasPreviouslyQueued) {
            if (taskWasPreviouslyQueued && !this._tryDequeue(task))
                return false;
            return this._tryExecuteTask(task);
        };
        return TaskScheduler;
    })();
    exports.TaskScheduler = TaskScheduler;
});
//# sourceMappingURL=TaskScheduler.js.map