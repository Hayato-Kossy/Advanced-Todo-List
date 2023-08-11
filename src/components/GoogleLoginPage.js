// LoginPage.js
// GoogleLoginPage.js
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";

function GoogleLoginPage() {
  const addUserToFirestore = async (user) => {
    const db = getFirestore();
    try {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email
            // 他の必要な情報をここに追加できます
        });
    } catch (error) {
        console.error("Error adding user:", error);
    }
};
  const handleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // ユーザー情報をFirestoreに保存
      await addUserToFirestore(user);
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  return (
    <div>
      <h2>Google Login</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default GoogleLoginPage;
