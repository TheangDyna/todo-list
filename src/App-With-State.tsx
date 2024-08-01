import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      text: "display library message (typescript)",
      completed: true,
    },
    {
      id: "2",
      text: "singup form (react)",
      completed: true,
    },
    {
      id: "3",
      text: "build to-do list app (react)",
      completed: false,
    },
  ]);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now().toString(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: text } : todo))
    );
  };

  return (
    <div className="p-4">
      <div className="max-w-[500px] mx-auto">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </div>
    </div>
  );
};

export default App;
