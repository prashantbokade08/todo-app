import React from "react";
import { updateTodo, deleteTodo } from "../services/api";

function TodoItem({ todo, onUpdate }) {
  const toggle = async () => {
    await updateTodo(todo._id, { completed: !todo.completed });
    onUpdate();
  };

  const remove = async () => {
    await deleteTodo(todo._id);
    onUpdate();
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
      {todo.task}
      <div className="todo-buttons">
        <button className="complete-btn" onClick={toggle}>
          ✔
        </button>
        <button className="delete-btn" onClick={remove}>
          🗑
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
