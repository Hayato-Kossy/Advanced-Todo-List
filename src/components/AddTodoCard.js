import React, {useState} from 'react';

const AddTodoCard = ({onAddTodo}) => {
    const [showModal, setShowModal] = useState(false);
    const [todoTitle, setTodoTitle] = useState('');
    const [category, setCategory] = useState('Work');
    const [priority, setPriority] = useState('High');
    const [hovered, setHovered] = useState(false);

const handleSubmit = () => {
    onAddTodo(todoTitle, category, priority);  // 3つの引数を渡すように変更
    setTodoTitle('');
    setShowModal(false);
};
    return (
        <div>
            <div 
                style={{...styles.card, ...(hovered ? styles.cardHovered : {})}}
                onClick={() => setShowModal(true)} 
                onMouseEnter={() => setHovered(true)} 
                onMouseLeave={() => setHovered(false)}
            >
                <h1>Add Todo</h1>
                <h1>+</h1>
            </div>

            {showModal && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>Add a new Todo</h2>
                        <div>
                        <input 
                            type="text" 
                            value={todoTitle} 
                            onChange={(e) => setTodoTitle(e.target.value)} 
                            placeholder="Todo title"
                            style={{ marginBottom: '10px', width: '80%', padding: '10px', fontSize: '16px' }} // スタイルの変更
                        />
                        </div>
                        <div style={{ marginTop: '20px' }}> 
                            <select value={priority} onChange={(e) => setPriority(e.target.value)} style= {{margin: '10px'}}>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginRight: '10px' }}>
                                <option value="Work">Work</option>
                                <option value="Home">Home</option>
                                <option value="Private">Private</option>
                            </select>
                        </div>
                        <button style={{ ...styles.modalButton, marginRight: '10px' }} onClick={handleSubmit}>Add</button>
                        <button style={styles.modalButton} onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
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
        width: '200px',
        height: '150px',
        margin: '20px',
        cursor: 'pointer', // カーソルをポインターに変更
        transition: 'box-shadow 0.3s ease', // 影のアニメーション効果
        cardHovered: {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // ホバー時の影
        },
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '80%', // モーダルの内容の幅を80%に設定
        maxWidth: '600px' // 最大幅を600pxに設定
    },
    modalButton: {
        backgroundColor: '#007BFF',
        color: '#FFFFFF',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        margin: '10px' // ボタンの周りに10pxのマージンを追加
    }
}


export default AddTodoCard;
