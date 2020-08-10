class DatabaseError extends Error {
  constructor() {
    super();
    this.name = 'DatabaseError';
    this.error = 'Error en el payment';
    this.status = 500;
  }

  errorResponse(res) {
    return res.status(this.status).json({ error: `${this.error}` });
  }

  errorDto() {
    return {
      status: this.status,
      message: this.message,
      error: this.error,
    };
  }
}

module.exports = DatabaseError;
