import axios from 'axios';
import React ,{useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {

const [popularMovies, setPopularMovies] = useState(null);
const nums = new Array(10).fill(1).map((num,index)=>index+1);
// console.log(nums);
async function getPopularMovies(pageNumber) {
  let {data} =await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=8906c339de6b4f155e12b0b5ae756c10&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
  setPopularMovies(data.results);
}

useEffect(() => {
  
  getPopularMovies(1);

}, [])


  return (
    <>
    <div className="row py-5">
      {popularMovies ? 
       popularMovies.map((movie,i)=>
       <div key={i} className='col-md-2'>
        <div className="movie py-2">
          <Link to={'../moviedetails/'+movie.id}> 
          <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" />
          <h3 className='h5 pt-2'> {movie.title}</h3>
          </Link>
        </div>
        </div>)
      :
      <div className='vh-100 text-white d-flex justify-content-center align-items-center'> <svg xmlns="http://www.w3.org/2000/svg" width="16em" height="16em" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
      <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
    </svg> </div> }
      
    </div>
    <nav aria-label="...">
    <ul className="pagination pagination-lg d-flex justify-content-center">
        {nums.map((num)=>    <li key={num} className="page-item">
      <span onClick={()=>getPopularMovies(num)}  role="button" className="page-link bg-transparent text-white"  >
        {num}
      </span>
    </li>)}
    </ul>
   </nav>
    </>
  )
}
