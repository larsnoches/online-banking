import * as React from 'react';
import {
  fireEvent,
  render,
  screen as testScreen,
  waitFor,
} from '@testing-library/react';
import LoginForm from '../login-form';
import registerIcons from '../../../helper/register-icons';
import user from '@testing-library/user-event';

describe('Login form', () => {
  beforeAll(() => {
    registerIcons();
  });

  it('empty fields', async () => {
    const onSubmitForm = jest.fn();
    const clearAlert = jest.fn();
    const error = null;
    const loading = false;

    render(
      <LoginForm
        onSubmitForm={onSubmitForm}
        clearAlert={clearAlert}
        errorMessage={error}
        isLoading={loading}
      />,
    );

    fireEvent.click(testScreen.getByText(/log in/i));

    const [alertEmail, alertPassword] = await waitFor(() =>
      testScreen.getAllByRole('alert'),
    );

    expect(alertEmail.textContent).toEqual('E-mail is required');
    expect(alertPassword.textContent).toEqual('Password is required');
  });

  it('submit', async () => {
    const userDto = {
      email: 'ivanpetrov11@ya.ru',
      password: 'ivanpass',
    };

    const onSubmitForm = jest.fn();
    const clearAlert = jest.fn();
    const error = null;
    const loading = false;

    render(
      <LoginForm
        onSubmitForm={onSubmitForm}
        clearAlert={clearAlert}
        errorMessage={error}
        isLoading={loading}
      />,
    );

    const emailElement = document.querySelector('input[name="email"]');
    expect(emailElement).not.toBeFalsy();
    const passwordElement = document.querySelector('input[name="password"]');
    expect(passwordElement).not.toBeFalsy();

    if (emailElement != null) {
      user.type(emailElement, userDto.email);
    }

    if (passwordElement != null) {
      user.type(passwordElement, userDto.password);
    }

    await waitFor(() => fireEvent.click(testScreen.getByText(/log in/i)));
    expect(onSubmitForm).toHaveBeenCalledWith(userDto);
  });
});
