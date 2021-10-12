import React from 'react';
import PlansScreen from './PlansScreen';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';

function ProfileScreen() {
    const user = useSelector(selectUser);
    return (
        <div className="h-screen text-white w-full">
            <Nav />
            <div className="flex flex-col mx-auto max-w-3xl w-1/2 pt-8p">
                <h1 className="text-6xl text-normal border-b-2 border-gray-600 border-opacity-50 mb-5">
                    Edit Profile
                </h1>

                <div className="flex">
                    <img
                        className="h-25"
                        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" 
                        alt="" 
                    />
                    <div className="text-white ml-6 flex-1">
                        <h2 className="bg-gray-600 p-4 pl-5 text-sm rounded-sm">
                            {user.email}
                        </h2>
                        <div className="mt-3">
                            <h3 className="text-1xl text-normal border-b-2 border-gray-600 border-opacity-50 mb-2">Plans</h3>
                            <PlansScreen />
                            <button 
                                className="w-full mt-2 px-5 py-3 bg-red-500 text-white text-base rounded-sm"
                                onClick={() => auth.signOut()}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
