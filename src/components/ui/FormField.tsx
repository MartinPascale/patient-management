import React from 'react';
import styled from 'styled-components';

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? 'red' : theme.primary.dark)};
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  min-height: 200px;
  margin-bottom: 14px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? 'red' : theme.primary.dark)};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  font-size: 12px;
  margin-top: -12px;
  margin-bottom: 10px;
`;

interface FormFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: string;
  touched?: boolean;
  as?: 'input' | 'textarea';
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  as = 'input',
}) => {
  const hasError = touched && !!error;

  return (
    <div>
      {as === 'input' ? (
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          hasError={hasError}
        />
      ) : (
        <TextArea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          hasError={hasError}
        />
      )}
      {hasError && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default FormField;
