import * as yup from 'yup';
import { config } from '@helper/config';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Not valid e-mail').required('E-mail is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(config.passwordMin, 'Minimum 5 symbols are allowed')
    .max(config.passwordMax, 'Maximum 15 symbols are allowed'),
});
