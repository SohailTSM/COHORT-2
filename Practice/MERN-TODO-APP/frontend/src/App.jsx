import { useState } from "react";
import Todos from "./components/Todos";
import CreateTodo from './components/CreateTodo'

function App() {
  return <>
  <CreateTodo></CreateTodo>
  <Todos></Todos></>;
}

export default App;
