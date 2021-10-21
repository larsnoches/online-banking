import * as yup from 'yup';

export const transactionSchema = (
  balance?: number | null,
): ReturnType<typeof yup.object> =>
  yup.object().shape({
    name: yup.string().required('Name is required'),
    amount: yup
      .number()
      .typeError('You must specify a number')
      .required('Amount is required')
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .min(1, 'Minimum 1 value are allowed')
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .max(balance ?? 2, "Amount couldn't be greater than the balance"),
  });
