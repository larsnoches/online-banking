import * as React from 'react';
import { alertAsyncActions, userAsyncActions } from '@state/async-actions';
import { useAppDispatch, useAppSelector } from '@helper/store';
import { Box } from '@component/styled';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUserLoginDto } from '@model/user';
import Layout from '@component/layout';
import { Link } from 'react-router-dom';
import LoginForm from '@component/login-form';
import { config } from '@helper/config';

function Login(): JSX.Element {
  const { theme } = config;
  const { alertType, alertMessage } = useAppSelector(state => state.alert);
  const { loading } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const onSubmitForm = React.useCallback(
    async (dto: IUserLoginDto) => {
      try {
        await dispatch(userAsyncActions.login(dto));
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
    <Layout title="Login">
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
        <LoginForm
          onSubmitForm={onSubmitForm}
          clearAlert={clearAlert}
          errorMessage={error}
          isLoading={loading}
        />
        <Box margin={{ top: '15px' }}>
          <Card>
            <Box centeredText>
              {'New to PW? '}
              <Link to="/register">{'Create an account'}</Link>
              {'.'}
            </Box>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
}

export default Login;
