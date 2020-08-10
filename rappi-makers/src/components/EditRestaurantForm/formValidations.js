import { object, string } from 'yup';

export const formValidation = object({
  name: string().min(5, 'Este campo debe ser de al menos 5 caracteres').required('Este campo es obligatorio'),
  mobile: string()
    .required('Este campo es obligatorio')
    .matches(new RegExp(/^[0-9]*$/), 'Este campo debe contener solo números')
    .max(10),
  country: string().required('Este campo es obligatorio'),
  state: string().required('Este campo es obligatorio'),
  city: string().required('Este campo es obligatorio'),
  address: string().required('Este campo es obligatorio'),
  description: string().required('Este campo es obligatorio'),
});
