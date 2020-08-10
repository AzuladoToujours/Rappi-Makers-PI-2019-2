import axios from 'axios';
import {
  createVacancy,
  updateVacancy,
  deleVacancyEndpoint,
  getVacanciesEndpoint,
  addCandidateEndpoint,
  removeCandidateEndpoint,
} from '../endpoints/VacancyEndpoints';
import { formatPosition, formatReqDate } from '../utils/utils';

export const CreateVacancy = async (values, token) => {
  const request = formatRequest(values);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const endpoint = createVacancy;
  try {
    const { data } = await axios.post(endpoint, request, config);
    const response = { error: false, data };
    return response;
  } catch (error) {
    const response = { error: true, message: error.response.data.error };
    return response;
  }
};

export const EditVacancy = async (values, token) => {
  const { editId } = values;
  delete values.editId;
  const request = formatRequest(values);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const endpoint = `${updateVacancy}/${editId}`;
  try {
    await axios.put(endpoint, request, config);
    const response = { error: false };
    return response;
  } catch (error) {
    const response = { error: true, message: error.response.data.error };
    return response;
  }
};

export const DeleteVacancy = async (vacancyId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const endpoint = `${deleVacancyEndpoint}/${vacancyId}`;
  try {
    await axios.delete(endpoint, config);
    const response = { error: false };
    return response;
  } catch (error) {
    const response = { error: true, message: error.response.data.error };
    return response;
  }
};

export const GetVacancies = async () => {
  const endpoint = getVacanciesEndpoint;
  try {
    const { data } = await axios.get(endpoint);
    const response = { error: false, data };
    return response;
  } catch (error) {
    const response = { error: true };
    return response;
  }
};

export const AddCandidate = async (vacancyId, token) => {
  const endpoint = `${addCandidateEndpoint}/${vacancyId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    await axios.put(endpoint, {}, config);
  } catch (error) {}
};

export const RemoveCandidate = async (vacancyId, token) => {
  const endpoint = `${removeCandidateEndpoint}/${vacancyId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    await axios.put(endpoint, {}, config);
    const response = { error: false };
    return response;
  } catch (error) {
    const response = { error: true };
    return response;
  }
};

const formatRequest = (values) => {
  const position = formatPosition(values.position);
  const start_at = formatReqDate(values.start_at, values.start_hour);
  const end_at = formatReqDate(values.end_at, values.end_hour);
  return {
    description: values.description,
    start_at,
    end_at,
    offers_quantity: values.offers_quantity,
    payment_per_hour: values.payment_per_hour,
    country: values.country,
    state: values.state,
    city: values.city,
    address: values.address,
    position,
  };
};
