import React ,{useState,useEffect,useContext} from 'react';
import { mediaDetailsContext } from './../Context/Store';
import { useParams } from 'react-router-dom';

export default function MovieDetails() {
    
    const {movieDetails,getMedianDetails,setMovieDetails} = useContext(mediaDetailsContext);
    const {id} = useParams();//useParams() return object contain an id which we will destruct
    useEffect(() => {
        //console.log(id);
        getMedianDetails("movie",id,setMovieDetails);
       // console.log(movieDetails);
      }, [])
    return (
    <>
        <div className="movieDetails row">
            {movieDetails ? 
            <>
             <div className="col-md-4">
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movieDetails.poster_path} alt={movieDetails.original_title}  />
            </div>
            <div className="col-md-8">
                <h2 className='display-1'>{movieDetails.original_title}</h2>
                <p className='display-5'>{movieDetails.tagline}</p>
                {movieDetails.genres.map((genre)=><span key={genre.id} className='py-2 px-3 rounded-pill mx-2'>{genre.name}</span>)} 
                
                <ul className='py-3'>
                    <li>Langague : {movieDetails.original_language}</li>
                    <li>Vote : {movieDetails.vote_average}</li>
                    <li>Relaease Date : {movieDetails.release_date}</li>
                    <li>Popularity : {movieDetails.popularity}</li>
                    <li>Revenue : {movieDetails.revenue}</li>
                </ul>
                <p className='text-muted display-6 '>{movieDetails.overview}</p>
                <div className="col-md-7 mx-auto py-3">
            <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movieDetails?.backdrop_path} alt={movieDetails?.original_title}  />
            </div>
            </div>
            </> :<div className='vh-100 text-white d-flex justify-content-center align-items-center'> <svg xmlns="http://www.w3.org/2000/svg" width="16em" height="16em" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
  <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
</svg> </div> }
        </div>

    </>
  )
}
