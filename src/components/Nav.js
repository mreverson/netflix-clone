import React, {useState, useEffect} from 'react'

function Nav() {
    const [show, handleShow] = useState(false);
    const transitionNavBar = () => {
        if(window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);

        return () => window.removeEventListener("scroll", transitionNavBar)
    },[])

    return (
        <div className={`fixed top-0 p-5 w-full h-30px z-10 transition duration-500 ease-in ${show && 'bg-black'}`}> 
            <div className="flex justify-between item">
                <img
                    className="fixed top-1 left-0 w-20 object-contain pl-5 cursor-pointer"
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                    alt="" 
                />

                <img
                    className="fixed top-1 right-5 w-7 h-7 cursor-pointer"
                    src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" 
                    alt="" 
                />
            </div>
        </div>
    )
}

export default Nav
