import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { auth } from '../../../firebase.config'
import {
    createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendEmailVerification,
    signInWithEmailAndPassword, signOut, updatePassword, updateProfile
} from 'firebase/auth';
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(user)

    // Create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Catch user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, []);

    // Update user profile
    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    }

    // Sign out user
    const logOut = () => {
        setLoading(false);
        return signOut(auth);
    }

    // Email verification 
    const emailVerified = () => {
        return sendEmailVerification(auth.currentUser);
    }

    // Set a user's password
    const setNewPassword = (newPassword) => {
        return updatePassword(user, newPassword);
    }

    // Delete a user
    const deleteUserAccount = () =>{
        return deleteUser(user);
    }


    const authInfo = {
        createUser,
        signInUser,
        user,
        loading,
        updateUserProfile,
        logOut,
        emailVerified,
        setNewPassword,
        deleteUserAccount
    }

    return (
        <AuthContext value={authInfo} >
            {children}
        </AuthContext>
    );
};

export default AuthProvider;