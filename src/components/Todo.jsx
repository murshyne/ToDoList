/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import EditForm from "../components/EditForm";

const Todo = ({ id, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef(null);

  // Toggle menu visibility
  const toggleMenu = (e) => {
    // Prevent click from propagating to other elements
    e.stopPropagation();
    setMenuOpen((prevState) => !prevState);
  };

  // Toggle the completion status

  // Delete the todo item
  const handleDelete = () => {
    const updatedTodos = todos.filter((el) => el.id !== id);
    setTodos(updatedTodos);
  };

  // Set the todo item in edit mode and focus on the input
  const handleEdit = () => {
    // Trigger edit mode
    setEdit(true);
    // Close the menu when editing
    setMenuOpen(false);
  };

  // Mark the todo item as completed
  const handleComplete = () => {
    const updatedTodos = todos.map((el) =>
      el.id === id ? { ...el, complete: true } : el
    );
    setTodos(updatedTodos);
    setMenuOpen(false); // Close the menu after marking as complete
  };

  // Close the menu if you click anywhere else on the item
  const handleClickOutside = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <li
      key={id}
      className={`todo-item ${todo.complete ? "completed" : ""}`}
      // Close the menu if clicking outside the kebab menu
      onClick={handleClickOutside}
    >
      {!edit ? (
        <>
          <div className={`todo-text ${todo.complete ? "strikethrough" : ""}`}>
            {todo.desc}
          </div>
          <div className="kebab-menu" onClick={toggleMenu}>
            &#x22EE; {/* This is the "⋯" symbol */}
            {menuOpen && (
              <div className="menu-options">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleComplete} disabled={todo.complete}>
                  Mark as Completed
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <EditForm
          todos={todos}
          setTodos={setTodos}
          todo={todo}
          setEdit={setEdit}
          inputRef={inputRef}
        />
      )}
    </li>
  );
};

export default Todo;
