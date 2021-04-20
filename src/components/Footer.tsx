import React, { memo } from 'react';
import cc from 'classcat';
import { Mode } from '../types';

interface Props {
  currentMode: Mode,
  remaining: number;
  showClearButton?: boolean;
  onClearCompleted?: () => void;
}

const Footer = ({ currentMode, remaining, showClearButton, onClearCompleted }: Props) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{remaining}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a className={cc({ selected: currentMode === 'all' })} href="#/">
            All
          </a>
        </li>
        <li>
          <a className={cc({ selected: currentMode === 'active' })} href="#/active">
            Active
          </a>
        </li>
        <li>
          <a className={cc({ selected: currentMode === 'completed' })} href="#/completed">
            Completed
          </a>
        </li>
      </ul>
      {showClearButton && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default memo(Footer);
