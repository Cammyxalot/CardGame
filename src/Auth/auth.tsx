import React, { useState, useRef } from 'react';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'



export const Auth = () => {

    const mailRegex: string = "/^(([^<>()[].,;:s@\"]+(.[^<>()[].,;:s@\"]+)*)|(\".+\"))@(([^<>()[].,;:s@\"]+.)+[^<>()[].,;:s@\"]{2,})$/i;";
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const user: User | null = auth.currentUser;
    const [email, SetEmail] = useState<string>("");
    const [authState, SetAuthState] = useState<string>("Your are not logged in");
    let emailBoolean: boolean = false;

    const checkMail = (email: string): boolean => {
        const validateEmail = email.match(mailRegex) ? true : false;
        return validateEmail
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetEmail(e.target.value);
        emailBoolean = checkMail(email);
    };

    onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
            SetAuthState("you are logged in !")
        } else {
            console.log("not logged")
        }
    });

    const signIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault
        const email = emailRef.current?.value || ""
        const password = passwordRef.current?.value || ""
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        }
        catch (err) {
            console.log(err);
        }
    };
    const logIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault
        const email = emailRef.current?.value || ""
        const password = passwordRef.current?.value || ""
        try {
            await signInWithEmailAndPassword(auth, email, password)
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
            <div>
                <span>{authState}</span>
            </div>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleEmailChange} ref={emailRef} type="email" id="email" name="email" autoComplete="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input ref={passwordRef} type="password" id="password" name="password" autoComplete="current-password" required />
                </div>
                <button onClick={signIn} disabled={emailBoolean} type="submit">Sign in</button>
                <button onClick={logIn} disabled={emailBoolean} type="submit">Log in</button>
            </form>
            <button onClick={logOut}>Log out</button>
        </>
    )
}