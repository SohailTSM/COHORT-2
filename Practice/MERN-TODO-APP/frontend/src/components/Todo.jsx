import React from "react";

const Todo = (props) => {
  return <div>
    <h3>{props.title}</h3>
    <h5>{props.description}</h5>
  </div>;
};

export default Todo;
