import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GoogleLoginPage from "./components/GoogleLoginPage";
import TopPage from "./components/TopPage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // アンマウント時のクリーンアップ
  }, []);

  return (
    <div className="App">
      {currentUser ? <TopPage /> : <GoogleLoginPage />}
    </div>
  );
}

export default App;
