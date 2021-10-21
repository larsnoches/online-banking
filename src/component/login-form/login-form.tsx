import * as React from 'react';
import { Alert, Button, Card } from 'antd';
import { Box, StyledForm } from '@component/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUserLoginDto } from '@model/user';
import InputTextField from '@component/input-text-field';
import { loginSchema } from './login-form-yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface ILoginFormProps {
  isLoading: boolean;
  errorMessage: string | null;
  onSubmitForm: (dto: IUserLoginDto) => void;
  clearAlert: () => void;
}

function LoginForm({
  isLoading,
  errorMessage,
  onSubmitForm,
  clearAlert,
}: ILoginFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = React.useCallback(
    data => {
      onSubmitForm(data as IUserLoginDto);
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

  React.useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  return (
    <Card>
      <StyledForm name="loginForm" onSubmit={handleSubmit(onSubmit)}>
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
          controlName="email"
          label="E-mail"
          error={errors?.email as { message: string }}
          icon="user"
          onChange={onChangeEmail}
          isDisabled={isLoading}
        />
        <InputTextField
          controlName="password"
          label="Password"
          error={errors?.password as { message: string }}
          icon="lock"
          inputType="password"
          onChange={onChangePassword}
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
            {'Log in'}
          </Button>
        </Box>
      </StyledForm>
    </Card>
  );
}

export default LoginForm;
