import styled from 'styled-components';

interface IStyledTextProps {
  size?: string;
  bold?: boolean;
}

export const StyledText = styled.span<IStyledTextProps>`
  font-size: ${({ size }) => size ?? '12px'};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;
