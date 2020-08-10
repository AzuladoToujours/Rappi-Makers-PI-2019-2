import axios from 'axios';
import { restaurantSignUp, editRestaurant } from '../endpoints/RestaurantEndpoints';

export const SignUp = async (values) => {
  const request = { ...values };
  try {
    await axios.post(restaurantSignUp, request);
    const response = { error: false };
    return response;
  } catch (error) {
    const response = { error: true, message: error.response.data.error };
    return response;
  }
};

export const EditRestaurant = async (values, token) => {
  const { editId } = values;
  delete values.editId;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const request = { ...values };
  const endpoint = `${editRestaurant}/${editId}`;
  try {
    await axios.put(endpoint, request, config);
    const response = { error: false };
    return response;
  } catch (error) {
    const response = { error: true, message: error.response.data.error };
    return response;
  }
};
