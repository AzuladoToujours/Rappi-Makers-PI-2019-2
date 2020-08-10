class FetchError extends Error {
  constructor(fetch) {
    super();
    this.name = 'WrongCredentials';
    this.error = `Error en ${fetch}`;
    this.status = 400;
  }

  errorResponse(res) {
    return res.status(this.status).json({ error: `${this.error}` });
  }

  errorDto() {
    return this.response
      .status(this.status)
      .json({ error: `${this.error}, ${this.message}` });
  }
}

module.exports = FetchError;
