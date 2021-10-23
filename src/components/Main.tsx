import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import LoadingIcon from '../icons/LoadingIcon';
import InputForm from './InputForm';
import useStateWithHistory from 'hooks/useStateWithHistory';

const Style = styled.main`
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 100%;
  min-height: 100%;
  max-width: 1000px;
  padding: 0 2rem;
  margin: auto;

  .input,
  .result {
    width: 100%;
  }

  .result {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    gap: 1rem;
    overflow: hidden;
    margin: 1rem 1.6rem;
    padding: 1rem 1.6rem;
    border: 1px solid;
    border-color: green;
  }

  .history {
    width: 100%;
  }

  .error {
    font-style: italic;
  }
`;

type ApiResultType = {
  key: string;
  a: string;
  b: number;
};

function Main() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [result, setResult, { history }] = useStateWithHistory<ApiResultType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<any>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    e.preventDefault();
    if (inputValue.trim().length < 1) {
      console.error('can not be empty');
      return;
    }

    try {
      setIsError(false);
      setIsLoading(true);

      // const apiResult = await fetch(`{api endpoint}`).then((res) => res.json());
      const apiResult: ApiResultType = {
        key: `${new Date().getTime()}`,
        a: inputValue.padStart(10, '*').slice(-10),
        b: Math.random(),
      };
      console.info({ apiResult });

      setIsLoading(false);
      setResult(apiResult);
    } catch (error) {
      console.error({ error });
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current
      .querySelector<HTMLInputElement>('.input input')
      ?.focus();
  }, []);

  return (
    <Style ref={containerRef}>
      <div className="input">
        <InputForm
          title="your input"
          value={inputValue}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
        />
      </div>

      {isLoading && <LoadingIcon />}

      <div className="error">{isError && JSON.stringify(isError, null, 2)}</div>

      {!isLoading && !isError && result && (
        <div className="result">
          <div className="result-header">result header</div>
          <div className="result-body">result body</div>
        </div>
      )}

      <div className="history">
        {history.map(({ a, b, key }) => (
          <div key={key}>{[a, b].join(' / ')}</div>
        ))}
      </div>
    </Style>
  );
}

export default Main;
