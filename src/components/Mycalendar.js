import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css' // カレンダーのcss
import app from '../firebaseConfig';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);

const MyCalendar = ({ setDate, setTodos }) => {
  const [value, setValue] = useState(new Date());
  const user = getAuth().currentUser

  const formatDateToLocalISOString = (date) => {
    return new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * 9)).toISOString().split('T')[0];
  };

  const handleDateChange = async (selectedDate) => {
    const localDate = new Date(selectedDate.toLocaleDateString());
    setValue(localDate);
    setDate(localDate);
    const formattedDate = formatDateToLocalISOString(localDate);
    // Firebaseからデータを取得
    const todosQuery = query(collection(db, 'users', user.uid, 'todos'), where("date", "==", formattedDate));
    const snapshot = await getDocs(todosQuery);
    const fetchedTodos = snapshot.docs.map(doc => doc.data());
    setTodos(fetchedTodos);
  };

  return (
    <div>
      <Calendar
        value={value}
        onClickDay={handleDateChange}
      />
    </div>
  )
}

export default MyCalendar;
