import React, {useState, useEffect} from 'react';
import axios from "../axios";
import requests from "../Requests";

function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length-1)
            ]);
            return request;
        }
        fetchData();
    }, [])

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + "..." : string;
    }

    return (
        <header className="relative object-contain text-white h-448px" style={{ backgroundPosition: "center center", backgroundSize: "cover", backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`}}>
            <div className="ml-30px pt-140px h-190px">
                <h1 className="text-5xl font-extrabold pb-1.5">{movie?.title || movie?.name || movie?.orginial_name}</h1>
                <div className="my-2">
                    <button 
                        className="cursor-pointer bg-gray-custom text-white outline-none border-none font-bold rounded-sm px-8 py-2 mr-4 hover:text-black hover:bg-gray-100 transition-all duration-200 ease-in"
                    >
                            Play
                    </button>
                    <button className="cursor-pointer bg-gray-custom text-white outline-none border-none font-bold rounded-sm px-8 py-2 mr-4 hover:text-black hover:bg-gray-100 transition-all duration-200 ease-in">My List</button>
                </div>
                <h2 className="w-45r max-w-360px leading-5 pt-4 text-sm h-20">{truncate(movie?.overview, 150)}</h2>
            </div>


            <div className="fade-bottom" />
        </header>
    )
}

export default Banner
