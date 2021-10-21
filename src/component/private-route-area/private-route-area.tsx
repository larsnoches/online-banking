import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { useAppSelector } from '@helper/store';

interface IPrivateRouteAreaProps {
  component?: React.ComponentType<any>;
  redirectPath?: string;
  loginPath?: string;
  children?: JSX.Element | Array<JSX.Element>;
  path?: string;
  exact?: boolean;
}

function PrivateRouteArea({
  component: TargetComponent,
  loginPath,
  redirectPath,
  children,
  ...rest
}: IPrivateRouteAreaProps): JSX.Element {
  const { token } = useAppSelector(state => state.user);
  const rend = React.useCallback(
    (
      routeProps: RouteComponentProps,
    ): JSX.Element | Array<JSX.Element> | undefined => {
      if (token == null) {
        return (
          <Redirect
            to={{
              pathname: loginPath,
              state: { from: routeProps.location },
            }}
          />
        );
      }

      if (redirectPath != null) {
        return <Redirect to={redirectPath} />;
      }

      return TargetComponent ? <TargetComponent /> : children;
    },
    [TargetComponent, children, loginPath, redirectPath, token],
  );

  return <Route {...rest} render={rend} />;
}

export default PrivateRouteArea;
