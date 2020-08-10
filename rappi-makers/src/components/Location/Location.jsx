import React, { Component } from 'react';
import { Field, ErrorMessage } from 'formik';
import csc from 'country-state-city';
import Input from '../Input/Input';

class Location extends Component {
  state = {
    countries: [],
    states: [],
    cities: [],
  };
  componentDidMount = () => {
    const countries = csc.getAllCountries();
    this.setState({ countries });
  };

  componentDidUpdate = async (prevProps) => {
    const { country, state } = this.props;
    if (prevProps.country !== country) {
      const countryId = await this.getId(this.state.countries, country);
      const states = csc.getStatesOfCountry(countryId);
      this.setState({ states });
    }
    if (prevProps.state !== state) {
      const stateId = await this.getId(this.state.states, state);
      const cities = csc.getCitiesOfState(stateId);
      this.setState({ cities });
    }
  };

  getId = (array, locationName) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === locationName) {
        return array[i].id;
      }
    }
  };

  render() {
    const { countries, states, cities } = this.state;
    return (
      <>
        <div>
          País
          <Field as="select" name="country" className="signup-select">
            <option value="">Seleccione un país</option>
            <>
              {countries.map((country) => (
                <option value={country.name} key={country.id}>
                  {country.name}
                </option>
              ))}
            </>
          </Field>
          <div className="error-message">
            <ErrorMessage name="country" />
          </div>
        </div>
        <div>
          Estado
          <Field as="select" name="state" className="signup-select">
            <option value="">Seleccione un Estado</option>
            <>
              {states.map((state) => (
                <option value={state.name} key={state.id}>
                  {state.name}
                </option>
              ))}
            </>
          </Field>
          <div className="error-message">
            <ErrorMessage name="state" />
          </div>
        </div>
        <div>
          Ciudad
          <Field as="select" name="city" className="signup-select">
            <option value="">Seleccione una Ciudad</option>
            <>
              {cities.map((city) => (
                <option value={city.name} key={city.id}>
                  {city.name}
                </option>
              ))}
            </>
          </Field>
          <div className="error-message">
            <ErrorMessage name="city" />
          </div>
        </div>
        <Input name="address" type="text" label="Dirección" identifier="signup-input" />
      </>
    );
  }
}

export default Location;
