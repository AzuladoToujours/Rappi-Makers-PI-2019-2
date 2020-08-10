/* eslint-disable no-useless-escape */
import { object, string } from 'yup';

const formConfig = {
  formValues: {
    nit: '',
    name: '',
    email: '',
    mobile: '',
    password: '',
    country: '',
    state: '',
    city: '',
    address: '',
    description: '',
  },
  formValidation: object({
    nit: string()
      .matches(new RegExp(/^[0-9]*$/), 'Este campo debe contener solo números')
      .required('Este campo es obligatorio')
      .min(10, 'El NIT debe ser de 10 digitos')
      .max(10, 'El NIT debe ser de de 10 digitos'),
    name: string().required('Este campo es obligatorio'),
    email: string().email('Formato de email incorrecto').required('Este campo es obligatorio'),
    mobile: string()
      .matches(new RegExp(/^[0-9]*$/), 'Este campo debe contener solo números')
      .min(10, 'El número celular de tener 10 digitos')
      .max(10, 'El número celular de tener 10 digitos'),
    password: string()
      .matches(
        new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
        'La contraseña debe contener al menos un número y un caracter en mayuscula'
      )
      .min(6, 'La contraseña debe ser mínimo de 6 caracteres'),
    country: string().required('Este campo es obligatorio'),
    state: string().required('Este campo es obligatorio'),
    city: string().required('Este campo es obligatorio'),
    address: string().required('Este campo es obligatorio'),
    description: string().required('Este campo es obligatorio'),
  }),
};

export default formConfig;
