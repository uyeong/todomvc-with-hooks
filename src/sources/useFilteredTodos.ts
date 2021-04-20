import { useMemo } from "react";
import { State } from './useTodos';

function useFilteredTodos({ todos }: State, mode: 'all' | 'active' | 'completed') {
  return useMemo(() => {
    switch (mode) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
    }
  }, [todos, mode]);
}

export default useFilteredTodos;
