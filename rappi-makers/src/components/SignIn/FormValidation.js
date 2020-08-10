import { object, string } from 'yup';

export const formConfig = {
  formValues: {
    email: '',
    password: '',
  },
  formValidation: object({
    email: string().email('Email no valido').required('El email es requerido'),
    password: string().required('La contraseña es requerida'),
  }),
};
