import { renderHook } from '@testing-library/react-hooks';
import useFilteredTodos from './useFilteredTodos';

test('mode로 all을 전달하면 모든 할 일 데이터를 반환한다.', () => {
  const todos = getInitialTodos();
  const { result } = renderHook(() => useFilteredTodos({ todos }, 'all'))
  expect(result.current.length).toEqual(3);
});

test('mode로 active를 전달하면 complted가 false인 할 일 데이터를 모두 반환한다.', () => {
  const todos = getInitialTodos();
  const { result } = renderHook(() => useFilteredTodos({ todos }, 'active'))
  expect(result.current.length).toEqual(1);
});

test('mode로 completed를 전달하면 complted가 true인 할 일 데이터를 모두 반환한다.', () => {
  const todos = getInitialTodos();
  const { result } = renderHook(() => useFilteredTodos({ todos }, 'completed'))
  expect(result.current.length).toEqual(2);
});

function getInitialTodos() {
  return [
    { id: 'a', title: '', completed: false },
    { id: 'b', title: '', completed: true },
    { id: 'c', title: '', completed: true },
  ];
}
