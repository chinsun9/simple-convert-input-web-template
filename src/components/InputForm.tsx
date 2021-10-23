import styled from '@emotion/styled';
import React from 'react';

const Style = styled.form`
  display: grid;
  grid-template-columns: 1fr 120px;
  margin: 4em 0;

  input,
  button {
    padding: 1rem 1.6rem;
    outline: none;
    background-color: transparent;
    border: 1px solid hsl(0, 0%, 80%);
    font-size: 1.4rem;
    margin-top: 10px;
  }

  input {
    width: 100%;

    :focus {
      border-color: #21dc6d;
    }
  }

  button {
    background-color: #21dc6d;
    border-color: hsl(144, 93%, 49%);
    color: white;
  }
`;

type Props = {
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function InputForm({ title, value, onChange, onSubmit }: Props) {
  return (
    <Style>
      <input
        type="text"
        value={value}
        placeholder={title}
        onChange={onChange}
      />
      <button type="submit" onClick={onSubmit}>
        Enter
      </button>
    </Style>
  );
}

export default InputForm;
