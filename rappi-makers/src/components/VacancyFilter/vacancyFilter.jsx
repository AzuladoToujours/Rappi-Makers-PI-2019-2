import React, { Component } from 'react';
import './vacancyFilter.css';

class VacancyFilter extends Component {
  state = {
    payment_per_hour: '',
    city: '',
    date: '',
  };

  render() {
    const { payment_per_hour, city, date } = this.state;
    const { updateFilter } = this.props;
    return (
      <>
        <div className="filter-title">
          <h4>Buscar por</h4>
        </div>
        <form className="filter-form" onChange={() => setTimeout(() => updateFilter(this.state), 0)}>
          <input
            type="text"
            value={payment_per_hour}
            placeholder="Pago por hora"
            onChange={(event) =>
              this.setState({
                payment_per_hour: event.target.value,
              })
            }
            className="filter-input"
          />

          <input
            type="text"
            value={city}
            placeholder="Ciudad"
            onChange={(event) =>
              this.setState({
                city: event.target.value,
              })
            }
            className="filter-input"
          />

          <input
            type="date"
            value={date}
            placeholder="Fecha de inicio"
            onChange={(event) =>
              this.setState({
                date: event.target.value,
              })
            }
            className="filter-input"
          />
        </form>
      </>
    );
  }
}

export default VacancyFilter;
