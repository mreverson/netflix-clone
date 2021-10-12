import React, { useRef } from 'react'
import { auth } from "../firebase";

function SignUpScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((user) => {
            // success
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((user) => {
            // success
        })
        .catch((err) => {
            alert(err.message)
        })
    }
    return (
        <div className="max-w-sm p-16 mx-auto bg-black bg-opacity-80">
            <form className="grid flex-col">
                <h1 className="mb-3">Sign Up</h1>
                <input ref={emailRef} className="mb-2 outline-none h-10 w-full rounded-md text-black" type="Email" placeholder="Email" />
                <input ref={passwordRef} className="mb-2 outline-none h-10 w-full rounded-md text-black"  type="password" placeholder="Password" />
                <button 
                    className="mt-2 px-2 py-3 bg-red-500 text-white rounded-sm" 
                    type="submit"
                    onClick={signIn}
                >
                    Sign In
                </button>

                <h4 className="text-left mt-4">
                    <span className="text-gray-300">New to Netflix?</span> 
                    <span className="cursor-pointer hover:underline" onClick={register}> Sign Up now.</span> 
                </h4>
            </form>
        </div>
    )
}

export default SignUpScreen
