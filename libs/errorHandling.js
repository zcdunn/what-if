// catch 404 and forward to error handler
function handle404() {
    return function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    };
}

// will print stacktrace for any environment except 'prod'
function errorHandler(env) {
    return function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: env !== 'prod' ? err : {}
        });
    };
}

exports.handle404 = handle404;
exports.errorHandler = errorHandler;
