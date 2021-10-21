import * as React from 'react';
import { Box } from '@component/styled';
import { ITransactionDto } from '@model/transaction';
import { Table } from 'antd';
import { columns } from './transactions-columns';
import { useAppSelector } from '@helper/store';

function Transactions(): JSX.Element {
  const { loading, data: transactionsData } = useAppSelector(
    state => state.transactions,
  );

  const rowKey = React.useCallback((record: ITransactionDto) => {
    if (record.id == null) return 'key';
    return `${record.id}`;
  }, []);

  return (
    <Box pad={{ left: '10px', right: '10px' }}>
      <Table
        loading={loading}
        rowKey={rowKey}
        dataSource={transactionsData}
        columns={columns}
      />
    </Box>
  );
}

export default Transactions;
