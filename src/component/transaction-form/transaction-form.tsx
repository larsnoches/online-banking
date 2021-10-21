import * as React from 'react';
import { Alert, Button, Card } from 'antd';
import { Box, StyledForm } from '@component/styled';
import { IUser, IUserFilterDto } from '@model/user';
import { AlertMsgType } from '@state/slices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITransactionCreateDto } from '@model/transaction';
import InputAutoCompleteField from '@component/input-autocomplete-field';
import InputTextField from '@component/input-text-field';
import { Link } from 'react-router-dom';
import { getAlertIcon } from '@helper/alert-icon';
import { transactionSchema } from './transaction-form-yup';
import { useAppSelector } from '@helper/store';
import { useForm } from 'react-hook-form';
import userService from '@service/user';
import { yupResolver } from '@hookform/resolvers/yup';

interface ITransactionFormProps {
  isLoading: boolean;
  alertMsg?: {
    type: AlertMsgType;
    title: string;
    message: string;
  } | null;
  onSubmitForm: (dto: ITransactionCreateDto) => void;
  clearAlert: () => void;
}

function TransactionForm({
  isLoading,
  alertMsg,
  onSubmitForm,
  clearAlert,
}: ITransactionFormProps): JSX.Element {
  const { data: userData } = useAppSelector(state => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(transactionSchema(userData.balance)),
  });
  const [users, setUsers] = React.useState<Array<IUser>>([]);

  const onSubmit = React.useCallback(
    data => {
      onSubmitForm(data as ITransactionCreateDto);
    },
    [onSubmitForm],
  );

  const handleSetValue = React.useCallback(
    async (field: string, val: any) => {
      try {
        setValue(field, val);
        if (alertMsg) clearAlert();
        await trigger(field);
      } catch {
        //
      }
    },
    [clearAlert, alertMsg, setValue, trigger],
  );

  const onChangeName = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const filter = e.target.value;
        await handleSetValue('name', filter);
        const filtered = await userService.filter({ filter } as IUserFilterDto);
        setUsers(filtered);
      } catch {
        //
      }
    },
    [handleSetValue],
  );
  const onChangeHintedName = React.useCallback(
    async (value: string, _option) => {
      try {
        await handleSetValue('name', value);
      } catch {
        //
      }
    },
    [handleSetValue],
  );
  const onChangeAmount = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleSetValue('amount', e.target.value),
    [handleSetValue],
  );

  React.useEffect(() => {
    register('name');
    register('amount');
  }, [register]);

  const usersHintOptions = users
    .map(usr => ({
      value: usr.name ?? '',
    }))
    .filter(opt => opt.value !== '');

  const isSuccess = alertMsg?.type === 'success';

  return (
    <Card>
      <StyledForm name="transactionForm" onSubmit={handleSubmit(onSubmit)}>
        {alertMsg && (
          <Box pad={{ bottom: '16px' }}>
            <Alert
              message={alertMsg.title}
              description={alertMsg.message}
              type={alertMsg.type}
              icon={<FontAwesomeIcon icon={getAlertIcon(alertMsg.type)} />}
              showIcon
            />
          </Box>
        )}
        <InputAutoCompleteField
          label="Recipient name"
          error={errors?.name as { message: string }}
          controlName="name"
          onChange={onChangeName}
          isDisabled={isLoading || isSuccess}
          autoCompleteProps={{
            options: usersHintOptions,
            onChange: onChangeHintedName,
          }}
        />
        <InputTextField
          label="Transaction amount"
          error={errors?.amount as { message: string }}
          controlName="amount"
          onChange={onChangeAmount}
          isDisabled={isLoading || isSuccess}
          margin={{ bottom: '10px' }}
          width="200px"
        />
        <Box flex justifyContent="center" alignItems="center">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={isLoading || isSuccess}
          >
            {'Create'}
          </Button>
          <Box pad={{ left: '10px', right: '5px' }}>{'or'}</Box>
          <Box pad={{ left: '5px' }} width="fit-content">
            <Link to="/home">{isSuccess ? 'Go back' : 'Cancel'}</Link>
          </Box>
        </Box>
      </StyledForm>
    </Card>
  );
}

export default TransactionForm;
