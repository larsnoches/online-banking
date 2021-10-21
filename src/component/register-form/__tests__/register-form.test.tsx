import * as React from 'react';
import {
  fireEvent,
  render,
  screen as testScreen,
  waitFor,
} from '@testing-library/react';
import RegisterForm from '../register-form';
import registerIcons from '../../../helper/register-icons';
import user from '@testing-library/user-event';

describe('Register form', () => {
  beforeAll(() => {
    registerIcons();
  });

  it('empty fields', async () => {
    const onSubmitForm = jest.fn();
    const clearAlert = jest.fn();
    const error = null;
    const loading = false;

    render(
      <RegisterForm
        onSubmitForm={onSubmitForm}
        clearAlert={clearAlert}
        errorMessage={error}
        isLoading={loading}
      />,
    );

    fireEvent.click(testScreen.getByText(/register/i));

    const [alertUsername, alertEmail, alertPassword, alertPassword2] =
      await waitFor(() => testScreen.getAllByRole('alert'));

    expect(alertUsername.textContent).toEqual('User name is required');
    expect(alertEmail.textContent).toEqual('E-mail is required');
    expect(alertPassword.textContent).toEqual('Password is required');
    expect(alertPassword2.textContent).toEqual('Password confirm is required');
  });

  it('submit', async () => {
    const userDto = {
      username: 'John Doo',
      password: 'johnpwd',
      email: 'john@doo.foo',
    };

    const onSubmitForm = jest.fn();
    const clearAlert = jest.fn();
    const error = null;
    const loading = false;

    render(
      <RegisterForm
        onSubmitForm={onSubmitForm}
        clearAlert={clearAlert}
        errorMessage={error}
        isLoading={loading}
      />,
    );

    const usernameElement = document.querySelector('input[name="username"]');
    expect(usernameElement).not.toBeFalsy();
    const emailElement = document.querySelector('input[name="email"]');
    expect(emailElement).not.toBeFalsy();
    const passwordElement = document.querySelector('input[name="password"]');
    expect(passwordElement).not.toBeFalsy();
    const password2Element = document.querySelector('input[name="password2"]');
    expect(password2Element).not.toBeFalsy();

    if (usernameElement != null) {
      user.type(usernameElement, userDto.username);
    }
    if (emailElement != null) {
      user.type(emailElement, userDto.email);
    }
    if (passwordElement != null) {
      user.type(passwordElement, userDto.password);
    }
    if (password2Element != null) {
      user.type(password2Element, userDto.password);
    }

    await waitFor(() => fireEvent.click(testScreen.getByText(/register/i)));
    expect(onSubmitForm).toHaveBeenCalledWith(userDto);
  });
});
