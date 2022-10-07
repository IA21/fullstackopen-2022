const { info, error } = require("./logger");

const error_handler = (err, req, res, next) => {
    error(err.message)

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: err.message,
        })
    }

    next(err)
}

module.exports = { error_handler }