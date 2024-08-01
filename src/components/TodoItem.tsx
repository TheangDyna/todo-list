import React, { useState } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewText(todo.text);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between mb-2 p-2 border border-gray-300 rounded">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="mr-2 p-1 border rounded flex flex-1"
        />
      ) : (
        <span
          onClick={() => toggleComplete(todo.id)}
          className={`cursor-pointer ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.text}
        </span>
      )}
      <div className="flex items-center">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="ml-2 p-1 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="ml-2 p-1 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="ml-2 p-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 p-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
