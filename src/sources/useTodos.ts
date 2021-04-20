import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

import { Todo, Storage } from '../types';
import { useEventCallback } from "../hooks";

interface State {
  todos: Todo[];
}

interface Result extends State {
  addTodo: (title: string) => void;
  setTitle: (id: string, title: string) => void;
  setCompletedAll: (completed: boolean) => void;
  setCompleted: (id: string, completed: boolean) => void;
  clearCompleted: () => void;
  isCompletedAll: boolean;
  remove: (id: string) => void;
}

interface Options {
  initialTodos?: Todo[];
  storage?: Storage;
  storageName?: string;
}

function useTodos(options?: Options): Result {
  const { initialTodos, storage, storageName = 'todos' } = options || {};
  const [state, setState] = useState<State>({ todos: initialTodos || [] });
  const addTodo = useEventCallback((title: string) => {
    if (title === '') {
      throw new Error('할 일을 입력해주세요.');
    }
    const newState = produce(state, draft => {
      draft.todos.push({ title, id: uuidv4(), completed: false });
    });
    setState(newState);
  });
  const setCompletedAll = useEventCallback((completed: boolean) => {
    const newState = produce(state, draft => {
      draft.todos.forEach(t => t.completed = completed);
    });
    setState(newState);
  });
  const setCompleted = useEventCallback((id: string, completed: boolean) => {
    const newState = produce(state, draft => {
      const target = draft.todos.find(t => t.id === id);
      if (target) {
        target.completed = completed;
      }
    });
    setState(newState)
  });
  const remove = useEventCallback((id: string) => {
    const newState = produce(state, draft => {
      draft.todos = draft.todos.filter(t => t.id !== id);
    });
    setState(newState);
  });
  const setTitle = useEventCallback((id: string, title: string) => {
    const newState = produce(state, draft => {
      const target = draft.todos.find(t => t.id === id);
      if (target) {
        target.title = title;
      }
    });
    setState(newState);
  });
  const clearCompleted = useEventCallback(() => {
    const newState = produce(state, draft => {
      draft.todos = draft.todos.filter(t => !t.completed);
    });
    setState(newState);
  });
  useLayoutEffect(() => {
    if (initialTodos) {
      return;
    }
    const loadedState = (storage || localStorage).getItem(storageName);
    if (loadedState !== null) {
      setState(JSON.parse(loadedState));
    }
  }, [initialTodos, storage, storageName]);
  useEffect(() => {
    (storage || localStorage).setItem(storageName, JSON.stringify(state));
  }, [storage, storageName, state]);
  return useMemo(() => ({
    addTodo,
    setCompletedAll,
    setCompleted: setCompleted,
    isCompletedAll: state.todos.filter(t => !t.completed).length === 0,
    remove: remove,
    setTitle: setTitle,
    clearCompleted,
    ...state,
  }), [
    state,
    addTodo,
    setTitle,
    setCompletedAll,
    setCompleted,
    clearCompleted,
    remove,
  ]);
}

export default useTodos;
export type { State, Result };
