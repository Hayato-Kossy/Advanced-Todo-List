import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
    return (
        <nav className="navbar">
            <h1>Advanced Todo List</h1>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;