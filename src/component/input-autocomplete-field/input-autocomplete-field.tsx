import * as React from 'react';
import { AutoComplete, AutoCompleteProps, Input } from 'antd';
import { Box, IBoxProps } from '@component/styled';
import InputField from '@component/input-field';

interface IInputTextFieldProps {
  label?: string;
  controlName: string;
  error?: { message: string };
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  boxProps?: IBoxProps;
  autoCompleteProps?: AutoCompleteProps;
}

function InputAutoCompleteField({
  label,
  controlName,
  error,
  onChange,
  isDisabled,
  boxProps,
  autoCompleteProps,
}: IInputTextFieldProps): JSX.Element {
  return (
    <Box {...boxProps}>
      <InputField label={label} error={error}>
        <AutoComplete
          dropdownMatchSelectWidth={400}
          {...autoCompleteProps}
          disabled={isDisabled}
        >
          <Input
            name={controlName}
            size="large"
            onChange={onChange}
            disabled={isDisabled}
          />
        </AutoComplete>
      </InputField>
    </Box>
  );
}

export default InputAutoCompleteField;
