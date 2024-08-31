import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [layout, setLayout] = useState(true);

  const changeHandle = (e) => setInput(e.target.value);
  const submitHandle = (e) => {
    localStorage.setItem("todos", JSON.stringify(todos));
    e.preventDefault();
    setInput("");
    setTodos([...todos, { id: Math.random(), title: input }]);
    setLayout(true);
  };
  const deleteHandle = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const editHandle = ({ id }) => {
    const newTodo = todos.filter((todo) => todo.id === id)[0];
    setTodos(todos.filter((todo) => todo.id !== id));
    setInput(newTodo.title);
    alert("Click on edit button to save todo.Else it will be deleted 😊😊");
    setLayout(false);
    localStorage.setItem("todos", JSON.stringify(todos));
  };


  useEffect(()=>{

    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  },[])
  return (
    <div className="container">
      <div className="app-wrapper">
        <h1>Todos list</h1>
        <form onSubmit={submitHandle}>
          <input
            type="text"
            placeholder="Add Todo..."
            value={input}
            onChange={changeHandle}
            required
            title="Add Todo"
          />
          {layout ? (
            <button className="btn-primary " title="Add" type="submit">
              Add
            </button>
          ) : (
            <button className="btn-primary" title="Edit the choosen Todo😊😊">
              Edit
            </button>
          )}
        </form>
        <div className="todo-div row">
          {" "}
          {todos.map((todo, id) => (
            <div key={id} className="d-flex my-4  col-md-4 ">
              <li>{todo.title}</li>
              <button
                className="bgdanger"
                title="Delete Todo"
                onClick={() => deleteHandle(todo, id)}
              >
                Delete
              </button>
              <button
                className="btn-primary"
                title="Edit Todo"
                onClick={() => editHandle(todo, id)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
