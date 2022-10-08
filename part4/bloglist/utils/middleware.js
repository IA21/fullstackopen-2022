const { info, error } = require("./logger");

const extract_auth_token = (req, res, next) => {
    const header_auth = req.get('authorization')

    if (header_auth && header_auth.toLowerCase().startsWith('bearer')) {
        req.token = header_auth.substring(7)
    } else {
        req.token = null
    }

    next()
}

const error_handler = (err, req, res, next) => {
    error(err.message)

    res.status(401).json({
        error: err.message,
    })

    // if (err.name === 'JsonWebTokenError') {
    //     return res.status(401).json({
    //         error: err.message,
    //     })
    // }

    next(err)
}

module.exports = {
    extract_auth_token,
    error_handler
}