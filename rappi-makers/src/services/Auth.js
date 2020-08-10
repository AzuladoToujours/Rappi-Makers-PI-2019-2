import axios from 'axios';
import { signIn, forgotPasswordEndpoint, changePasswordEndpoint } from '../endpoints/AuthEndpoints';

export const login = async (email, password) => {
  try {
    const endpoint = signIn;
    const request = { email, password };
    const { data } = await axios.post(endpoint, request);
    const response = { data, error: false };
    return response;
  } catch (error) {
    const response = { error: true, message: error.response.data.error };
    return response;
  }
};

export const forgotPassword = async (email) => {
  try {
    const endpoint = forgotPasswordEndpoint;
    const request = { email };
    const { data } = await axios.post(endpoint, request);
    const response = { data, error: false };
    return response;
  } catch (error) {
    const response = { error: true, message: error.response.data.error };
    return response;
  }
};

export const changePassword = async (password, token) => {
  try {
    console.log(token);
    const endpoint = `${changePasswordEndpoint}/${token}`;
    const request = { password };
    const { data } = await axios.put(endpoint, request);
    const response = { data, error: false };
    return response;
  } catch (error) {
    const response = { error: true, message: error.response.data.error };
    return response;
  }
};
