// todoService.js
import db from './firebaseConfig';

export const addTodo = async (todo) => {
  const todosCollection = db.collection('todos');
  return todosCollection.add(todo);
};

export const getTodos = async () => {
  const todosCollection = db.collection('todos');
  const snapshot = await todosCollection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};