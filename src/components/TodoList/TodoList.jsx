import React, { useEffect, useState } from 'react';
import useTodoStore from '../../Store/TodoStore.js';
import useThemeStore from '../../Store/ThemeStore.js';

// DND

import { Item } from '../';

const TodoList = () => {
  const [amountTodo, setAmountTodo] = useState(0);
  const [activeState, setActiveState] = useState('all');
  const [filteredTodo, setFilteredTodo] = useState([]);

  const removeTodo = useTodoStore((state) => state.removeTodo);
  const todos = useTodoStore((state) => state.todos);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    setAmountTodo(todos.length);
  }, [todos]);

  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      if (activeState === 'all') {
        console.log(todo);
        return true;
      }
      if (activeState === 'active') {
        return !todo.Completed;
      }
      if (activeState === 'completed') {
        return todo.Completed;
      }
    });
    setFilteredTodo(filteredTodos);
    console.log(filteredTodos);
  }, [activeState, todos]);

  const removeCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.Completed);
    todos.map((todo) => {
      if (todo.Completed) {
        removeTodo(todo.id);
      }
    });
    setFilteredTodo(newTodos);
  };

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...filteredTodo];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setFilteredTodo(updatedList);
  };

  return (
    <div className="todolist">
      <div className="todolist__container">
        {filteredTodo.map((todo, key) => (
          <Item
            key={key}
            text={todo.text}
            isCompleted={todo.Completed}
            id={todo.id}
          />
        ))}
      </div>
      <div
        className={`todolist__bottom flex items-center justify-space-between bg-d-neutral-500 ${
          theme === 'light' && 'todo__list-light'
        }`}
      >
        <div className="todolist__bottom__left text-d-neutral-300 fs-700">
          {amountTodo} items left
        </div>
        <div className="todolist__bottom__mid flex fs-700">
          <div
            className={`todolist__bottom__mid-selection fw-bold text-d-neutral-300 ${
              activeState === 'all' && 'todolist-active'
            } ${theme === 'light' && 'todolist__state-light'}`}
            onClick={() => setActiveState('all')}
          >
            All
          </div>
          <div
            className={`todolist__bottom__mid-selection fw-bold text-d-neutral-300 ${
              activeState === 'active' && 'todolist-active'
            } ${theme === 'light' && 'todolist__state-light '}`}
            onClick={() => setActiveState('active')}
          >
            Active
          </div>
          <div
            className={`todolist__bottom__mid-selection fw-bold  text-d-neutral-300 ${
              activeState === 'completed' && 'todolist-active'
            } ${theme === 'light' && 'todolist__state-light'}`}
            onClick={() => setActiveState('completed')}
          >
            Completed
          </div>
        </div>

        <div
          className={`todolist__bottom__right text-d-neutral-300 fs-700 ${
            theme === 'light' && 'todolist__completed-light'
          }`}
          onClick={() => removeCompleted()}
        >
          Clear Completed
        </div>
      </div>
    </div>
  );
};

export default TodoList;
