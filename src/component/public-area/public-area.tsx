import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@helper/store';
import { useHistory, useLocation } from 'react-router-dom';
import LocalStorageHelper from '@helper/local-storage';
import { userAsyncActions } from '@state/async-actions';

interface IPublicAreaProps {
  component: React.ComponentType<any>;
  redirectPath?: string;
}

type LocationState = {
  from: Location;
};

function PublicArea({
  component: TargetComponent,
  redirectPath,
}: IPublicAreaProps): JSX.Element {
  const usedHistory = useHistory();
  const usedLocation = useLocation<LocationState>();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.user);

  const { from } = usedLocation.state || { from: { pathname: redirectPath } };

  React.useEffect(() => {
    if (token) {
      usedHistory.replace(from);
      return;
    }
    const storedToken = LocalStorageHelper.getItem('token');
    if (storedToken) {
      dispatch(userAsyncActions.loginWithToken(storedToken))
        .then(() => {
          //
        })
        .catch(() => {
          usedHistory.replace('/');
        });
    }
  }, [dispatch, from, token, usedHistory]);

  return <TargetComponent />;
}

export default PublicArea;
