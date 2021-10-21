import * as React from 'react';
import { Alert, Button, Card } from 'antd';
import { Box, StyledForm } from '@component/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUserRegistrationDto } from '@model/user';
import InputTextField from '@component/input-text-field';
import { registerSchema } from './register-form-yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface IRegisterFormProps {
  isLoading: boolean;
  errorMessage: string | null;
  onSubmitForm: (dto: IUserRegistrationDto) => void;
  clearAlert: () => void;
}

interface IRegisterFormFields extends IUserRegistrationDto {
  password2: string;
}

function RegisterForm({
  isLoading,
  errorMessage,
  onSubmitForm,
  clearAlert,
}: IRegisterFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = React.useCallback(
    (data: IRegisterFormFields) => {
      const userData: IUserRegistrationDto = {
        username: data?.username,
        email: data?.email,
        password: data?.password,
      };
      onSubmitForm(userData);
    },
    [onSubmitForm],
  );

  const handleSetValue = React.useCallback(
    async (field: string, val: any) => {
      try {
        setValue(field, val);
        if (errorMessage) clearAlert();
        await trigger(field);
      } catch {
        //
      }
    },
    [clearAlert, errorMessage, setValue, trigger],
  );

  const onChangeUsername = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleSetValue('username', e.target.value),
    [handleSetValue],
  );
  const onChangeEmail = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleSetValue('email', e.target.value),
    [handleSetValue],
  );
  const onChangePassword = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleSetValue('password', e.target.value),
    [handleSetValue],
  );
  const onChangePassword2 = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleSetValue('password2', e.target.value),
    [handleSetValue],
  );

  React.useEffect(() => {
    register('username');
    register('email');
    register('password');
    register('password2');
  }, [register]);

  return (
    <Card>
      <StyledForm name="registerForm" onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && (
          <Box pad={{ bottom: '16px' }}>
            <Alert
              message="Error"
              description={errorMessage}
              type="error"
              icon={<FontAwesomeIcon icon="times-circle" />}
              showIcon
            />
          </Box>
        )}
        <InputTextField
          label="User name"
          error={errors?.username as { message: string }}
          controlName="username"
          onChange={onChangeUsername}
          isDisabled={isLoading}
        />
        <InputTextField
          label="E-mail"
          error={errors?.email as { message: string }}
          controlName="email"
          onChange={onChangeEmail}
          isDisabled={isLoading}
        />
        <InputTextField
          label="Password"
          error={errors?.password as { message: string }}
          controlName="password"
          inputType="password"
          onChange={onChangePassword}
          isDisabled={isLoading}
        />

        <InputTextField
          label="Password confirm"
          error={errors?.password2 as { message: string }}
          controlName="password2"
          inputType="password"
          onChange={onChangePassword2}
          isDisabled={isLoading}
          margin={{ bottom: '10px' }}
        />
        <Box>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={isLoading}
            block
          >
            {'Register'}
          </Button>
        </Box>
      </StyledForm>
    </Card>
  );
}

export default RegisterForm;
