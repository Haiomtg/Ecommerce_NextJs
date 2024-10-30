

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err); // Delegate to the default error handler
    }
    if (err.status) {
        res.status(err.status).json({ msg: err.message });
    } else {
        res.status(500).json({ msg: err.message });
    }
};

export default errorHandler;