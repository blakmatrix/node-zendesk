'use strict';

class LoggerInterface {
  fatal(message) {
    console.error(message);
  }

  error(message) {
    console.error(message);
  }

  warn(message) {
    console.warn(message);
  }

  info(message) {
    console.info(message);
  }

  debug(message) {
    console.log(message);
  }

  trace(message) {
    console.trace(message);
  }
}

class ConsoleLogger extends LoggerInterface {}

module.exports = ConsoleLogger;
