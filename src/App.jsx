import { useState } from "react";
import Todo from "./components/Todo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    desc: "",
    complete: false,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.desc) {
      // Generate a new ID for the new todo item
      const newId =
        todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

      const newTodo = { ...formData, id: newId }; // New todo object with generated id
      setTodos([...todos, newTodo]);

      // Reset formData after adding the todo
      setFormData({
        id: null,
        desc: "",
        complete: false,
      });
    }
  }

  const todoList = todos.length
    ? todos.map((el) => {
        return (
          <Todo
            key={el.id}
            id={el.id}
            todo={el}
            setTodos={setTodos}
            todos={todos}
          />
        );
      })
    : null;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          id="textIn"
          type="text"
          name="desc"
          value={formData.desc}
          placeholder="What do you have to do?"
        />
        <br />
        <input type="submit" value="Add ToDo" />
      </form>
      <ul>
        <p>What do you need to do?</p>
        {todoList}
      </ul>
    </>
  );
}

export default App;
