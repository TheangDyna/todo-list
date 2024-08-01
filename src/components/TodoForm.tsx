import React, { useState } from "react";

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 p-2 border border-gray-300 rounded-l"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-r">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
