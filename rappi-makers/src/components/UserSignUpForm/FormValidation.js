/* eslint-disable no-useless-escape */
import { object, string, array } from 'yup';

const formConfig = {
  formValues: {
    identity_card: '',
    names: '',
    last_names: '',
    gender: 'M',
    birthday: '',
    email: '',
    mobile: '',
    country: '',
    state: '',
    city: '',
    address: '',
    positions: [''],
    password: '',
  },
  formValidation: object({
    names: string()
      .min(5, 'Este campo debe ser de al menos 5 caracteres')
      .required('Este campo es obligatorio'),
    last_names: string()
      .min(5, 'Este campo debe ser de al menos 5 caracteres')
      .required('Este campo es obligatorio'),
    identity_card: string()
      .matches(new RegExp(/^[0-9]*$/), 'Este campo debe contener solo números')
      .required('Este campo es obligatorio')
      .min(5, 'Debe tener como mínimo 5 digitos')
      .max(10, 'Debe tener como máximo 10 digitos'),
    birthday: string()
      .matches(
        new RegExp(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
        'La fehca debe estar con el siguiente formato YYYY-MM-DD'
      )
      .required('Este campo es obligatorio'),
    email: string().email('Formato de email erroneo').required('Este campo es obligatorio'),
    mobile: string()
      .required('Este campo es obligatorio')
      .matches(new RegExp(/^[0-9]*$/), 'Este campo debe contener solo números')
      .max(10),
    country: string().required('Este campo es obligatorio'),
    state: string().required('Este campo es obligatorio'),
    city: string().required('Este campo es obligatorio'),
    address: string().required('Este campo es obligatorio'),
    positions: array()
      .of(string().required('Este campo es obligatorio'))
      .required('Debe tener una habilidad'),
    password: string()
      .required('Este campo es obligatorio')
      .matches(
        new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
        'La contraseña debe contener al menos un número y una mayuscula'
      )
      .min(6, 'La contraseña debe ser mínimo de 6 caracteres'),
  }),
};

export default formConfig;
