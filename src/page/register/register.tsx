import * as React from 'react';
import { alertAsyncActions, userAsyncActions } from '@state/async-actions';
import { useAppDispatch, useAppSelector } from '@helper/store';
import { Box } from '@component/styled';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUserRegistrationDto } from '@model/user';
import Layout from '@component/layout';
import { Link } from 'react-router-dom';
import RegisterForm from '@component/register-form';
import { config } from '@helper/config';

function Register(): JSX.Element {
  const { theme } = config;
  const { alertType, alertMessage } = useAppSelector(state => state.alert);
  const { loading } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const onSubmitForm = React.useCallback(
    async (dto: IUserRegistrationDto) => {
      try {
        await dispatch(userAsyncActions.register(dto));
      } catch {
        //
      }
    },
    [dispatch],
  );

  const error = alertType === 'error' ? alertMessage : null;
  const clearAlert = React.useCallback(async () => {
    await dispatch(alertAsyncActions.clear());
  }, [dispatch]);

  return (
    <Layout title="Registration">
      <Box
        centered
        height="100%"
        width="350px"
        pad={{
          top: '20px',
        }}
      >
        <Box flex pad={{ top: '20px', bottom: '20px' }} justifyContent="center">
          <FontAwesomeIcon icon="crow" size="8x" color={theme.primaryColor} />
        </Box>
        <RegisterForm
          onSubmitForm={onSubmitForm}
          clearAlert={clearAlert}
          errorMessage={error}
          isLoading={loading}
        />
        <Box margin={{ top: '15px' }}>
          <Card>
            <Box centeredText>
              {'Have an account? '}
              <Link to="/login">{'Login'}</Link>
              {'.'}
            </Box>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
}

export default Register;
