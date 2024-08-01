import React from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleComplete,
  deleteTodo,
  editTodo,
}) => {
  return (
    <ul className="list-none p-0">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
