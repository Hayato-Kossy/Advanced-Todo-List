import React, { useState, useEffect } from 'react'; 
import MyCalendar from './Mycalendar';
import '../navbar.css'
import 'react-calendar/dist/Calendar.css';
import '../calendarStyles.css'

import TodoCard from './TodoCard';
import AddTodoCard from './AddTodoCard';
import Navbar from './Navbar';

import app from '../firebaseConfig';
import { getFirestore ,doc, setDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
const db = getFirestore(app); 

const TopPage = () => {
    const [date, setDate] = useState((new Date()))
    const [todos, setTodos] = useState([]);
    const user = getAuth().currentUser

    function formatDateToLocalISOString(date) {
        const localISOString = new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * 9)).toISOString().split('T')[0];
        // console.log(new Date())
        return localISOString;
    }
    
    const handleAddTodo = async (title, category, priority) => {
        const newTodo = {
            id: Date.now(),
            title: title,
            category: category,
            priority: priority,
            date: date.toISOString().split('T')[0]
        };
        
        // ユーザーのサブコレクションにデータを追加
        const userRef = doc(db, "users", user.uid);
        await setDoc(doc(userRef, 'todos', `${newTodo.id}`), newTodo);
    
        setTodos([...todos, newTodo]);
    };
    
    const handleDeleteTodo = async (id) => {
        // ユーザーのサブコレクションからデータを削除
        const userRef = doc(db, "users", user.uid);
        await deleteDoc(doc(userRef, 'todos', `${id}`));
        
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    // 日付に関連するToDoをフィルタリング
    const filteredTodos = todos.filter(todo => {
        const todoDate = new Date(todo.date).toISOString().split('T')[0];
        const selectedDateStr = date.toISOString().split('T')[0];
        return todoDate === selectedDateStr;
    });   
    useEffect(() => {
        const fetchTodosForCurrentDate = async () => {
                    // YYYY-MM-DDの形式に変換
        const formattedDate = formatDateToLocalISOString(date);
    
        // Firebaseからデータを取得
        const todosQuery = query(collection(db, 'users', user.uid, 'todos'), where("date", "==", formattedDate));
        const snapshot = await getDocs(todosQuery);
    
        const fetchedTodos = snapshot.docs.map(document => ({
            ...document.data(),
            id: document.id // IDも追加する場合
        }));
        setTodos(fetchedTodos);
        };    
    
        fetchTodosForCurrentDate();
    }, [date, user?.uid]);
    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <Navbar>
                </Navbar>
            </div>
            <div style={{ display: 'inline-block' }}>
            <MyCalendar setDate={setDate} setTodos={setTodos} /> 
            </div>
                <h2>Tasks for {date.toISOString().split('T')[0]}</h2>
                <div style={{ width: '800px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                    {filteredTodos.map(todo => (
                        <TodoCard key={todo.id} todo={todo} onDelete={handleDeleteTodo}/>
                    ))}
                    <AddTodoCard onAddTodo={handleAddTodo}></AddTodoCard>
                </div>
            {/* ここにフィルタリングUIを追加 */}
        </div>
    );
};

export default TopPage