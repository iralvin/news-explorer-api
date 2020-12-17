class NotAuthError extends Error {
  constructor() {
    super();
    this.message = 'Not authorized';
    this.statusCode = 401;
  }
}

module.exports = NotAuthError;
