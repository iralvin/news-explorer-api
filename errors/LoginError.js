class LoginError extends Error {
  constructor() {
    super();
    this.message = 'Incorrect email or password';
    this.statusCode = 404;
  }
}

module.exports = LoginError;
