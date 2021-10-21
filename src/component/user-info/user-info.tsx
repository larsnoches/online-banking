import * as React from 'react';
import { Box, StyledText } from '@component/styled';
import { Skeleton, Statistic } from 'antd';
import { useAppSelector } from '@helper/store';

function UserInfo(): JSX.Element {
  const { loading, data: userData } = useAppSelector(state => state.user);

  return (
    <Box
      pad={{ left: '10px', right: '10px', top: '8px', bottom: '8px' }}
      direction="column"
    >
      <Box flex direction="column">
        <Box flex grow shrink justifyContent="space-between" direction="row">
          <Box>
            <Skeleton loading={loading} paragraph={{ rows: 2, width: 200 }} />
            {!loading && userData.name && (
              <Box direction="column">
                <Box direction="row">
                  <StyledText size="16px">{'Welcome!'}</StyledText>
                </Box>
                <Box direction="row">
                  <StyledText size="16px">{'You logged as'}</StyledText>
                </Box>
                <Box direction="row">
                  <StyledText size="26px" bold>
                    {userData.name}
                  </StyledText>
                </Box>
              </Box>
            )}
          </Box>
          <Box>
            <Statistic
              loading={loading}
              title="Account balance"
              value={userData.balance ?? 0}
              suffix="pw"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserInfo;
