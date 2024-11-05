/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const EditForm = ({ todos, setTodos, todo, setEdit, inputRef }) => {
  const [formData, setFormData] = useState(todo.desc);

  const initialDesc = todo.desc; // Store the original description when edit mode starts

  // Ensure that the input field is properly initialized when the component re-renders
  useEffect(() => {
    setFormData(todo.desc); // Reset to the latest todo description if it changes
  }, [todo.desc]);

  // Handle changes in the input field
  const handleChange = (e) => {
    setFormData(e.target.value); // Update form data with user input
  };

  // Handle form submission when user clicks 'Save'
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Update the todo with the new description
    const updatedTodos = todos.map((el) =>
      el.id === todo.id ? { ...el, desc: formData } : el
    );

    // Update the state with the modified todos array
    setTodos(updatedTodos);

    // Exit the edit mode after saving
    setEdit(false);
  };

  // Handle 'Cancel' button click, which will discard changes
  const handleCancel = () => {
    setFormData(initialDesc); // Reset the form to the original description (cancel changes)
    setEdit(false); // Exit the edit mode without saving changes
  };

  return (
    <form onSubmit={handleSubmit} id="editForm">
      {/* Input field showing the current description */}
      <input
        onChange={handleChange}
        type="text"
        value={formData} // Bind the input value to formData
        placeholder="Edit todo"
        name="todoDesc"
        id="todoDesc"
        ref={inputRef} // Attach the ref to the input field
      />
      <div>
        {/* Save button */}
        <input type="submit" value="Save" id="saveButton" />
        {/* Exit button to cancel without saving */}
        <button type="button" onClick={handleCancel} id="exitButton">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
