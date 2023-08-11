import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GitHub, Twitter, Instagram, Google} from '@mui/icons-material';
import { Stack } from '@mui/material';

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
      <Box
        height='80vh'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box 
          sx={{ 
            typography: 'h1', 
            fontWeight: 400,
            color: '#ed5858',
            marginBottom: 4,
          }}
        >
          Advanced Todo List
        </Box>

        <Box maxWidth='sm' sx={{ marginTop: 5 }}>
          <Stack direction="row" spacing={3}>
            <Button 
              onClick={handleLogin} 
              variant='contained' 
              color='primary'
              size='large'
              sx={{ textTransform: 'none' }}
            >
              <Google />
              Login
            </Button>
            <Button 
              onClick={handleLogin} 
              variant='contained' 
              color='primary'
              size='large'
              sx={{ textTransform: 'none' }}
            >
              <Twitter />
              Twitter
            </Button>
            <Button 
              onClick={handleLogin} 
              variant='contained' 
              color='primary'
              size='large'
              sx={{ textTransform: 'none' }}
            >
              <GitHub />
              GitHub
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default GoogleLoginPage;
