import { useState } from "react";

const EditForm = ({ todos, setTodos, todo, setEdit }) => {
  const [formData, setFormData] = useState("");

  function handleChange(e) {
    setFormData(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let newArr = todos.map((el) => {
      if (el.id == todo.id) {
        return {
          ...todo,
          desc: formData,
        };
      } else {
        return el;
      }
    });
    setTodos(newArr);
    setEdit((e) => !e);
  }
  return (
    <>
      <form onSubmit={handleSubmit} id="editForm">
        <input onChange={handleChange} type="text" />
        <input type="submit" />{" "}
        <button onClick={() => setEdit((e) => !e)}>Exit</button>
      </form>
    </>
  );
};

export default EditForm;
