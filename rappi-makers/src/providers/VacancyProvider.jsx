import React, { createContext, Component } from 'react';
import { GetVacancies, AddCandidate, RemoveCandidate } from '../services/Vacancy';

export const VacancyContext = createContext({ vacancies: [] });

class VacancyProvider extends Component {
  state = {
    vacancies: [],
    filter: {},
    loading: false,
    render: false,
    open: false,
    title: '',
    message: '',
    candidateLoading: false,
  };

  getVacancies = async () => {
    this.setState({ loading: true });
    const response = await GetVacancies();
    const { error } = response;
    if (!error) {
      const { data } = response;
      this.setState({ vacancies: data });
    } else {
      this.displayMessage('Lo sentimos', 'Ha ocurrido un error');
    }
    this.setState({ loading: false });
  };

  addCandidate = async (vacancyId, token) => {
    this.setState({ candidateLoading: true });
    const response = await AddCandidate(vacancyId, token);
    const { error } = response;
    if (!error) {
      this.displayMessage('¡Felicitaciones!', 'Te has postulado a esta oferta');
    } else {
      this.displayMessage('Lo sentimos', error.response.data.error);
    }
    this.setState({ candidateLoading: false });
  };

  removeCandidate = async (vacancyId, token) => {
    this.setState({ candidateLoading: true });
    const response = await RemoveCandidate(vacancyId, token);
    const { error } = response;
    if (!error) {
      this.displayMessage('Mensaje', 'Has retirado tu postulación de esta oferta');
    } else {
      this.displayMessage('Lo sentimos', 'Ha ocurrido un error');
    }
    this.setState({ candidateLoading: false });
  };

  displayMessage = (setTitle, setMessage) => {
    this.setState({
      open: true,
      title: setTitle,
      message: setMessage,
    });
  };

  onClose = () => {
    this.setState(
      () => {
        return {
          open: false,
          title: '',
          message: '',
        };
      },
      () => {
        window.location.reload(false);
      }
    );
  };

  updateFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  static applyFilter(listings, filter) {
    const { payment_per_hour, city, date } = filter;
    let result = listings;
    if (payment_per_hour) {
      result = result.filter((vacancy) =>
        VacancyProvider.compareString(vacancy.payment_per_hour, payment_per_hour)
      );
    }
    if (city) {
      result = result.filter((vacancy) => VacancyProvider.compareString(vacancy.city, city));
    }
    if (date) {
      result = result.filter((vacancy) => VacancyProvider.compareDate(vacancy.start_at, date));
    }
    return result;
  }

  static compareDate(vacancyDate, filterDate) {
    const date1 = new Date(vacancyDate).toISOString().split('T')[0];
    const date2 = new Date(filterDate).toISOString().split('T')[0];
    return date1 === date2;
  }

  static compareString(vacancy, compareTo) {
    return vacancy.toLowerCase().startsWith(compareTo.toLowerCase());
  }

  render() {
    const { children } = this.props;
    const { vacancies, filter, loading, open, title, message, candidateLoading } = this.state;
    const updateFilter = this.updateFilter;
    const getVacancies = this.getVacancies;
    const addCandidate = this.addCandidate;
    const removeCandidate = this.removeCandidate;
    const onClose = this.onClose;
    const filteredVacancies = VacancyProvider.applyFilter(vacancies, filter);
    return (
      <VacancyContext.Provider
        value={{
          filteredVacancies,
          loading,
          open,
          title,
          message,
          candidateLoading,
          updateFilter,
          getVacancies,
          addCandidate,
          removeCandidate,
          onClose,
        }}
      >
        {children}
      </VacancyContext.Provider>
    );
  }
}

export default VacancyProvider;
