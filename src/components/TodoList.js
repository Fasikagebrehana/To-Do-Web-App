import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todo, toggleComplete, deleteTodo }) {
  return (
    <ul>
      {todo.map((todoItem, index) => (
        <TodoItem
          key={index}
          todo={todoItem}
          index={index}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
