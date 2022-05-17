import { textFieldClasses } from '@mui/material';
import React, { useEffect } from 'react';

import useTodoStore from '../../Store/TodoStore';
import useThemeStore from '../../Store/ThemeStore';

import { cross, check } from '../../constants/images';
import { AnimatePresence, motion } from 'framer-motion';

const Item = ({ text, isCompleted, id }) => {
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  const theme = useThemeStore((state) => state.theme);

  const deleteTodo = () => {
    removeTodo(id);
  };

  useEffect(() => {
    console.log(isCompleted);
  }, [isCompleted]);

  const changeTodo = () => {
    toggleTodo(id);
  };

  return (
    <AnimatePresence>
      <motion.li className={`item ${theme === 'light' && 'item-light'}`}>
        <div className="item__left">
          {isCompleted ? (
            <button
              className={`${
                theme === 'dark' && 'item__completed-btn completed-button'
              } ${
                theme === 'light' && 'completed-button item__button-light '
              }  `}
              onClick={() => changeTodo()}
            >
              <img src={check} alt="tick" width="8.7px" />
            </button>
          ) : (
            <button
              className={`${theme === 'dark' && 'item__completed-btn'} ${
                theme === 'light' && 'item__button-light'
              }  `}
              onClick={() => changeTodo()}
            ></button>
          )}
        </div>
        {isCompleted ? (
          <div
            className={`item__text  item__text-strike-light  text-d-neutral-100 fw-regular ${
              theme === 'light' && 'item__text-strike-light'
            } ${theme === 'dark' && 'completed-text'}`}
          >
            {text}
          </div>
        ) : (
          <div
            className={`item__text text-d-neutral-100 fw-regular ${
              theme === 'light' && 'item__text-light'
            }`}
          >
            {text}
          </div>
        )}
        <div className="item__right" onClick={() => deleteTodo()}>
          <img src={cross} alt="remove item cross" />
        </div>
      </motion.li>
    </AnimatePresence>
  );
};

export default Item;
