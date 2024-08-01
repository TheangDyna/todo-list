import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const BASE_URL = "http://localhost:9000";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/todos`);
      if (!res.ok) {
        throw new Error(`Failed to get todos`);
      }
      const data = await res.json();
      setTodos(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    const newTodo = { id: Date.now().toString(), text, completed: false };

    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        body: JSON.stringify(newTodo),
      });

      if (!res.ok) {
        throw new Error(`Failed to create todo`);
      }
      const data = await res.json();
      setTodos([...todos, data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to detele todo id ${id}`);
      }

      setTodos(todos.filter((todo) => todo.id !== id));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const editTodo = async (id: string, text: string) => {
    const updateItem = todos.find((item) => item.id === id);

    if (!updateItem) {
      throw new Error(`Failed to find todo id ${id}`);
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...updateItem, text }),
      });

      console.log(res);

      if (!res.ok) {
        throw new Error(`Failed to update todo id ${id}`);
      }

      const updatedData = await res.json();

      setTodos(todos.map((todo) => (todo.id === id ? updatedData : todo)));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const toggleComplete = async (id: string) => {
    // step1: find from state
    const updateItem = todos.find((item) => item.id === id);

    // step2: find from state
    if (!updateItem) {
      throw new Error(`Failed to find todo id ${id}`);
    }

    // step3: update to db
    try {
      setIsLoading(true);

      // step3.1: using put method with update value in body
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...updateItem,
          completed: !updateItem.completed,
        }),
      });

      // step3.2: verify res
      if (!res.ok) {
        throw new Error(`Failed to update todo id ${id}`);
      }

      // step3.3: format res to data
      const updatedData = await res.json();

      // step3.4: update local state
      setTodos(todos.map((todo) => (todo.id === id ? updatedData : todo)));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-[500px] mx-auto">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <TodoForm addTodo={addTodo} />
        {isLoading ? (
          <p>loading</p>
        ) : (
          <TodoList
            todos={todos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )}
      </div>
    </div>
  );
};

export default App;
