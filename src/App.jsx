import React, { Fragment, useState, useRef, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

const KEY = 'todoApp.todos';

export function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: 'Tarea 1', completed: false }
    ]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos])
    
    // const randomId = () => '#' + Math.floor((Math.random() * 100) + 1);

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }
    
    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4() /*randomId()*/, task, completed: false }]
        });

        todoTaskRef.current.value = null;
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }
    
    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={ toggleTodo }/>
            <input ref={ todoTaskRef } type="text" placeholder="Nueva Tarea" />
            <button className="btn" id="agregar" onClick={ handleTodoAdd }>Agregar✔️</button>
            <button className="btn" id="borrar" onClick={ handleClearAll }>Borrar❌</button>
            <div id="tareasdiv">Te quedan {todos.filter((todo) => !todo.completed).length} tarea(s) por terminar</div>
        </Fragment>
    );
}
