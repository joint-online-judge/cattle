import * as React from 'react';
// import * as style from './style.css';
import { observer } from 'mobx-react';
import { useLocation, useHistory } from 'react-router';
import { Header } from 'app/components/Header';
import { Footer } from 'app/components/Footer';
import { TodoList } from 'app/components/TodoList';
import { TodoModel } from 'app/models';
import { useTodoStore } from 'app/stores/TodoStore';
import { TODO_FILTER_LOCATION_HASH, TodoFilter } from 'app/constants';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export const TodoContainer = observer(() => {
  const todoStore = useTodoStore([
    new TodoModel('Use MobX'),
    new TodoModel('Use React'),
  ]);
  const history = useHistory();
  const location = useLocation();
  const [filter, setFilter] = React.useState(TodoFilter.ALL);
  const classes = useStyles();

  // location change callback
  React.useEffect(() => {
    const nextFilter = Object.keys(TODO_FILTER_LOCATION_HASH)
      .map((key) => Number(key) as TodoFilter)
      .find((item) => TODO_FILTER_LOCATION_HASH[item] === location.hash);
    setFilter(nextFilter ?? TodoFilter.ALL);
  }, [location.hash, setFilter]);

  // filter change callback
  const handleFilterChange = React.useCallback(
    (nextFilter: TodoFilter) => {
      setFilter(nextFilter);
      const nextHash = TODO_FILTER_LOCATION_HASH[nextFilter];
      history.replace(nextHash);
    },
    [history, setFilter]
  );

  const itemsToDisplay =
    filter === TodoFilter.ALL
      ? todoStore.todos
      : filter === TodoFilter.ACTIVE
      ? todoStore.activeTodos
      : todoStore.completedTodos;

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.root}>
        你好，世界
      </Button>
      <Header addTodo={todoStore.addTodo} />
      <TodoList
        todos={itemsToDisplay}
        completeAll={todoStore.completeAll}
        deleteTodo={todoStore.deleteTodo}
        editTodo={todoStore.editTodo}
      />
      <Footer
        filter={filter}
        activeCount={todoStore.activeTodos.length}
        completedCount={todoStore.completedTodos.length}
        onClearCompleted={todoStore.clearCompleted}
        onChangeFilter={handleFilterChange}
      />
    </div>
  );
});
