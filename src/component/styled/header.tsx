import { Layout, LayoutProps } from 'antd';
import styled from 'styled-components';

interface IStyledHeaderProps extends LayoutProps {
  background?: string;
}

export const StyledHeader = styled(Layout.Header)<IStyledHeaderProps>`
  background-color: ${({ background }) => background ?? 'white'};
`;
