import * as React from 'react';
import * as redux from 'react-redux';
import {
  fireEvent,
  render,
  screen as testScreen,
  waitFor,
} from '@testing-library/react';
import TransactionForm from '../transaction-form';
import registerIcons from '../../../helper/register-icons';
import user from '@testing-library/user-event';

jest.mock('../../../helper/store', () => ({
  useAppSelector: jest.fn(_fn => ({
    data: {
      id: 1,
      name: 'John',
      email: 'john@doo.com',
      password: 'password',
      balance: 100,
    },
    token: null,
    error: false,
    loading: false,
  })),
}));
jest.mock('react-router-dom', () => ({
  Link: () => null,
}));
jest.mock('../../../service/user', () => ({
  filter: () => [],
}));

describe('Transaction form', () => {
  beforeAll(() => {
    registerIcons();
  });

  beforeEach(() => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({
      user: {
        data: {
          id: 1,
          name: 'John',
          email: 'john@doo.com',
          password: 'password',
          balance: 100,
        },
        token: null,
        error: false,
        loading: false,
      },
    });
  });

  it('empty fields', async () => {
    const onSubmitForm = jest.fn();
    const clearAlert = jest.fn();
    const loading = false;

    render(
      <TransactionForm
        onSubmitForm={onSubmitForm}
        clearAlert={clearAlert}
        isLoading={loading}
      />,
    );

    fireEvent.click(testScreen.getByText(/create/i));

    const [alertName, alertAmount] = await waitFor(() =>
      testScreen.getAllByRole('alert'),
    );

    expect(alertName.textContent).toEqual('Name is required');
    expect(alertAmount.textContent).toEqual('Amount is required');
  });

  it('submit', async () => {
    const transDto = {
      name: 'John Doo',
      amount: 40,
    };

    const onSubmitForm = jest.fn();
    const clearAlert = jest.fn();
    const loading = false;

    render(
      <TransactionForm
        onSubmitForm={onSubmitForm}
        clearAlert={clearAlert}
        isLoading={loading}
      />,
    );

    const nameElement = document.querySelector('input[name="name"]');
    expect(nameElement).not.toBeFalsy();
    const amountElement = document.querySelector('input[name="amount"]');
    expect(amountElement).not.toBeFalsy();

    if (nameElement != null) {
      user.type(nameElement, transDto.name);
    }

    if (amountElement != null) {
      user.type(amountElement, `${transDto.amount}`);
    }

    const createBtn = testScreen.getByText(/create/i);
    expect(createBtn).not.toBeFalsy();

    const [alertName, alertAmount] = await waitFor(() =>
      testScreen.getAllByRole('alert'),
    );

    await waitFor(() => fireEvent.click(createBtn));
    expect(alertName.textContent).toEqual('');
    expect(alertAmount.textContent).toEqual('');
    expect(onSubmitForm).toHaveBeenCalledWith(transDto);
  });
});
