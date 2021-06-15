import React from 'react';
import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";

const Login = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyA7jYzknJHqcqhhGlEbwqmsBEtYkolybjQ",
        authDomain: "login-auth-apps.firebaseapp.com",
        projectId: "login-auth-apps",
        storageBucket: "login-auth-apps.appspot.com",
        messagingSenderId: "827447025017",
        appId: "1:827447025017:web:c20560ceefba4be4dee3a8",
        measurementId: "G-158ZP5SVPT"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const [user, setUser] = useState({
        email: '',
        password: '',
        error: '',
    })

    const history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (e) => {
        let isFieldValid
        if (e.target.name === 'email') {
            // isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
            isFieldValid = e.target.value
        }
        if (e.target.name === 'password') {
            // isFieldValid = /^(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[0-9]){1})\S{6,20}$/.test(
            //     e.target.value
            // )
            isFieldValid = e.target.value
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value
            setUser(newUserInfo)
        }
    }


    const handleSubmit = (e) => {
        if (user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userData) => {
                    console.log(userData)
                    const newUser = { ...user };
                    newUser.error = '';
                    setUser(newUser);
                    localStorage.setItem('user', JSON.stringify(newUser))
                    history.replace(from)

                })
                .catch((errorMessage) => {
                    const newError = { ...user }
                    newError.error = errorMessage.message;
                    setUser(newError)
                });

        }
        e.preventDefault()
    }
    return (
        <div className="mb-5">
            <div className='text-center'>
                <form onSubmit={handleSubmit}>
                    <div className='form-field p-4'>
                        <p>
                            <input
                                className='mb-2'
                                onBlur={handleBlur}
                                type='email'
                                name='email'
                                placeholder='Username or Email'
                                required
                            />
                        </p>
                        <p>
                            <input
                                className='mb-2'
                                onBlur={handleBlur}
                                type='password'
                                name='password'
                                placeholder='Password'
                                required
                            />
                        </p>

                        <p className='text-left mb-2 px-3'>
                            <input type='checkbox' name='checkbox' />
                            <span className='ml-3'>Remember Me</span>
                            <span className='float-right'>
                                <Link to="">Forgot Password</Link>
                            </span>
                        </p>
                        <input
                            className='mt-3'
                            type='submit'
                            value={'Login'}
                        />
                    </div>
                </form>
                <p>{user.error === '' ? '' : user.error}</p>
            </div>
        </div>
    );
};

export default Login;