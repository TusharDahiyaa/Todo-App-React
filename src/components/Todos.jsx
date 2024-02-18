import React, { useState, useEffect } from "react";

const Todo = ({ todo, toggleComplete, deleteTodo }) => (
  <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-4 flex flex-col text-white">
    <div className="text-xl font-semibold mb-2">{todo.title}</div>
    <div className="text-gray-300 mb-4">{todo.description}</div>
    <div className="flex justify-between mt-auto">
      <button
        onClick={() => toggleComplete(todo.id)}
        className={`px-4 py-2 rounded-md mr-2 ${
          todo.completed
            ? "bg-green-500 text-white"
            : "bg-gray-600 text-gray-200"
        }`}
      >
        {todo.completed ? "Completed" : "Mark Complete"}
      </button>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Delete
      </button>
    </div>
  </div>
);

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!todoTitle || !todoDescription) {
      setError("Please enter both the title and description!");
      return;
    }
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      description: todoDescription,
      completed: false,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setTodoTitle("");
    setTodoDescription("");
    setError("");
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Todo List</h1>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Enter title.."
            value={todoTitle}
            className="w-full rounded-md py-2 px-3 bg-gray-800 text-gray-300"
            onChange={(e) => setTodoTitle(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="Enter description.."
            value={todoDescription}
            className="w-full rounded-md py-2 px-3 bg-gray-800 text-gray-300"
            onChange={(e) => setTodoDescription(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded py-2"
          onClick={addTodo}
        >
          Add Todo
        </button>
        <div className="flex justify-between items-center my-8">
          <p className="text-lg text-gray-300">Filter todos:</p>
          <div className="flex space-x-2">
            <button
              className={`rounded-lg px-4 py-2 ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-600 text-gray-200"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`rounded-lg px-4 py-2 ${
                filter === "completed"
                  ? "bg-green-600 text-white"
                  : "bg-gray-600 text-gray-200"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button
              className={`rounded-lg px-4 py-2 ${
                filter === "incomplete"
                  ? "bg-red-600 text-white"
                  : "bg-gray-600 text-gray-200"
              }`}
              onClick={() => setFilter("incomplete")}
            >
              Incomplete
            </button>
          </div>
        </div>
      </div>
      {filteredTodos && filteredTodos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5">
          {filteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-8">
          No todos yet. Start by adding one!
        </p>
      )}
    </div>
  );
};

export default Todos;
