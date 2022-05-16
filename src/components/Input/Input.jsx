import React, { useState, useEffect } from 'react';

import useTodoStore from '../../Store/TodoStore.js';
import useThemeStore from '../../Store/ThemeStore.js';

const Input = () => {
  const [inputValue, setInputValue] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const theme = useThemeStore((state) => state.theme);

  const submitTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    if (inputValue !== null) {
      addTodo({ text: inputValue });
      setInputValue('');
    }
  };

  return (
    <div className={`input  ${theme === 'light' && 'input-light'}`}>
      <form
        onSubmit={submitTodo}
        className={`input__form flex ${
          theme === 'light' && 'input__form-light'
        }`}
      >
        <div
          className={`${theme === 'dark' && 'input__button'} ${
            theme === 'light' && 'input__button-light'
          }`}
        >
          <button type="submit" className="input__button-btn"></button>
        </div>
        <div
          className={`${theme === 'dark' && 'input__input'} ${
            theme === 'light' && 'input__input-light'
          }`}
        >
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Create a new Task..."
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
