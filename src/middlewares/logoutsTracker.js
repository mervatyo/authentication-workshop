const winston = require('winston')
const path = require('path')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'users-logout' },
    transports: [
      new winston.transports.File({ filename: path.join(__dirname, '..', 'logs', 'logouts.log') })
    ]
  });

module.exports = (req, res, next) => {
    logger.info({
        username: res.locals.username,
        time: new Date()
    })
}