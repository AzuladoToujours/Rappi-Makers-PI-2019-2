class WrongCredentialsError extends Error {
  constructor(res) {
    super('Credenciales erroneas');
    this.name = 'WrongCredentials';
    this.error = 'Credenciales erroneas';
    this.status = 400;
    this.response = res;
  }

  errorResponse() {
    return this.response.status(this.status).json({ error: `${this.error}` });
  }

  errorDto() {
    return this.response
      .status(this.status)
      .json({ error: `${this.error}, ${this.message}` });
  }
}

module.exports = WrongCredentialsError;
