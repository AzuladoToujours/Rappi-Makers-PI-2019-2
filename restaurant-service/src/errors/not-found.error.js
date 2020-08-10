class NotFoundError extends Error {
  constructor() {
    super();
    this.name = 'NotFoundError';
    this.error = 'Información no encontrada';
    this.status = 400;
  }

  errorResponse(res) {
    return res.status(this.status).json({ error: `${this.error}` });
  }

  errorDto() {
    return {
      status: this.status,
      message: this.message,
      error: this.error
    };
  }
}

module.exports = NotFoundError;
