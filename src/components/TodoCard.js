// Todo.js
import React from 'react';

const TodoCard = ({ todo, onDelete }) => {
    return (
        <div style={styles.card}>
            <h3>{todo.title}</h3>
            <div style={styles.element}>Category : {todo.category}</div>
            <div style={styles.element}>Priority : {todo.priority}</div>
            <button style={styles.button} onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
}

const styles = {
    card: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '200px',
        height: '150px',
        margin: '20px'
    },
    button: {
        backgroundColor: "#ff0000",
        color: "white",
        border: "none",
        padding: '5px',
        fontSize: "large",
        cursor: "pointer",
        borderRadius: '3px',
        transition: "background-color 0.2s",
    },
    element: {
        marginBottom: '10px',
    }
}

export default TodoCard;
