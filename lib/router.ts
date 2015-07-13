module netvigation {
    export class RouterHelper {
        constructor(private router:any, private model:any, private collection:string, private apiPrefix:string) {
            if (!apiPrefix) {
                this.apiPrefix = '/api'
            }
            this.apply(router);
        }

        post(req, res) {
            var data = new this.model(req.body);
            data.save(function (err) {
                if (!err) {
                    return res.send(data);
                } else {
                    return console.log(err);
                }
            });
        }

        put(req, res) {
            this.model.findByIdAndUpdate(req.params[this.getIdParam()], req.body, function (err, data) {
                if (err) {
                    return console.error(err);
                } else {
                    return res.send(data);
                }
            })
        }

        getIdParam() {
            return this.collection + '_id';
        }

        getAll(req, res) {
            this.model.find(function (err, data) {
                if (err) {
                    return console.error(err);
                } else {
                    return res.send(data);
                }
            })
        }

        getById(req, res) {
            this.model.findById(req.params[this.getIdParam()], function (err, item) {
                if (err) {
                    return console.error(err);
                } else {
                    return res.send(item);
                }
            })
        }

        delete(req, res) {
            this.model.findByIdAndRemove(req.params[this.getIdParam()], function (err, data) {
                if (err) {
                    return console.error(err);
                } else {
                    return res.send(data);
                }
            })
        }

        apply(router) {
            var that = this;
            var apiUrl:string = this.apiPrefix + '/' + this.collection;
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
        }
    }
}
var module:any = <any>module;
module.exports = netvigation.RouterHelper;