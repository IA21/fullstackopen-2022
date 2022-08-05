const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    info('server listening on port', config.PORT)
})
