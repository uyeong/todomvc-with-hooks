import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Mode } from './types';
import { useEventCallback } from "./hooks";
import { useTodos, useFilteredTodos } from './sources';
import { Header, Footer, TodoItem } from './components';

function App() {
  const [mode, setMode] = useState<Mode>('all')
  const {
    todos,
    addTodo,
    setTitle,
    setCompletedAll,
    setCompleted,
    clearCompleted,
    isCompletedAll,
    remove,
  } = useTodos();
  const filteredTodos = useFilteredTodos({ todos }, mode);
  const handleChangeCompletedAll = useEventCallback(() => {
    setCompletedAll(!isCompletedAll);
  });
  const handleChangeMode = useEventCallback(() => {
    const hash = document.location.hash;
    const mode = (hash.replace(/#\//g, '') || 'all') as Mode;
    setMode(mode);
  });
  useLayoutEffect(() => {
    handleChangeMode();
  }, [handleChangeMode]);
  useEffect(() => {
    window.addEventListener('popstate', handleChangeMode);
    return () => {
      window.removeEventListener('popstate', handleChangeMode);
    };
  }, [handleChangeMode]);
  return (
    <>
      <section className="todoapp">
        <Header onCreate={addTodo} />
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={isCompletedAll}
            onChange={handleChangeCompletedAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {filteredTodos.map(({id, title, completed}) =>
              <TodoItem
                key={id}
                id={id}
                title={title}
                completed={completed}
                onChangeTitle={setTitle}
                onChangeCompleted={setCompleted}
                onRemove={remove}
              />
            )}
          </ul>
        </section>
        <Footer
          currentMode={mode}
          remaining={todos.filter(t => !t.completed).length}
          showClearButton={todos.filter(t => t.completed).length > 0}
          onClearCompleted={clearCompleted}
        />
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
        <p>Created by <a href="http://todomvc.com">UYEONG</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </>
  );
}

export default App;
