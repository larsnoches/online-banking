import * as yup from 'yup';
import { config } from '@helper/config';

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(config.usernameMin)
    .max(config.usernameMax)
    .required('User name is required'),
  email: yup.string().email('Not valid e-mail').required('E-mail is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(config.passwordMin, 'Minimum 5 symbols are allowed')
    .max(config.passwordMax, 'Maximum 15 symbols are allowed'),
  password2: yup
    .string()
    .required('Password confirm is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
