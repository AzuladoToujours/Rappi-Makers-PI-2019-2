import { number, string, object } from 'yup';

const formConfig = {
  formValues: {
    description: '',
    start_at: '',
    start_hour: '',
    end_at: '',
    end_hour: '',
    offers_quantity: '',
    payment_per_hour: '',
    country: '',
    state: '',
    city: '',
    address: '',
    position: '',
  },
  formValidation: object({
    description: string().required('Este campo es requerido'),
    start_at: string().required('Este campo es requerido'),
    start_hour: string()
      .required('Este campo es requerido')
      .matches(new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), 'Debe tener el siguiente formato HH:MM'),
    end_at: string().required('Este campo es requerido'),
    end_hour: string()
      .required('Este campo es requerido')
      .matches(new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), 'Debe tener el siguiente formato HH:MM'),
    offers_quantity: number('Este campo es númerico')
      .required('Este campo es requerido')
      .min(1, 'La cantidad mínima es 1'),
    payment_per_hour: string().required('Este campo es requerido'),
    country: string().required('Este campo es requerido'),
    state: string().required('Este campo es requerido'),
    city: string().required('Este campo es requerido'),
    address: string().required('Este campo es requerido'),
    position: string().required('Este campo es requerido'),
  }),
};

export default formConfig;
