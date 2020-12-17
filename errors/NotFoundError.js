class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Failed to get data';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
