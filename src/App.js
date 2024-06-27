import React from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./style.css";
import backgroundImage from "./assets/pp.JPG";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(() => localStorage.getItem("currentUser"));
  useEffect(() => {
    localStorage.setItem("currentUser", user);
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route
          path="/todo"
          element={user ? <TodoApp user={user} /> : <Navigate to="/signin" />}
        />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

function TodoApp({ user }) {
  const [todo, setTodo] = useState(() => {
    const storedtodos = localStorage.getItem(`todoList_${user}`);
    return storedtodos ? JSON.parse(storedtodos) : [user];
  });

  useEffect(() => {
    console.log("Updating local storage with todos:", JSON.stringify(todo));
    localStorage.setItem("todoList_${user}", JSON.stringify(todo));
  }, [todo, user]);
  // First we load the previous todo list
  // []== this dependency only runs once at the start
  // useEffect(() => {
  //   const storedtodos = localStorage.getItem("todoList");
  //   if (storedtodos) {
  //     setTodo(JSON.parse(storedtodos));
  //   }
  // }, []);
  // Second we use it to save the todos on state change
  //  the dependency every time todo changes this code executes
  // useEffect(() => {
  //   localStorage.setItem("todoList", JSON.stringify(todo));
  // }, [todo]);

  const addTodo = (text) => {
    const newTodos = [...todo, { text, completed: false }];
    setTodo(newTodos);
  };

  const toggleComplete = (index) => {
    console.log("Toggling complete for index:", index); // Debugging line
    const newTodos = [...todo];
    if (index < 0 || index >= newTodos.length) {
      console.error("Index out of bounds");
      return;
    }
    console.log("Before toggling:", newTodos[index]); // Debugging line
    newTodos[index].completed = !newTodos[index].completed;
    console.log("After toggling:", newTodos[index]); // Debugging line
    setTodo(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todo];
    if (index < 0 || index >= newTodos.length) {
      console.error("Index out of bounds");
      return;
    }
    newTodos.splice(index, 1); //deletes 1 element from newTodos array starting from index
    setTodo(newTodos);
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todo={todo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
