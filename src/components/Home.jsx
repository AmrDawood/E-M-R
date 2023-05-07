import axios from 'axios';
import React ,{useState , useEffect ,useContext} from 'react';
import { Link } from 'react-router-dom';
import {mediaContext}from '../Context/Store'
// import avatar from '../Avatar.png';

export default function Home() {

 const {trendingMovies,trendingTv,trendingPeople} = useContext(mediaContext);

  return (
    <>
    {/* <img className='w-25' src={avatar} alt="" /> */}
      <div className="row py-5">
      
        <div className="col-md-4 d-flex align-items-center">
          <div className="">
            <div className="brdr w-25"></div>
            <h2 className='h1 py-3'>Trending<br/> Movies<br/>To Watch Now</h2>
            <p className="text-muted">most watched movies by day</p>
            <div className="brdr "></div>
          </div>
        </div>
        {trendingMovies.slice(0,10).map((movie,i)=><div key={i} className='col-md-2'>
          <div className="movie py-2">
            <Link to={'../moviedetails/'+movie.id}> 
            <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" />
            <h3 className='h5 pt-2'> {movie.title}</h3>
            </Link>
          </div>
        </div>)}
      </div>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div className="">
            <div className="brdr w-25"></div>
            <h2 className='h1 py-3'>Trending<br/> Tv<br/>To Watch Now</h2>
            <p className="text-muted">most watched Tv by day</p>
            <div className="brdr "></div>
          </div>
        </div>
        {trendingTv.slice(0,10).map((tv,i)=><div key={i} className='col-md-2'>
          <div className="tv py-2">
            <Link to={`../tvdetails/`+tv.id}>
            <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt="" />
            <h3 className='h5 pt-2'> {tv.name}</h3>
            </Link>
          </div>
        </div>)}
      </div>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div className="">
            <div className="brdr w-25"></div>
            <h2 className='h1 py-3'>Trending<br/> People<br/>To Watch Now</h2>
            <p className="text-muted">most watched People by day</p>
            <div className="brdr "></div>
          </div>
        </div>
        {trendingPeople.slice(0,10).map((People,i)=><div key={i} className='col-md-2'>
          <div className="People py-2">
            <Link to={'../persondetails/'+People.id}>
            <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+People.profile_path} alt="" />
            <h3 className='h5 pt-2'> {People.name}</h3>
            </Link>
          </div>
        </div>)}
      </div>
    </>
  )
}
