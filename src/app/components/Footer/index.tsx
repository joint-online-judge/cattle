import React from 'react';
import classNames from 'classnames';
import {
  TodoFilter,
  TODO_FILTER_TITLES,
  TODO_FILTER_TYPES,
} from 'app/constants';
import style from './style.css';

export interface FooterProps {
  filter: TodoFilter;
  activeCount: number;
  completedCount: number;
  onChangeFilter: (filter: TodoFilter) => any;
  onClearCompleted: () => any;
}

export interface FooterState {
  /* empty */
}

export class Footer extends React.Component<FooterProps, FooterState> {
  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={style.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: TodoFilter) {
    const title = TODO_FILTER_TITLES[filter];
    const { filter: selectedFilter, onChangeFilter } = this.props;
    const className = classNames({
      [style.selected]: filter === selectedFilter,
    });

    return (
      <a
        className={className}
        style={{ cursor: 'pointer' }}
        onClick={() => onChangeFilter(filter)}
      >
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button className={style.clearCompleted} onClick={onClearCompleted} />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <footer className={style.normal}>
        {this.renderTodoCount()}
        <ul className={style.filters}>
          {TODO_FILTER_TYPES.map((filter) => (
            <li key={filter}>{this.renderFilterLink(filter)}</li>
          ))}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}

export default Footer;
