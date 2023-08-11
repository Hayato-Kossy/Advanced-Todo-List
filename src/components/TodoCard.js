// Todo.js
import React from 'react';

const TodoCard = ({ todo, onDelete }) => {
    return (
        <div style={styles.card}>
            <h3>{todo.title}</h3>
            <div>Category : {todo.category}</div>
            <div>Priority : {todo.priority}</div>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
}

const styles = {
    card: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '200px', // カードの幅を固定
        height: '150px', // カードの高さも固定
        margin: '20px'
    }
}

export default TodoCard;
