import * as React from 'react';
import { Box, IBoxProps } from '@component/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Input } from 'antd';
import InputField from '@component/input-field';

interface IInputTextFieldProps extends IBoxProps {
  label?: string;
  controlName: string;
  icon?: IconProp;
  inputType?: 'text' | 'password';
  error?: { message: string };
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
}

function InputTextField({
  label,
  controlName,
  icon,
  inputType,
  error,
  onChange,
  isDisabled,
  ...rest
}: IInputTextFieldProps): JSX.Element {
  return (
    <Box {...rest}>
      <InputField label={label} error={error}>
        <Input
          name={controlName}
          prefix={icon && <FontAwesomeIcon icon={icon} size="sm" />}
          type={inputType}
          size="large"
          onChange={onChange}
          disabled={isDisabled}
        />
      </InputField>
    </Box>
  );
}

export default InputTextField;
