import * as React from 'react';
import { clearPingTimer, setPingTimer } from '@helper/ping-timer';
import {
  transactionAsyncActions,
  userAsyncActions,
} from '@state/async-actions';
import { Box } from '@component/styled';
import Layout from '@component/layout';
import Transactions from '@component/transactions';
import UserInfo from '@component/user-info';
import { useAppDispatch } from '@helper/store';

function Home(): JSX.Element {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const req = (): void => {
      dispatch(userAsyncActions.getUserInfo())
        .then(async () => {
          try {
            await dispatch(transactionAsyncActions.getList());
          } catch {
            //
          }
        })
        .catch(() => {
          //
        });
    };
    // first call
    req();
    // planned calling
    const tmr = setPingTimer(req);
    return () => {
      clearPingTimer(tmr);
    };
  }, [dispatch]);

  return (
    <Layout title="Home">
      <UserInfo />
      <Transactions />
      <Box></Box>
    </Layout>
  );
}

export default Home;
