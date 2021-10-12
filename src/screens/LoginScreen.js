import React, { useState } from 'react';
import SignUpScreen from '../components/SignUpScreen';

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);

    return (
        <div className="relative h-full" style={{background: "url('https://assets.nflxext.com/ffe/siteui/vlv3/757ab38f-5d08-40bc-b3eb-eaba63ed8203/93c34f94-56c8-40a7-8b2e-b4aac6427977/GB-en-20210125-popsignuptwoweeks-perspective_alpha_website_medium.jpg'), center no-repeat", backgroundSize: "cover" }}> 
            <div className=""> {/* loginscreen background */}
                <img
                    className="fixed left-0 w-40 object-contain pl-5"
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                    alt="" 
                />
                <button 
                    className="fixed right-5 top-5 bg-red-500 text-white text-base font-semibold px-5 py-2 rounded-sm border-none cursor-pointer"
                    onClick={() => setSignIn(true)}
                >
                    Sign In
                </button>

                <div className="loginScreenGradient" />

                <div className="z-10 p-5 text-white absolute top-30p mx-auto w-full text-center">
                    {signIn ? (
                        <SignUpScreen />
                    ) : (
                        <>
                            <h1 className="text-4xl mb-5">Unlimited films, TV Programmes, and More.</h1>
                            <h2 className="text-2xl mb-7">Watch Anywhere. Cancel at any time</h2>
                            <h3 className="text-base">Ready to watch? Enter your email to create or restart your membership</h3>

                            <div className="outline-none mt-1">
                                <form>
                                    <input
                                        className="p-4 outline-none focus:outline-none h-7 w-1/3 max-w-xl border-none text-black" 
                                        type="email" 
                                        placeholder="Email Address" 
                                    />
                                    <button 
                                        className="py-1 px-4 outline-none focus:outline-none border-none bg-red-500 text-base text-white"
                                        onClick={() => setSignIn(true)}
                                    >
                                        GET STARTED
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                    
                </div>
            </div> 
        </div>
    )
}

export default LoginScreen
