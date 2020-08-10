class InvalidDatesError extends Error {
  constructor() {
    super();
    this.name = 'InvalidErrors';
    this.startError =
      'La vacante debe empezar por lo menos 8 horas después de la hora actual';
    this.durationError =
      'La vacante debe tener una duración de 1 hora como mínimo';
    this.status = 400;
  }

  startDateErrorResponse(res) {
    return res.status(this.status).json({ error: `${this.startError}` });
  }

  durationErrorResponse(res) {
    return res.status(this.status).json({ error: `${this.durationError}` });
  }

  errorDto() {
    return {
      status: this.status,
      message: this.message,
      error: this.error,
    };
  }
}

module.exports = InvalidDatesError;
