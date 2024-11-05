import { useState } from "react";
import EditForm from "../components/EditForm";

const Todo = ({ id, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState(false);

  function handleChange() {
    let newArr = todos.map((el) => {
      if (el.id == id) {
        return {
          ...todo,
          complete: !el.complete,
        };
      } else {
        return el;
      }
    });
    setTodos(newArr);
  }

  function handleDelete(e) {
    let copy = [...todos];
    copy.splice(todo.id - 1, 1);
    setTodos(copy);
  }

  return (
    <li key={id}>
      {!edit ? (
        <>
          {" "}
          {todo.desc} <br />
          <div className="label">
            {" "}
            <p>Complete?</p>
            <input
              onChange={handleChange}
              checked={todo.complete}
              type="checkbox"
            />{" "}
            <br />
            <button onClick={() => setEdit(!edit)} disabled={todo.complete}>
              Edit
            </button>
            <button onClick={handleDelete} disabled={!todo.complete}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <EditForm
          todos={todos}
          setTodos={setTodos}
          setEdit={setEdit}
          todo={todo}
        />
      )}
    </li>
  );
};

export default Todo;
