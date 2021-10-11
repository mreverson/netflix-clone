import React, { useState, useEffect } from 'react';
import axios from "../axios";

function Row({title, fetchUrl, isLargeRow = false}) {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    return (
        <div className="text-white ml-5">
            <h2 className="text-bold pl-5 text-xl">{title}</h2>

            <div className="flex overflow-y-hidden overflow-x-scroll pt-2 pb-5 pl-5 scrollbar-hide">
                {movies.map(movie => 
                    ((isLargeRow && movie.poster_path) || 
                    (!isLargeRow && movie.backdrop_path)) && (
                    <img 
                        key={movie.id}
                        className={` rounded-md max-h-100px object-contain mr-1.5 w-full transition duration-450 ease-in transform hover:scale-105 cursor-pointer ${isLargeRow && "isLargeRow mr-2.5 hover:scale-110"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} 
                    />
                ))}
            </div>
            
        </div>
    )
}

export default Row
