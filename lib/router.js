var netvigation;
(function (netvigation) {
    var RouterHelper = (function () {
        function RouterHelper(router, model, collection, apiPrefix) {
            this.model = model;
            this.collection = collection;
            this.apiPrefix = apiPrefix;
            if (!apiPrefix) {
                this.apiPrefix = '/api';
            }
            this.apply(router);
        }

        RouterHelper.prototype.post = function (req, res) {
            var data = new this.model(req.body);
            data.save(function (err) {
                if (!err) {
                    return res.send(data);
                }
                else {
                    return console.log(err);
                }
            });
        };
        RouterHelper.prototype.put = function (req, res) {
            this.model.findByIdAndUpdate(req.params[this.getIdParam()], req.body, function (err, data) {
                if (err) {
                    return console.error(err);
                }
                else {
                    return res.send(data);
                }
            });
        };
        RouterHelper.prototype.getIdParam = function () {
            return this.collection + '_id';
        };
        RouterHelper.prototype.getAll = function (req, res) {
            this.model.find(function (err, data) {
                if (err) {
                    return console.error(err);
                }
                else {
                    return res.send(data);
                }
            });
        };
        RouterHelper.prototype.getById = function (req, res) {
            this.model.findById(req.params[this.getIdParam()], function (err, item) {
                if (err) {
                    return console.error(err);
                }
                else {
                    return res.send(item);
                }
            });
        };
        RouterHelper.prototype.delete = function (req, res) {
            this.model.findByIdAndRemove(req.params[this.getIdParam()], function (err, data) {
                if (err) {
                    return console.error(err);
                }
                else {
                    return res.send(data);
                }
            });
        };
        RouterHelper.prototype.apply = function (router) {
            var that = this;
            var apiUrl = this.apiPrefix + '/' + this.collection;
            router.post(apiUrl, function (req, res) {
                that.post(req, res);
            });
            router.get(apiUrl, function (req, res) {
                that.getAll(req, res);
            });
            router.get(apiUrl + '/:' + that.getIdParam(), function (req, res) {
                that.getById(req, res);
            });
            router.put(apiUrl + '/:' + that.getIdParam(), function (req, res) {
                that.put(req, res);
            });
            router.delete(apiUrl + '/:' + that.getIdParam(), function (req, res) {
                that.delete(req, res);
            });
        };
        return RouterHelper;
    })();
    netvigation.RouterHelper = RouterHelper;
})(netvigation || (netvigation = {}));
var module = module;
module.exports = netvigation.RouterHelper;
//# sourceMappingURL=router.js.map