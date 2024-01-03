import React, { useState } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function addTodo(e) {
    e.preventDefault();
    setTitle('')
    setDescription('')
  }

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function descriptionChangeHandler(e) {
    setDescription(e.target.value);
  }
  return (
    <div
      style={{
        width: "50%",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <input
        type="text"
        name="title"
        id="title"
        style={{ width: "50%", marginTop: "1rem", height: "2rem" }}
        placeholder="Title"
        onChange={titleChangeHandler}
        value={title}
      />
      <textarea
        name="description"
        id="description"
        style={{ width: "50%", height: "4rem" }}
        placeholder="Description"
        value={description}
        onChange={descriptionChangeHandler}
      ></textarea>

      <button
        style={{ width: "50.5%", marginBottom: "1rem", height: "2rem" }}
        onClick={addTodo}
      >
        ADD TODO
      </button>
    </div>
  );
};

export default CreateTodo;
