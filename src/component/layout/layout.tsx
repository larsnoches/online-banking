import * as React from 'react';
import { Box, StyledHeader } from '@component/styled';
import { Helmet } from 'react-helmet';
import { Layout as LayoutAntd } from 'antd';
import TopMenu from '@component/top-menu';
import { config } from '@helper/config';

interface ILayoutProps {
  title: string;
  children: JSX.Element | Array<JSX.Element>;
}

const { Content, Footer } = LayoutAntd;

function Layout({ title, children }: ILayoutProps): JSX.Element {
  const { appTitle, theme } = config;
  return (
    <LayoutAntd className="layout">
      <Helmet>
        <title>{`${appTitle} - ${title}`}</title>
        <meta charSet="utf-8" />
      </Helmet>
      <StyledHeader background={theme.headerColor}>
        <TopMenu />
      </StyledHeader>
      <Content>{children}</Content>
      <Footer>
        <Box centeredText>{'PW © 2021'}</Box>
      </Footer>
    </LayoutAntd>
  );
}

export default Layout;
