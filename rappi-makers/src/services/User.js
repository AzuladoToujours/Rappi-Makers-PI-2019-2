import axios from 'axios';
import { userSignUp, editUser } from '../endpoints/UserEndpoints';

export const SignUp = async (values) => {
  const positions = formatRequestPositions(values.positions);
  const requestValues = { ...values };
  delete requestValues.positions;
  const request = { dni_type_id: 1, ...requestValues, positions };
  try {
    await axios.post(userSignUp, request);
    const response = { error: false };
    return response;
  } catch (error) {
    const response = { error: true, message: error.response.data.error };
    return response;
  }
};

export const EditUser = async (values, token) => {
  const { editId } = values;
  delete values.editId;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const request = { ...values };
  const endpoint = `${editUser}/${editId}`;
  try {
    await axios.put(endpoint, request, config);
    const response = { error: false };
    return response;
  } catch (error) {
    const response = { error: true, message: error.response.data.error };
    return response;
  }
};

const formatRequestPositions = (positions) => {
  return positions.map((position) => {
    if (position === 'cocinero') return 1;
    if (position === 'mesero') return 2;
    if (position === 'lavaplatos') return 3;
    return 0;
  });
};
