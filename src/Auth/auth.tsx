import React, { useState } from 'react';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'

interface UserForm {
    email: string
    password: string
}

export const Auth = () => {

    const mailRegex: string = "/^(([^<>()[].,;:s@\"]+(.[^<>()[].,;:s@\"]+)*)|(\".+\"))@(([^<>()[].,;:s@\"]+.)+[^<>()[].,;:s@\"]{2,})$/i;";
    const [user, SetUser] = useState<UserForm>({ email: "", password: '' });
    let emailBoolean: boolean = false;

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetUser({ ...user, password: e.target.value });
        console.log(user.password)
    }

    const checkMail = (email: string): boolean => {
        const validateEmail = email.match(mailRegex) ? true : false;
        return validateEmail
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetUser({ ...user, email: e.target.value });
        console.log(user.email)

        emailBoolean = checkMail(user.email);
    }

    onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
            console.log(user)
        } else {
            console.log(user)
        }
    });

    const signIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault
        try {
            await createUserWithEmailAndPassword(auth, user.email, user.password)
        }
        catch (err) {
            console.log(err);
        }
    };
    const logIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault
        try {
            await signInWithEmailAndPassword(auth, user.email, user.password)
        }
        catch (err) {
            console.log(err);
        }
    };
    const logOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault
        try {
            await signOut(auth)
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleEmailChange} type="email" id="email" name="email" autoComplete="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input onChange={handlePasswordChange} type="password" id="password" name="password" autoComplete="current-password" required />
                </div>
                <button onClick={signIn} disabled={emailBoolean} type="submit">Sign in</button>
                <button onClick={logIn} disabled={emailBoolean} type="submit">Log in</button>
            </form>
            <button onClick={logOut}>Log out</button>
        </>
    )
}