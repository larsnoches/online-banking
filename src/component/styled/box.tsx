/* eslint-disable @typescript-eslint/indent */
import styled from 'styled-components';

export interface IBoxProps {
  width?: string;
  height?: string;
  pad?: {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
  };
  centered?: boolean;
  centeredText?: boolean;
  margin?: {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
  };
  flex?: boolean;
  grow?: boolean;
  shrink?: boolean;
  direction?: 'row' | 'column';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  justifyContent?:
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'space-between'
    | 'space-around'
    | 'stretch'
    | 'safe center'
    | 'unsafe center';
  boxSizing?: 'content-box' | 'border-box';
}

export const Box = styled.div<IBoxProps>`
  width: ${({ width }) => width ?? 'auto'};
  height: ${({ height }) => height ?? 'auto'};

  padding-left: ${({ pad }) => pad?.left ?? 'unset'};
  padding-right: ${({ pad }) => pad?.right ?? 'unset'};
  padding-top: ${({ pad }) => pad?.top ?? 'unset'};
  padding-bottom: ${({ pad }) => pad?.bottom ?? 'unset'};

  margin-left: ${({ margin, centered }) =>
    `${centered ? 'auto' : margin?.left ?? 'unset'}`};
  margin-right: ${({ margin, centered }) =>
    `${centered ? 'auto' : margin?.right ?? 'unset'}`};
  margin-top: ${({ margin, centered }) =>
    `${centered ? 0 : margin?.top ?? 'unset'}`};
  margin-bottom: ${({ margin, centered }) =>
    `${centered ? 0 : margin?.bottom ?? 'unset'}`};

  display: ${({ flex }) => `${flex ? 'flex' : 'block'}`};
  flex: ${({ grow, shrink }) =>
    `${grow ? '1' : '0'} ${shrink ? '1' : '0'} auto`};
  flex-direction: ${({ direction }) => `${direction ?? 'unset'}`};
  align-items: ${({ alignItems }) => `${alignItems ?? 'unset'}`};
  justify-content: ${({ justifyContent }) => `${justifyContent ?? 'unset'}`};

  text-align: ${({ centeredText }) => centeredText && 'center'};
  box-sizing: ${({ boxSizing }) => boxSizing ?? 'unset'};
`;
