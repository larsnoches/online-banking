import * as React from 'react';
import { StyledFormItem } from '@component/styled';

interface IInputFieldProps {
  label?: string;
  error?: {
    message: string;
  };
  children: any;
}

function InputField({ label, error, children }: IInputFieldProps): JSX.Element {
  return (
    <StyledFormItem
      colon={false}
      label={label}
      validateStatus={error ? 'error' : ''}
      help={error ? error?.message : ''}
      hasFeedback
    >
      {children}
    </StyledFormItem>
  );
}

export default InputField;
