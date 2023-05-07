import React, { useContext } from 'react'
import { mediaContext } from './../Context/Store';
import { Link } from 'react-router-dom';


export default function Tv() {
  const {trendingTv} = useContext(mediaContext);

  return (
    <>
            <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div className="">
            <div className="brdr w-25"></div>
            <h2 className='h1 py-3'>Trending<br/> Tv<br/>To Watch Now</h2>
            <p className="text-muted">most watched Tv by day</p>
            <div className="brdr "></div>
          </div>
        </div>
        {trendingTv.map((tv,i)=><div key={i} className='col-md-2'>
          <div className="tv py-2">
            <Link to={'../tvdetails/'+tv.id}>
            <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt="" />
            <h3 className='h5 pt-2'> {tv.name}</h3>
            </Link>
          </div>
        </div>)}
      </div>
    </>
  )
}
