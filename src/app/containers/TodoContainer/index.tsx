import React from 'react';
// import style from './global.css';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router';
import { TodoList } from 'app/components/TodoList';
import { TodoModel } from 'app/models';
import { useTodoStore } from 'app/stores/TodoStore';
import { TODO_FILTER_LOCATION_HASH, TodoFilter } from 'app/constants';
import { Button, Spin } from 'antd';
import { useRequest } from 'ahooks';

export const TodoContainer = observer(() => {
  const todoStore = useTodoStore([
    new TodoModel('Use MobX'),
    new TodoModel('Use React'),
  ]);
  const location = useLocation();
  const [filter, setFilter] = React.useState(TodoFilter.ALL);
  const [count, setCount] = React.useState(0);

  const { loading, run } = useRequest(async () => {
    // const res = await DomainService.listUserDomainsApiV1DomainListGet();
    const res = '';
    console.log(res);
  }, { manual: true });

  // Note: useEffect with [] is similar to componentDidMount
  // React.useEffect(() => {
  //   run().then(res => {
  //     console.log(res);
  //   })
  // }, []);

  // location change callback
  React.useEffect(() => {
    const nextFilter = Object.keys(TODO_FILTER_LOCATION_HASH)
      .map((key) => Number(key) as TodoFilter)
      .find((item) => TODO_FILTER_LOCATION_HASH[item] === location.hash);
    setFilter(nextFilter ?? TodoFilter.ALL);
  }, [location.hash, setFilter]);

  const itemsToDisplay = filter === TodoFilter.ALL
    ? todoStore.todos
    : filter === TodoFilter.ACTIVE
      ? todoStore.activeTodos
      : todoStore.completedTodos;
  return (
    <div>
      <Spin />
      <Button type="primary" onClick={run} loading={loading}>
        useRequest
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setCount(count + 1);
        }}
        loading={loading}
      >
        No useRequest
      </Button>
      <pre>{count}</pre>
      <TodoList
        todos={itemsToDisplay}
        completeAll={todoStore.completeAll}
        deleteTodo={todoStore.deleteTodo}
        editTodo={todoStore.editTodo}
      />
    </div>
  );
});
