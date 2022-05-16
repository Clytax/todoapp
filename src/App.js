import { useEffect } from 'react';
import useTodoStore from './Store/TodoStore';

import useThemeStore from './Store/ThemeStore';

import { Header, Input, TodoList } from './components';
function App() {
  const todos = useTodoStore((state) => state.todos);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <div className={`app bg-d-neutral-600 ${theme === 'light' && 'app-light'}`}>
      <div className="app__bg"></div>
      <div className="main-container">
        <Header />
        <Input />
        <TodoList />
        <p className={`drag-drop ${theme === 'light' && 'drag-light'}`}>
          Drag and drop to reorder List
        </p>
      </div>
    </div>
  );
}

export default App;
