import create from 'zustand';
import { persist } from 'zustand/middleware';

const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (todo) =>
        set((prevState) => ({
          todos: [
            ...prevState.todos,
            { text: todo.text, Completed: false, id: Math.random() * 100 },
          ],
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, Completed: !todo.Completed };
            } else {
              return { ...todo };
            }
          }),
        })),
    }),

    {
      name: 'todo-storage', // unique name
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    },
  ),
);

export default useTodoStore;
