import * as React from 'react';
import {
  alertAsyncActions,
  transactionAsyncActions,
} from '@state/async-actions';
import { useAppDispatch, useAppSelector } from '@helper/store';
import { AlertMsgType } from '@state/slices';
import { Box } from '@component/styled';
import { ITransactionCreateDto } from '@model/transaction';
import Layout from '@component/layout';
import TransactionForm from '@component/transaction-form';

function CreateTransaction(): JSX.Element {
  const { alertType, alertMessage } = useAppSelector(state => state.alert);
  const { loading } = useAppSelector(state => state.transactions);

  const dispatch = useAppDispatch();

  const onSubmitForm = React.useCallback(
    async (dto: ITransactionCreateDto) => {
      try {
        await dispatch(transactionAsyncActions.create(dto));
      } catch {
        //
      }
    },
    [dispatch],
  );

  let alertMsg = null;
  if (alertType && alertMessage) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const alertTitle = alertType.charAt(0).toUpperCase() + alertType.slice(1);
    alertMsg = {
      type: alertType as AlertMsgType,
      title: alertTitle,
      message: alertMessage,
    };
  }

  const clearAlert = React.useCallback(async () => {
    await dispatch(alertAsyncActions.clear());
  }, [dispatch]);

  return (
    <Layout title="Create transaction">
      <Box
        centered
        height="100%"
        width="350px"
        pad={{
          top: '20px',
        }}
      >
        <Box flex pad={{ top: '20px', bottom: '20px' }} justifyContent="center">
          <h1>{'Create a new transaction'}</h1>
        </Box>
        <TransactionForm
          onSubmitForm={onSubmitForm}
          clearAlert={clearAlert}
          alertMsg={alertMsg}
          isLoading={loading}
        />
      </Box>
    </Layout>
  );
}

export default CreateTransaction;
