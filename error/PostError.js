class PostError extends Error {
  constructor() {
    super();
    this.message = 'Failed to create data';
    this.statusCode = 409;
  }
}

module.exports = PostError;
