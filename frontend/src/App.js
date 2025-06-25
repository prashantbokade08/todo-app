import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./services/api";
import TodoItem from "./components/TodoItem";
import "./App.css"; // ⬅️ Add this line

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res);
  };

  const handleAdd = async () => {
    if (!task) return;
    await createTodo({ task });
    setTask("");
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>My ToDo App</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New task..."
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onUpdate={fetchTodos} />
        ))}
      </ul>
    </div>
  );
}

export default App;
