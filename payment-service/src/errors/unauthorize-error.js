class UnauthorizeError extends Error {
  constructor() {
    super();
    this.name = 'UnauthorizeError';
    this.error = 'No está autorizado para realizar la acción.';
    this.status = 401;
  }

  errorResponse(res) {
    return res.status(this.status).json({ error: `${this.error}` });
  }

  errorJwt(res, message) {
    return res
      .status(this.status)
      .json({ error: `${this.error}` + ` ${message}` });
  }

  errorDto() {
    return {
      status: this.status,
      message: this.message,
      error: this.error,
    };
  }
}

module.exports = UnauthorizeError;
