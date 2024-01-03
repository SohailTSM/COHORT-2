import React, { useEffect, useState } from 'react';
import Todo from './Todo';

const Todos = (props) => {
  return (
    <>
      {props.todos.map((todo) => (
        <Todo title={todo.title} description={todo.description}></Todo>
      ))}
    </>
  );
};

export default Todos;
