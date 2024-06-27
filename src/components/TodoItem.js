import React from "react";

function TodoItem({ todo, index, toggleComplete, deleteTodo }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(index)}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}>
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(index)}>Delete</button>
    </li>
  );
}

export default TodoItem;
