const { info, error } = require("./logger");

const error_handler = (err, req, res, next) => {
    error(err.message)

    next(err)
}

module.exports = { error_handler }