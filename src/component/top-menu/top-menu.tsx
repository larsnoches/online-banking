import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box } from '@component/styled/box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocalStorageHelper from '@helper/local-storage';
import { Menu } from 'antd';
import { StyledRightMenu } from '@component/styled/right-menu';
import { useAppDispatch } from '@helper/store';
import { userAsyncActions } from '@state/async-actions';

function TopMenu(): JSX.Element | null {
  const usedHistory = useHistory();
  const usedLocation = useLocation();
  const { pathname } = usedLocation;
  const dispatch = useAppDispatch();

  const onMenuItemClick = React.useCallback(
    (e: { key: string }) => {
      if (e.key == null) return;
      usedHistory.push(e.key);
    },
    [usedHistory],
  );
  const onLogoutClick = React.useCallback(async () => {
    try {
      await dispatch(userAsyncActions.logout());
    } catch {
      //
    }
  }, [dispatch]);

  const token = LocalStorageHelper.getItem('token');
  if (token == null) return null;

  return (
    <Box flex boxSizing="content-box">
      <Box justifyContent="start">
        <Menu
          onClick={onMenuItemClick}
          selectedKeys={[pathname]}
          mode="horizontal"
          theme="light"
        >
          <Menu.Item key="/home" icon={<FontAwesomeIcon icon="money-check" />}>
            {'Home'}
          </Menu.Item>
          <Menu.Item
            key="/create-transaction"
            icon={<FontAwesomeIcon icon="money-bill-alt" />}
          >
            {'Create transaction'}
          </Menu.Item>
        </Menu>
      </Box>
      <Box grow>
        <StyledRightMenu mode="horizontal" theme="light">
          <Menu.Item
            key="/logout"
            icon={<FontAwesomeIcon icon="sign-out-alt" />}
            onClick={onLogoutClick}
          >
            {'Logout'}
          </Menu.Item>
        </StyledRightMenu>
      </Box>
    </Box>
  );
}

export default TopMenu;
